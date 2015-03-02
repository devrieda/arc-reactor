var React = require('react');
var Buttons = require('./Buttons');

var Toolbar = React.createClass({
  render() {
    return <div></div>;
  }
});

var Basic = React.createClass({
  render() {
    return (
      <Toolbar>
        <Buttons.Bold />
        <Buttons.Italic />
        <Buttons.H1 />
        <Buttons.H2 />
        <Buttons.H3 />
        <Buttons.Center />
        <Buttons.Quote />
        <Buttons.Link />
      </Toolbar>
    )
  }
});

module.exports = Toolbar;
Toolbar.Basic = Basic;
