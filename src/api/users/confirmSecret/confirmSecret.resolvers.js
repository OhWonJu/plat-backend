import jwt from "jsonwebtoken";

import client from "../../../client";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      // find user with args.userName
      const user = await client.user.findFirst({
        where: { email },
        select: {
          id: true,
          loginSecret: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // check secretKey with args.secret
      if (user.loginSecret === secret && user.loginSecret !== null) {
        // init secret code
        await client.user.update({
          where: { email },
          data: {
            loginSecret: null,
          },
        });
        // issue a token and send it to the user
        const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY); // payload, secretOrPrivateKey
        return {
          // payload에 제공된 정보에 privateKey를 이용해 서명
          ok: true,
          token,
        };
      } else {
        return {
          ok: false,
          error: "Incorrect secret code.",
        };
      }
    },
  },
};
