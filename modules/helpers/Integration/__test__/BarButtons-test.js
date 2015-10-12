const expect = require('expect');
const BarButtons = require("../BarButtons");

describe('BarButtons', () => {
  it("has a list of buttons", () => {
    expect(BarButtons.length).toEqual(1);
  });
});
