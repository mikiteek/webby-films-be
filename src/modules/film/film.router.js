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

module.exports = filmRouter;