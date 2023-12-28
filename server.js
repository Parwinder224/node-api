require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const productRoute =require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();
var cors = require('cors')
// const PORT =process.env.PORT || 3000;
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const MONGO_URL =process.env.MONGO_URL;
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/products',productRoute)

mongoose.set('strictQuery', false);

// app.listen(3000, () => {
//     console.log('server is running on 3000 port')
// })



app.get('/', (req, res) => {
    res.send("hello node api")
    // console.log(process.env.Node_ENV)
    // throw new Error('fake error')
})

app.get('/blog', (req, res) => {
    res.end("hello blog")
})

app.use(errorMiddleware)

// http.createServer((req,res)=>{
//     res.end('Hellow world')
// }).listen(3000, );

const server = http.createServer(app);
const port = 3000;
server.listen(port);

// console.log(process)
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("connected to mongodb")
       
    }).catch((error) => {
        console.log(error)
    })
