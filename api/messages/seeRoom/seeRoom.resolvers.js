import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) =>
  client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

export default {
  Query: {
    seeRoom: portectedResolver(resolver),
  },
};
