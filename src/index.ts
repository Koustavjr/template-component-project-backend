import express from "express";
import nodeCron from "node-cron";
import axios from "axios";
import componentRoute from "./routes/component.route.js";
import aiRoute from "./routes/ai.route.js";
import dotenv from "dotenv";
import morgan from "morgan";
import { pid } from "process";
import cluster from "cluster";
import rateLimit from "express-rate-limit";

dotenv.config();

export const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: () => {
        return {
            message: "Too many requests from this IP, please try again after 15 minutes",
            status: 429
        }
    },
    skip: (req) => req.url === '/health'
});

app.use(express.json())
app.use(limiter);

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