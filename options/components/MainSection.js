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
        <ul style={{'list-style-type' : 'none', 'padding-left' : '0px'}}>
          {(speechCommands.commands || []).map((command, i) => {
            return (
              <li style={{'padding' : '20px 0px', 'border-bottom' : '1px solid #CCC'}}>
                <SpeechCommand id={i} command={command} actions={actions} />
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
