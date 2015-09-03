import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Debugger from '../components/Debugger';
import * as SpeechCommandsActions from '../actions/speechCommands';

class SpeechToScriptApp extends Component {

  render() {
    const { speechCommands, debugMessage, dispatch } = this.props;
    const actions = bindActionCreators(SpeechCommandsActions, dispatch);

    return (
      <div style={{padding : '0px 50px'}}>
        <Header actions={actions} />
        <Debugger actions={actions} speechCommands={speechCommands} />
        <MainSection speechCommands={speechCommands} actions={actions} />
      </div>
    );
  }
}

function select(state) {
  return {
    speechCommands: state.speechCommands
  };
}

export default connect(select)(SpeechToScriptApp);
