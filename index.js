const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./router/adminRouter');
const userRouter = require('./router/userRouter')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const dotenv = require('dotenv')
const myApp = express();

dotenv.config()

myApp.use(bodyParser.json());
myApp.use(express.json());
myApp.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MONGO IS CONNECTED')
    }).catch((err) => {
        console.log(err)
    });
myApp.use(cors())
myApp.use('/home', (req, res) => {
    res.send('<h1> server is running')
})

myApp.use('/admin', adminRouter);
myApp.use('/user', userRouter)
myApp.use('/uploads', express.static(path.join(__dirname, 'uploads')));
myApp.listen(5000);
console.log('server is running in 5000')