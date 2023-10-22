const blogRouter = require('express').Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    // console.log(blogs, 'blogs in blogsrouter get')

    response.json(blogs)

})
blogRouter.get('/:id', async (request, response) => {


    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }



})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    // console.log(body, 'body in blogsRouter.js')

    const user = request.user
    console.log(user, 'user from blogRouter.js post method');
    //if user is not logged in adding blog is not possible
    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }



    // console.log(user.id, '   user in blogsrouter')
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
    console.log(savedBlog, 'savedBlog before sending to frontend blogsrouter.js')

    //saved the new added blog to user json
    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()


    //modified blog for frontend
    const blogFrontEnd = {
        author: savedBlog.author,
        id: savedBlog.id,
        likes: savedBlog.likes,
        title: savedBlog.title,
        url: savedBlog.url,
        user: {
            id: user.id,
            name: user.name,
            username: user.username
        }
    }

    console.log(blogFrontEnd, 'changed blog for frontend sake')

    response.status(201).json(blogFrontEnd)


})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log(body, 'body for blog put request in blogRouter.js')
    if (body.likes === undefined) {
        console.log('cause no likes')
        body.likes = 0
    }

    if (body.title === undefined || body.url === undefined) {
        console.log('error for not having title or url')
        return response.status(400).send('Bad Request')
    }
    const newBlog = {
        ...body,

        user: body.user.id


    }
    const updatedBlogFromSever = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    console.log(updatedBlogFromSever, 'updatedblog server version')
    const updatedBlogForFront = {
        id: updatedBlogFromSever._id,
        title: updatedBlogFromSever.title,
        author: updatedBlogFromSever.author,
        url: updatedBlogFromSever.url,
        likes: updatedBlogFromSever.likes,
        user: body.user
    }
    console.log(updatedBlogForFront, 'updatedBlogForFront frontend version')





    response.json(updatedBlogForFront)
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