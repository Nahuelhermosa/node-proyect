import { body, validationResult } from "express-validator";

const currYear = new Date().getFullYear();

const movieValidationRules = [
  body("title").notEmpty().withMessage("Must include a title").trim(),
  body("year")
    .notEmpty()
    .withMessage("Must include release year")
    .isInt({ min: 1896, max: currYear })
    .withMessage("A year between 1896 and the current year, both included")
    .trim(),
  body("director").notEmpty(),
  body("duration")
    .isInt({ min: 40 })
    .withMessage("Length in minutes, minimum value is 40"),
  body("genre").notEmpty(),
  body("rate")
    .isFloat({ min: 0, max: 10 })
    .withMessage("Min value is 0 and max value is 10. You can use decimals."),
  body("synopsis").notEmpty(),
  //   body("poster").custom((_value, { req }) => {
  //     if (!req.file) {
  //       throw new Error("Poster is required");
  //     }
  //     return true;
  //   }),
];

const movieValidator = [
  ...movieValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const prevValues = {
      title: req.body.title,
      year: req.body.year,
    };
    return res.status(400).render("movieAdd", {
      errors: errors.array(),
      prevValues,
    });
  },
];

export default movieValidator;
