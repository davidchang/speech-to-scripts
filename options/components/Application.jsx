var React = require('react/react');

require('bootstrap/dist/css/bootstrap.css');

var OptionsStore = require('./../stores/OptionsStore');
var OptionsActions = require('./../actions/OptionsActions');

var CommandsList = require('./CommandsList');

var getOptionsState = function() {
  return OptionsStore.options;
};

var Application = React.createClass({

  getInitialState : function() {
    return getOptionsState();
  },

  componentDidMount : function() {
    OptionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    OptionsStore.removeChangeListener(this._onChange);
  },

  render : function() {
    return (
      <div>
        <button onClick={this._saveChanges}>Save Changes</button>
        <CommandsList commands={this.state.commands} linkType="commands" />
      </div>
    );
  },

  _updateField : function(field, event) {
    OptionsActions.updateField(field, event.target.value);
  },

  _saveChanges : function() {
    return OptionsActions.saveOptions();
  },

  _onChange : function() {
    this.setState(getOptionsState());
  }

});

module.exports = Application;