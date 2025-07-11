import express from 'express';
import db from './db/db.js';
import userRoute from './routes/user.route.js'
import ratingRoute from './routes/rating.route.js'
import infoRoute from './routes/info.route.js'
import adminRoute from './routes/admin.route.js'
import storeRoute from './routes/store.route.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'

const app=express();
app.use(express.json())
dotenv.config();

app.get('/',  (req,res)=>{

    db.query('SELECT * FROM actor', (err,results)=>{
        if(err){
            return res.status(500).send('Database error');
        }
        res.json(results);
    })
})
app.use(cors({
    origin:'http://localhost:5173',

    credentials:true
}))

app.listen(3000, ()=>{
    console.log('Server is running on port 3000.')
})
app.use(cookieParser());

app.use('/api/v1/users/', userRoute);
app.use('/api/v1/submitrating', ratingRoute);
app.use('/api/v1/get',infoRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/store',storeRoute);