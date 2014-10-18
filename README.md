## Medium style editor in reactjs


React Editor
===========

Medium style rich content editor compoment. Super alpha

Usage
-----
```xml
<Editor content={object} onChange={fn} />
```

Inside an app
-----
```js
/** @jsx React.DOM */

var React = require('react');
var Editor = require('./components/Editor.js');
var Store = require('./stores/ContentStore.json');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} }
  },

  componentWillMount: function() {
    this.setState({content: Store.find()});
  },

  contentChanged: function(json) {
    // handle when content changes
  },

  render: function() {
    return (
      <div>
        <h1>React Editor</h1>
        <Editor content={this.state.content} onChange={this.contentChanged} />
      </div>
    );
  }
});

React.renderComponent(<App/>, document.body);
```

To run tests
-----

```bash
npm test
```
