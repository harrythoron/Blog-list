const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.likes === undefined) {
        body.likes = 0
    }

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).send('Bad Request')
    }
    const blog = new Blog(request.body)


    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)


})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log(body, 'blogRouter')
    if (body.likes === undefined) {
        body.likes = 0
    }

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).send('Bad Request')
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


module.exports = blogRouter