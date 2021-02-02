const Joi = require("joi");

const filmItemRules = Joi.object({
  title: Joi.string().required(),
  releaseYear: Joi.number().integer().greater(1849).less(2021).required(),
  format: Joi.string().valid("DVD", "VHS", "Blu-Ray").required(),
  stars: Joi.array().items(Joi.string()).unique().required(),
});

const validateAddFilm = (body) => {
  const validationSchema = filmItemRules;

  const validationResult = validationSchema.validate(body);
  return validationResult.error;
}

const validateGetFilmByQuery = (query) => {
  const validationSchema = Joi.object({
    title: Joi.string(),
    star: Joi.string(),
  });

  const validationResult = validationSchema.validate(query);
  return validationResult.error;
}

const validateAddFilmsFromFile = (films) => {
  const validationSchema = Joi.array().items(filmItemRules);
  const validationResult = validationSchema.validate(films);
  return validationResult.error;
}


module.exports = {
  validateAddFilm,
  validateGetFilmByQuery,
  validateAddFilmsFromFile,
}