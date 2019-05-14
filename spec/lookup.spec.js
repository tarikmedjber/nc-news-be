const { expect } = require("chai");
const { lookupArticleId, formatComments } = require("../utils/lookup");
const {
  articlesData,
  lookUpTestData,
  commentsData,
  exampleReferenceTable,
  formattedCommentTest
} = require("../utils/testing_data");

describe("lookupArticleId", () => {
  it("takes in array, returns an object", () => {
    expect(lookupArticleId([])).to.eql({});
  });
  it("takes in an array of an article and returns an object consisting of the id and title", () => {
    let input = [
      { article_id: 1, title: "Living in the shadow of a great man" }
    ];
    expect(lookupArticleId(input)).to.eql({
      "Living in the shadow of a great man": 1
    });
  });
  it("takes in an array of many articles and returns an object consisting of the id and titles pf each article", () => {
    let input = articlesData;
    let expected = lookUpTestData;
    expect(lookupArticleId(input)).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("returns an array when passed an empty array and an empty object", () => {
    expect(formatComments([], {})).to.eql([]);
  });
  it("returns a comments object containg the article ID and no longer containing belongs_to key", () => {
    let input1 = commentsData;
    let input2 = exampleReferenceTable;
    let expected = formattedCommentTest;
    expect(formatComments(input1, input2)).to.eql(expected);
    expect(formatComments(input1, input2)).to.not.equal(input1);
  });
});
