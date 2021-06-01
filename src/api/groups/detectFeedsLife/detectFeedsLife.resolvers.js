import client from "../../../client";
import { DETECT_TIME } from "../../../constents";
import pubsub from "../../../pubsub";

const remove = async (groupId, feedId, doomsDay) => {
  const check = await client.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      disappearTime: true,
    },
  });
  const checkTime = new Date(Date.parse(check.disappearTime));
  if (checkTime > doomsDay) {
    return false;
  } else {
    await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        feeds: {
          disconnect: {
            id: feedId,
          },
        },
      },
    });
    return true;
  }
};

const timeOut = (groupId, feedId, doomsDay, timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = remove(groupId, feedId, doomsDay);
      resolve(result);
    }, timer);
  });
};

export default {
  Mutation: {
    detectFeedsLife: async (_, { feedId }) => {
      const feed = await client.feed.findUnique({
        where: {
          id: feedId,
        },
        select: {
          id: true,
          group: true,
          groupId: true,
          disappearTime: true,
        },
      });
      const now = Date.now();
      const doomsDay = new Date(Date.parse(feed.disappearTime));
      const timer = doomsDay - now;
      if (timer < 0) {
        return 
        // return {
        //   ok: false,
        //   error: "Already this feed is doomed...",
        // };
      } else {
        const result = await timeOut(feed.groupId, feedId, doomsDay, timer);
        console.log(result);
        //const result = new Promise(() => setTimeout(remove(feed.groupId, feedId, doomsDay), timer))
        if (!result) {
          return 
          // return {
          //   ok: false,
          //   error: "Not today...",
          // };
        }
      }
      pubsub.publish(DETECT_TIME, { groupFeedUpdates: { ...feed } });
      // return {
      //   ok: true,
      // };
    },
  },
};
