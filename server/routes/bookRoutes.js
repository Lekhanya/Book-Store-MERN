import express from "express"
import { Book } from "../models/bookModel.js"
import bookCtrl from "../controllers/bookController.js"


// import { /*saveBook, getBooks, getBook, */updateBook, /*deleteBook*/ } from "../controllers/bookController.js" 

// import { saveBook } from "../controllers/bookController.js"
// import getBooks from "../controllers/bookController.js"
// import getBook from "../controllers/bookController.js"
// import updateBook from "../controllers/bookController.js"
// import deleteBook from "../controllers/bookController.js"

const router = express.Router()


// Route to save a book
router.route('/')
    .post(bookCtrl.saveBook)
    .get(bookCtrl.getBooks)

router.route('/:id')
    .get(bookCtrl.getBook)
    .put(bookCtrl.updateBook)
    .delete(bookCtrl.deleteBook)

// router.param('id', bookCtrl.userId)


export default router