import express from "express";
import controler from "../controllers/unit1.js";

export const routes = express.Router();

routes.get('/', controler.home);
routes.get('/wife', controler.wife);
routes.get('/about', controler.about);
routes.get('/products', controler.products);
