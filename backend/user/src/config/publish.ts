import { getChannel } from "./rabbitmq.js";

export const publishToQueue = async(queueName:string,message:unknown):Promise<void>=>{
    let channel=getChannel();
    await channel.assertQueue(queueName,{durable:true})
    channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );
};