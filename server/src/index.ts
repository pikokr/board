import "graphql-import-node";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs.graphql";
import resolvers from "./resolvers";
import config from "../config.json";
import http from 'http'

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app)

httpServer.listen({port: config.server.port}, () => console.log("Listening"));
