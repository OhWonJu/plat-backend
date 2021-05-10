import { DETECT_TIME } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  const group = await client.group.findFirst({
    where: {
      id: args.groupId,
    },
    select: {
      id: true,
    },
  });
  if (!group) {
    throw new Error("You con't see this.");
  }
  return withFilter(
    () => pubsub.asyncIterator(DETECT_TIME),
    async (payload, variables) => {
      if (payload.groupObjectUpdates.groupId !== variables.groupId) {
        return false;
      }
      return true;
    }
  )(root, args, context, info); 
}

export default {
  Subscription: {
    groupFeedUpdates: {
      subscribe: resolver,
    },
  },
};
