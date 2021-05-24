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
    headInfo: avatar => seeItemInfo(avatar.headId),
    bodyInfo: avatar => seeItemInfo(avatar.bodyId),
    legInfo: avatar => seeItemInfo(avatar.legId),
  },
};
