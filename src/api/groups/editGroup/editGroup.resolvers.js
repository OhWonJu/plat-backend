import client from "../../../client";
import { deleteInS3, uploadToS3 } from "../../shared/shared.utils";
import { portectedResolver } from "../../users/users.utils";
import { processHashtags } from "../groups.utils";

const resolver = async (
  _,
  { id, title, bio, groupPhoto, open },
  { loggedInUser }
) => {
  const oldGroupInfo = await client.group.findFirst({
    where: {
      id,
      adminId: loggedInUser.id,
    },
    // Hashtag - hashtag 정보를 가져온다.
    include: {
      hashtags: {
        select: {
          id: true,
          hashtag: true,
          groups: true,
        },
      },
    },
  });
  if (!oldGroupInfo) {
    return {
      ok: false,
      error: "You are not admin.",
    };
  }
  let groupPhotoUrl = null;
  if (groupPhoto) {
    if (oldGroupInfo.groupPhoto) {
      await deleteInS3(oldGroupInfo.groupPhoto);
    }
    groupPhotoUrl = await uploadToS3(
      groupPhoto,
      oldGroupInfo.id,
      `groups/${oldGroupInfo.id}/profile`
    );
  }
  if (title) {
    const existingTitle = await client.group.findFirst({
      where: {
        title,
      },
      select: {
        title: true,
      },
    });
    if (existingTitle) {
      return {
        ok: false,
        error: "This Title is already taken.",
      };
    }
  }
  const hashIds = oldGroupInfo.hashtags.map(hash => ({
    id: hash.id,
  }));
  const group = await client.group.update({
    where: {
      id,
    },
    data: {
      title,
      ...(bio && {
        bio: bio,
        hashtags: {
          disconnect: hashIds,
          connectOrCreate: processHashtags(bio),
        },
      }),
      ...(groupPhoto && { groupPhoto: groupPhotoUrl }),
      open,
    },
  });
  if (group.id) {
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
      // filter callback안에서 await을 사용하면, callback은 항상 promise를 반환합니다. promise는 항상 'truthy'
      // promise를 밖에서 해결..
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
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update group.",
    };
  }
};

export default {
  Mutation: {
    editGroup: portectedResolver(resolver),
  },
};
