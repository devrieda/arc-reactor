import expect from 'expect';
import Blocks from "../Blocks";

describe('Blocks', () => {
  it("has a list of blocks", () => {
    expect(Blocks.length).toEqual(9);
  });
});
