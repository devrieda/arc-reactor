import SelectedContent from '../SelectedContent';
import { fromJS } from 'immutable';

describe('SelectedContent', () => {

  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": []
        }
      ]
    };
  });

  describe('#isCentered', () => {
    describe("across a single block", () => {
      let block, selection;

      beforeEach(() => {
        selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
          offsets: () => { return { anchor: 0, focus: 1 }; }
        };
        block = {
          "id": "c6a7",
          "type": "p",
          "text": "some basic content"
        };
        content.sections[0].blocks = [block];
      });

      it('is false if single block is not centered', () => {
        const selContent = new SelectedContent(selection, fromJS(content));
        expect(selContent.isCentered()).to.be.false;
      });

      it('is true if single block is centered', () => {
        content.sections[0].blocks[0].data = { align: "center" };

        const selContent = new SelectedContent(selection, fromJS(content));
        expect(selContent.isCentered()).to.be.true;
      });
    });

    describe("across multiple blocks", () => {
      let block1, block2;

      beforeEach(() => {
        block1 = {
          "id": "c6a7",
          "type": "p",
          "text": "some basic content"
        };
        block2 = {
          "id": "c6a8",
          "type": "p",
          "text": "more content"
        };
        content.sections[0].blocks = [block1, block2];
      });

      it('is false if both blocks are not centered', () => {
        const selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        };

        const selContent = new SelectedContent(selection, fromJS(content));
        expect(selContent.isCentered()).to.be.false;
      });

      it('is false if one block is not centered', () => {
        const selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        };
        content.sections[0].blocks[0].data = { align: "center" };

        const selContent = new SelectedContent(selection, fromJS(content));
        expect(selContent.isCentered()).to.be.false;
      });

      it('is true if both blocks are centered', () => {
        const selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        };
        content.sections[0].blocks[0].data = { align: "center" };
        content.sections[0].blocks[1].data = { align: "center" };

        const selContent = new SelectedContent(selection, fromJS(content));
        expect(selContent.isCentered()).to.be.true;
      });
    });
  });


  describe('#hasType', () => {
    describe('with block level element', () => {
      describe("across a single block", () => {
        let block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
            offsets: () => { return { anchor: 0, focus: 1 }; }
          };
          block = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          };
          content.sections[0].blocks = [block];
        });

        it('is false if single block type doesnt match', () => {
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('h2')).to.be.false;
        });

        it('is true if single block type matches', () => {
          content.sections[0].blocks[0].type = 'h2';
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('h2')).to.be.true;
        });
      });

      describe("across multiple blocks", () => {
        let block1, block2;

        beforeEach(() => {
          block1 = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          };
          block2 = {
            "id": "c6a8",
            "type": "p",
            "text": "more content"
          };
          content.sections[0].blocks = [block1, block2];
        });

        it('is false if both blocks are not a header', () => {
          const selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          };

          const selContent = new SelectedContent(selection, fromJS(content));
          expect(selContent.hasType('h2')).to.be.false;
        });

        it('is false if one block is not a header', () => {
          const selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          };
          content.sections[0].blocks[0].type = 'h2';

          const selContent = new SelectedContent(selection, fromJS(content));
          expect(selContent.hasType('h2')).to.be.false;
        });

        it('is true if both blocks are headers', () => {
          const selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          };
          content.sections[0].blocks[0].type = 'h2';
          content.sections[0].blocks[1].type = 'h2';

          const selContent = new SelectedContent(selection, fromJS(content));
          expect(selContent.hasType('h2')).to.be.true;
        });
      });
    });

    describe('with inline level element', () => {
      describe("within a single block", () => {
        let block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
            offsets: () => { return { anchor: 0, focus: 4 }; }
          };
          block = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          };
          content.sections[0].blocks = [block];
        });

        it('is false if the selection does not fall within a range', () => {
          content.sections[0].blocks[0].markups = { 'strong': [{range: [0,2]}] };
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is true if the selection falls within a range', () => {
          content.sections[0].blocks[0].markups = { 'strong': [{range: [0,4]}] };
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.true;
        });
      });

      describe("within a single block with a value", () => {
        let block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
            offsets: () => { return { anchor: 0, focus: 4 }; }
          };
          block = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          };
          content.sections[0].blocks = [block];
        });

        it('is false if the selection doesnt touch the range', () => {
          content.sections[0].blocks[0].markups = { 'a': [{range: [11,15], value: "foo"}] };
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('a', true)).to.be.false;
        });

        it('is true if the selection overlaps the range', () => {
          content.sections[0].blocks[0].markups = { 'a': [{range: [0,2], value: "foo"}] };
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('a', true)).to.be.true;
        });

        it('is true if the selection selects the range', () => {
          content.sections[0].blocks[0].markups = { 'a': [{range: [0,4], value: "foo"}] };
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('a', true)).to.be.true;
        });
      });

      describe("across multiple blocks", () => {
        let block1, block2, block3, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a9' }; },
            offsets: () => { return { anchor: 11, focus: 3 }; }
          };
          block1 = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content",
            "markups": {
              'strong': [{range: [11,18]}]
            }
          };
          block2 = {
            "id": "c6a8",
            "type": "p",
            "text": "more content",
            "markups": {
              'strong': [{range: [0,12]}]
            }
          };
          block3 = {
            "id": "c6a9",
            "type": "p",
            "text": "and more",
            "markups": {
              'strong': [{range: [0,3]}]
            }
          };
          content.sections[0].blocks = [block1, block2, block3];
        });

        it('is false if every block in the list doesnt have a range', () => {
          delete content.sections[0].blocks[0].markups;
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is false if the anchor offset isnt within a range', () => {
          content.sections[0].blocks[0].markups.strong = [{range: [12,18]}];
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is false if the anchor selection doesnt go to end of block', () => {
          content.sections[0].blocks[0].markups.strong = [{range: [11,13]}];
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is false if the focus offset isnt within a range', () => {
          content.sections[0].blocks[2].markups.strong = [{range: [0,2]}];
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is false if the focus offset doesnt start at beginning of block', () => {
          content.sections[0].blocks[2].markups.strong = [{range: [1,3]}];
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is false if all in-between blocks arent a full range', () => {
          content.sections[0].blocks[1].markups.strong = [{range: [0,2]}];
          const selContent = new SelectedContent(selection, fromJS(content));

          expect(selContent.hasType('strong')).to.be.false;
        });

        it('is true if all selection is within a range', () => {
          const selContent = new SelectedContent(selection, fromJS(content));
          expect(selContent.hasType('strong')).to.be.true;
        });
      });

      describe("across multiple blocks with a value", () => {
        // TODO - get links working across blocks
      });
    });
  });


  describe('#isHeader', () => {
    let block, selection;

    beforeEach(() => {
      selection = {
        guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
        offsets: () => { return { anchor: 0, focus: 1 }; }
      };
      block = {
        "id": "c6a7",
        "type": "p",
        "text": "some basic content"
      };
      content.sections[0].blocks = [block];
    });

    it('is false if single block type isnt a header', () => {
      const selContent = new SelectedContent(selection, fromJS(content));
      expect(selContent.isHeader()).to.be.false;
    });

    it('is true if single block type is a header', () => {
      content.sections[0].blocks[0].type = 'h2';
      const selContent = new SelectedContent(selection, fromJS(content));

      expect(selContent.isHeader()).to.be.true;
    });
  });
});
