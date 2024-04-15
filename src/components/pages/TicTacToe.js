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
  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for(const combination of winningCombinations) {
    const [a, b, c] = combination;
    const [rowA, columnA] = a;
    const [rowB, columnB] = b;
    const [rowC, columnC] = c;

    if(tiles[rowA][columnA] && tiles[rowA][columnA] === tiles[rowB][columnB] && tiles[rowA][columnA] === tiles[rowC][columnC]) {
      return tiles[rowA][columnA];
    };    
  };

  return null;
};

const getMatrix = (lengthOfMatrix, value) => {
  const matrix = [];
  for(let i = 0; i < lengthOfMatrix; i++) {
    const row = Array(lengthOfMatrix).fill(value);
    matrix.push(row);
  };

  return matrix;
}

const useTicTacToeGameState = initialPlayer => {
  const board = getMatrix(3, '');
  const [tiles, setTiles] = React.useState(board);
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = React.useState(false);

  React.useEffect(() => {
    const isTie = tiles.every(row => row.every(tile => tile !== ''));

    if(winner) {
      setGameEnded(true);
      return;
    };

    if(isTie) {
      setGameEnded(true);
      return;
    };
  })

  const setTileTo = (rowIndex, columnIndex, player) => {
    if(tiles[rowIndex][columnIndex] !== '') {
      return;
    };

    const newTiles = tiles.map((row, index) => 
      index === rowIndex ? row.map((value, index) => 
      index === columnIndex ? player : value) : row
    );

    setTiles(newTiles);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };
  const restart = () => {
    setTiles(getMatrix(3, ''));
    setCurrentPlayer(initialPlayer);
    setGameEnded(false);
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToeBoard = ({ tiles, setTileTo, currentPlayer }) => {
  return (
    <>
      {tiles.map((row, rowIndex) => (
        <div key={rowIndex} className="tictactoe-row">
          {row.map((tile, colIndex) => (
            <Square
              key={rowIndex * 3 + colIndex}
              value={tile}
              onClick={() => setTileTo(rowIndex, colIndex, currentPlayer)}
            />
          ))}
        </div>
      ))}
    </>
  );
};
TicTacToeBoard.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setTileTo: PropTypes.func.isRequired,
  currentPlayer: PropTypes.string.isRequired,
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={() => {restart()}} />
      <TicTacToeBoard tiles={tiles} setTileTo={setTileTo} currentPlayer={currentPlayer} />
    </div>
  );
};
export default TicTacToe;
