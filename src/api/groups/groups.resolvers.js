import client from "../../client";

export default {
  Group: {
    users: ({ id }) =>
      client.user.findMany({
        where: {
          groups: {
            some: {
              id,
            },
          },
        },
      }),
    userCount: ({ id }) =>
      client.user.count({
        where: { groups: { some: { id } } },
      }),
    //         root.id
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          groups: {
            some: {
              id,
            },
          },
        },
      }),
    codes: ({ id }) =>
      client.code.findMany({
        where: {
          groupId: id,
        },
      }),
    items: ({ id }) =>
      client.item.findMany({
        where: {
          groups: {
            some: {
              id,
            },
          },
        },
      }),
    objectPositions: ({ id }) =>
      client.objectPosition.findMany({
        where: {
          groupId: id,
        },
      }),
  },
  Hashtag: {
    // field에도 root, agrs, context를 전달 할 수 있다.
    groups: ({ id }, { page }, { loggedInUser }) => {
      console.log(id);
      // loggedInUser context를 불러옴으로써 부분적인 protect도 가능해짐
      // seeHashtag는 public 이지만 그 속의 groupsCount는 non-public

      // pagination이 resolver가 아닌 field내에서 이루어진다.. field의 resolver화?
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .groups({
          //pagination
          take: 5,
          skip: (page - 1) * 5,
        });
    },
    groupsCount: ({ id }) =>
      client.group.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
