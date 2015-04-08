var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var Block = require('./Block');
var cx = require("classnames");

require('../stylesheets/Section.scss');

var { string, instanceOf } = React.PropTypes;

var Section = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    blocks: instanceOf(Immutable.List),
    meta: instanceOf(Immutable.Map)
  },

  getDefaultProps() {
    return {
      id: "",
      blocks: Immutable.List(),
      meta: Immutable.Map()
    };
  },

  // add class modifiers
  sectionClasses() {
    return cx({
      'ic-Editor-Section': true,
      'ic-Editor-Section--first': this.props.meta.get('first')
    });
  },

  render() {
    var blocks = this.props.blocks.map( (block, i) => {
      if (i === 0) { block = block.setIn(['meta', 'first'], true); }

      return (
        <Block
          key={block.get('id')}
          id={block.get('id')}
          type={block.get('type')}
          text={block.get('text')}
          meta={block.get('meta')}
          markups={block.get('markups')}
          blocks={block.get('blocks')}
        />
      );
    });

    return (
      <section className={this.sectionClasses()} name={this.props.id}>
        <div className="ic-Editor-Section__divider">
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
