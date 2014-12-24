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

  describe('#hasType', () => {
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

    describe('with block level element', () => {
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

    describe('with inline level element', () => {
      // it('should be false if single inline type doesnt matches', () => {
      //   var selContent = new SelectedContent(selection, content);

      //   assert(!selContent.hasType('strong'));
      // })

      // it('should be true if single inline type matches', () => {
      //   var selContent = new SelectedContent(selection, content);

      //   assert(selContent.hasType('strong'));
      // })
    })
  })
})
