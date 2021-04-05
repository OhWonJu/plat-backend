import bcrypt from "bcrypt";

import client from "../../client";

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

        const newUser = await client.user.create({
          data: {
            userName: userName.toLowerCase(),
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        if(newUser.id) {
          return {
            ok: true,
          }
        } else {
          return {
            ok: false,
            error: "Could not create user.",
          };
        }
      } catch (error) {
        return error;
      }
    },
  },
};
