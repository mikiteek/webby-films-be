const {defineQuerySearch} = require("../../modules/film/film.service");

describe("film's service", () => {
  describe("checking defineQuerySearch function", () => {
    it("should be empty object", () => {
      const result = defineQuerySearch(undefined, undefined);
      expect(result).toStrictEqual({});
    });

    it("should be object with 'title'", () => {
      const result = defineQuerySearch("casablanca");
      expect(result).toEqual({
        title: expect.objectContaining({
          "$regex": expect.any(String),
          "$options": expect.any(String)
        })
      })
    });

    it("should be object with 'stars'", () => {
      const result = defineQuerySearch(undefined, "geo");
      expect(result).toEqual({
        stars: expect.objectContaining({
          "$regex": expect.any(String),
          "$options": expect.any(String)
        })
      })
    });

    it("should be object with '$and', 'title' and 'stars", () => {
      const result = defineQuerySearch("casablanca", "geo");
      expect(result).toEqual(expect.objectContaining({
        "$and": expect.arrayContaining([expect.any(Object)])
      }))
    });

  });
});