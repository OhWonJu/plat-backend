import client from "../../../client";

// export default {
//   Query: {
//     searchUsers: async (_, { keyword, lastId }) => {
//       if (keyword === "") {
//         return;
//       }
//       const users = await client.user.findMany({
//         where: {
//           userName: {
//             startsWith: keyword.toLowerCase(),
//           },
//         },
//         take: 10,
//         skip: lastId ? 1 : 0,
//         ...(lastId && { cursor: { id: lastId } }),
//       });
//       return users;
//     },
//   },
// };

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      if (keyword === "") {
        return;
      }
      const users = await client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return users;
    },
  },
};