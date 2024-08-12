import express from "express";
import movieController from "../controllers/movies.js";
import fileUpload from "../services/fileUpload.js";  // Importación de ES Modules
import movieValidator from "../validators/movieValidators.js";

const router = express.Router();

router.get("/", movieController.getAll);
router.get("/s", movieController.getByTitle);
router.get("/add", movieController.getAddForm);
router.get("/:id", movieController.getById);
router.get("/edit/:id", movieController.getUpdateForm);
router.post(
  "/",
  fileUpload.single("poster"),
  movieValidator,
  movieController.createOne
);
router.put("/:id", movieController.updateOne);
router.delete("/:id", movieController.deleteOne);

export default router;  // Exportación por defecto
