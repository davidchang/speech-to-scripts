import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

class Debugger extends Component {

  debugMessageListener(message) {
    this.props.actions.logDebugMessage(message);
  }

  componentWillMount() {
    chrome.extension.onMessage.addListener(message => this.debugMessageListener(message));
  }

  componentWillUnmount() {
    // TODO doubtful that this actually gets removed as intended
    chrome.extension.onMessage.removeListener(this.debugMessageListener);
  }

  render() {
    return (
      <section style={{
        borderTop: '1px solid #CCC',
        borderBottom: '1px solid #CCC',
        marginTop: '20px'
      }}>
        <h3>Debugger - activate the plugin, then speak to see what Chrome hears and what commands will run</h3>
        {!_.isEmpty(this.props.speechCommands.debugMessage) && (
          <section>
            <p>
              <strong>Speech received</strong>: {this.props.speechCommands.debugMessage.text}
            </p>
            <p>
              Commands matching the received speech string are designated below in red.
            </p>
          </section>
        )}
      </section>
    );
  }
}

export default Debugger;
