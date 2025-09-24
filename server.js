import { routes } from "./routes/index.js";
import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
 
app.listen(PORT, () => {
  console.log('Web Server is listening at http://127.0.0.1:' + PORT);
});