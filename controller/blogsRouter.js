const blogRouter = require('express').Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)

})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user
    console.log(user, 'user from blogRouter');
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }



    console.log(user.id, '   user in blogsrouter')
    if (body.likes === undefined) {
        body.likes = 0
    }

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).send('Bad Request')
    }
    //add user section to the blog json
    body.user = user.id
    const blog = new Blog(body)



    const savedBlog = await blog.save()

    //saved the new added blog to user json
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()



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
    const blog = await Blog.findById(request.params.id)

    const user = request.user
    console.log(user, 'user in delete blog router')
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }
    //check if the user that created the note is deleting it
    if (blog.user.toString() === user.id) {
        console.log('true to delete')
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    // 
    // 
})


module.exports = blogRouter