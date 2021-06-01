import client from "../../../client";

export default {
  Query: {
    seeGroup: (_, { id }) =>
      client.group.findUnique({
        where: {
          id,
        },
        include: {
          //hashtags: true,
          //users: true,
          //feeds: true,
          feeds: {
            orderBy: {
              createdAt: "desc",
              updatedAt: "desc",
            },
          },
        },
      }),
  },
};
