var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var cx = require("classnames");

var Paragraph  = require('./Blocks/Paragraph');
var Header1    = require('./Blocks/Header1');
var Header2    = require('./Blocks/Header2');
var Header3    = require('./Blocks/Header3');
var Blockquote = require('./Blocks/Blockquote');
var List       = require('./Blocks/List');
var Figure     = require('./Blocks/Figure');

// all block types
var blockTypes = [
  Paragraph, Header1, Header2, Header3, Blockquote, List, Figure
]

var { string, instanceOf } = React.PropTypes;

var Section = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    blocks: instanceOf(Immutable.List),
    meta: instanceOf(Immutable.Map),
    blockId: string
  },

  getDefaultProps() {
    return {
      id: "",
      blocks: Immutable.List(),
      meta: Immutable.Map(),
      blockId: null,
    };
  },

  // find which type of block matches
  _renderBlock(block) {
    var matching = blockTypes.filter( (BlockClass) => {
      return BlockClass.matches(block);
    });

    // default to P
    var BlockType = matching[0] || Paragraph;

    return (
      <BlockType
        key={block.get('id')}
        id={block.get('id')}
        type={block.get('type')}
        text={block.get('text')}
        meta={block.get('meta')}
        data={block.get('data')}
        markups={block.get('markups')}
        blocks={block.get('blocks')}
        selected={block.get('id') === this.props.blockId}
      />
    );
  },

  render() {
    var blocks = this.props.blocks.map( (block, i) => {
      if (i === 0) { block = block.setIn(['meta', 'first'], true); }
      return this._renderBlock(block);
    });

    var classNames = cx('ic-Editor-Section', {
      'ic-Editor-Section--first': this.props.meta.get('first')
    });

    return (
      <section className={classNames} name={this.props.id}>
        <div contentEditable="false" className="ic-Editor-Section__divider">
          <hr className="ic-Editor-Section__hr" />
        </div>

        <div className="ic-Editor-Section__content">
          <div className="ic-Editor-Section__inner">
            {blocks}
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Section;
