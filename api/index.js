import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/database.js";
// imports the database connection and success / failure messages

import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js";

dotenv.config();
const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cors({credentials: true}));

// routers
app.use("/api/user", UserRouter);
app.use("/api/blog", BlogRouter);

app.get("/", (req, res) => {
    res.send("home page")
});

app.listen(port, () => {
    console.log("app running on port", port);
})