var React = require('react');
var Button = require('../Button');

var Toolbar = React.creatClass({
  render() {
    return <div></div>;
  }
});

var Basic = React.createClass({
  render() {
    return (
      <Toolbar>
        <Button.Bold />
        <Button.Italic />
        <Button.H1 />
        <Button.H2 />
        <Button.H3 />
        <Button.Center />
        <Button.Quote />
        <Button.Link />
      </Toolbar>
    )
  }
});

module.exports = Toolbar;
Toolbar.Basic = Basic;
