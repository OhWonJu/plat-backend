import client from "../../../client";

export default {
  Query: {
    seeProfile: (_, { userName }) =>
      client.user.findUnique({
        where: {
          userName,
        },
        include: {
          // relationship에 대한 접근을 풀어준다.
          followings: true,
          followers: true,
        },
      }),
  },
};
