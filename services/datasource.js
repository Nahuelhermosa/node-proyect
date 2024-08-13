import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasource = {
  filePath: path.resolve(__dirname, "../models/movies.json"),

  async load() {
    try {
      const jsonMovies = await fs.readFile(this.filePath, "utf-8");
      const movies = JSON.parse(jsonMovies);
      return movies;
    } catch (err) {
      console.error(`Error loading movies from ${this.filePath}:`, err);
      throw err; // Re-throw the error after logging it
    }
  },

  async save(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2); // Formateo para facilitar la lectura
      await fs.writeFile(this.filePath, jsonData, "utf-8");
    } catch (err) {
      console.error(`Error saving movies to ${this.filePath}:`, err);
      throw err;
    }
  },

  async removeFile(filePath) {
    if (filePath === "/poster/default.png") return; // early return on default poster
    const file = path.join(__dirname, "../public", filePath);
    try {
      await fs.unlink(file);
      console.log(`File ${filePath} has been deleted.`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err.message);
    }
  },
};

export default datasource;
