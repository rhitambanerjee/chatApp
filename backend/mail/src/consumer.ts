import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const otpSendingConsumer = async ()=>{
    try {
        const connection = await amqp.connect({
            protocol:"amqp",
            hostname:process.env.RabbitMQ_HOST,
            port:5672,
            username:process.env.RabbitMQ_USERNAME,
            password:process.env.RabbitMQ_PASSWORD
        });
        const channel= await connection.createChannel();
        const queueName="send-otp";
        await channel.assertQueue(queueName,{durable:true});
        console.log("Mail service consumer listening for otp emails");
        channel.consume(queueName,async(msg)=>{
            if(msg){
                try {
                    const {to,subject,body} = JSON.parse(msg.content.toString());
                    const transporter = nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:465,
                        secure:true,
                        auth:{
                            user:process.env.USER,
                            pass:process.env.PASSWORD,
                        },
                    });
                    await transporter.sendMail({
                        from:"ChatApp",
                        to,
                        subject,
                        text:body
                    });
                    console.log(`OTP has been sent successfully to ${to}`);
                    channel.ack(msg);
                } catch (error) {
                    console.log("Failed to send OTP",error);
                }
            }
        });
    } catch (error) {
        console.log('Failed to start rabbitmq consumer',error);
    }
}
