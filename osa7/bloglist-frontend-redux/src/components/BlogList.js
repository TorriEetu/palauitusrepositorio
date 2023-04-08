import { useSelector } from 'react-redux'

import Blog from '../components/Blog'

const BlogList = () => {
  const user = useSelector((state) => state.login)

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const copy = [...blogs]
  return (
    <div>
      {copy
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogList
