import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";


// server side rendering module
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from "react-router-dom"
import MainRouter from "../client/MainRouter"



import {
  ThemeProvider,
  createMuiTheme,
  ServerStyleSheets
} from "@material-ui/core/styles";
import { indigo, pink } from "@material-ui/core/colors";
 

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

const theme = createMuiTheme({
  palette: {
      primary: {
          light: '#757de8',
          main: '#3f51b5',
          dark: '#002984',
          contrastText: '#fff',
      },
      secondary: {
          light: '#ff79b0',
          main: '#ff4081',
          dark: '#c60055',
          contrastText: '#000',
      },
      openTitle: indigo['400'],
      protectedTitle: pink['400'],
      type: 'light'
  }
})

app.get('*', (req, res) => {
const sheets = new ServerStyleSheets()
const context = {}
const markup = ReactDOMServer.renderToString(
  sheets.collect(
    <StaticRouter location={req.url} context={context}> 
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </StaticRouter>
  )
)

if (context.url) {
  return res.redirect(303, context.url)
}

const css = sheets.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }))
}) 

//catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

export default app;
