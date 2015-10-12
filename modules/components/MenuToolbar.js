const React = require('react');
const MenuButtons = require('./MenuButtons');

const MenuToolbar = React.createClass({
  render() {
    return <div></div>;
  }
});

const Basic = React.createClass({
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
