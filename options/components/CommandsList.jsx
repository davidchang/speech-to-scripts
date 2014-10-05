var React = require('react/react');

var OptionsActions = require('./../actions/OptionsActions');

var Command = require('./Command');

var CommandsTable = React.createClass({

  render : function() {

    return (
      <div>
        <div className="page-header">
          <h1>Speech to Script Commands</h1>
        </div>

        <div className="button-group">
          <button type="button"
                  className="btn btn-default"
                  onClick={this._saveChanges}>
            Save Changes
          </button>
          <button type="button"
                  className="btn btn-default"
                  onClick={this._addNewLink.bind(this, this.props.linkType)}>
            Add New
          </button>
          <button type="button"
                  className="btn btn-default"
                  onClick={this._reverseToDefaults.bind(this, this.props.linkType)}>
            Restore Defaults
          </button>
        </div>

        <ul className="list-unstyled">
          {this.props.commands.map((command, i) => {
            return (
              <li>
                <Command command={command} linkType={this.props.linkType} index={i} />
              </li>
            );
          }, this)}
        </ul>

      </div>
    );
  },

  _saveChanges : OptionsActions.saveOptions,

  _addNewLink : OptionsActions.addNewLink,

  _reverseToDefaults : OptionsActions.reverseToLinkDefaults

});

module.exports = CommandsTable;