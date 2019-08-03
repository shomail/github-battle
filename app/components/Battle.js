import React from 'react';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import Results from './Results';
import { ThemeConsumer } from '../contexts/theme';

const Instructions = () => (
  <ThemeConsumer>
    {({ theme }) => (
      <div className="instructions-container">
        <h1 className="center-text header-sm">Instructions</h1>
        <ol className="container-sm grid center-text battle-instructions">
          <li>
            <h3 className="header-sm">Enter two Github Users</h3>
            <FaUserFriends
              className={`bg-${theme}`}
              color="rgb(255,191,116)"
              size={140}
            />
          </li>
          <li>
            <h3 className="header-sm">Battle</h3>
            <FaFighterJet
              className={`bg-${theme}`}
              color="#727272"
              size={140}
            />
          </li>
          <li>
            <h3 className="header-sm">See the Winners</h3>
            <FaTrophy
              className={`bg-${theme}`}
              color="rgb(255,215,0)"
              size={140}
            />
          </li>
        </ol>
      </div>
    )}
  </ThemeConsumer>
);

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="Github Username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className={`btn ${theme === 'dark' ? 'light' : 'dark'}-btn`}
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const PlayerPreview = ({ username, onReset, label }) => (
  <div className="column player">
    <h3 className="player-label">{label}</h3>
    <div className="row bg-light">
      <div className="player-info">
        <img
          className="avatar-small"
          src={`http://github.com/${username}.png?size=200`}
          alt={`Avatar for ${username}`}
        />
        <a href={`http://github.com/${username}`} className="link">
          {username}
        </a>
      </div>
      <button className="btn-clear flex-center" onClick={onReset}>
        <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
      </button>
    </div>
  </div>
);

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    });
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;

    if (battle) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
          onReset={() =>
            this.setState({
              playerOne: null,
              playerTwo: null,
              battle: false,
            })
          }
        />
      );
    }

    return (
      <React.Fragment>
        <Instructions />
        <div className="player-container">
          <h2 className="center-text header-lg">Players</h2>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                onReset={() => this.handleReset('playerOne')}
                label="Player One"
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                onReset={() => this.handleReset('playerTwo')}
                label="Player Two"
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className="btn dark-btn btn-space"
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
