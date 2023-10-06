const supertest = require('supertest')
const mongoose = require('mongoose')
//const { describe, beforeEach } = require('node:test')
const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogModel')

mongoose.set("bufferTimeoutMS", 30000)

// test('dummy return one', () => {
//     const blogs = []
//     const result = listHelper.dummy(blogs)
//     expect(result).toBe(1)
// })

// describe('total likes', () => {
//     test('of empty list is zero', () => {
//         const blogs = []
//         const result = listHelper.totalLikes(blogs)
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
//         const result = listHelper.totalLikes(blogs)
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
//         const result = listHelper.totalLikes(blogs)
//         expect(result).toBe(36)
//     })


// })

// describe('most liked blogs', () => {
//     test('no blogs', () => {
//         const blog = []
//         const result = listHelper.favoriteBlog(blog)
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
//         const result = listHelper.favoriteBlog(blog)
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
//         const result = listHelper.favoriteBlog(blogs)
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
//         const result = listHelper.mostBlogs(blog)
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
//         const result = listHelper.mostBlogs(blog)
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
//         const result = listHelper.mostBlogs(blogs)
//         expect(result).toEqual({
//             author: "Robert C. Martin",
//             blogs: 3
//         })
//     })
// })

// describe('most liked author', () => {
//     test('no blogs', () => {
//         const blog = []
//         const result = listHelper.mostLikes(blog)
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
//         const result = listHelper.mostLikes(blog)
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
//         const result = listHelper.mostLikes(blogs)
//         expect(result).toEqual({
//             author: "Edsger W. Dijkstra",
//             likes: 17
//         })
//     })
// })



beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = listHelper.initialBlogList.map(blog => new Blog(blog))

    const promiseArr = blogs.map(blog => blog.save())

    await Promise.all(promiseArr)



}, 100000)

// test('returned blog list in correct format', async () => {
//     console.log('entered test');
//     const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)


//     const result = await listHelper.blogsInDb()


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

test('http post works', async () => {


    const newBlog = {
        title: 'DopeSick',
        author: 'Third Reich',
        url: 'http://blm.com',
        likes: 80000000000,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await listHelper.blogsInDb()
    const titles = result.map(res => res.title)
    expect(titles).toHaveLength(listHelper.initialBlogList.length + 1)
    expect(titles).toContain('DopeSick')

})

afterAll(async () => {
    mongoose.connection.close()
})