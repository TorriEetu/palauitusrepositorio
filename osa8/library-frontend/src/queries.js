import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author {
        name
      }
      genres
      published
      title
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const LOGGED_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const FAVORITE_GENRE = gql`
  query {
    favoriteBook {
      genres
      published
      title
      author {
        name
        born
        bookCount
      }
    }
  }
`
