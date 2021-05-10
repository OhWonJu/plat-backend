import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId, userId }, { loggedInUser }) => {
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
  if (group.adminId !== loggedInUser.id) {
    return {
      ok: false,
      error: "You have no authority.",
    };
  } else if (group.adminId === loggedInUser.id && loggedInUser.id === userId) {
    return {
      ok: false,
      error: "You are admin.",
    };
  }
  const existUser = group.users.filter(user => user.id === userId);
  if (existUser.length === 0) {
    return {
      ok: false,
      error: "User is not exist.",
    };
  }
  const isManager = group.managerId.findIndex(id => id === userId);
  // 이미 매니저라면 매니저 직위 해제
  if (isManager !== -1) {
    group.managerId.splice(isManager, 1);
    await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        managerId: group.managerId,
      },
    });
    return {
      ok: true,
      grant: "remove",
    };
  } else {
    // 매니저가 아니라면 추가
    await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        managerId: { push: userId },
      },
    });
    return {
      ok: true,
      grant: "set",
    };
  }
};

export default {
  Mutation: {
    toggleGrant: portectedResolver(resolver),
  },
};
