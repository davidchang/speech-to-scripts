import React, { Component, PropTypes } from 'react';
import SpeechCommandScript from './SpeechCommandScript';

class SpeechCommand extends Component {

  render() {
    const {command, id, debugMessage, actions, resetId} = this.props;

    let regexResults;
    try {
      let regex = new RegExp(command.keywords);
      regexResults = regex.exec(debugMessage.text);
    } catch(e) {}

    let onKeywordChange = (event) => {
      actions.update(id, {
        ...command,
        keywords : event.target.value
      });
    };

    let getDebugHtml = () => {
      if (debugMessage && debugMessage.text && regexResults) {
        return (
          <div style={{color: 'red'}}>
            <p>
              <strong>Debug</strong>: Command matched!
            </p>
            {(regexResults.length > 1) && (
              <p>
                <strong>Captured from regular expression</strong>: {JSON.stringify(regexResults.splice(1))}
              </p>
            )}
          </div>
        );
      }
    };


    return (
      <section>

        {getDebugHtml()}

        <div style={{marginBottom: '5px'}}>
          <strong>Regular expression to match speech</strong>:
          <a style={{float : 'right'}} href="#" onClick={() => this.props.actions.remove(id)}>Remove</a>
        </div>

        <div>
          <input
            style={{width: '100%', 'marginBottom' : '10px'}}
            type="text"
            value={command.keywords}
            placeholder="Command here"
            onChange={onKeywordChange} />
        </div>

        <div style={{marginBottom: '5px'}}>
          <strong>Script to execute</strong> (utilize the <code>captured</code> array for regex captured vars; jQuery 2.1 is also available):
        </div>

        <SpeechCommandScript
          id={id}
          command={command}
          actions={actions}
          resetId={resetId} />
      </section>
    );
  }
}

SpeechCommand.propTypes = {
  id: PropTypes.number.isRequired,
  command: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default SpeechCommand;
