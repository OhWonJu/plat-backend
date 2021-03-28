import bcrypt from "bcrypt";

import client from "../../client";
import { portectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: portectedResolver( // x(~)
      async (
        _,
        { firstName, lastName, userName, email, password: newPassword },
        { loggedInUser }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglyPassword && { password: uglyPassword }), // ES6 문법.  ...(조건 && return Obj)
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};
