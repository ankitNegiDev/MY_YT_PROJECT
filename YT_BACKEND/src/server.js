// creating a basic server..
import express from 'express';
import { PORT } from './config/serverConfig.js';
import { connectDB } from './config/dbConfig.js';
import apiRouter from './routes/apiRoutes.js';
import cors from 'cors';

const app=express();

// inbuilt middleware...
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); 

// Allowing requests from frontend ... always write it before ur routes..
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api',apiRouter);


app.listen(PORT,function callback(){
    console.log("server is up on port ",PORT);
    connectDB();
});





app.get('/ping',function callback(req,res){
    console.log("ping to the server sucessfully\n");
    return res.send("<h1>hii ping sucessfully</h1>");
});

