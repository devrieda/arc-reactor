## Medium style editor in reactjs


React Editor
===========
Rich content editor component. Super alpha and under heavy dev.

Usage
-----
```xml
<Editor>
  <Content content={object} onChange={fn} />
  <Toolbar.Basic />
</Editor>
```

Inside an app
-----
```js
var React = require('react');
var ReactEditor = require('react-editor');
var { Editor, Content, Toolbar, Button } = ReactEditor;
var ContentStore = require('./ContentStore.json');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} }
  },

  componentWillMount: function() {
    this.setState({content: ContentStore.find()});
  },

  contentChanged: function(json) {
    // handle when content changes
  },

  render: function() {
    return (
      <div>
        <h1>React Editor</h1>
        <Editor>
          <Content content={this.state.content} onChange={this.contentChanged} />
          <Toolbar.Basic />
        </Editor>
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

To view examples
-----

```bash
npm run examples
```
