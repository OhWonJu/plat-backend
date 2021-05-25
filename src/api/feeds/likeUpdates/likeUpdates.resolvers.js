import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { FEED_LIKE } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  console.log("ASDASD");
  return withFilter(
    () => pubsub.asyncIterator(FEED_LIKE),
    async (payload, variables) => {
      const feed = await client.feed.findFirst({
        where: {
          id: payload.likeUpdates.feedId,
          userId: variables.userId,
        },
        select: {
          userId: true,
        },
      });
      if (feed) {
        return true;
      } else {
        return false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    likeUpdates: {
      subscribe: resolver,
    },
  },
};
