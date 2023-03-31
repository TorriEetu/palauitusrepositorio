const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)
describe('Get information about blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    helper.initialBlogs.forEach(async (blog) => {
      const blogObject = new Blog(blog)
      await blogObject.save()
    })
  })
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blog posts is _id by default', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })})

describe('posting of a blog', () => {

  test('a valid blog can be added ', async () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    }

    const before = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(before.length + 1)
  })

  test('if likes field is empty adds 0 ', async () => {
    const blog = {
      title: 'This value should be 0',
      author: 'somebody',
      url: 'http://www.foobar.foo'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const addedBlog = await allBlogs.find(blog => blog.title === 'This value should be 0')
    expect(addedBlog.likes).toBe(0)
  })

  test('if title or url are empty returns 400', async () => {
    const blog = {
      title: 'This should fail',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(r => r.id)
    expect(contents).not.toContain(blogToDelete.id)
  })
})

describe('update of a blog', () => {
  test('Blog should update successfully ', async () => {

    const newBlog = {
      title:'Updated blog',
      author:'Nobody',
      url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes:120
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)
    const updatedBlog = {
      ...newBlog,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const foundBlog = blogsAtEnd.find(blog => blog.likes === blogToUpdate.likes + 1)
    expect(foundBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})