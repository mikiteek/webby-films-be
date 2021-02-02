const AlreadyExistError = {
  message: "Such item already exist",
}

const BadRequestError = {
  message: "Bad request",
}

const NotFoundError = {
  message: "Not found",
}

const UnauthorizedError = {
  message: "Unauthorized",
}

module.exports = {
  AlreadyExistError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
};