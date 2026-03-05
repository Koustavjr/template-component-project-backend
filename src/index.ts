import express from "express";
import nodeCron from "node-cron";
import axios from "axios";
import componentRoute from "./routes/component.route.js";
import aiRoute from "./routes/ai.route.js";
import dotenv from "dotenv";
import morgan from "morgan";
import { pid } from "process";
import cluster from "cluster";


dotenv.config();

const app = express();

app.use(express.json())


app.use(morgan("combined"));

app.use("/registry/ai", aiRoute);
app.use("/registry/r", componentRoute);

app.get("/health", (req, res) => {
    res.send("OK from " + pid);
});


cluster.schedulingPolicy = cluster.SCHED_RR;

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port " + process.env.PORT || 5000);
});