import client from "../../../client";

export default {
  Query: {
    searchFeeds: async (_, { keyword, lastId }) => {
      if (keyword === "") {
        return;
      }
      const feeds = await client.feed.findMany({
        where: {
          OR: [
            {
              caption: {
                contains: keyword,
              },
            },
            {
              title: {
                contains: keyword,
              },
            },
          ],
        },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return feeds;
    },
  },
};
