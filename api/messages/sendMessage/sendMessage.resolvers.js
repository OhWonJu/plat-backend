import client from "../../../client";
import { NEW_MESSAGE } from "../../../constents";
import pubsub from "../../../pubsub";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { payload, roomId, userId }, { loggedInUser }) => {
  // 상대방의 공개 여부에 따라 매시지 전달 범위 필요 //
  let room = null;
  if (userId) {
    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        ok: false,
        error: "This user does not exist.",
      };
    }
    room = await client.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
            {
              id: loggedInUser.id,
            },
          ],
        },
      },
    });
  } else if (roomId) {
    room = await client.room.findUnique({
      where: { id: roomId },
      select: { id: true },
    });
    if (!room) {
      return {
        ok: false,
        error: "Room not found.",
      };
    }
  }
  const message = await client.message.create({
    data: {
      payload,
      room: {
        connect: {
          id: room.id,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  // publish
  //                trigger,  object = subcription's return type + subscription's name + subscription's retrun value...
  pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } }); // message object를 열어서 보낸다잉...
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    sendMessage: portectedResolver(resolver),
  },
};
