import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

// Mongo DB Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: [1896, "Year must be at least 1896"],
    max: [currentYear, `Year cannot exceed ${currentYear}`],
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  rate: {
    type: Number,
    default: 5,
  },
},
{
  timestamps: true, // Corrected option name
});

movieSchema.set("toJSON", {
  transform( ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v; // Corrected property name
  }
});

export const Movie = mongoose.model("Movie", movieSchema);
