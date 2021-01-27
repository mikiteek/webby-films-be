const request = require("supertest");
const mongoose = require("mongoose");

const Film = require("../../modules/film/film.model");
const app = require("../../server");
const {testFilm, testWrongFilmId, testListFilms} = require("./film.variables");

describe("films mutation", () => {
  beforeAll(done => {
    done()
  });
  afterAll(done => {
    mongoose.connection.close()
    done()
  });

  describe("GET /films/:id", () => {
    let filmCreated;
    beforeAll(async () => {
      filmCreated = new Film(testFilm);
      await filmCreated.save();
    });
    afterAll(async () => {
      await Film.findByIdAndDelete(filmCreated._id);
    });

    it("should return 400", async () => {
      const response = await request(app)
        .get(`/films/${filmCreated._id + "a"}`)
        .set('Content-Type', 'application/json')
        .expect(400)
    });
    it("should return 404", async () => {
      const response = await request(app)
        .get(`/films/${testWrongFilmId}`)
        .set('Content-Type', 'application/json')
        .expect(404)
    });
    it("should return 200", async () => {
      const response = await request(app)
        .get(`/films/${filmCreated._id}`)
        .set('Content-Type', 'application/json')
        .expect(200)
      expect(response.body).toEqual(expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        releaseYear: expect.any(Number),
        format: expect.any(String),
        stars: expect.arrayContaining([expect.any(String)])
      }));
    });
  });

  describe("GET /films/", () => {
    it("should return 400", async () => {
      const response = await request(app)
        .get("/films/")
        .set('Content-Type', 'application/json')
        .expect(200);
      expect(response.body).toEqual(expect.arrayContaining([{
        _id: expect.any(String),
        title: expect.any(String),
        releaseYear: expect.any(Number),
        format: expect.any(String),
        stars: expect.arrayContaining([expect.any(String)]),
      }]));
    });
  });

  describe("GET /films/title?", () => {
    let filmCreated;
    beforeAll(async () => {
      filmCreated = new Film(testFilm);
      await filmCreated.save();
    });
    afterAll(async () => {
      await Film.findByIdAndDelete(filmCreated._id);
    });
    it("should return 400", async () => {
      const response = await request(app)
        .get("/films/title?tit=2")
        .set('Content-Type', 'application/json')
        .expect(400);
    });

    it("should return 404", async () => {
      const response = await request(app)
        .get("/films/title?title=abracadabrachupacabra")
        .set('Content-Type', 'application/json')
        .expect(404);
    });

    it("should return 200", async () => {
      const response = await request(app)
        .get("/films/title?title=" + testFilm.title)
        .set('Content-Type', 'application/json')
        .expect(200);
      expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
        _id: expect.any(String),
        title: expect.any(String),
        releaseYear: expect.any(Number),
        format: expect.any(String),
        stars: expect.arrayContaining([expect.any(String)]),
      })]));
    });

  });
})