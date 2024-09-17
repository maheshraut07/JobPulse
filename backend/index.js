import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connnectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'

dotenv.config({})

/*

The line dotenv.config({}) is used to load environment variables from a .env file into your Node.js application's process.env. Here's a breakdown of its purpose:

dotenv: This is a library that reads a .env file and loads its contents as environment variables.
.config(): This method initializes dotenv and tells it to read from the .env file and parse its contents.
{}: This represents an optional configuration object, but leaving it empty uses the default configuration.

*/

const app = express()

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

/*
express.json() helps in parsing JSON payloads from the client.
express.urlencoded({ extended: true }) helps in parsing URL-encoded form data.
cookieParser() helps in extracting and parsing cookies sent by the client.
*/

const corsOptions = {
    origin:'http//localhost:5173',
    Credentials:true
}

/*
If your frontend and backend are hosted on different origins (e.g., different ports during development), the browser would block requests from your frontend to your backend 
due to the Same-Origin Policy. By setting up CORS and allowing requests from http://localhost:5173, you're explicitly telling the browser to allow these
cross-origin requests and send cookies/credentials when needed.
*/

app.use(cors(corsOptions))
const PORT = process.env.PORT || 3000;

// app.get("/home",(req,res) =>{
//     return res.status(200).json({
//         message:"I am coming from the backend",
//         success:true
//     })
// })




// all apis 

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

/*
above syntax is used for the following implementation 

http://localhost:8000/api/v1/user/register   (register is a part or userRoute)
http://localhost:8000/api/v1/user/login
http://localhost:8000/api/v1/user/logout
http://localhost:8000/api/v1/user/profile/update

*/



app.listen(PORT,() =>{
    console.log(`Server is running on the port ${PORT}`)
    connnectDB()
})
