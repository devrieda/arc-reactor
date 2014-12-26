var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var SelectedContent = require('../../lib/modules/SelectedContent');
var ContentState = require('../../lib/state/ContentState');
var SelectionState = require('../../lib/state/SelectionState');

describe('SelectedContent', () => {

  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": []
        }
      ]
    }
  })

  describe('#isCentered', () => {
    describe("across a single block", () => {
      var block, selection;

      beforeEach(() => {
        selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
          offsets: () => { return { anchor: '', focus: '' }; }
        }
        block = {
          "id": "c6a7",
          "type": "p",
          "text": "some basic content"
        }
        content.sections[0].blocks = [block];
      })

      it('should be false if single block is not centered', () => {
        var selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
          offsets: () => { return { anchor: '', focus: '' }; }
        }

        var selContent = new SelectedContent(selection, content);
        assert(!selContent.isCentered());
      })

      it('should be true if single block is centered', () => {
        var selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
          offsets: () => { return { anchor: '', focus: '' }; }
        }
        content.sections[0].blocks[0].meta = { align: "center" };

        var selContent = new SelectedContent(selection, content);
        assert(selContent.isCentered());
      })
    })

    describe("across multiple blocks", () => {
      var block, selection;

      beforeEach(() => {
        selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: '', focus: '' }; }
        }
        block1 = {
          "id": "c6a7",
          "type": "p",
          "text": "some basic content"
        }
        block2 = {
          "id": "c6a8",
          "type": "p",
          "text": "more content"
        }
        content.sections[0].blocks = [block1, block2];
      })

      it('should be false if both blocks are not centered', () => {
        var selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        }

        var selContent = new SelectedContent(selection, content);
        assert(!selContent.isCentered());
      })

      it('should be false if one block is not centered', () => {
        var selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        }
        content.sections[0].blocks[0].meta = { align: "center" };

        var selContent = new SelectedContent(selection, content);
        assert(!selContent.isCentered());
      })

      it('should be true if both blocks are centered', () => {
        var selection = {
          guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
          offsets: () => { return { anchor: 5, focus: 5 }; }
        }
        content.sections[0].blocks[0].meta = { align: "center" };
        content.sections[0].blocks[1].meta = { align: "center" };

        var selContent = new SelectedContent(selection, content);
        assert(selContent.isCentered());
      })
    })
  })


  describe('#hasType', () => {
    describe('with block level element', () => {
      describe("across a single block", () => {
        var block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
            offsets: () => { return { anchor: '', focus: '' }; }
          }
          block = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          }
          content.sections[0].blocks = [block];
        });

        it('should be false if single block type doesnt match', () => {
          var selContent = new SelectedContent(selection, content);

          assert(!selContent.hasType('h2'));
        })

        it('should be true if single block type matches', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[0].type = 'h2';

          assert(selContent.hasType('h2'));
        })
      })

      describe("across multiple blocks", () => {
        var block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: '', focus: '' }; }
          }
          block1 = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          }
          block2 = {
            "id": "c6a8",
            "type": "p",
            "text": "more content"
          }
          content.sections[0].blocks = [block1, block2];
        })

        it('should be false if both blocks are not a header', () => {
          var selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          }

          var selContent = new SelectedContent(selection, content);
          assert(!selContent.hasType('h2'));
        })

        it('should be false if one block is not a header', () => {
          var selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          }
          content.sections[0].blocks[0].type = 'h2';

          var selContent = new SelectedContent(selection, content);
          assert(!selContent.hasType('h2'));
        })

        it('should be true if both blocks are headers', () => {
          var selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a8' }; },
            offsets: () => { return { anchor: 5, focus: 5 }; }
          }
          content.sections[0].blocks[0].type = 'h2';
          content.sections[0].blocks[1].type = 'h2';

          var selContent = new SelectedContent(selection, content);
          assert(selContent.hasType('h2'));
        })
      })
    })

    describe('with inline level element', () => {
      describe("within a single block", () => {
        var block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
            offsets: () => { return { anchor: 0, focus: 4 }; }
          }
          block = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content"
          }
          content.sections[0].blocks = [block];
        });

        it('should be false if the selection does not fall within a range', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[0].markups = { 'strong': [{begin: 0, end: 2}] }

          assert(!selContent.hasType('strong'));
        })

        it('should be true if the selection falls within a range', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[0].markups = { 'strong': [{begin: 0, end: 4}] }

          assert(selContent.hasType('strong'));
        })
      })

      describe("across multiple blocks", () => {
        var block, selection;

        beforeEach(() => {
          selection = {
            guids: () => { return { anchor: 'c6a7', focus: 'c6a9' }; },
            offsets: () => { return { anchor: 11, focus: 3 }; }
          }
          block1 = {
            "id": "c6a7",
            "type": "p",
            "text": "some basic content",
            "markups": {
              'strong': [{begin: 11, end: 18}]
            }
          }
          block2 = {
            "id": "c6a8",
            "type": "p",
            "text": "more content",
            "markups": {
              'strong': [{begin: 0, end: 12}]
            }
          }
          block3 = {
            "id": "c6a9",
            "type": "p",
            "text": "and more",
            "markups": {
              'strong': [{begin: 0, end: 3}]
            }
          }
          content.sections[0].blocks = [block1, block2, block3];
        })

        it('should be false if every block in the list doesnt have a range', () => {
          var selContent = new SelectedContent(selection, content);
          delete content.sections[0].blocks[0].markups

          assert(!selContent.hasType('strong'));
        })

        it('should be false if the anchor offset isnt within a range', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[0].markups.strong = [{begin: 12, end: 18}]

          assert(!selContent.hasType('strong'));
        })

        it('should be false if the anchor selection doesnt go to end of block', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[0].markups.strong = [{begin: 11, end: 13}]

          assert(!selContent.hasType('strong'));
        })

        it('should be false if the focus offset isnt within a range', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[2].markups.strong = [{begin: 0, end: 2}]

          assert(!selContent.hasType('strong'));
        })

        it('should be false if the focus offset doesnt start at beginning of block', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[2].markups.strong = [{begin: 1, end: 3}]

          assert(!selContent.hasType('strong'));
        })

        it('should be false if all in-between blocks arent a full range', () => {
          var selContent = new SelectedContent(selection, content);
          content.sections[0].blocks[1].markups.strong = [{begin: 0, end: 2}]

          assert(!selContent.hasType('strong'));
        })

        it('should be true if all selection is within a range', () => {
          var selContent = new SelectedContent(selection, content);
          assert(selContent.hasType('strong'));
        })
      })

    })
  })


  describe('#isHeader', () => {
    var block, selection;

    beforeEach(() => {
      selection = {
        guids: () => { return { anchor: 'c6a7', focus: 'c6a7' }; },
        offsets: () => { return { anchor: '', focus: '' }; }
      }
      block = {
        "id": "c6a7",
        "type": "p",
        "text": "some basic content"
      }
      content.sections[0].blocks = [block];
    });

    it('should be false if single block type isnt a header', () => {
      var selContent = new SelectedContent(selection, content);
      assert(!selContent.isHeader());
    })

    it('should be true if single block type is a header', () => {
      var selContent = new SelectedContent(selection, content);
      content.sections[0].blocks[0].type = 'h2';

      assert(selContent.isHeader());
    })
  })
})
