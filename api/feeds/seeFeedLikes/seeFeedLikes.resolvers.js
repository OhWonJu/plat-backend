import client from "../../../client";

export default {
  Query: {
    seeFeedLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          feedId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map(like => like.user);
    },
  },
};
