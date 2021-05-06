import client from "../../../client";

export default {
  Query: {
    seeAvatar: (_, { userId }) =>
      client.avatar.findUnique({
        where: {
          userId,
        },
        include: {
          user: true,
        },
      }),
  },
};
