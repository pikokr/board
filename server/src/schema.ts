import typeDefs from "./typedefs.graphql";
import resolvers from "./resolvers";
import { makeExecutableSchema } from "apollo-server";
import { GraphQLSchema } from "graphql";

const schema : GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema
