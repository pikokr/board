import "graphql-import-node";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs.graphql";
import resolvers from './resolvers'
import config from '../config.json'

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app, path: '/graphql'})

app.listen(config.server.port, () => console.log('Listening'))
