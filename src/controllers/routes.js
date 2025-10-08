import express from "express";
import { addDemoHeaders } from "../middleware/demo/headers.js";
import { catalogPage, courseDetailPage } from "./catalog/catalog.js";
import { homePage, aboutPage, demoPage, testErrorPage } from "./index.js";
import { facultyPage, facultyDetailPage } from "./faculty/faculty.js";
import archive from "../../archive/unit1.js";

export const routes = express.Router();

routes.get("/", homePage);
routes.get("/wife", archive.wife);
routes.get("/about", aboutPage);
routes.get("/products", archive.products);
routes.get("/demo/", addDemoHeaders, demoPage);
routes.get("/catalog", catalogPage);
routes.get("/catalog/:courseId", courseDetailPage);
routes.get("/faculty", facultyPage);
routes.get("/faculty/:facultyID", facultyDetailPage);
routes.get("/test-error", testErrorPage);

routes.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

routes.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);
  console.error("Stack trace:", err.stack);

  const status = err.status || 500;
  const template = status === 404 ? "404" : "500";

  const context = {
    title: status === 404 ? "Page Not Found" : "Server Error",
    error: err.message,
    stack: err.stack,
    NODE_ENV: process.env.NODE_ENV || "production",
  };

  res.status(status).render(`errors/${template}`, context);
});
