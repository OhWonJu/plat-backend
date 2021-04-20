import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { groupId, code }, { loggedInUser }) => {
  const group = await client.group.findUnique({
    where: { id: groupId },
    select: { id: true, open: true, codes: true, users: true },
  });
  if (!group) {
    return {
      ok: false,
      error: "Group is not exist.",
    };
  }
  // 그룹 공개 여부에 따라
  if (group.open) {
    await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        users: {
          connect: {
            id: loggedInUser.id,
          },
        },
      },
    });
    return {
      ok: true,
    };
  } else {
    const userExist = group.users.filter(user => user.id === loggedInUser.id);
    if (userExist.length !== 0) {
      return {
        ok: false,
        error: "You are already in this gorup.",
      };
    }
    // 그룹 코드 확인
    const userCode = group.codes.filter(c => c.code === code)[0];
    if (!userCode) {
      // 코드를 입력하지 않은 경우
      return {
        ok: false,
        error: "code is not exist.",
      };
    }
    if (userCode.code === code && userCode.userId === loggedInUser.id) {
      await client.group.update({
        where: {
          id: groupId,
        },
        data: {
          users: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });
      await client.code.delete({
        where: {
          groupId_userId: {
            groupId: group.id,
            userId: loggedInUser.id,
          },
        },
      });
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "Invailed code.",
      };
    }
  }

  // 그룹과 그룹 내 코드 확인
  // 맞다면 해당 유저를 그룹에 연결
  // 코드 삭제
};

export default {
  Mutation: {
    enterGroup: portectedResolver(resolver),
  },
};
