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
      const itemObject = item.split(";");
      const film = itemObject.reduce((prev, cur, ind) => {
        const value = cur.split(": ")[1];
        if (!value) {
          return {
            ...prev,
          }
        }
        return {
          ...prev,
          [fields[ind]]: value,
        }
      }, {});
      return film;
    });

    return toFilms;
  }
  catch (error) {
    console.log(error.message);
  }
}

const readFromJsonFiles = async (filePath) => {
  const films = JSON.parse(await fsPromises.readFile(filePath, "utf-8"));
  return films;
}

const filmsToCorrectType = (films) => {
  const filmsToReturn = films.map(item => {
    return {
      ...item,
      releaseYear: Number(item.releaseYear),
      stars: item.stars.split(", ")
    }
  })
  return filmsToReturn;
}

module.exports = {
  defineQuerySearch,
  readFromTxtFiles,
  readFromJsonFiles,
  filmsToCorrectType,
}