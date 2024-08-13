import { Movie } from "../model/mongoDB/movie.js"; // Ruta corregida
import dataSource from "../services/datasource.js";  // Asegúrate de importar dataSource si es necesario

const movieController = {
  async getAll(req, res) {
    try {
      const movies = await Movie.find();
      res.render("movies", { movies });
    } catch (error) {
      res.status(500).send("Error al obtener las películas");
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).send("Película no encontrada");
      }
      res.render("movieDetail", { movie });
    } catch (error) {
      res.status(500).send("Error al obtener la película");
    }
  },

  async getUpdateForm(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).send("Película no encontrada");
      }
      res.render("movieEdit", { movie });
    } catch (error) {
      res.status(500).send("Error al obtener la película");
    }
  },

  getAddForm(req, res) {
    res.render("movieAdd", { errors: [], prevValues: {} });
  },

  async createOne(req, res) {
    try {
      const posterFilePath = req.file
        ? `/poster/${req.file.filename}`
        : "/poster/default.png";
      const { title, year, duration, director, genre, rate, synopsis } = req.body;
      const newMovie = new Movie({
        title,
        year,
        duration,
        director,
        poster: posterFilePath,
        genre,
        rate,
        synopsis,
      });
      await newMovie.save();
      res.redirect(`/movies`);
    } catch (error) {
      res.status(500).send("Error al crear la película");
    }
  },

  async updateOne(req, res) {
    try {
      let poster = req.file?.filename
        ? `/poster/${req.file.filename}`
        : req.body.currentPoster;
      const { id } = req.params;
      const { title, year, duration, director, genre, rate, synopsis } = req.body;

      const updatedMovie = await Movie.findByIdAndUpdate(id, {
        title,
        year,
        duration,
        director,
        poster,
        genre,
        rate,
        synopsis,
      }, { new: true });

      if (!updatedMovie) {
        return res.status(404).send("Película no encontrada");
      }

      res.redirect(`/movies/${id}`);
    } catch (error) {
      res.status(500).send("Error al actualizar la película");
    }
  },

  async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByIdAndDelete(id);
      if (movie) {
        await dataSource.removeFile(movie.poster);  // Verifica que dataSource esté importado
      }
      res.redirect("/movies");
    } catch (error) {
      res.status(500).send("Error al eliminar la película");
    }
  },

  async getByTitle(req, res) {  // Añadido aquí
    try {
      const { title } = req.query;
      const movies = await Movie.find({ title: new RegExp(title, "i") });
      res.render("movies", { movies });
    } catch (error) {
      res.status(500).send("Error al buscar las películas");
    }
  },
};

export default movieController;
