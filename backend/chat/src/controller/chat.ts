import { TryCatch } from "../config/TryCatch.js";
import type { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { Chat } from "../models/chat.js";

export const createNewChat = TryCatch(async (req:AuthenticatedRequest,res)=>{
    const userId = req.user?._id;
    const {otherUserId} = req.body;
    if(!otherUserId){
        return res.status(400).json({message:"otherUserId is required"});  
    }
    const existingChat = await Chat.findOne({
        users: { $all: [userId, otherUserId],$size:2 }
    }).sort({updatedAt:-1});

    if(existingChat){
        return res.status(200).json({message:"Chat already exists",chat:existingChat?._id});
    }
    const newChat = new Chat({
        users:[userId,otherUserId],
    });
    return res.status(201).json({
        message:"Chat created successfully",
        chat:newChat._id
    });
})