import client from "../../client";

export default {
  Query: {
    seeFollowings: async (_, { userName, lastId }) => {
      const userExist = await client.user.findUnique({
        where: { userName },
        // 유저가 존재하는지 확인하는 용인데 모든 정보를 가져올 필요는 없음
        // select를 통해 필요한 요소만 가져옴
        select: { id: true },
      });
      if (!userExist) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // pagination with cursor based
      const followings = await client.user
        .findUnique({ where: { userName } }) 
        .followings({
          // pagination
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        followings,
      }
    },
  },
};
