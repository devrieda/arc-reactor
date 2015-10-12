const expect = require('expect');
const MenuButtons = require("../MenuButtons");

describe('MenuButtons', () => {
  it("has a list of buttons", () => {
    expect(MenuButtons.length).toEqual(8);
  });
});
