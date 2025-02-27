const express = require('express')
const dotenv = require('dotenv')
const bookController = require('./book/book.controller')
dotenv.config();
const port = process.env.PORT
const app = express();


app.use(express.json())
app.listen(port, () => {
    console.info("Server Started at port " + port)
})


app.use('/books', bookController);
