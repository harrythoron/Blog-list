const supertest = require('supertest')
const mongoose = require('mongoose')
//const { describe, beforeEach } = require('node:test')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

mongoose.set("bufferTimeoutMS", 30000)

// test('dummy return one', () => {
//     const blogs = []
//     const result = helper.dummy(blogs)
//     expect(result).toBe(1)
// })

// describe('total likes', () => {
//     test('of empty list is zero', () => {
//         const blogs = []
//         const result = helper.totalLikes(blogs)
//         expect(result).toBe(0)
//     })

//     test('one list of blog', () => {
//         const blogs = [
//             {
//                 _id: '5a422aa71b54a676234d17f8',
//                 title: 'Go To Statement Considered Harmful',
//                 author: 'Edsger W. Dijkstra',
//                 url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//                 likes: 5,
//                 __v: 0
//             }
//         ]
//         const result = helper.totalLikes(blogs)
//         expect(result).toBe(5)
//     })

//     test('a bigger list with many blogs', () => {
// const blogs = [
//     {
//         _id: "5a422a851b54a676234d17f7",
//         title: "React patterns",
//         author: "Michael Chan",
//         url: "https://reactpatterns.com/",
//         likes: 7,
//         __v: 0
//     },
//     {
//         _id: "5a422aa71b54a676234d17f8",
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//         __v: 0
//     },
//     {
//         _id: "5a422b3a1b54a676234d17f9",
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//         likes: 12,
//         __v: 0
//     },
//     {
//         _id: "5a422b891b54a676234d17fa",
//         title: "First class tests",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//         likes: 10,
//         __v: 0
//     },
//     {
//         _id: "5a422ba71b54a676234d17fb",
//         title: "TDD harms architecture",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//         likes: 0,
//         __v: 0
//     },
//     {
//         _id: "5a422bc61b54a676234d17fc",
//         title: "Type wars",
//         author: "Robert C. Martin",
//         url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//         likes: 2,
//         __v: 0
//     }
// ]
//         const result = helper.totalLikes(blogs)
//         expect(result).toBe(36)
//     })


// })

// describe('most liked blogs', () => {
//     test('no blogs', () => {
//         const blog = []
//         const result = helper.favoriteBlog(blog)
//         expect(result).toBe('No blog has been added')
//     })

//     test('one blog', () => {
//         const blog = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             }
//         ]
//         const result = helper.favoriteBlog(blog)
//         expect(result).toEqual({
//             _id: "5a422a851b54a676234d17f7",
//             title: "React patterns",
//             author: "Michael Chan",
//             url: "https://reactpatterns.com/",
//             likes: 7,
//             __v: 0
//         })
//     })

//     test('many blogs', () => {
//         const blogs = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             },
//             {
//                 _id: "5a422aa71b54a676234d17f8",
//                 title: "Go To Statement Considered Harmful",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//                 likes: 5,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b3a1b54a676234d17f9",
//                 title: "Canonical string reduction",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//                 likes: 12,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b891b54a676234d17fa",
//                 title: "First class tests",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//                 likes: 10,
//                 __v: 0
//             },
//             {
//                 _id: "5a422ba71b54a676234d17fb",
//                 title: "TDD harms architecture",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//                 likes: 0,
//                 __v: 0
//             },
//             {
//                 _id: "5a422bc61b54a676234d17fc",
//                 title: "Type wars",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//                 likes: 2,
//                 __v: 0
//             }
//         ]
//         const result = helper.favoriteBlog(blogs)
//         expect(result).toEqual({
//             _id: "5a422b3a1b54a676234d17f9",
//             title: "Canonical string reduction",
//             author: "Edsger W. Dijkstra",
//             url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//             likes: 12,
//             __v: 0
//         })
//     })
// })

// describe('most blogs', () => {
//     test('no blogs', () => {
//         const blog = []
//         const result = helper.mostBlogs(blog)
//         expect(result).toBe('No blog has been added')
//     })

//     test('one blog', () => {
//         const blog = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             }
//         ]
//         const result = helper.mostBlogs(blog)
//         expect(result).toEqual({
//             author: "Michael Chan",
//             blogs: 1,


//         })
//     })

//     test('many blogs siniiiiiii', () => {
//         const blogs = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             },
//             {
//                 _id: "5a422aa71b54a676234d17f8",
//                 title: "Go To Statement Considered Harmful",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//                 likes: 5,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b3a1b54a676234d17f9",
//                 title: "Canonical string reduction",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//                 likes: 12,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b891b54a676234d17fa",
//                 title: "First class tests",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//                 likes: 10,
//                 __v: 0
//             },
//             {
//                 _id: "5a422ba71b54a676234d17fb",
//                 title: "TDD harms architecture",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//                 likes: 0,
//                 __v: 0
//             },
//             {
//                 _id: "5a422bc61b54a676234d17fc",
//                 title: "Type wars",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//                 likes: 2,
//                 __v: 0
//             }
//         ]
//         const result = helper.mostBlogs(blogs)
//         expect(result).toEqual({
//             author: "Robert C. Martin",
//             blogs: 3
//         })
//     })
// })

// describe('most liked author', () => {
//     test('no blogs', () => {
//         const blog = []
//         const result = helper.mostLikes(blog)
//         expect(result).toBe('No blog has been added')
//     })

//     test('one blog', () => {
//         const blog = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             }
//         ]
//         const result = helper.mostLikes(blog)
//         expect(result).toEqual({
//             author: "Michael Chan",
//             likes: 7,


//         })
//     })

//     test('many blogs siniiiiiii', () => {
//         const blogs = [
//             {
//                 _id: "5a422a851b54a676234d17f7",
//                 title: "React patterns",
//                 author: "Michael Chan",
//                 url: "https://reactpatterns.com/",
//                 likes: 7,
//                 __v: 0
//             },
//             {
//                 _id: "5a422aa71b54a676234d17f8",
//                 title: "Go To Statement Considered Harmful",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//                 likes: 5,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b3a1b54a676234d17f9",
//                 title: "Canonical string reduction",
//                 author: "Edsger W. Dijkstra",
//                 url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//                 likes: 12,
//                 __v: 0
//             },
//             {
//                 _id: "5a422b891b54a676234d17fa",
//                 title: "First class tests",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//                 likes: 10,
//                 __v: 0
//             },
//             {
//                 _id: "5a422ba71b54a676234d17fb",
//                 title: "TDD harms architecture",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//                 likes: 0,
//                 __v: 0
//             },
//             {
//                 _id: "5a422bc61b54a676234d17fc",
//                 title: "Type wars",
//                 author: "Robert C. Martin",
//                 url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//                 likes: 2,
//                 __v: 0
//             }
//         ]
//         const result = helper.mostLikes(blogs)
//         expect(result).toEqual({
//             author: "Edsger W. Dijkstra",
//             likes: 17
//         })
//     })
// })



// beforeEach(async () => {
//     await Blog.deleteMany({})

//     const blogs = helper.initialBlogList.map(blog => new Blog(blog))

//     const promiseArr = blogs.map(blog => blog.save())

//     await Promise.all(promiseArr)



// }, 100000)

// test('returned blog list in correct format', async () => {
//     console.log('entered test');
//     const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)


//     const result = await helper.blogsInDb()


//     expect(result).toHaveLength(2)



// }, 100000)

// test('id is defined', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body[0].id).toBeDefined()
// })

// test('id is not defined', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body[0]._id).not.toBeDefined()
// })

// test('http post works', async () => {


//     const newBlog = {
//         title: 'DopeSick',
//         author: 'Third Reich',
//         url: 'http://blm.com',
//         likes: 80000000000,
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const result = await helper.blogsInDb()
//     const titles = result.map(res => res.title)
//     expect(titles).toHaveLength(helper.initialBlogList.length + 1)
//     expect(titles).toContain('DopeSick')

// })

// test('if no likes is given', async () => {
//     const newBlog = {
//         title: 'DopeSick',
//         author: 'Third Reich',
//         url: 'http://blm.com',

//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const result = await helper.blogsInDb()
//     const latestBlog = result.find(res => res.title === 'DopeSick')
//     expect(latestBlog.likes).toBe(0)
// })


// test('if no title is given', async () => {
//     const newBlog = {

//         author: 'Third Reich',
//         url: 'http://blm.com',

//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
//         .expect('Bad Request')


// })

// test('changing the likes with put request', async () => {
//     const initialBlogList = await helper.blogsInDb()
//     //console.log(initialBlogList, 'initialBlogList')
//     const updatedList = { ...initialBlogList[0], likes: 3 } //destructure to lose reference point
//     //console.log(updatedList, 'updatedList')
//     await api
//         .put(`/api/blogs/${updatedList.id}`)
//         .send(updatedList)
//         .expect(200)
// })

// test('changing the likes with delete request', async () => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogToDelete = blogsAtStart[0]
//     console.log(blogToDelete.id, 'blogToDelete')



//     await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .expect(204)
// })

// afterAll(async () => {
//     mongoose.connection.close()
// })

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    }, 10000000)
    test('token verification success', () => {
        const user = User.findOne({ username: 'root' })
        console.log(user, 'user in test')
        api
            .post('/api/login')
            .set('Authorization',)
    })

    // test('creation succeeds with a fresh username', async () => {
    //     const usersAtStart = await helper.usersInDb()
    //     console.log(usersAtStart, 'usersAtStart');

    //     const newUser = {
    //         username: 'mluukkai',
    //         name: 'Matti Luukkainen',
    //         password: 'salainen',
    //     }

    //     await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const usersAtEnd = await helper.usersInDb()
    //     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    //     const usernames = usersAtEnd.map(user => user.username)
    //     expect(usernames).toContain(newUser.username)
    // })

    // test('creation fails with proper statuscode and message if username already taken', async () => {
    //     const usersAtStart = helper.usersInDb()
    //     const newUser = {
    //         username: 'root',
    //         name: 'Superuser',
    //         password: 'salaa'

    //     }

    //     const result = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)

    //     expect(result.body.error).toContain('expected `username` to be unique')

    //     const usersAtEnd = helper.usersInDb()
    //     expect(usersAtEnd).toEqual(usersAtStart)
    // })
})