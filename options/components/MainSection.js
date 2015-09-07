import React, { Component, PropTypes } from 'react';
import SpeechCommand from './SpeechCommand';

class MainSection extends Component {

  componentWillMount() {
    this.props.actions.loadSpeechCommands();
  }

  render() {
    const { speechCommands, actions } = this.props;

    return (
      <section className="main">
        <ul style={{'listStyleType' : 'none', 'paddingLeft' : '0px'}}>
          {(speechCommands.commands || []).map((command, i) => {
            return (
              <li key={`command_${i}`} style={{'padding' : '25px 0px', 'borderBottom' : '1px solid #CCC'}}>
                <SpeechCommand
                  id={i}
                  command={command}
                  debugMessage={speechCommands.debugMessage}
                  actions={actions} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

}

MainSection.propTypes = {
  speechCommands: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
