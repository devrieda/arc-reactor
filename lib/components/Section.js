var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var cx = require("classnames");

// all block types
var BaseBlock  = require('./Blocks/BaseBlock');
var Paragraph  = require('./Blocks/Paragraph');
var Header1    = require('./Blocks/Header1');
var Header2    = require('./Blocks/Header2');
var Header3    = require('./Blocks/Header3');
var Blockquote = require('./Blocks/Blockquote');
var List       = require('./Blocks/List');
var Figure     = require('./Blocks/Figure');

var { string, instanceOf } = React.PropTypes;

var Section = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    blocks: instanceOf(Immutable.List),
    meta: instanceOf(Immutable.Map),
    figureId: string
  },

  getDefaultProps() {
    return {
      id: "",
      blocks: Immutable.List(),
      meta: Immutable.Map(),
      figureId: null,
    };
  },

  // add class modifiers
  sectionClasses() {
    return cx('ic-Editor-Section', {
      'ic-Editor-Section--first': this.props.meta.get('first')
    });
  },

  renderFigure(block) {
    return (
      <Figure
        key={block.get('id')}
        id={block.get('id')}
        src={block.get('src')}
        width={block.get('width')}
        height={block.get('height')}
        type={block.get('type')}
        text={block.get('text')}
        meta={block.get('meta')}
        data={block.get('data')}
        selected={block.get('id') === this.props.figureId}
      />
    );
  },

  renderBlock(block) {
    return (
      <BaseBlock
        key={block.get('id')}
        id={block.get('id')}
        type={block.get('type')}
        text={block.get('text')}
        meta={block.get('meta')}
        data={block.get('data')}
        markups={block.get('markups')}
        blocks={block.get('blocks')}
      />
    );
  },

  render() {
    var blocks = this.props.blocks.map( (block, i) => {
      if (i === 0) { block = block.setIn(['meta', 'first'], true); }
      if (block.get('type') === 'figure') {
        return this.renderFigure(block);
      } else {
        return this.renderBlock(block);
      }
    });

    return (
      <section className={this.sectionClasses()} name={this.props.id}>
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
