import client from "../../client";

export default {
  Type: {
    itemInfos: ({ type }, { page }) => {
      return client.type
        .findUnique({
          where: {
            type,
          },
        })
        .itemInfos({
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    itemInfosCount: ({ type }) =>
      client.itemInfo.count({
        where: {
          typeId: type,
        },
      }),
  },
  Kategorie: {
    types: ({ kategorieId }) =>
      client.type.findMany({ where: { kategorieId } }),
  },
};
