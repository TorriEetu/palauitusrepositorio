const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.delete('/:id', async (request, response , next) => { 
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response , next) => {
  const body = request.body
  if (body.likes === undefined) {
    body.likes = 0
  }
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  //express-async-errors dosent seem to work
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)    
  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response , next) => {
  const body = request.body

  if (body.likes === undefined) {
    body.likes = 0
  }
      
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter
