import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { createClient } from 'redis';
dotenv.config();
const app = express();
connectDB();
const port = process.env.PORT;
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}
export const redisClient = createClient({
    url: redisUrl,
});
redisClient.connect().then(() => {
    console.log("Connected to Redis");
}).catch((err) => {
    console.error("Failed to connect to Redis:", err);
});
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});
app.listen(port, () => {
    console.log(`This app is running on port ${port}`);
});
//# sourceMappingURL=index.js.map