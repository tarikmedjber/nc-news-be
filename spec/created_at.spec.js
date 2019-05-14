const { expect } = require("chai");
const { createdAtConverter } = require("../utils/created_at_converter");
const { articlesData, newDateData } = require("../utils/testing_data");

describe("createdAtConverter", () => {
  it("returns an empty array when passed an empty array", () => {
    let input = [];
    let expected = [];
    expect(createdAtConverter(input)).to.eql(expected);
  });
  it("returns a array of one object element when passed one article object", () => {
    let input = [{ created_at: 1542284514171 }];
    let expected = [
      {
        created_at: new Date(1542284514171)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")
      }
    ];

    expect(createdAtConverter(input)).to.eql(expected);
  });
  it("returns the object back with created_at value changed to a date", () => {
    let input = articlesData;
    let expected = newDateData;
    expect(createdAtConverter(input)).to.eql(expected);
    expect(createdAtConverter(input)).to.not.equal(input);
  });
});
