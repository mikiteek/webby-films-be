const {promises: fsPromises} = require("fs");

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
};

const FILM_ITEM_FIELDS = ["title", "releaseYear", "format", "stars"];
const readFromTxtFiles = async (filePath) => {
  try {
    const filmsRead = await fsPromises.readFile(filePath, "utf-8");
    const filmsToStringArrayFormat = filmsRead
      .split("\n")
      .join(";")
      .split(";;");

    const films = filmsToStringArrayFormat.map((item, ind) => {
      const film = item
        .split(";")
        .reduce((prev, cur, ind) => {
          if (cur.indexOf(": ") === -1) {
            return {
              ...prev,
            }
          }
          const value = cur.substr(cur.indexOf(": ") + 2);
          return {
            ...prev,
            [FILM_ITEM_FIELDS[ind]]: value,
          }
        }, {});
      return film;
    });
    return films;
  }
  catch (error) {
    console.log(error.message);
    return false;
  }
};

const readFromJsonFiles = async (filePath) => {
  try {
    const films = JSON.parse(await fsPromises.readFile(filePath, "utf-8"));
    return films;
  }
  catch (error) {
    console.log(error.message);
    return false;
  }
};

const filmsToCorrectTypeFromTxt = (films) => {
  const filmsToReturn = films.map(item => {
    return {
      ...item,
      releaseYear: Number(item.releaseYear),
      stars: item.stars.split(", ")
    }
  })
  return filmsToReturn;
};

module.exports = {
  defineQuerySearch,
  readFromTxtFiles,
  readFromJsonFiles,
  filmsToCorrectTypeFromTxt,
}