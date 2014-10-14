/** @jsx React.DOM */

var React = require('react');
var ReactEditor = require('./components/Editor.js');

var App = React.createClass({
  render: function() {
    return (
      <div class="content">
        <ReactEditor>
          <h1>Title</h1>
          <p>
            Here is a nice paragraph of text for something!
          </p>
        </ReactEditor>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.body);
