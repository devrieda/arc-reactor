var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var Section = require('./Section');

var { object, instanceOf } = React.PropTypes;

var Content = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    content: instanceOf(Immutable.Map).isRequired,
    guids: object,
    offsets: object,
  },

  getDefaultProps() {
    return {
      guids: {},
      offsets: {}
    };
  },

  render() {
    var sections = this.props.content.get('sections').map( (sect, i) => {
      if (i === 0) { sect = sect.setIn(['meta', 'first'], true); }

      return (
        <Section
          key={sect.get('id')}
          id={sect.get('id')}
          blocks={sect.get('blocks')}
          meta={sect.get('meta')}
          guids={this.props.guids}
          offsets={this.props.offsets}
        />
      );
    });

    return (
      <div className="ic-Editor-Content"
        contentEditable="true"
        role="textbox"
        data-top="true"
        aria-multiline="true"
        aria-label="Editable Content">
        {sections}
      </div>
    );
  }
});

module.exports = Content;
