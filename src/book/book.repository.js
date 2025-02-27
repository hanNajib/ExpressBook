const { prisma } = require('../db')

const findBooks = async() => {
    const books = await prisma.book.findMany();
    return books
}

const findBookById = async(id) => {
    const book = await prisma.book.findUnique({
        where: {
            id
        }
    })
    return book
}

const addBook = async(bookData) => {
    const book = await prisma.book.create({
        data: {
            author: bookData.author,
            title: bookData.title,
            genre: bookData.genre,
        }
    })
    return book
} 

const deleteBookById = async(id) => {
    const book = await prisma.book.delete({
        where: {
            id
        }
    })
}

const editBook = async(id, bookData) => {
    const book = await prisma.book.update({
        where: {
            id
        },
        data: {
            author: bookData.author,
            genre: bookData.genre,
            title: bookData.title
        }
    })

    return book
}

module.exports = {
    findBooks,
    findBookById,
    addBook,
    deleteBookById,
    editBook
}