const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require("./config/db.config");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require('cookie-parser');
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser({}));

app.use("/api/v1/auth",authRoute);

app.use(errorMiddleware)

const port = process.env.PORT;
db();
app.listen(port, () => {
    console.log(`Server is running on ${port} port...`);
})

