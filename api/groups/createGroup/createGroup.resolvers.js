import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";
import { processHashtags } from "../groups.utils";

const resolver = async (_, { title, bio, open }, { loggedInUser }) => {
  const existGroupTitle = await client.group.findFirst({
    where: {
      title,
    },
  });
  if (existGroupTitle) {
    return {
      ok: false,
      error: "This Group Title is already taken.",
    };
  }
  let hashtagObjs = [];
  if (bio) {
    hashtagObjs = processHashtags(bio);
  }
  const newGroup = await client.group.create({
    data: {
      adminId: loggedInUser.id,
      title: title.toLowerCase(),
      bio,
      open,
      ...(hashtagObjs.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
      }),
      users: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  if (newGroup.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not create group.",
    };
  }
};

export default {
  Mutation: {
    createGroup: portectedResolver(resolver),
  },
};
