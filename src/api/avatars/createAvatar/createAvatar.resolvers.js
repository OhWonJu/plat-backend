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
        bodyUrl:
          "https://plat-uploads.s3.ap-northeast-2.amazonaws.com/default/avatar/default_avatar-body.png",
        headUrl:
          "https://plat-uploads.s3.ap-northeast-2.amazonaws.com/default/avatar/default_avatar_face.png",
        legUrl:
          "https://plat-uploads.s3.ap-northeast-2.amazonaws.com/default/avatar/default_avatar_leg_right.png",
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
