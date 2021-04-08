import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { file, title, caption, groupId }, { loggedInUser }) => {
  // AWS를 이용해 Upload 할 예정이라 일단은 그냥 String 데이터로 테스트
  const userInGroup = await client.user.findFirst({
    where: {
      AND: [
        {
          groups: {
            some: {
              id: groupId,
            },
          },
        },
        {
          id: loggedInUser.id,
        },
      ],
    },
  });
  if (!userInGroup) {
    return {
      ok: false,
      error: "Can't upload feed.",
    };
  }
  const newFeed = client.feed.create({
    data: {
      file,
      title,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      group: {
        connect: {
          id: groupId,
        },
      },
    },
  });
  return {
    ok: true,
    feed: newFeed,
  };
};

export default {
  Mutation: {
    uploadFeed: portectedResolver(resolver),
  },
};
