import React, { PropTypes, Component } from 'react';

class Header extends Component {

  render() {
    return (
      <header className="header">
        <h1>Speech to Script Commands</h1>

        <div className="button-group">
          <button type="button"
                  className="btn btn-default"
                  onClick={this.props.actions.save}>
            Save Changes
          </button>
          <button type="button"
                  className="btn btn-default"
                  onClick={this.props.actions.addNew}>
            Add New
          </button>
          <button type="button"
                  className="btn btn-default"
                  onClick={this.props.actions.restoreDefaults}>
            Restore Defaults
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  actions: React.PropTypes.shape({
    save: PropTypes.func.isRequired,
    addNew: PropTypes.func.isRequired,
    restoreDefaults: PropTypes.func.isRequired,
    loadSpeechCommands: PropTypes.func.isRequired
  })
};

export default Header;
