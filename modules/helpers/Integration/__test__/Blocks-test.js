import expect from 'expect';
import Blocks from "../Blocks";

describe('Blocks', () => {
  it("has a list of buttons", () => {
    expect(Blocks.length).toEqual(8);
  });
});
