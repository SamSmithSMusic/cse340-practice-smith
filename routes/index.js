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

//Global Handler
routes.use((err, req, res, next) => {

    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    res.status(status).render(`errors/${template}`, context);
});