require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const User = require('./models/user')

console.log(process.env.MONGODB_URI)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
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
