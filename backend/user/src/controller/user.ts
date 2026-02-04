import express from "express";
import { TryCatch } from "../config/TryCatch.js";
import { redisClient } from "../index.js";
import { publishToQueue } from "../config/publish.js";
import { User } from "../model/User.js";
import { generateToken } from "../config/generateToken.js";

export const loginUser=TryCatch(async(req,res)=>{
    const {email}=req.body;
    const rateLimitKey=`login-try-${email}`;
    const rateLimit=await redisClient.get(rateLimitKey);
    if(rateLimit){
        return res.status(429).json({message:"Too many login attempts. Please try again later."});
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpKey=`otp:${email}`;
    await redisClient.setEx(otpKey,300,otp);
    await redisClient.setEx(rateLimitKey,60,"1");
    const message ={
        to: email,
        subject:"Your OTP Code",
        body:`Your OTP code is ${otp}. It is valid for 5 minutes.`,
    }
    await publishToQueue("send-otp",message);
    res.status(200).json({message:"OTP sent to your email."});
    
});

export const verifyUser=TryCatch(async(req,res)=>{
    const {email,otp:enteredOtp}=req.body;
    if(!email || !enteredOtp){
        return res.status(400).json({message:"Email and OTP are required."});
    }
    const otpKey=`otp:${email}`
    const storedOtp=await redisClient.get(otpKey);
    if(!storedOtp || storedOtp!==enteredOtp){
        return res.status(400).json({message:"OTP has expired or is invalid."});
    }
    await redisClient.del(otpKey);
    let user = await User.findOne({email});
    if(!user){
        const name=email.slice(0,8);
        user = await User.create({name,email});
    }
    const token = generateToken(user);
    res.json({
        message:"user verified successfully",
        user,
        token
    });
});