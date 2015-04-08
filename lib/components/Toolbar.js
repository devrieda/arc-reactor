var React = require('react');
var MenuButtons = require('./MenuButtons');

var Toolbar = React.createClass({
  render() {
    return <div></div>;
  }
});

var Basic = React.createClass({
  render() {
    return (
      <Toolbar>
        <MenuButtons.Bold />
        <MenuButtons.Italic />
        <MenuButtons.H1 />
        <MenuButtons.H2 />
        <MenuButtons.H3 />
        <MenuButtons.Center />
        <MenuButtons.Quote />
        <MenuButtons.Link />
      </Toolbar>
    );
  }
});

module.exports = Toolbar;
Toolbar.Basic = Basic;
