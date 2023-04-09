const { gql } = require('apollo-server')

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int  
    bookCount: Int
  }

  type Book {
    id: ID!
    author: Author!
    genres: [String!]!
    published: Int!
    title: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

module.exports = typeDefs
