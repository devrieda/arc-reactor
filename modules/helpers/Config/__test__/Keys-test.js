import expect from 'expect';
import Keys from "../Keys";

describe('Keys', () => {
  it("has a list of keys", () => {
    expect(Keys.length).toEqual(16);
  });
});
