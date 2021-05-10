import client from "../../client";

export default {
  Comment: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    feed: ({ feedId }) =>
      client.feed.findUnique({
        where: {
          id: feedId,
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser.id;
      }
    },
  },
};
