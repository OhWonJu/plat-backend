import client from "../../../client";
import { portectedResolver } from "../../users/users.utils";

const resolver = async (_, __, { loggedInUser }) =>
  client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

export default {
  Query: {
    seeRooms: portectedResolver(resolver),
  },
};
