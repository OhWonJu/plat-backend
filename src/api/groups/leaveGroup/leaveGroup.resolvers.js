import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId }, { loggedInUser }) => {
  const group = await client.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      adminId: true,
      managerId: true,
      users: true,
      items: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group not found.",
    };
  }
  const userExist = group.users.filter(user => user.id === loggedInUser.id);
  if (userExist.length === 0) {
    return {
      ok: false,
      error: "You are not member of this Group.",
    };
  } else if (group.adminId === loggedInUser.id) {
    return {
      ok: false,
      error: "Admin can't leave group.",
    };
  } else {
    // const itemsId = group.items.map(item => {
    //   if (item.userId === loggedInUser.id) {
    //     return {
    //       id: item.id,
    //     };
    //   } else {
    //     return null;
    //   }
    // });
    const userItem = group.items.filter(item => item.userId === loggedInUser.id);
    const itemIds = userItem.map(item => ({
      id: item.id,
    }));
    console.log(itemIds);
    // 해당 group 내 user의 item 을 모두 소거
    await client.objectPosition.deleteMany({
      where: {
        owner: loggedInUser.id,
      },
    });
    const isManager = group.managerId.findIndex(id => id === loggedInUser.id);
    if (isManager !== -1) {
      group.managerId.splice(isManager, 1);
      await client.group.update({
        where: {
          id: groupId,
        },
        data: {
          managerId: group.managerId,
          users: {
            disconnect: {
              id: loggedInUser.id,
            },
          },
          items: {
            disconnect: itemIds,
          },
          objectPositions: {
            // avatar 제거
            deleteMany: {
              objectId: loggedInUser.id,
            },
          },
        },
      });
    } else {
      await client.group.update({
        where: {
          id: groupId,
        },
        data: {
          users: {
            disconnect: {
              id: loggedInUser.id,
            },
          },
          items: {
            disconnect: itemIds,
          },
          objectPositions: {
            deleteMany: {
              objectId: loggedInUser.id,
            },
          },
        },
      });
    }
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    leaveGroup: portectedResolver(resolver),
  },
};
