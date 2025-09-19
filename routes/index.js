import express from "express";
import lesson1 from "../controllers/unit1.js";

export const routes = express.Router();

routes.get('/', lesson1.sam);
routes.get('/wife', lesson1.wife);