const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");


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
const devBundle = require("./devBundle");

const Template = require("./../template");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before production
devBundle.compile(app);


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

module.exports = app;
