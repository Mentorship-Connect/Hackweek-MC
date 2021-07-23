import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors());

app.use(userRoutes)

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server listening at http://localhost:${port}`))