import client from "../../../client";

export default {
  Query: {
    seeFeed: (_, { id }) =>
      client.feed.findUnique({
        where: {
          id,
        },
      }),
  },
};
