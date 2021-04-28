import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))


app.use("/api/v1/users", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello Wonderful Person 😃😃")
})

const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.77zrg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("database connected and running");
}).catch(err => {
    console.log(err);
})


app.listen(process.env.PORT, () => {
    console.log("APP running at port " + process.env.PORT);
})