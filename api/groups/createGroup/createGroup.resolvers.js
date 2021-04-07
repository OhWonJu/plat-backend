import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { title, bio, open },
  { loggedInUser }
) => {
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
  if (bio) {
    // parse bio
    // get or create Hashtags
  }
  const newGroup = await client.group.create({
    data: {
      adminId: loggedInUser.id,
      title: title.toLowerCase(),
      bio,
      groupPhoto,
      open,
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
