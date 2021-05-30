import client from "../../../client";

export default {
  Query: {
    searchGroups: async (_, { keyword, lastId }) => {
      if (keyword === "") {
        return;
      }
      const groups = await client.group.findMany({
        where: {
          OR: [
            {
              bio: {
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
      return groups;
    },
  },
};
