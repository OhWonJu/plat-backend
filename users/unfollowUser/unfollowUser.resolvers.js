import client from "../../client";
import { portectedResolver } from "../users.utils";

const resolver = async (_, { userName }, { loggedInUser }) => {
  const userExist = await client.user.findUnique({ where: { userName } });
  if (!userExist) {
    return {
      ok: false,
      error: "That user does not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      followings: {
        disconnect: {
          userName,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    unfollowUser: portectedResolver(resolver),
  },
};
