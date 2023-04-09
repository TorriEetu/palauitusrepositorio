const Author = require('./models/author')
const Book = require('./models/book')
const { GraphQLError } = require('graphql')
const { v4: uuidv4 } = require('uuid')

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({
          $and: [{ author: { $in: author.id } }, { genres: { $in: args.genre } }],
        }).populate('author')
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: author.id } }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    //Somehow this code send null author but still works TODO fix it
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      //Error: Cannot return null for non-nullable field Author
      //But this value should never be null
      //This could be code error or query error
      const book = new Book({ ...args, author: author.id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },
  },
}
module.exports = resolvers
