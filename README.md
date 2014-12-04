## Medium style editor in reactjs


React Editor
===========
Rich content editor compoment. Super alpha and under heavy dev.

Usage
-----
```xml
<Editor content={object} onChange={fn} />
```

Inside an app
-----
```js
var React = require('react');
var Editor = require('./components/Editor.js');
var Store = require('./ContentStore.json');

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

React.render(<App/>, document.body);
```

To run tests
-----

```bash
npm test
```
