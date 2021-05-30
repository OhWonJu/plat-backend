import client from "../../../client";

// export default {
//   Query: {
//     searchItemInfos: async (_, { keyword, lastId }) => {
//       if (keyword === "") {
//         return;
//       }
//       const itemInfos = await client.itemInfo.findMany({
//         where: {
//           itemName: {
//             contains: keyword.toLowerCase(),
//           },
//         },
//         take: 10,
//         skip: lastId ? 1 : 0,
//         ...(lastId && { cursor: { id: lastId } }),
//       });
//       return itemInfos;
//     },
//   },
// };

export default {
  Query: {
    searchItemInfos: async (_, { keyword }) => {
      if (keyword === "") {
        return;
      }
      const itemInfos = await client.itemInfo.findMany({
        where: {
          itemName: {
            contains: keyword.toLowerCase(),
          },
        },
      });
      return itemInfos;
    },
  },
};
