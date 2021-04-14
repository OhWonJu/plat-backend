import client from "../../../client";

export default {
  Query: {
    seeFeedComments: (_, { feedId, lastId }) =>
      client.comment.findMany({
        where: { feedId },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
