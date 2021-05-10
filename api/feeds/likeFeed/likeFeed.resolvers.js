import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const existFeed = await client.feed.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      disappearTime: true,
      user: {
        select: {
          id: true,
        },
      },
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
  if (like) {
    return {
      ok: false,
      error: "already liked",
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
    await client.feed.update({
      where: {
        id: existFeed.id,
      },
      data: {
        disappearTime: new Date(Date.parse(existFeed.disappearTime) + 600000), // 1 like = 10 min
        // disappearTime: new Date(Date.parse(existFeed.disappearTime) + 30000), // test 
      },
    });
    await client.user.update({
      where: {
        id: existFeed.user.id,
      },
      data: {
        point: {
          increment: 5,
        },
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    likeFeed: portectedResolver(resolver),
  },
};
