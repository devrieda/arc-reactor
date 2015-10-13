import expect from 'expect';
import MenuButtons from "../MenuButtons";

describe('MenuButtons', () => {
  it("has a list of buttons", () => {
    expect(MenuButtons.length).toEqual(8);
  });
});
