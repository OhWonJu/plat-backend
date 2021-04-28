import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { NEW_MESSAGE } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  // user가 리스닝 하기전에 logged filtering
  const room = await client.room.findFirst({
    where: {
      id: args.roomId,
      users: {
        some: {
          id: context.loggedInUser.id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!room) {
    // subscription에 null을 return 하면 안된다.
    // return null;
    throw new Error("You can't see this.");
  }
  // withFilter는 resolver 역할을 하게 될거임.
  // subscribe는 함수를 호출
  // 호출되는 함수가 withFilter
  // resolver가 받아오는 parms를 알아야겠지..
  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    async (payload, variables, { loggedInUser }) => {
      // payload == publish(NEW_MESSAGE, { roomUpdates: { ...message } }); publish 된 subscription 타입을 받음
      // variables == roomId: String! from typeDefs 해당 subscription에 전달되는 args
      // ({roomUpdates}, {roomId}) 이런식으로 알지?
      // publish 될 때 호출됨
      // 여기서도 portect 가능 - user가 리스닝 한뒤에 logged filtering (Room에서 kick 된다면??)
      if (payload.roomUpdates.roomId === variables.roomId) {
        const room = await client.room.findFirst({
          where: {
            id: variables.roomId,
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (!room) {
          return false;
        }
        return true;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    roomUpdates: {
      // Subscription을 위해서는 subscribe 함수를 생성해야한다.
      // tirgger는 String type
      // private 한 방식
      subscribe: resolver,
      // public한 방식?
      // subscribe: () => pubsub.asyncIterator(trigger Name)
    },
  },
};
