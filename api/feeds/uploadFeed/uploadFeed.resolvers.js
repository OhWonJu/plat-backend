import client from "../../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { file, title, caption, groupId },
  { loggedInUser }
) => {
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
  let fileUrl = null;
  if (file) {
    fileUrl = await uploadToS3(
      file,
      loggedInUser.id,
      `${loggedInUser.id}/uploads`
    );
  }
  // console.log(new Date(1618412981731).toISOString());
  const newFeed = client.feed.create({
    data: {
      ...(fileUrl && { file: fileUrl }),
      title,
      caption,
      disappearTime: new Date(Date.now() + 43200000), // default desapear time 12hour
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
