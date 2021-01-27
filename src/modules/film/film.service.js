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

module.exports = {
  defineQuerySearch,
}