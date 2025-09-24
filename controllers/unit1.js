import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const home = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/home.html'));};
const about = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/about.html'));};
const products = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/products.html'));};

const wife = (req,res) => {res.send("Maddie Smith");};

export default {home,wife, about,products};