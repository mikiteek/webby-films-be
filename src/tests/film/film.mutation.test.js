const request = require("supertest");
const mongoose = require("mongoose");

const Film = require("../../modules/film/film.model");
const app = require("../../server");
const {testFilm, testWrongFilmId} = require("./film.variables");

describe("films mutation", () => {
  beforeAll(done => {
    done()
  });
  afterAll(done => {
    mongoose.connection.close()
    done()
  });

  describe("POST /films/", () => {
    let filmCreated;
    afterAll(async () => {
      await Film.findByIdAndDelete(filmCreated._id);
    });

    it("should return 400", async () => {
      const response = await request(app)
        .post("/films/")
        .set('Content-Type', 'application/json')
        .send({
          ...testFilm,
          releaseYear: 1200
        })
        .expect(400)
    });
    it("should return 400", async () => {
      const response = await request(app)
        .post("/films/")
        .set('Content-Type', 'application/json')
        .send({
          releaseYear: 1955
        })
        .expect(400)
    });

    it("should return 201", async () => {
      const response = await request(app)
        .post("/films/")
        .set('Content-Type', 'application/json')
        .send(testFilm)
        .expect(201)
    });
  });

  describe("DELETE /films/:id", () => {
    let filmCreated;
    beforeAll(async () => {
      filmCreated = new Film(testFilm);
      await filmCreated.save();
    });

    it("should return 400", async () => {
      const response = await request(app)
        .delete(`/films/${filmCreated._id + "a"}`)
        .expect(400)
    });
    it("should return 204", async () => {
      const response = await request(app)
        .delete(`/films/${testWrongFilmId}`)
        .expect(204)
    });
    it("should return 200", async () => {
      const response = await request(app)
        .delete(`/films/${filmCreated._id}`)
        .expect(200)
    });
  });

})