import client from "../../client";

const seeItemInfo = async id => {
  if (!id) {
    return null;
  }
  const item = await client.item.findUnique({
    where: {
      id,
    },
  });
  if (!item) {
    return null;
  }
  return client.itemInfo.findUnique({
    where: {
      id: item.itemInfoId,
    },
  });
};

export default {
  Avatar: {
    skinInfo: avatar => seeItemInfo(avatar.skinId),
    headInfo: avatar => seeItemInfo(avatar.headId),
    faceInfo: avatar => seeItemInfo(avatar.faceId),
    bodyInfo: avatar => seeItemInfo(avatar.bodyId),
  },
};
