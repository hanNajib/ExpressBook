const { findBooks, findBookById, addBook, deleteBookById, editBook } = require("./book.repository")

const getBooks = async() => {
    const books = await findBooks();
    return books
}

const getBookById = async(id) => {
    const book = await findBookById(id);
    if(!book) {
        throw Error('Book Not Found')
    }
    return book
}

const postBook = async(bookData) => {
    const { author, title, genre } = bookData
    if(author && title && genre) {
        const book = await addBook(bookData)
        return book
    } else {
        throw Error('Some fields missing')
    }
}

const deleteBook = async(id) => {
    await getBookById(id)

    await deleteBookById(id)
}

const editBookById = async(id, bookData) => {
    await getBookById(id)

    const book = await editBook(id, bookData)
    return book
}

module.exports = {
    getBooks,
    getBookById,
    postBook,
    deleteBook,
    editBookById
}