import express from "express";
import nodeCron from "node-cron";
import axios from "axios";
import componentRoute from "./routes/component.route.js";
import aiRoute from "./routes/ai.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json())

app.use("/registry/ai", aiRoute);
app.use("/registry/r", componentRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});




nodeCron.schedule("* * */15 * * *", () => {
    console.log("Running every 15 minutes");
    axios.get("https://jsonplaceholder.typicode.com/posts");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + process.env.PORT || 5000);
});