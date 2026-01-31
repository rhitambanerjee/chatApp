import amqp from 'amqplib';

let channel : amqp.Channel;

export const connectRabbitMQ = async () =>{
    try{
        const connection = await amqp.connect({
            protocol:"amqp",
            hostname:process.env.RabbitMQ_HOST,
            port:5672,
            username:process.env.RabbitMQ_USERNAME,
            password:process.env.RabbitMQ_PASSWORD
        })

        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ successful");
    }
    catch(error){
        console.log(error);
    }
}

export const getChannel= (): amqp.Channel =>{
    if(!channel){
        throw new Error("Channel not initialised yet");
    }
    return channel;
};