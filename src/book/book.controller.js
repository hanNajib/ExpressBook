const express = require('express')
const { prisma } = require('../db');
const { getBooks, getBookById, postBook, deleteBook, editBookById } = require('./book.services');
const { editBook } = require('./book.repository');
const router = express.Router();

router.get('/', async(req, res) => {
    const books = await getBooks();
    res.send({
        message: 'Books successfully retrieved',
        data: books
    })
})

router.get('/:id', async(req, res) => {
    try {
        const bookid  = parseInt(req.params.id)
        const book = await getBookById(bookid)
        res.send({
            message: 'Book successfully retrieved',
            data: book
        })
    } catch(e) {
        res.status(400).send({
            'message': e.message
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const bookData = req.body

        const book = await postBook(bookData)
        res.status(201).send({
            message: 'Book created successfully',
            data: book
        })
    } catch(e) {
        res.status(400).send({
            message: e.message
        })
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        await deleteBook(bookId)
        res.send({
            'message': 'Book deleted successfully'
        })
    } catch(e) {
        res.status(400).send({
            'message': e.message
        })
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        const bookData = req.body
    
        const book = await editBookById(bookId, bookData)
        res.send({
            'message': 'Book edited successfully',
            'data': book
        })
    } catch(e) {
        res.status(400).send({
            'message': e.message
        })
    }
})

router.put('/:id', async(req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        const bookData = req.body
        const { author, title, genre } = bookData

        if(!(author && title && genre)) {
            return res.status(400).send({
                'message': 'Some fields missing'
            })
        }

        const book = await editBookById(bookId, bookData)

        res.send({
            'message': 'Edit book successfully',
            'data': book
        })
    } catch(e) {
        res.status(400).send({
            'message': e.message
        })
    }
})

module.exports = router
