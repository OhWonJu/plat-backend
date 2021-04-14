import client from "../../../client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        await sendSecretMail(email, loginSecret);
        await client.user.update({ where: { email }, data: { loginSecret } });
        return {
          ok: true,
        };
      } catch {
        return {
          ok: false,
          error: "Secret request is failed.",
        };
      }
    },
  },
};
