var React = require('react/react');

require('bootstrap/dist/css/bootstrap.css');
require('styles');

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
        <CommandsList commands={this.state.commands} linkType="commands" />
      </div>
    );
  },

  _onChange : function() {
    this.setState(getOptionsState());
  }

});

module.exports = Application;