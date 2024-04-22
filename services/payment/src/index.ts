
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";
import payment from "./routes/paymentRoutes";

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

// health route
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "Server up" })
})

// Routes
app.use(payment);

// 404 error handler
app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
});


// global error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


// Start the server
const port = process.env.PORT || 4007;
const service_name = process.env.SERVICE_NAME || 'Payment service'
app.listen(port, () => console.log(`${service_name} is running on http://localhost:${port}`));