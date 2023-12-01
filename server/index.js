
import express from "express"
import { PORT, mongodbUri  } from "./config.js"
import mongoose, { mongo } from "mongoose"
import { Book } from "./models/bookModel.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors()) // default. allows everything. cors(*)
app.use((req, res, next) => {
    res.header("Allow-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowHeaders: ["Content-Type"],
// }))

app.use("/books", bookRoutes)

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("the MERN stack tutorial")
})

mongoose
.connect(mongodbUri)
.then(() => {
    console.log("App connected to database")
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
    })
})
.catch((err) => {
        console.log(err)
})