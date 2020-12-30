import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";


// server side rendering module
/* const React = require("react");
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require("react-router-dom/");
const MainRouter  = require("../client/MainRouter");

const { JssProvider } = require("react-jss");
//const { SheetsRegistry } = require('react-jss')
const {
  ThemeProvider,
  createMuiTheme,
  ServerStyleSheets
} = require("@material-ui/core/styles");
const { indigo, pink } = require("@material-ui/core/colors");
 */

//comment out before production
import compile from "./devBundle";

import Template from "./../template";
import userRoutes from "./routes/user.routes";
import  authRoutes from "./routes/auth.routes";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before production
compile(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/", userRoutes);
app.use("/", authRoutes);



 app.get('/', (req, res) => {
    res.status(200).send(Template())
}) 

//catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

export default app;
