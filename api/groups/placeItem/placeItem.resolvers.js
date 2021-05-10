import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { groupId, itemId, xPos, yPos },
  { loggedInUser }
) => {
  // 1. group 내 유저인지 확인한다.
  const group = await client.group.findFirst({
    where: {
      id: groupId,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
    select: {
      users: true,
      items: true,
      objectPositions: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group is not exist.",
    };
  }
  // 2. item의 사용 가능 여부를 확인한다.
  const checkType = async item => {
    const itemType = await client.itemInfo
      .findUnique({
        where: {
          id: item.itemInfoId,
        },
        select: {
          type: true,
        },
      })
      .type();
    return itemType;
  };
  const item = await client.item.findUnique({
    where: {
      id: itemId,
    },
  });
  const check = await checkType(item);
  if (check.kategorieId !== "furniture") {
    return {
      ok: false,
      error: "Item kategorie is not for furniture.",
    };
  } else {
    if (item.count <= 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    }
    const exist = group.objectPositions.filter(oldItem => {
      if (oldItem.x === xPos && oldItem.y === yPos) {
        return oldItem;
      }
    });
    // 3. objectposition 정보를 조회하여 배치 가능 여부를 확인한다.
    if (exist.length !== 0) {
      return {
        ok: false,
        error: "Other Item is already placed.",
      };
    }
    // 4. 아이템 배치
    await client.item.update({
      where: {
        id: itemId,
      },
      data: {
        groups: {
          connect: {
            id: groupId,
          },
        },
        count: {
          decrement: 1,
        },
      },
    });
    await client.objectPosition.create({
      data: {
        objectId: itemId,
        owner: loggedInUser.id,
        type: "furniture",
        group: {
          connect: {
            id: groupId,
          },
        },
        x: xPos,
        y: yPos,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    placeItem: portectedResolver(resolver),
  },
};
