import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, caption }, { loggedInUser }) => {
  const existFeed = await client.feed.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
  });
  if (!existFeed) {
    return {
      ok: false,
      error: "Feed not found.",
    };
  }
  const updateFeed = await client.feed.update({
    where: {
      id,
    },
    data: {
      caption,
    },
  });
  if (updateFeed.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update Feed."
    }
  }
};

export default {
  Mutation: {
    editFeed: portectedResolver(resolver),
  },
};
