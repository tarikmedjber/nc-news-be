process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
chai.use(chaiSorted);

describe.only("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api/topics", () => {
    it("GET status:200, and returns the topics data", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.have.lengthOf(3);
          expect(body.topics).to.eql([
            {
              description: "The man, the Mitch, the legend",
              slug: "mitch"
            },
            {
              description: "Not dogs",
              slug: "cats"
            },
            {
              description: "what books are made of",
              slug: "paper"
            }
          ]);
        });
    });
  });
  describe("/api/articles", () => {
    it("GET status:200, and returns the articles data in descending order of creation", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.lengthOf(12);
          expect(body.articles).to.be.descendingBy("created_at");
          expect(body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );

          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.000Z",
            votes: 100,
            comment_count: "13"
          });
        });
    });
  });
  it("returns status 200 and a specific article relating to a username passed in as a query", () => {
    return request(app)
      .get("/api/articles?author=butter_bridge")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(3);
        expect(body.articles[0]).to.eql({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          created_at: "2018-11-15T12:21:54.000Z",
          votes: 100,
          comment_count: "13"
        });
      });
  });
  it("returns status 200 and a specific article relating to a topic passed in as a query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(11);
        expect(body.articles[0]).to.eql({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          topic: "mitch",
          created_at: "2018-11-15T12:21:54.000Z",
          votes: 100,
          comment_count: "13"
        });
      });
  });
  describe("/api/articles/:article_id", () => {
    it("returns article data that belong to a certain article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.articleById).to.have.lengthOf(13);
          expect(body.articleById[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body:
              "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
            votes: 14,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2016-11-22T12:36:03.000Z",
            comment_id: 2,
            comment_count: "1"
          });
        });
    });
  });
});
