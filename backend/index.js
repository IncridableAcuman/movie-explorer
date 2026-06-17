const express = require('express');
const cors = require('cors');
require('dotenv').configDotenv();


const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));