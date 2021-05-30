import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";
import { COLOR } from "../avatars.utils";

const resolver = async (_, __, { loggedInUser }) => {
  const existAvatar = await client.avatar.findUnique({
    where: {
      userId: loggedInUser.id,
    },
    select: {
      userId: true,
    },
  });
  if (existAvatar) {
    return {
      ok: false,
      error: "Avatar already exist.",
    };
  }
  await client.avatar.create({
    data: {
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      bodyId:
        "default_avatar_body.png",
      headId:
        "default_avatar_face.png",
      legId:
        "default_avatar_leg_right.png",
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createAvatar: portectedResolver(resolver),
  },
};
