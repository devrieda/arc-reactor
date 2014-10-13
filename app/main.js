/** @jsx React.DOM */

var React = require('react');
var ReactEditor = require('./react-editor');

var App = React.createClass({
  render: function() {
    return (
      <ReactEditor>
        <h1>Title</h1>
        <p>
          Body
        </p>
      </ReactEditor>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('app'));
