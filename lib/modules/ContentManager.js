var Guid = require('./Guid');
var RangeSet = require('./RangeSet');
var ContentFinder = require('./ContentFinder');

var AppendBlock      = require('./Manipulation/AppendBlock');
var PrependBlock     = require('./Manipulation/PrependBlock');
var SplitBlock       = require('./Manipulation/SplitBlock');
var CombineBlock     = require('./Manipulation/CombineBlock');
var CombineBlockPrev = require('./Manipulation/CombineBlockPrev');
var CombineBlockNext = require('./Manipulation/CombineBlockNext');
var ToggleBlock      = require('./Manipulation/ToggleBlock');
var ToggleInline     = require('./Manipulation/ToggleInline');
var ToggleCenter     = require('./Manipulation/ToggleCenter');
var ChangeText       = require('./Manipulation/ChangeText');

// Manages making changes to the content
//
class ContentManager {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  // add / remove / combine blocks

  appendBlock(guids) {
    return new AppendBlock(this.content).execute(guids);
  }

  prependBlock(guids) {
    return new PrependBlock(this.content).execute(guids);
  }

  splitBlock(guids, offsets) {
    return new SplitBlock(this.content).execute(guids, offsets);
  }

  combineBlocks(guids, offsets) {
    return new CombineBlock(this.content).execute(guids, offsets);
  }

  combineBlockWithPrevious(guids) {
    return new CombineBlockPrev(this.content).execute(guids);
  }

  combineBlockWithNext(guids) {
    return new CombineBlockNext(this.content).execute(guids);
  }


  // text

  updateText(guids, text) {
    return new ChangeText(this.content).execute(guids, {}, { text: text });
  }


  // modifying block type / markup

  toggleCenter(guids, offsets) {
    return new ToggleCenter(this.content).execute(guids, offsets);
  }

  toggleBlockType(guids, offsets, tagName) {
    return new ToggleBlock(this.content).execute(guids, offsets, { tagName: tagName });
  }

  toggleMarkup(guids, offsets, type, value) {
    return new ToggleInline(this.content).execute(guids, offsets, { type: type, value: value });
  }
}

module.exports = ContentManager;
