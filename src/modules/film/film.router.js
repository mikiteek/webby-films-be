const {Router} = require("express");

const filmRouter = Router();
const filmController = require("./film.controller");

filmRouter.post(
  "/",
  filmController.addFilm,
);

filmRouter.delete(
  "/:id",
  filmController.removeFilm,
);

filmRouter.get(
  "/:id",
  filmController.getFilmInfo,
)

module.exports = filmRouter;