import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

class SpeechCommandScript extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.resetId !== this.props.resetId;
  }

  render() {
    const {command, id, actions} = this.props;

    let loaded = false;

    let onLoad = () => {
      loaded = true;
    };

    let onScriptChange = (updatedText) => {
      if (!loaded) {
        return;
      }

      actions.update(id, {
        ...command,
        script : updatedText
      });
    };

    return (
      <AceEditor
        mode="javascript"
        theme="github"
        width="100%"
        maxLines={20}
        onChange={onScriptChange}
        onLoad={onLoad}
        value={command.script}
        name={`command-${id}`} />
    );
  }
}

SpeechCommandScript.propTypes = {
  id: PropTypes.number.isRequired,
  resetId: PropTypes.number.isRequired,
  command: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default SpeechCommandScript;
