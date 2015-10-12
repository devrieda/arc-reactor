const expect = require('expect');
const Keys = require("../Keys");

describe('Keys', () => {
  it("has a list of buttons", () => {
    expect(Keys.length).toEqual(16);
  });
});
