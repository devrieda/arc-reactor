const expect = require('expect');
const Blocks = require("../Blocks");

describe('Blocks', () => {
  it("has a list of buttons", () => {
    expect(Blocks.length).toEqual(8);
  });
});
