import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId }, { loggedInUser }) => {
  // group의 공개 여부를 확인
  const group = await client.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      open: true,
    },
  });
  let groupFeeds = [];
  // open = true
  if (group.open) {
    groupFeeds = await client.feed.findMany({
      where: {
        groupId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    // open = false인 경우 해당 그룹에 속한 경우만 Feed를 볼 수 있다.
    groupFeeds = await client.feed.findMany({
      where: {
        AND: [
          {
            groupId,
          },
          {
            group: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return groupFeeds;
};

export default {
  Query: {
    seeGroupFeeds: portectedResolver(resolver),
  },
};
