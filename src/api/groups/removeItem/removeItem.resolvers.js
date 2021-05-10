import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId, posId }, { loggedInUser }) => {
  // 1. 해당 위치 item의 소유 여부를 확인 (혹은 어드민)
  const group = await client.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      adminId: true,
      objectPositions: true,
    },
  });
  const objPos = await client.objectPosition.findFirst({
    where: {
      id: posId,
      groupId: groupId,
    },
  });
  if (!objPos) {
    return {
      ok: false,
      error: "Not fount object.",
    };
  }
  if (objPos.type === "furniture") {
    const item = await client.item.findUnique({
      where: {
        id: objPos.objectId,
      },
    });
    if (item.userId !== loggedInUser.id && group.adminId !== loggedInUser.id) {
      return {
        ok: false,
        error: "You have no authority.",
      };
    }
    // 2. 해당 위치의 item의 objectPosition을 제거
    await client.objectPosition.delete({
      where: {
        id: posId,
      },
    });
    const existObj = group.objectPositions.filter(
      obj => obj.objectId === item.id
    );
    if (existObj.length <= 1) {
      await client.item.update({
        where: {
          id: item.id,
        },
        data: {
          count: {
            increment: 1,
          },
          groups: {
            disconnect: {
              id: groupId,
            },
          },
        },
      });
      return {
        ok: true,
      };
    } else {
      await client.item.update({
        where: {
          id: item.id,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
      return {
        ok: true,
      };
    }
  } else {
    return {
      ok: false,
      error: "Item is not furniture.",
    };
  }
};

export default {
  Mutation: {
    removeItem: portectedResolver(resolver),
  },
};
