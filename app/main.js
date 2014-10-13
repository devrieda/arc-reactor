/** @jsx React.DOM */

var React = require('react');

var App = React.createClass({
    render: function() {
    return (
      <div>
        Hello, World
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('app'));
