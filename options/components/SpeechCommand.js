import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

class SpeechCommand extends Component {

  render() {
    const {command, id, actions} = this.props;

    const onScriptChange = (updatedText) => {
      actions.update(id, {
        ...command,
        script : updatedText
      });
    };

    const onKeywordChange = (event) => {
      actions.update(id, {
        ...command,
        keywords : event.target.value
      });
    };


    return (
      <section>
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
          <strong>Script to execute</strong> (utilize the `captured` array, as well as jQuery):
        </div>

        <AceEditor
          mode="javascript"
          theme="github"
          width="100%"
          maxLines={20}
          onChange={onScriptChange}
          value={command.script}
          name={`command-${id}`} />
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
