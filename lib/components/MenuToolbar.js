var React = require('react');
var MenuButtons = require('./MenuButtons');

var MenuToolbar = React.createClass({
  render() {
    return <div></div>;
  }
});

var Basic = React.createClass({
  render() {
    return (
      <MenuToolbar>
        <MenuButtons.Bold />
        <MenuButtons.Italic />
        <MenuButtons.H1 />
        <MenuButtons.H2 />
        <MenuButtons.H3 />
        <MenuButtons.Center />
        <MenuButtons.Quote />
        <MenuButtons.Link />
      </MenuToolbar>
    );
  }
});

module.exports = MenuToolbar;
MenuToolbar.Basic = Basic;
