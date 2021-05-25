import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { NEW_CODE } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  return withFilter(
    () => pubsub.asyncIterator(NEW_CODE),
    async (payload, variables) => {
      const code = await client.code.findFirst({
        where: {
          id: payload.inviteUpdates.id,
          userId: context.loggedInUser.id,
        },
        select: {
          userId: true,
        },
      });
      if (code) {
        return true;
      } else {
        return false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    inviteUpdates: {
      subscribe: resolver,
    },
  },
};
