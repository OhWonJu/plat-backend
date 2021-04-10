import client from "../../client";

export default {
  Feed: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    group: ({ groupId }) =>
      client.group.findUnique({
        where: {
          id: groupId,
        },
      }),
    likesCount: ({ id }) => client.like.count({ where: { feedId: id } }),
  },
};
