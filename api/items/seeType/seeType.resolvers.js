import client from "../../../client";

export default {
  Query: {
    seeType: (_, { typeId }) =>
      client.type.findUnique({
        where: {
          type: typeId,
        },
      }),
  },
};
