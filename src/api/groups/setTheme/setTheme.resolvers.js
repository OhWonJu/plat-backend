import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId, itemId }, { loggedInUser }) => {
  const group = await client.group.findFirst({
    where: {
      id: groupId,
      adminId: loggedInUser.id,
    },
    select: {
      adminId: true,
      theme: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group is not exist.",
    };
  }
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
  if (check.kategorieId !== "theme") {
    return {
      ok: false,
      error: "Item kategorie is not for theme.",
    };
  } else {
    if (item.count <= 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    }
    const themeInfo = await client.itemInfo.findFirst({
      where: {
        id: item.itemInfoId,
      },
      select: {
        id: true,
      },
    });
    await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        theme: themeInfo.id,
      },
    });
    await client.item.update({
      where: {
        id: itemId,
      },
      data: {
        count: {
          decrement: 1,
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
    setTheme: portectedResolver(resolver),
  },
};
