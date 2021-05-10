import client from "../../client";

export default {
  Room: {
    // room의 user는 두명으로 한정 - DB에 무리 안가니까 이렇게 해도 됨..
    // 규모가 큰 경우 user.find로 user를 찾아서 pagination.
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    // pagination or 카카오 방식??? 매시지를 서버에 보낸 뒤 삭제...
    messages: ({ id }) =>
      client.message.findMany({
        where: { roomId: id },
      }),
    unreadCount: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      // 본인이 보낸 message는 카운트 no.
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          userId: {
            not: loggedInUser.id,
          },
        },
      });
    },
  },
  Message: {
    // parent = message, message가 가지고 있는 user정보.
    user: ({ id }) =>
      client.message
        .findUnique({
          where: { id },
        })
        .user(),
  },
};
