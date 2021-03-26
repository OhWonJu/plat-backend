import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        // 동일한 userName or email이 db에 있는지 확인
        const existingUserName = await client.user.findFirst({
          // prisma client에 접근
          // prisma는 promise를 return. so async & await.
          where: {
            userName,
          },
        });
        const existingEmail = await client.user.findFirst({
          where: {
            email,
          },
        });
        // 방어적 프로그래밍 위에서 내려오는 에러를 처리할거임
        if (existingUserName) {
          throw new Error("This userName is already taken.");
        }
        if (existingEmail) {
          throw new Error("this email is already taken.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        return client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
    login: async (_, { userName, password }) => {
      // find user with args.userName
      const user = await client.user.findFirst({
        where: { userName },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.PRIVATE_KEY); // payload, secretOrPrivateKey
      return {
        // payload에 제공된 정보에 privateKey를 이용해 서명
        ok: true,
        token,
      };
    },
  },
};
