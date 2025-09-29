import express from "express";
import controler from "../controllers/unit1.js";
import unit2 from "../controllers/unit2.js";

export const routes = express.Router();

routes.get('/', controler.home);
routes.get('/wife', controler.wife);
routes.get('/about', controler.about);
routes.get('/products', controler.products);
routes.get('/demo/:color/:food', unit2.demo);


routes.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
//    res.status(404).render('404', { title: "404 Page Not Found" }); 
});

routes.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.status === 404) {
        return res.status(404).render('404', { title: "404 - Page Not Found" });
    }
    res.status(500).render('500', { title: "500 - Server Error" });
});