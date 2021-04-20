import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId, userId }, { loggedInUser }) => {
  const group = await client.group.findUnique({
    where: { id: groupId },
    select: {
      adminId: true,
      users: { select: { id: true } },
      managerId: true,
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group not found.",
    };
  } else if (group.adminId !== loggedInUser.id) {
    return {
      ok: false,
      error: "You have no authority.",
    };
  } else if (userId === loggedInUser.id) {
    return {
      ok: false,
      error: "You are already admin.",
    };
  } else {
    const existUser = group.users.filter(user => user.id === userId);
    if (existUser.length === 0) {
      return {
        ok: false,
        error: "User is not exist.",
      };
    }
    const isManager = group.managerId.findIndex(id => id === userId);
    if (isManager !== -1) {
      group.managerId.splice(isManager, 1);
      await client.group.update({
        where: { id: groupId },
        data: {
          adminId: userId,
          managerId: group.managerId,
        },
      });
    } else {
      await client.group.update({
        where: { id: groupId },
        data: { adminId: userId },
      });
    }
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    changeAdmin: portectedResolver(resolver),
  },
};
