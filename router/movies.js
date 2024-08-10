import { Router } from "express";
export const router =  Router();
import {movieController} from "../controller/movies.js";
router.get("/", movieController.getAll);

router.get("/s", movieController.getByTitle);
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send(`List a movie by id: ${id}`);
});
router.post("/", (req, res) => res.send("Create a movies"));
router.patch("/:id", (req, res) => {
     const { id } = req.params;
     res.send(`Update a movie by id: ${id}`);
});
router.delete("/:id", (req, res) =>{
    const { id } = req.params;
     res.send(`Delete a movie by id: ${id}`);
});
