import fs from "node:fs/promises";
import path from "node:path";

const datasource = {
  filePath: path.resolve(path.dirname(new URL(import.meta.url).pathname), "../models/movies.json"),

  async load() {
    const jsonMovies = await fs.readFile(this.filePath, "utf-8");
    const movies = JSON.parse(jsonMovies);
    return movies;
  },

  async save(data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },

  async removeFile(filePath) {
    if (filePath === "/poster/default.png") return; // early return on default poster
    const file = path.join(path.dirname(new URL(import.meta.url).pathname), "../public", filePath);
    try {
      await fs.unlink(file);
      console.log(`file ${filePath} has been deleted.`);
    } catch (err) {
      console.error(err.message);
    }
  },
};

export default datasource; // Exportación por defecto
