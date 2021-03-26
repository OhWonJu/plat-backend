import bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      // 동일한 userName or email이 db에 있는지 확인
      const existingUser = await client.user.findFirst({
        // prisma client에 접근
        // prisma는 promise를 return. so async & await.
        where: {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
      });
      // hash password
      const uglyPassword = await bcrypt.hash(password, 10);
      
      return client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        }
      })
    },
  },
};
