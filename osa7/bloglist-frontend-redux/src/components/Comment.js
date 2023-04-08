import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { createComment } from '../reducers/blogReducer'

const Comment = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { id, comments } = blog

  const handleComment = (event) => {
    event.preventDefault()
    console.log(comment)
    dispatch(createComment(id, comment))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input
            id='comment'
            type='text'
            value={comment}
            name='comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id='comment' type='submit'>
          comment
        </button>
      </form>
      {comments.length > 0 && (
        <ul>
          {comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comment
