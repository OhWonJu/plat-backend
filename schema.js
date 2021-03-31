// The GraphQL schema
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
//import { makeExecutableSchema } from "@graphql-tools/schema";

//모든폴더/
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.resolvers.js`
);

// apollo server에서 schema를 생성하도록 export
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

//export const schema = makeExecutableSchema({ typeDefs, resolvers });

// export default schema;
