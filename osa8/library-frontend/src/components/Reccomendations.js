import { useQuery } from '@apollo/client'
import { ALL_BOOKS, LOGGED_USER } from '../queries'

const Reccomendations = (props) => {
  const queryResult = useQuery(ALL_BOOKS)
  const userQueryResult = useQuery(LOGGED_USER)

  if (queryResult.loading) {
    return null
  }
  if (!props.show) {
    return null
  }

  console.log(queryResult.data)
  const books = queryResult.data.allBooks
  const usersFavoriteGenre = userQueryResult.data.me.favoriteGenre
  console.log(usersFavoriteGenre)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => book.genres.includes(usersFavoriteGenre))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reccomendations
