require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

console.log(process.env.MONGODB_URI)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('successfully connected to MongoDB!')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
