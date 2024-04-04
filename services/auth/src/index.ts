
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import morgan from 'morgan';


dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'))

// health route
app.get('/health', (req, res) => {
    const response = {
        status: 'UP'
    }
    res.status(200).json(response);
});

const port = process.env.PORT || 4002;
const service_name = process.env.SERVICE_NAME || 'Auth service';

app.listen(port, () => console.log(`${service_name} running on http://localhost:${port}`));
