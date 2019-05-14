const { expect } = require("chai");
const { swapKeys } = require("../utils/swap_keys");
const {
  formattedCommentTest,
  swappedCreatedBy
} = require("../utils/testing_data");

describe.only("swap_keys", () => {
  it("returns an array when passed an array", () => {
    expect(swapKeys([], "created_by", "author")).to.eql([]);
  });
  it("returns an array of one object where the created_by key is swapped with author", () => {
    expect(
      swapKeys([{ created_by: "butter_bridge" }], "created_by", "author")
    ).to.eql([{ author: "butter_bridge" }]);
  });
  it("returns an array of objects where the created_by keys are swapped with an author", () => {
    expect(swapKeys(formattedCommentTest, "created_by", "author")).to.eql(
      swappedCreatedBy
    );
  });
});
