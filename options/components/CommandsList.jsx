var React = require('react/react');

var OptionsActions = require('./../actions/OptionsActions');

var Command = require('./Command');

var CommandsTable = React.createClass({

  render : function() {

    return (
      <div>
        <h3>Commands:</h3>

        <div className="table-wrap">
          <div className="table-leader">
            <div className="table-leader-actions">
              <button className="button-primary-large" onClick={this._addNewLink.bind(this, this.props.linkType)}>Add New</button>
              <button className="button-secondary-large" onClick={this._reverseToDefaults.bind(this, this.props.linkType)}>Reset to Defaults</button>
            </div>
          </div>

          <ul>
            {this.props.commands.map((command, i) => {
              return (
                <li>
                  <Command command={command} linkType={this.props.linkType} index={i} />
                </li>
              );
            }, this)}
          </ul>

        </div>

      </div>
    );
  },

  _addNewLink : OptionsActions.addNewLink,

  _reverseToDefaults : OptionsActions.reverseToLinkDefaults

});

module.exports = CommandsTable;