import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import path from 'path';
const __dirname = path.resolve();
import dotenv from 'dotenv';
const app = express();

//Environment variables
dotenv.config();

//database connection
mongoose.Promise = global.Promise;
//Database Connection
mongoose.connect(
    process.env.DB_CONNECTON,
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
    )
    .then(db =>  console.log('Database Connected'))
    .catch(error => console.log(error));

//body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

import userRouter from './routes/user.js';
app.use('/api/users', userRouter);

import postRouter from './routes/posts.js';
app.use('/api/posts', postRouter);

app.get('/', (req, res) => {
    res.render('index')
})

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});