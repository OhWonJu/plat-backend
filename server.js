import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hi',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => 
  console.log("Server is RUNNING on http://localhost:4000/"));