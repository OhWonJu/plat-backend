require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";

import { typeDefs, resolvers } from "./schema";
import { getUser } from "./api/users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});
const app = express();
app.use(
  logger("tiny"),
  graphqlUploadExpress("/graphql", { maxFileSize: 10000000, maxFiles: 10 })
);
//          URL                      폴더
app.use("/uploads", express.static("uploads"));
// apollo server에 app server를 middleware로써 줌
// app에서 추가 사용할 기능들을 넣은뒤에 server에 얹어야겠지.
apollo.applyMiddleware({ app, path: "/" });
app.listen({ port: PORT }, () => {
  console.log(`Server is RUNNING on http://localhost:${PORT}/`);
});

// server
//   .listen(PORT)
//   .then(() => console.log(`Server is RUNNING on http://localhost:${PORT}/`));
