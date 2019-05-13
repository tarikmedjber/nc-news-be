const { expect } = require("chai");
const { lookupArticleId } = require("../utils/lookup");

describe.only("lookupArticleId", () => {
  it("takes in array, returns an object", () => {
    expect(lookupArticleId([])).to.eql({});
  });
  it("takes in an array of an article and returns an object consisting of the id and title", () => {
    expect(
      lookupArticleId([
        {
          article_id: 1,
          title: "Running a Node App",
          topic: "coding",
          author: "jessjelly",
          body:
            "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
          created_at: 1471522072389
        }
      ])
    ).to.eql({ title: "Running a Node App", article_id: 1 });
  });
});
