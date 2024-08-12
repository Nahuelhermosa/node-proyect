import {mongoose} from "mongoose";
const currentYear = new Date().getFullYear()

 //Mongo DB Schema 
 const movieSchema = mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    title: { type: String, required: true },
    year: {
        type: Number, 
        required: true,
        min: [1896, "year must be al least 1886"],
        min: [1896, `year cannot exceed ${currentYear}`],
    },
    director: {type: String, required: true },
    duration: { type: Number, required: true },
    poster: { type: String, required: true },
    genre: { type: [String], required: true },
    rate: { type: Number, default: 5 },
});

 export const Movie = mongoose.model("Movie", movieSchema);