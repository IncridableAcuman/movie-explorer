const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require("./config/db.config");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser({}))

const port = process.env.PORT;
db();
app.listen(port,()=>{
    console.log(`Server is running on ${port} port...`);
})

