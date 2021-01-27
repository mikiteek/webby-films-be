const {promises: fsPromises} = require("fs");
const path = require("path");

const defineQuerySearch = (title, star) => {
  let querySearch = {};
  if (title && star) {
    querySearch = {
      "$and": [
        {title: {"$regex": title, "$options": "i"}},
        {stars: {"$regex": star, "$options": "i"}}
      ]
    }
  }
  else if (title) {
    querySearch = {
      title: {"$regex": title, "$options": "i"}
    }
  }
  else if (star) {
    querySearch = {
      stars: {"$regex": star, "$options": "i"}
    }
  }
  return querySearch;
}

const readFromTxtFiles = async (filePath) => {
  try {
    const fields = ["title", "releaseYear", "format", "stars"];
    const filmsRead = await fsPromises.readFile(filePath, "utf-8");
    const films = filmsRead.split("\n").join(";").split(";;");
    const toFilms = films.map((item, ind) => {
      return item
    });

    return toFilms;
  }
  catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  defineQuerySearch,
  readFromTxtFiles
}