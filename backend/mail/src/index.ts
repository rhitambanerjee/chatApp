import express from 'express';
import dotenv from 'dotenv';
import { otpSendingConsumer } from './consumer.js';

dotenv.config();

otpSendingConsumer();

const app=express();


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})