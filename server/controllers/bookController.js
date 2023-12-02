import { Book } from "../models/bookModel.js"


const saveBook = async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)

        return res.status(201).send(book)

    } catch(err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
}

const getBooks = async (req, res) => {
    try{
        const books = await Book.find({})
        res.status(200).json({
            count: books.length,
            data: books
        })
    } catch(err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}

const getBook = async (req, res) => {
    try{
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch(err) {
        console.log(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}

const updateBook = async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields"
            })
        }

        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result) {
            return res.status(404).json({ 
                message: "Book not found" 
            })
        }
        res.status(200).send({
            message: "Book updated successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({ 
            message: err.message
        })
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            res.status(404).json({
                message: "Book not found"
            })
        }
        res.status(200).send({
            message: "Book deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: err.message 
        })        
    }
}

// const userId = async (req, res, next, id) => {
//     console.log("Is this called")
//     try{
//         const user = await Book.findById(id)
//         if(!user) {
//             return res.status(400).json({
//                 error: "User not found"
//             })
//         }
//     } catch {
//         return res.status(400).json({
//             error: "Could not retrieve user"
//         })
//     }
// } 

export default { saveBook, getBooks, getBook, updateBook, deleteBook }
