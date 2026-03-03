import express from "express";
import nodeCron from "node-cron";
import axios from "axios";
import componentRoute from "./routes/component.route.js";
const app = express();
app.use(express.json());
app.use("/registry", componentRoute);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
nodeCron.schedule("* * */15 * * *", () => {
    console.log("Running every 15 minutes");
    axios.get("https://jsonplaceholder.typicode.com/posts");
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
//# sourceMappingURL=index.js.map