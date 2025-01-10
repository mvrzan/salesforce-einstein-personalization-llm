import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/route-collection.js";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  console.log(`Notification server listening on port: ${port}`);
});
