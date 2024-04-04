import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// health route
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "UP" })
})



const port = process.env.PORT || 4001;
const service_name = process.env.SERVICE_NAME || 'User service'
app.listen(port, () => console.log(`${service_name} is running on http://localhost:${port}`));