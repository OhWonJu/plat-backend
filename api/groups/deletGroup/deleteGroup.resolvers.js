import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const group = await client.group.findUnique({
    where: {
      id,
    },
    select: {
      adminId: true,
      feeds: true,
      hashtags: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group not found.",
    };
  } else if (group.adminId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    const hashIds = group.hashtags.map(hash => ({
      id: hash.id,
    }));
    // 그룹을 지우기 위해 해쉬 연결 해제
    await client.group.update({
      where: { id },
      data: {
        hashtags: {
          disconnect: hashIds,
        },
      },
    });
    // 해제된 해쉬 중 연결된 그룹이 하나도 없는 해쉬는 삭제
    if (hashIds.length !== 0) {
      const noGroups = hashIds.filter(async hashId => {
        const hash = await client.hashtag.findFirst({
          where: { id: hashId.id },
          select: { groups: { select: { id: true } } },
        });
        if (hash.group.length === 0) {
          return hash;
        } else {
          return null;
        }
      });
      await client.hashtag.deleteMany({ where: { OR: noGroups } });
    }
    // 그룹 내 각 피드와 연결된것들을 삭제..
    // group.feeds.map(async feed => {
    //   await client.comment.deleteMany({
    //     where: {
    //       feedId: feed.id,
    //     },
    //   });
    //   await client.like.deleteMany({
    //     where: {
    //       feedId: feed.id,
    //     },
    //   });
    //   await client.feed.delete({
    //     where: {
    //       id: feed.id,
    //     },
    //   });
    // });
    // 그룹에 속한 피드들과의 연결을 끊음.
    const feedIds = group.feeds.map(feed => ({
      id: feed.id,
    }));
    if (feedIds.length !== 0) {
      await client.group.update({
        where: {
          id,
        },
        data: {
          feeds: {
            disconnect: feedIds,
          },
        },
      });
    }
    await client.group.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteGroup: portectedResolver(resolver),
  },
};
