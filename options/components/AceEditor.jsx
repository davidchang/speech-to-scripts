var React = require('react/react');

var AceEditor = React.createClass({

  shouldComponentUpdate : function() {
    return false;
  },

  componentDidMount : function() {
    var editor = ace.edit(this.props.editorId);
    editor.setTheme('ace/theme/crimson_editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.getSession().on('change', () => this.props.onChange(editor.getValue()));
  },

  render : function() {
    return (
      <div className="editor" id={this.props.editorId}>
        {this.props.editorContent}
      </div>
    );
  }

});

module.exports = AceEditor;