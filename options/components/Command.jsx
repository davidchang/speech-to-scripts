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
    return (
      <form className="form-horizontal command">
        <div className="form-group">
          <label className="col-sm-1 control-label"
                 for={'keywords' + this.props.index}>
            Command
          </label>
          <div className="col-sm-11">
            <div className="input-group">
              <input value={this.props.command.keywords}
                 id={'keywords' + this.props.index}
                 className="form-control"
                 onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'keywords')} />
                 <span className="input-group-btn">
                    <button className="btn btn-default"
                            type="button"
                            onClick={this._removeRow.bind(this, this.props.linkType, this.props.index)}>
                      Remove Command
                    </button>
                  </span>
              </div>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-1 control-label"
                 for={'domains' + this.props.index}>
            Domains
          </label>
          <div className="col-sm-11">
            <input value={this.props.command.domains}
               id={'domains' + this.props.index}
               className="form-control"
               onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'domains')} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-1 control-label"
                 for={'editor' + this.props.index}>
            Script
          </label>
          <div className="col-sm-11">
            <div className="editor" id={'editor' + this.props.index}>
              {this.props.command.script}
            </div>
          </div>
        </div>

      </form>
    );
  },

  _updateLinkField : (linkType, index, field, event) => {
    OptionsActions.updateLinkField(linkType, index, field, event.target.value);
  },

  _removeRow : OptionsActions.removeLinkRow

});

module.exports = Command;