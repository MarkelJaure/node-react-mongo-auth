import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import httpError from "http-errors";
import routes from "./routes";
import errorHandler from "./middleware/ErrorHandler";
var config = require('../../common/api-server/src/config/app');

const app = express();

const morganFormat = process.env.isDev ? "dev" : "combined";
app.use(morgan(morganFormat));

config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", ...routes);

app.use((req, res, next) => {
  next(httpError(404));
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.HOST}:${process.env.PORT}`);
});
