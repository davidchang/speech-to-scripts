var React = require('react/react');
var _ = require('lodash');

var OptionsActions = require('./../actions/OptionsActions');

var Command = React.createClass({

  shouldComponentUpdate : function(nextProps, nextState) {
    var next = _.clone(nextProps, true);
    var current = _.clone(this.props, true);

    delete next.command.script;
    delete current.command.script;

    return next == current;
  },

  componentDidMount : function() {
    var editor = ace.edit('editor' + this.props.index);
    editor.setTheme('ace/theme/crimson_editor');
    editor.getSession().setMode('ace/mode/javascript');

    var updateScript = OptionsActions.updateLinkField.bind(this, this.props.linkType, this.props.index, 'script');

    editor.getSession().on('change', function(e) {
      updateScript(editor.getValue());
    });
  },

  render : function() {
    // TODO: Styling
    return (
      <section>
        <div>
          <div>Command</div>
          <input value={this.props.command.keywords}
                 onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'keywords')} />
        </div>

        <div>
          <div>Script</div>
          <div className="editor" id={'editor' + this.props.index}>
            {this.props.command.script}
          </div>
        </div>

        <div>
          <div>Domains</div>
          <input value={this.props.command.domains}
                 onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'domains')} />
        </div>

        <div>
          <button className="button-primary-small" onClick={this._removeRow.bind(this, this.props.linkType, this.props.index)}>Remove</button>
        </div>

      </section>
    );
  },

  _updateLinkField : (linkType, index, field, event) => {
    OptionsActions.updateLinkField(linkType, index, field, event.target.value);
  },

  _removeRow : OptionsActions.removeLinkRow

});

module.exports = Command;