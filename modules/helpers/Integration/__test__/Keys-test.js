import expect from 'expect';
import Keys from "../Keys";

describe('Keys', () => {
  it("has a list of buttons", () => {
    expect(Keys.length).toEqual(16);
  });
});
