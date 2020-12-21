import 'graphql-import-node'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typedefs.graphql'



const app = express()


const server=  new ApolloServer({
    typeDefs
})
