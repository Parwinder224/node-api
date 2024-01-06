require('dotenv').config()
const express = require('express');
// const mongoose = require('./DB/productDb');
// const mongooseUser =require('./DB/userDb')
const http = require('http');
const productRoute =require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();
var cors = require('cors');
User = require('./models/userModal')

const userRoute = require('./routes/userRoute');
bodyParser = require('body-parser'),
jsonwebtoken = require("jsonwebtoken");
// const PORT =process.env.PORT || 3000;
var corsOptions = {
    origin: 'http://localhost:4200',
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  console.log("cors option",)
// const MONGO_URL =process.env.MONGO_URL;
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/products',productRoute)
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });
app.use('/user',userRoute);
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});



// mongoose.set('strictQuery', false);

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
// mongoose
//     .connect(MONGO_URL)
//     .then(() => {
//         console.log("connected to mongodb")
       
//     }).catch((error) => {
//         console.log(error)
//     })
