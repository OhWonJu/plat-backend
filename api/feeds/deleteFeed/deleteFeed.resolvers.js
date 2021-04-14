import client from "../../../client";
import { deleteInS3 } from "../../shared/shared.utils";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const feed = await client.feed.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
      file: true,
    },
  });
  if (!feed) {
    return {
      ok: false,
      error: "Feed not found.",
    };
  } else if (feed.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    if (feed.file) {
      await deleteInS3(feed.file);
    }
    await client.comment.deleteMany({
      where: {
        feedId: id,
      },
    });
    await client.like.deleteMany({
      where: {
        feedId: id,
      },
    });
    await client.feed.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteFeed: portectedResolver(resolver),
  },
};
