import "graphql-import-node";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import config from "../config.json";
import http from "http";
import {PubSub} from 'apollo-server'
import mongoose from "mongoose";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import schema from './schema'

mongoose
  .connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();

    app.use(express.json())

    const server = new ApolloServer({
      subscriptions: {
          path: '/graphql'
      },
      schema
    });

    server.applyMiddleware({ app, path: "/graphql" });

    const pubsub = new PubSub()

    const httpServer = http.createServer(app);

    httpServer.listen({ port: config.server.port }, () => {
        new SubscriptionServer({
            execute: execute,
            subscribe: subscribe,
            schema
        }, {
            server: httpServer,
            path: '/graphql'
        })
      console.log("Listening")
      console.log(server.subscriptionsPath)
    });
  });
