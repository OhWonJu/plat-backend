import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";
import { COLOR } from "../avatars.utils";

const resolver = async (_, { color }, { loggedInUser }) => {
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
  const avatarColor = COLOR[color];
  if (avatarColor === undefined) {
    return {
      ok: false,
      error: "Not exist color.",
    };
  } else {
    await client.avatar.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        color: avatarColor,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    createAvatar: portectedResolver(resolver),
  },
};
