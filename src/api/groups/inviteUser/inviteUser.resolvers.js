import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";
import { generateInviteCode } from "../groups.utils";

const resolver = async (_, { groupId, userName }, { loggedInUser }) => {
  const group = await client.group.findFirst({
    where: {
      id: groupId,
    },
    select: {
      id: true,
      adminId: true,
      managerId: true,
      users: {
        select: {
          userName: true,
        },
      },
    },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group not found.",
    };
  } else {
    // 초대 권한 확인
    let grant = false;
    if (group.adminId === loggedInUser.id) {
      grant = true;
    } else if (group.managerId.includes(loggedInUser.id)) {
      grant = true;
    } else {
      grant = false;
    }
    if (!grant) {
      return {
        ok: false,
        error: "You don't have the authority",
      };
    }
    // 유저 존재 여부 확인
    const userExist = await client.user.findUnique({ where: { userName } });
    if (!userExist) {
      return {
        ok: false,
        error: "That user does not exist.",
      };
    }
    const userExistInGroup = group.users.filter(
      user => user.userName === userName
    );
    if (userExistInGroup.length !== 0) {
      return {
        ok: false,
        error: "User already in this group.",
      };
    }
    // 초대 코드 업데이트
    const inviteCode = generateInviteCode();
    const codeWhere = {
      groupId_userId: {
        groupId: group.id,
        userId: userExist.id,
      },
    };
    const code = await client.code.findUnique({
      where: codeWhere,
    });
    // 이미 해당 유저에 대한 code가 생성된 경우
    if (code) {
      return {
        ok: false,
        error: "Code is already generated.",
      };
    } else {
      await client.code.create({
        data: {
          code: inviteCode,
          userId: userExist.id,
          group: {
            connect: {
              id: groupId,
            },
          },
        },
      });
    }
    // DM 발송 필요...
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    inviteUser: portectedResolver(resolver),
  },
};
