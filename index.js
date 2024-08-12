// Core modules
import path from "node:path";
import { fileURLToPath } from "node:url";

// External modules
import express from "express";
import methodOverride from "method-override";

// Project modules
import movieRouter from "./router/movies.js";  // Asegúrate de que 'movies.js' use `export default`

const port = process.env.PORT ?? 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => res.render("home"));
app.get("/about", (req, res) => res.render("about"));
app.use("/movies", movieRouter);
app.get("/health", (req, res) => res.status(200).send("OK"));
app.use((req, res) => {
  res.status(404).render("not-found");
});

app.listen(port, (err) =>
  console.log(
    err
      ? `Server failed to launch: ${err.message}`
      : `
------------------------------------------
Server running on http://127.0.0.1:${port}

CTRL + C to cancel...
------------------------------------------
`
  )
);
