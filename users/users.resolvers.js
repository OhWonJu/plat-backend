import client from "../client";

export default {
  User: {
    // root -> request 된 user
    followersCount: ({ id }) =>
      // following 리스트 중 해당 id를 following 하고 있는 user수를 count.
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),
    followingsCount: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    // seeProfile을 요청할 때 누가 요청하는지 알아야함.
    // context 또한 필요함
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      // id = request된 id === 현재 보고 있는 프로필 유저의 id
      if (!loggedInUser) {
        return false;
      }
      // login 된 user의 following 리스트에서 root로 받은 id가 있는지 확인
      const exists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
  },
};
