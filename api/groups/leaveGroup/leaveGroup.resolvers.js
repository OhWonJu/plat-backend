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
