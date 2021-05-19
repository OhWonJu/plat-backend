import client from "../../../client";
import { DETECT_MOVE } from "../../../constents";
import pubsub from "../../../pubsub";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { groupId, objId, xPos, yPos },
  { loggedInUser }
) => {
  // 1. 그룹 내 해당 포지션이 존재 여부 확인
  const group = await client.group.findFirst({
    where: {
      id: groupId,
      objectPositions: {
        some: {
          id: objId,
        },
      },
    },
    select: {
      objectPositions: true,
      adminId: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Not exist.",
    };
  }
  // 2. 아이템의 소유 확인
  const objectPos = await client.objectPosition.findUnique({
    where: {
      id: objId,
    },
    select: {
      objectId: true,
      type: true,
    },
  });
  if (!objectPos) {
    return {
      ok: false,
      error: "Object is not exist.",
    };
  }
  // 3. 아이템 위치 변경, 단 해당 좌표에 이미 있으면 안됨.
  const exist = group.objectPositions.filter(oldItem => {
    if (oldItem.x === xPos && oldItem.y === yPos) {
      return oldItem;
    }
  });
  if (exist.length !== 0) {
    return {
      ok: false,
      error: "Other Item is already placed.",
    };
  }
  // 아바타가 아닌 경우 소유를 확인해야함.
  if (objectPos.type === "furniture") {
    const item = await client.item.findUnique({
      where: {
        id: objectPos.objectId,
      },
      select: {
        userId: true,
      },
    });
    if (item.userId !== loggedInUser.id && loggedInUser.id !== group.adminId) {
      return {
        ok: false,
        error: "It is not yours.",
      };
    }
  }
  // else if (objectPos.type === "avatar") {
  //   if (objId !== loggedInUser.id) {
  //     return {
  //       ok: false,
  //       error: "It is not your avatar.",
  //     };
  //   }
  // }
  const movedObject = await client.objectPosition.update({
    where: {
      id: objId,
    },
    data: {
      x: xPos,
      y: yPos,
    },
  });
  pubsub.publish(DETECT_MOVE, { groupObjectUpdates: { ...movedObject } });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    moveObject: portectedResolver(resolver),
  },
};
