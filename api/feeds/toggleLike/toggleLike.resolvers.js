import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const existFeed = await client.feed.findUnique({
    where: {
      id,
    },
  });
  if (!existFeed) {
    return {
      ok: false,
      error: "Feed not found.",
    };
  }
  const likeWhere = {
    feedId_userId: {
      feedId: id,
      userId: loggedInUser.id,
    },
  };
  const like = await client.like.findUnique({
    where: likeWhere,
  });
  // 이미 like를 누른 경우 like 제거
  if (like) {
    await client.like.delete({
      where: likeWhere,
    });
    return {
      ok: true,
      liked: "Unliked",
    };
  } else {
    await client.like.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        feed: {
          connect: {
            id: existFeed.id,
          },
        },
      },
    });
    return {
      ok: true,
      liked: "Liked",
    };
  }
};

export default {
  Mutation: {
    toggleLike: portectedResolver(resolver),
  },
};
