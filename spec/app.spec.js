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
    it("returns a specific topic when passed a topic- 200 OK", () => {
      return request(app)
        .get("/api/topics/paper")
        .expect(200);
    });
  });

  describe("/api/articles", () => {
    it("GET status:200, and returns the articles data in descending order of creation", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.lengthOf(10);
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
    it("GET status 200, accepts a p query with a default limit of 10 returns 10 articles", () => {
      return request(app)
        .get("/api/articles?p=1")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.lengthOf(10);
        });
    });

    it("GET returns status 200 and articles sorted by the article_id key in descending order", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.descendingBy("article_id");

          expect(body.articles[0]).to.eql({
            author: "butter_bridge",
            title: "Moustache",
            article_id: 12,
            topic: "mitch",
            created_at: "1974-11-26T12:21:54.000Z",
            votes: 0,
            comment_count: "0"
          });
        });
    });
    it("GET returns status 200 and articles sorted by article_id and in ascending order", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.ascendingBy("article_id");
          expect(body.articles[9]).to.eql({
            author: "rogersop",
            title: "Seven inspirational thought leaders from Manchester UK",
            article_id: 10,
            topic: "mitch",
            created_at: "1982-11-24T12:21:54.000Z",
            votes: 0,
            comment_count: "0"
          });
        });
    });
    it("GET returns status 200 and a specific article relating to a username passed in as a query", () => {
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
    it("GET returns status 200 and a specific article relating to a topic passed in as a query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(10);
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
    it("returns status 200 OK when the author exists but has no articles", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200);
    });
    it("returns status 200 OK when the topic exists but has no articles", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200);
    });
  });
  describe("/api/articles/:article_id", () => {
    it("GET returns article data that belong to a certain article id", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            topic: "mitch",
            body: "I find this existence challenging",
            created_at: "2018-11-15T12:21:54.000Z",
            votes: 100,
            comment_count: "13"
          });
        });
    });
    it("PATCH returns an updated votes value within a particular article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: "2018-11-15T12:21:54.000Z",
            votes: 101
          });
        });
    });
    it("returns status 200 when not given a vote to update with", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: "2018-11-15T12:21:54.000Z",
            votes: 100
          });
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("GET returns an array of comments for the given article_id, sorted by default created_at", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("created_at");
          expect(body.comments).to.have.lengthOf(10);
          expect(body.comments[0]).to.eql({
            comment_id: 2,
            author: "butter_bridge",
            article_id: 1,
            votes: 14,
            created_at: "2016-11-22T12:36:03.000Z",
            body:
              "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
          });
        });
    });
    it("GET status 200, accepts a p query with a default limit of 10 returns 10 comments", () => {
      return request(app)
        .get("/api/articles/1/comments?p=2")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.lengthOf(3);
        });
    });
    it("GET 200 an empty array when passed a article ID which has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.eql([]);
        });
    });
    it("GET returns status 200 and comments sorted by the votes key in descending order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.descendingBy("votes");
          expect(body.comments[0]).to.eql({
            comment_id: 3,
            author: "icellusedkars",
            article_id: 1,
            votes: 100,
            created_at: "2015-11-23T12:36:03.000Z",
            body:
              "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
          });
        });
    });
    it("GET returns status 200 and comments sorted in ascending order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.ascendingBy("votes");
          expect(body.comments[0]).to.eql({
            comment_id: 4,
            author: "icellusedkars",
            article_id: 1,
            votes: -100,
            created_at: "2014-11-23T12:36:03.000Z",
            body: " I carry a log — yes. Is it funny to you? It is not to me."
          });
        });
    });
    it("POST returns a new comment into the selected article", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "lurker", body: "You only live once!" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).to.have.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
  });
  describe("/api/comments/:comment_id", () => {
    it("PATCH returns status 200 and an updatd vote count", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 26,
            created_at: "2017-11-22T12:36:03.000Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("returns status 200 OK when not provided a new update vote", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 16,
            created_at: "2017-11-22T12:36:03.000Z",
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("DELETES a specific comment based on its comment_id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({});
        });
    });
  });
  describe("/api/users/:username", () => {
    it("GET returns status 200, and geta specific user by username", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.eql({
            username: "butter_bridge",
            name: "jonny",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          });
        });
    });
  });

  describe("Error handling", () => {
    describe("Method Not Allowed 405 for all endpoints", () => {
      it("returns status 405 method not allowed when any request bu GET is used on the API endpoint", () => {
        return request(app)
          .delete("/api")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the topic endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the articles endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the article ID endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the articles-comments endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the comment ID endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/comments/1")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
      it("returns a 405 status when a method on the users endpoint is used that is not allowed", () => {
        return request(app)
          .put("/api/users/1")
          .expect(405)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "Method Not Allowed" });
          });
      });
    });

    describe("Route not found- 404 for all endpoints", () => {
      it("returns status 404 and a message of route not found when invalid route is used", () => {
        return request(app)
          .get("/api/NOT_A_ROUTE/")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when an article_id that doesnt exist is used", () => {
        return request(app)
          .get("/api/articles/999")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when an article_id that does not exist is used to update votes", () => {
        return request(app)
          .patch("/api/articles/999")
          .send({ votes: 2 })
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when an article_id that does not exist is used to get comments", () => {
        return request(app)
          .get("/api/articles/999/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when an article_id that does not exist is used to add a comment", () => {
        return request(app)
          .post("/api/articles/999/comments")
          .send({ username: "butter_bridge", body: "You only live once!" })
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });

      it("returns status 404 and a message of route not found when a comment_id that does not exist is used to delete a comment", () => {
        return request(app)
          .delete("/api/comments/999")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when a comment_id that does not exist is used to update votes", () => {
        return request(app)
          .patch("/api/comments/99999")
          .send({ votes: 2 })
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and a message of route not found when a username that does not exist is used", () => {
        return request(app)
          .get("/api/users/invalid_username")
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: "404 - Route not found!" });
          });
      });
      it("returns status 404 and message of bad request when an author or topic that does not exist is used", () => {
        return request(app)
          .get("/api/articles?author=DOESnotEXIST")
          .expect(404)
          .then(error => {
            expect(error.body).to.eql({ msg: "404 - Route not found!" });
          });
      });
    });
    describe("400 bad request for all endpoints", () => {
      it("returns status 400 and message of bad request when given a column to sort by that doesn't exist", () => {
        return request(app)
          .get("/api/articles?sort_by=notAColumn")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
      it("returns status 400 and message of bad request when passed an invalid order", () => {
        return request(app)
          .get("/api/articles?order=notAscNorDesc")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
      it("returns status 400 and message of bad request when given a column to sort by that doesn't exist on the comments endpoint", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=notAColumn")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
      it("returns status 400 and message of bad request when passed an invalid order on the comments endpoint", () => {
        return request(app)
          .get("/api/articles/1/comments?order=notAscNorDesc")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });

      it("Returns status 400 and a message of bad request when given a bad article_id", () => {
        return request(app)
          .get("/api/articles/badID")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });

      it("returns status 400 and a message bad request when given an invalid body to update with", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ votes: "3" })
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });

      it("returns status 400 and a message bad request when not given a comment to add", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
      it("returns status 400 and a message bad request when not provided all the article columns", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "lurker" })
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
      it("returns status 400 and a message bad request when given an invalid comment_id", () => {
        return request(app)
          .patch("/api/comments/'invalidID'")
          .send({ votes: 1 })
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });

      it("returns status 400 and a message bad request when votes is not a number", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ votes: "cat" })
          .expect(400)
          .then(error => {
            expect(error.body).to.eql({ msg: "Bad request" });
          });
      });
    });
  });
});
