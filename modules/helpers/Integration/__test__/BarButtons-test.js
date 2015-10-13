import expect from 'expect';
import BarButtons from "../BarButtons";

describe('BarButtons', () => {
  it("has a list of buttons", () => {
    expect(BarButtons.length).toEqual(1);
  });
});
