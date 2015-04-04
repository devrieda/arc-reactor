var React = require('react/addons');
var Block = require('./Block');
var cx = require("classnames");

require('../stylesheets/Section.scss');

var { string, array, shape, boolean } = React.PropTypes;

var Section = React.createClass({
  propTypes: {
    id: string,
    blocks: array,
    meta: shape({
      first: boolean
    })
  },

  getDefaultProps() {
    return {
      id: "",
      blocks: [],
      meta: {}
    };
  },

  // add class modifiers
  sectionClasses() {
    return cx({
      'ic-Editor-Section': true,
      'ic-Editor-Section--first': this.props.meta && this.props.meta.first
    });
  },

  render() {
    var blocks = this.props.blocks.map( (block) => {
      return <Block key={block.id} {...block} />;
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
