import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, ConfigManager } from 'arc-reactor';
import Config from './Config';
import Store from './ContentStore';

ConfigManager.install(Config);

var App = React.createClass({
  contentChanged: function(json) {
    Store.update(json);
  },

  render: function() {
    var content = Store.find();

    return (
      <Editor content={content} onChange={this.contentChanged} />
    );
  }
});

ReactDOM.render(<App/>, document.getElementById("example"));
