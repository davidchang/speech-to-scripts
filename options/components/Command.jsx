var React = require('react/react');
var _ = require('lodash');

var OptionsActions = require('./../actions/OptionsActions');

var AceEditor = require('./AceEditor');

var Command = React.createClass({

  render : function() {
    return (
      <form className="form-horizontal command">
        <div className="form-group">
          <label className="col-sm-1 control-label">
            Command
          </label>
          <div className="col-sm-11">
            <div className="input-group">
              <input value={this.props.command.keywords}
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
          <label className="col-sm-1 control-label">
            Domains
          </label>
          <div className="col-sm-11">
            <input value={this.props.command.domains}
               className="form-control"
               onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'domains')} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-1 control-label">
            Script
          </label>
          <div className="col-sm-11">
            <AceEditor editorId={'editor' + this.props.index}
              editorContent={this.props.command.script}
              onChange={this._updateScript.bind(this, this.props.linkType, this.props.index, 'script')} />
          </div>
        </div>

      </form>
    );
  },

  _updateScript : (linkType, index, field, value) => {
    OptionsActions.updateLinkField(linkType, index, field, value);
  },

  _updateLinkField : (linkType, index, field, event) => {
    OptionsActions.updateLinkField(linkType, index, field, event.target.value);
  },

  _removeRow : OptionsActions.removeLinkRow

});

module.exports = Command;