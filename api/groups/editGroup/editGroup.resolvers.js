import client from "../../../client";
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
      ...(groupPhoto && { groupPhoto: groupPhoto }),
      open,
    },
  });
  if (group.id) {
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
