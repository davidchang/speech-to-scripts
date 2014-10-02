var React = require('react/react');

var OptionsStore = require('./../stores/OptionsStore');
var OptionsActions = require('./../actions/OptionsActions');

var CommandsTable = require('./CommandsTable');

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
        <CommandsTable links={this.state.commands} linkType="commands" />
      </div>
    );
  },

  _updateField : function(field, event) {
    OptionsActions.updateField(field, event.target.value);
  },

  _onChange : function() {
    this.setState(getOptionsState());
  }

});

module.exports = Application;