import client from "../../../client";

// export default {
//   Query: {
//     seeFollowers: async (_, { userName, lastId }) => {
//       const userExist = await client.user.findUnique({
//         where: { userName },
//         // 유저가 존재하는지 확인하는 용인데 모든 정보를 가져올 필요는 없음
//         // select를 통해 필요한 요소만 가져옴
//         select: { id: true },
//       });
//       if (!userExist) {
//         return {
//           ok: false,
//           error: "User not found.",
//         };
//       }
//       // pagination with offset
//       // aFollowers는 해당 유저를 찾고 해당 유저의 팔로워들을 반환
//       // 해당 유저의 팔로워들을 찾는 것.
//       // const followers = await client.user
//       //   .findUnique({ where: { userName } })
//       //   .followers({
//       //     // pagination
//       //     take: 5,
//       //     skip: (page - 1) * 5,
//       //   });
//       // bFollowers는 해당 유저를 팔로잉 하고 있는 모든 유저들을 반환
//       // 다른 유저의 팔로잉 리스트에서 해당 유저를 찾는 것.
//       // 이런 방법이 있다는걸 참고...follow 관해서는 더 비효율적인 것 같음
//       // const bFollowers = await client.user.findMany({
//       //   where: {
//       //     followings: {
//       //       some: {
//       //         userName,
//       //       },
//       //     },
//       //   },
//       // });
//       // s

//       // pagination with cursor based
//       const followers = await client.user
//         .findUnique({ where: { userName } })
//         .followers({
//           // pagination
//           take: 5,
//           skip: lastId ? 1 : 0,
//           ...(lastId && { cursor: { id: lastId } }),
//         });

//       return {
//         ok: true,
//         followers,
//         //totalPages: Math.ceil(totalFollwers / 5),
//       };
//     },
//   },
// };

export default {
  Query: {
    seeFollowers: async (_, { userName }) => {
      const userExist = await client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!userExist) {
        return {
          ok: false,
          error: "User not found.",
        };
      }

      // pagination with cursor based
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers();

      return {
        ok: true,
        followers,
        //totalPages: Math.ceil(totalFollwers / 5),
      };
    },
  },
};
