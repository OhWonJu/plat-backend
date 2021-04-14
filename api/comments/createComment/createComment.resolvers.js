import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { feedId, payload }, { loggedInUser }) => {
  const existFeed = await client.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      id: true,
    },
  });
  if (!existFeed) {
    return {
      ok: false,
      error: "Feed not found.",
    };
  }
  await client.comment.create({
    data: {
      payload,
      feed: {
        connect: {
          id: feedId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
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
    createComment: portectedResolver(resolver),
  },
};
