var React = require('react/react');
var _ = require('lodash/lodash');

var OptionsActions = require('./../actions/OptionsActions');

var CommandsTable = React.createClass({

  render : function() {

    var linksHtml = _.map(this.props.links, function(link, i) {
      return (
        <tr>
          <td><input value={link.keywords} onChange={this._updateLinkField.bind(this, this.props.linkType, i, 'keywords')} /></td>
          <td><input value={link.script} onChange={this._updateLinkField.bind(this, this.props.linkType, i, 'script')} /></td>
          <td><input value={link.domains} onChange={this._updateLinkField.bind(this, this.props.linkType, i, 'domains')} /></td>
          <td>
            <button className="button-primary-small" onClick={this._removeRow.bind(this, this.props.linkType, i)}>Remove</button>
          </td>
        </tr>
      );
    }, this);

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
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>Script</th>
                <th>Domains</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {linksHtml}
            </tbody>
          </table>
        </div>

      </div>
    );
  },

  _addNewLink : OptionsActions.addNewLink,

  _updateLinkField : function(linkType, index, field, event) {
    OptionsActions.updateLinkField(linkType, index, field, event.target.value);
  },

  _removeRow : OptionsActions.removeLinkRow,

  _reverseToDefaults : OptionsActions.reverseToLinkDefaults

});

module.exports = CommandsTable;