import { routes } from "./src/controllers/routes.js";
import {
  addImportantLocalVariables,
  addOptionalLocalVariables,
} from "./src/middleware/global.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "production";

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src/views"));
<<<<<<< HEAD

app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV.toLowerCase() || "production";
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add Year to re.locals
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Time different greetings
app.use((req, res, next) => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    res.locals.greeting = "Good Morning";
  } else if (currentHour < 18) {
    res.locals.greeting = "Good Afternoon";
  } else {
    res.locals.greeting = "Good Evening";
  }
  next();
});

//Random Themes
app.use((req, res, next) => {
  const themes = ["blue-theme", "green-theme", "red-theme"];
  const randomIndex = Math.floor(Math.random() * themes.length);
  res.locals.bodyClass = themes[randomIndex];
  next();
});

//Make query parameters available to all templates
app.use((req, res, next) => {
  res.locals.queryParams = req.query;
  next();
});

=======

app.use(addImportantLocalVariables);
app.use(addOptionalLocalVariables);

>>>>>>> 1d2c813fbe2a2910c06963bf858daa8b5b286a15
app.use("/", routes);

//Web Socket setup for development environment
if (NODE_ENV.includes("dev")) {
  const ws = await import("ws");

  try {
    const wsPort = parseInt(PORT) + 1;

    const wsServer = new ws.WebSocketServer({ port: wsPort });

    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`);
    });

    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  } catch (error) {
    console.error("Failed to start WebSocket server:", error);
  }
}

app.listen(PORT, () => {
  console.log("Web Server is listening at http://127.0.0.1:" + PORT);
});
