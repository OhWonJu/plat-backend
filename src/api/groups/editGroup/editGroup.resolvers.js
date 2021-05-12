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
          disconnect: oldGroupInfo.hashtags,
          connectOrCreate: processHashtags(bio),
        },
      }),
      ...(groupPhoto && { groupPhoto: groupPhotoUrl }),
      open,
    },
  });
  if (group.id) {
    if (hashIds.length !== 0) {
      const noGroups = hashIds.filter(async hashId => {
        const hash = await client.hashtag.findFirst({
          where: { id: hashId.id },
          select: { groups: { select: { id: true } } },
        });
        if (hash.groups.length === 0) {
          return hash;
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
