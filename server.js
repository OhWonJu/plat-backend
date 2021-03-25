require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const PORT = procees.env.PORT;
const server = new ApolloServer({
  schema,
});
server
  .listen(PORT)
  .then(() => console.log(`Server is RUNNING on http://localhost:${PORT}/`));
