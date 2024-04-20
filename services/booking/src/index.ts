
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'))



// health route
app.get('/health', (_req, res) => {
    const response = { status: 'Server Up' }
    res.status(200).json(response);
});

// Routes



// 404 error handler
app.use((_req, res) => {
    res.status(404).json({ message: "Not Found" });
});


// global error handler
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 4005;
const service_name = process.env.SERVICE_NAME || 'Hotel service';

app.listen(port, () => console.log(`${service_name} running on http://localhost:${port}`));
