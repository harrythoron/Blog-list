const Blog = require('../models/blogModel')

const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = arrObj => arrObj.reduce((acc, curr) => {
    return curr.likes + acc
}, 0);

const favoriteBlog = list => {

    if (!!list.length) {
        const mostLikes = Math.max(...list.map(curr => curr.likes))
        const favBlog = list.find(curr => curr.likes === mostLikes)
        return favBlog
    } else {
        return 'No blog has been added'
    }

}

const mostBlogs = list => {

    if (!!list.length) {
        const authors = [...list.map(curr => curr.author)].sort().reverse()
        console.log(authors)
        let currString = authors[0]
        let bestString = authors[0]
        let maxCount = 1
        let currCount = 1
        for (let i = 1; i < authors.length; i++) {

            if (currString === authors[i]) {

                currCount++
            } else {
                if (maxCount < currCount) {
                    maxCount = currCount;
                    bestString = currString
                }
                currString = authors[i]
                currCount = 1;
            }
        }


        if (currCount > maxCount) {

            maxCount = currCount;
            bestString = currString
        }
        return {
            author: bestString,
            blogs: maxCount
        }
    } else {
        return 'No blog has been added'
    }
}

const mostLikes = list => {
    if (!!list.length) {
        const topAuthor = _.chain(list)
            .groupBy('author')
            .map((group, author) => {

                return {
                    author: author,
                    likes: group.reduce((acc, curr) => {
                        return acc += curr.likes
                    }, 0)
                }
            })
            .maxBy(object => object.likes)
            .value()



        return topAuthor
    } else {
        return 'No blog has been added'
    }
}

const initialBlogList = [
    {

        title: 'Me Before You',
        author: 'Jojo Moyes',
        url: 'http://some.com',
        likes: 500,

    },
    {

        title: 'Nope',
        author: 'KeyPeele',
        url: 'http://dope.com',
        likes: 5000,

    }
]

const blogsInDb = async () => {
    const result = await Blog.find({})

    return result.map(res => res.toJSON())
}




module.exports = { initialBlogList, blogsInDb }