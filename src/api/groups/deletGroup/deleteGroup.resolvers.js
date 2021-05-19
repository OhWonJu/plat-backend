import client from "../../../client";
import { deleteDirInS3 } from "../../shared/shared.utils";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const group = await client.group.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      adminId: true,
      feeds: true,
      hashtags: true,
      items: true,
      groupPhoto: true,
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
    const itemIds = group.items.map(item => ({
      id: item.id,
    }));
    // 그룹을 지우기 위해 해쉬 연결 해제
    await client.group.update({
      where: { id },
      data: {
        items: {
          disconnect: itemIds,
        },
        hashtags: {
          disconnect: hashIds,
        },
      },
    });
    // 해제된 해쉬 중 연결된 그룹이 하나도 없는 해쉬는 삭제
    if (hashIds.length !== 0) {
      const hashs = await Promise.all(
        hashIds.map(
          async hashId =>
            await client.hashtag.findFirst({
              where: { id: hashId.id },
              select: {
                groups: { select: { id: true } },
              },
            })
        )
      );
      const noGroups = hashIds.filter((hashId, index) => {
        const hash = hashs[index];
        if (hash.groups.length === 0) {
          return hashId.id;
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
    if (group.groupPhoto) {
      // await deleteInS3("groups/95a36e8d-d9a5-4b7e-b627-64b38702fc78");
      // https://plat-uploads.s3.ap-northeast-2.amazonaws.com/groups/97914a89-5aa5-4c9a-8f8a-ac724b2606f6/profile/97914a89-5aa5-4c9a-8f8a-ac724b2606f6_1621252718980_Untitled-series.png
      await deleteDirInS3(
        `https://plat-uploads.s3.ap-northeast-2.amazonaws.com/groups/${group.id}/`
      );
    }
    await client.objectPosition.deleteMany({
      where: {
        groupId: id,
      },
    });
    await client.code.deleteMany({
      where: {
        groupId: id,
      },
    });
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
