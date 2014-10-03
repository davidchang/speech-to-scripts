var React = require('react/react');

var OptionsActions = require('./../actions/OptionsActions');

var Command = React.createClass({

  render : function() {

    return (
      <section>
        <div>
          <div>Command</div>
          <input value={this.props.command.keywords}
                 onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'keywords')} />
        </div>

        <div>
          <div>Script</div>
          <input value={this.props.command.script}
                 onChange={this._updateLinkField.bind(this, this.props.linkType, this.props.index, 'script')} />
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