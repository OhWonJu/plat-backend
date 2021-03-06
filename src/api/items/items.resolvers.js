import client from "../../client";

export default {
  Type: {
    // itemInfos: ({ type }, { lastId }) => {
    //   return client.type
    //     .findUnique({
    //       where: {
    //         type,
    //       },
    //     })
    //     .itemInfos({
    //       take: 6,
    //       skip: lastId ? 1 : 0,
    //       ...(lastId && { cursor: { id: lastId } }),
    //     });
    // },
    itemInfos: ({ type }) => {
      return client.type
        .findUnique({
          where: {
            type,
          },
        })
        .itemInfos();
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
