import { routes } from "./routes/index.js";
import express from "express";

const app = express();

app.use('/', routes);

const PORT = 3000;
 
app.listen(PORT, () => {
  console.log('Web Server is listening at http://127.0.0.1:' + (process.env.PORT || 3000));
});