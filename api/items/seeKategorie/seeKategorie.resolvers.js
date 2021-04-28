import client from "../../../client";

export default {
  Query: {
    seeKategorie: (_, { kategorieId }) =>
      client.kategorie.findUnique({
        where: {
          kategorie: kategorieId,
        },
      }),
  },
};
