import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const message = await client.message.findFirst({
    where: {
      id,
      userId: {
        not: loggedInUser.id,
      },
      room: {
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!message) {
    return {
      ok: false,
      error: "Message not fount.",
    };
  }
  await client.message.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    readMessage: portectedResolver(resolver),
  },
};
