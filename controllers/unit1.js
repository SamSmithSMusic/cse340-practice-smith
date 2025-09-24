import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// const home = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/home.html'));};
// const about = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/about.html'));};
// const products = (req, res) => {res.sendFile(path.join(__dirname, '../src/views/products.html'));};

const home = (req, res) => {const title = 'Welcome Home' ; res.render('home',{title});};
const about = (req, res) => {const title =  'About Me'; res.render('about',{title});};
const products = (req, res) => {const title = 'Products' ; res.render('products',{title});};

const wife = (req,res) => {res.send("Maddie Smith");};

export default {home,wife, about,products};