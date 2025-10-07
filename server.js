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

app.use(addImportantLocalVariables);
app.use(addOptionalLocalVariables);

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
