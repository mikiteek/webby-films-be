const Joi = require("joi");

const validateAddFilm = (body) => {
  const validationSchema = Joi.object({
    title: Joi.string().required(),
    releaseYear: Joi.number().integer().greater(1890).required(),
    format: Joi.string().required(),
    stars: Joi.array().items(Joi.string()),
  });

  const validationResult = validationSchema.validate(body);
  return validationResult.error;
}

const validateGetByTitleFilms = (query) => {
  const validationSchema = Joi.object({
    title: Joi.string(),
  });

  const validationResult = validationSchema.validate(query);
  return validationResult.error;
}

module.exports = {
  validateAddFilm,
  validateGetByTitleFilms,
}