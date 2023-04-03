import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addVote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter.filter === '') {
      return state => state.anecdotes
    }
    return state.anecdotes.filter((anecdote) => 
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase()))
  })

  const vote = (event) => {
    dispatch(addVote(event.id))
    dispatch(setNotification(`You voted '${event.content}'`))
  }

  return (
    <div>
      {anecdotes.sort((a , b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList