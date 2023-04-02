import { useDispatch } from 'react-redux'
import { addAnecdote} from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const AddAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(addAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm