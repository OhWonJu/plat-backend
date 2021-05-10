import { isUnionType } from "graphql";
import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { color, skinId, headId, faceId, bodyId },
  { loggedInUser }
) => {
  const oldAvatar = await client.avatar.findFirst({
    where: {
      userId: loggedInUser.id,
    },
  });
  if (!oldAvatar) {
    return {
      ok: false,
      error: "Not exist Avatar.",
    };
  }
  // 1. 받은 인자에 따라 업데이트..
  // 2. 각 아이템 Id를 받고.. 해당 아이템의 카운트, 타입등을 확인하고...
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

  let skinItem = null;
  let skinUrl = null;
  if (skinId) {
    skinItem = await client.item.findUnique({
      where: {
        id: skinId,
      },
      select: {
        id: true,
        itemInfoId: true,
        count: true,
      },
    });
    const check = await checkType(skinItem);
    if (check.kategorieId !== "avatar") {
      return {
        ok: false,
        error: "Item kategorie is not for avatar.",
      };
    } else if (check.type !== "skin") {
      return {
        ok: false,
        error: "It is not skin item.",
      };
    } else if (skinItem.count === 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    } else {
      skinUrl = await client.itemInfo.findUnique({
        where: {
          id: skinItem.itemInfoId,
        },
        select: {
          id: true,
          file: true,
        },
      });
      if (oldAvatar.skinId) {
        await client.item.update({
          where: {
            id: oldAvatar.skinId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
      await client.item.update({
        where: {
          id: faceItem.id,
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
    }
  }

  let headItem = null;
  let headUrl = null;
  if (headId) {
    headItem = await client.item.findUnique({
      where: {
        id: headId,
      },
      select: {
        id: true,
        itemInfoId: true,
        count: true,
      },
    });
    const check = await checkType(headItem);
    if (check.kategorieId !== "avatar") {
      return {
        ok: false,
        error: "Item kategorie is not for avatar.",
      };
    } else if (check.type !== "head") {
      return {
        ok: false,
        error: "It is not head item.",
      };
    } else if (headItem.count === 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    } else {
      headUrl = await client.itemInfo.findUnique({
        where: {
          id: headItem.itemInfoId,
        },
        select: {
          id: true,
          file: true,
        },
      });
      if (oldAvatar.headId) {
        await client.item.update({
          where: {
            id: oldAvatar.headId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
      await client.item.update({
        where: {
          id: headItem.id,
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
    }
  }

  let faceItem = null;
  let faceUrl = null;
  if (faceId) {
    faceItem = await client.item.findUnique({
      where: {
        id: faceId,
      },
      select: {
        id: true,
        itemInfoId: true,
        count: true,
      },
    });
    const check = await checkType(faceItem);
    if (check.kategorieId !== "avatar") {
      return {
        ok: false,
        error: "Item kategorie is not for avatar.",
      };
    } else if (check.type !== "face") {
      return {
        ok: false,
        error: "It is not face item.",
      };
    } else if (faceItem.count === 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    } else {
      faceUrl = await client.itemInfo.findUnique({
        where: {
          id: faceItem.itemInfoId,
        },
        select: {
          id: true,
          file: true,
        },
      });
      if (oldAvatar.facdId) {
        await client.item.update({
          where: {
            id: oldAvatar.faceId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
      await client.item.update({
        where: {
          id: faceItem.id,
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
    }
  }

  let bodyItem = null;
  let bodyUrl = null;
  if (bodyId) {
    bodyItem = await client.item.findUnique({
      where: {
        id: bodyId,
      },
      select: {
        id: true,
        itemInfoId: true,
        count: true,
      },
    });
    const check = await checkType(bodyItem);
    if (check.kategorieId !== "avatar") {
      return {
        ok: false,
        error: "Item kategorie is not for avatar.",
      };
    } else if (check.type !== "body") {
      return {
        ok: false,
        error: "It is not body item.",
      };
    } else if (bodyItem.count === 0) {
      return {
        ok: false,
        error: "Not enough amount.",
      };
    } else {
      bodyUrl = await client.itemInfo.findUnique({
        where: {
          id: bodyItem.itemInfoId,
        },
        select: {
          id: true,
          file: true,
        },
      });
      if (oldAvatar.bodyId) {
        await client.item.update({
          where: {
            id: oldAvatar.bodyId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
      await client.item.update({
        where: {
          id: bodyItem.id,
        },
        data: {
          count: {
            decrement: 1,
          },
        },
      });
    }
  }

  await client.avatar.update({
    where: {
      userId: loggedInUser.id,
    },
    data: {
      ...(color && { color: color }),
      ...(skinItem && { skinId: skinItem.id }),
      ...(skinUrl && { skinUrl: skinUrl.file }),
      ...(headItem && { headId: headItem.id }),
      ...(headUrl && { headUrl: headUrl.file }),
      ...(faceItem && { faceId: faceItem.id }),
      ...(faceUrl && { faceUrl: faceUrl.file }),
      ...(bodyItem && { bodyId: bodyItem.id }),
      ...(bodyUrl && { bodyUrl: bodyUrl.file }),
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editAvatar: portectedResolver(resolver),
  },
};
