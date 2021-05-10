import { getLeadingCommentBlock } from "@graphql-tools/utils";
import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, payload }, { loggedInUser }) => {
  const comment = await client.comment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.comment.update({
      where: {
        id,
      },
      data: {
        payload,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    editComment: portectedResolver(resolver),
  },
};
