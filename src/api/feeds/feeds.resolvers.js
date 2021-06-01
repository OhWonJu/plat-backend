import client from "../../client";

export default {
  Feed: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    group: async ({ groupId }) => {
      if (groupId) {
        const groupInfo = await client.group.findUnique({
          where: {
            id: groupId,
          },
        });
        return groupInfo;
      } else {
        return null;
      }
    },
    likesCount: ({ id }) => client.like.count({ where: { feedId: id } }),
    commentsCount: ({ id }) => client.comment.count({ where: { feedId: id } }),
    isLiked: ({ id }, _, { loggedInUser }) => {
      const myLike = client.like.findFirst({
        where: {
          feedId: id,
          userId: loggedInUser.id,
        },
      });
      if (myLike) {
        return true;
      } else {
        return false;
      }
    },
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser.id;
      }
    },
  },
  Like: {
    feed: ({ feedId }) =>
      client.feed.findUnique({
        where: {
          id: feedId,
        },
        select: {
          id: true,
          title: true,
          file: true,
        },
      }),
  },
};
