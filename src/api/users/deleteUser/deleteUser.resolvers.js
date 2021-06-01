import client from "../../../client";
import { deleteDirInS3 } from "../../shared/shared.utils";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, __, { loggedInUser }) => {
  const user = await client.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
    include: {
      groups: true,
    },
  });
  if (!user) {
    return {
      ok: false,
      error: "User not found.",
    };
  } else {
    // await deleteInS3("groups/95a36e8d-d9a5-4b7e-b627-64b38702fc78");
    // https://plat-uploads.s3.ap-northeast-2.amazonaws.com/groups/97914a89-5aa5-4c9a-8f8a-ac724b2606f6/profile/97914a89-5aa5-4c9a-8f8a-ac724b2606f6_1621252718980_Untitled-series.png
    await deleteDirInS3(
      `https://plat-uploads.s3.ap-northeast-2.amazonaws.com/users/${user.id}/`
    );

    await client.feed.deleteMany({
      where: {
        userId: id,
      },
    });
    await client.like.deleteMany({
      where: {
        userId: id,
      },
    });
    await client.comment.deleteMany({
      where: {
        userId: id,
      },
    });
    await client.objectPosition.deleteMany({
      where: {
        owner: id,
      },
    });
    await client.item.deleteMany({
      where: {
        userId: id,
      },
    });
    await client.code.deleteMany({
      where: {
        userId: id,
      },
    });
    await client.avatar.deleteMany({
      where: {
        userId: id,
      },
    });

    const groupIds = user.groups.map(group => ({
      id: group.id,
    }));
    await client.user.update({
      where: {
        id: id,
      },
      data: {
        groups: {
          disconnect: groupIds,
        },
      },
    });
    await client.user.delete({
      where: {
        id: id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteUser: portectedResolver(resolver),
  },
};
