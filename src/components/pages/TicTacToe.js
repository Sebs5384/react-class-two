import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};
WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }

  return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = React.useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = React.useState(false);

  const setTileTo = (tileIndex, player) => {
    if(tiles[tileIndex] !== '') {
      return;
    };

    const newTiles = [...tiles];
    newTiles[tileIndex] = player;
    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };
  const restart = () => {
    setTiles(Array(9).fill(''));
    setCurrentPlayer(initialPlayer);
    setGameEnded(false);
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">
      <WinnerCard show={winner} winner={winner} onRestart={() => {restart()}} />
      <div className="tictactoe-row">
        <Square key={0} value={tiles[0]} onClick={() => {setTileTo(0, currentPlayer)}} />
        <Square key={1} value={tiles[1]} onClick={() => {setTileTo(1, currentPlayer)}} />
        <Square key={2} value={tiles[2]} onClick={() => {setTileTo(2, currentPlayer)}} />
      </div>
      <div className="tictactoe-row">
        <Square key={3} value={tiles[3]} onClick={() => {setTileTo(3, currentPlayer)}} />
        <Square key={4} value={tiles[4]} onClick={() => {setTileTo(4, currentPlayer)}} />
        <Square key={5} value={tiles[5]} onClick={() => {setTileTo(5, currentPlayer)}} />
      </div>
      <div className="tictactoe-row">
        <Square key={6} value={tiles[6]} onClick={() => {setTileTo(6, currentPlayer)}} />
        <Square key={7} value={tiles[7]} onClick={() => {setTileTo(7, currentPlayer)}} />
        <Square key={8} value={tiles[8]} onClick={() => {setTileTo(8, currentPlayer)}} />
      </div>
    </div>
  );
};
export default TicTacToe;
