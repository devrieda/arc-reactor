var React = require('react');
var Section = require('./Section');

require('../stylesheets/Content.scss');

var { shape, array, object } = React.PropTypes;

var Content = React.createClass({
  propTypes: {
    content: shape({ sections: array }).isRequired
  },

  render() {
    var sections = this.props.content.sections.map( (sect, i) => {
      sect.meta = sect.meta || {};
      if (i === 0) { sect.meta.first = true; }
      return <Section key={sect.id} {...sect} />;
    });

    return (
      <div className="ic-Editor-Content"
        contentEditable="true"
        role="textbox"
        aria-multiline="true"
        aria-label="Editable Content"
      >
        {sections}
      </div>
    );
  }
});

module.exports = Content;
