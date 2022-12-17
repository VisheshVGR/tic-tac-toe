import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid',
  'position': 'relative'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
  'cursor': "pointer",
}

const singleCellStyle = {
  'width': "100%",
  'height': "100%",
  "cursor": "pointer",
}

const blockInput = {
  'position': "absolute",
  'top': "0",
  'left': "0",
  'height': "100%",
  'width': "100%",
  'backgroundColor': "rgba(0,255,0,0.1)",
}


function Square({ boardValue, idx, setBoardValue, xTurn, setXTurn }) {
  const handleClick = () => {
    // let newBoardValue = boardValue;
    // console.log(newBoardValue)
    // console.log(newBoardValue)

    // newBoardValue[idx] = xTurn ? 1 : 0;

    setBoardValue(current => { current[idx] = xTurn ? 1 : 0; return [...current] })
    setXTurn(current => !current)
    // setBoardValue(newBoardValue)
    // console.log(newBoardValue)
  }

  return (
    <div
      className="square"
      style={squareStyle}>
      {
        boardValue[idx] === 0 && "O"
      }
      {
        boardValue[idx] === 1 && "X"
      }
      {
        boardValue[idx] === -1 &&
        <>
          <button style={singleCellStyle} onClick={handleClick} />
        </>
      }
    </div>
  );
}

function Board() {
  // -1 = not filled // 0 = O // 1 = X
  const [boardValue, setBoardValue] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [xTurn, setXTurn] = useState(true);
  const [winnerFound, setWinnerFound] = useState(false);

  const checkIfWon = () => {
    if (
      (boardValue[0] === boardValue[1] && boardValue[1] === boardValue[2] && boardValue[2] !== -1) ||
      (boardValue[3] === boardValue[4] && boardValue[4] === boardValue[5] && boardValue[5] !== -1) ||
      (boardValue[6] === boardValue[7] && boardValue[7] === boardValue[8] && boardValue[8] !== -1) ||
      (boardValue[0] === boardValue[3] && boardValue[3] === boardValue[6] && boardValue[6] !== -1) ||
      (boardValue[1] === boardValue[4] && boardValue[4] === boardValue[7] && boardValue[7] !== -1) ||
      (boardValue[2] === boardValue[5] && boardValue[5] === boardValue[8] && boardValue[8] !== -1) ||
      (boardValue[0] === boardValue[4] && boardValue[4] === boardValue[8] && boardValue[8] !== -1) ||
      (boardValue[6] === boardValue[4] && boardValue[4] === boardValue[2] && boardValue[2] !== -1)
    ) {
      setWinnerFound(true);
    }
  }

  useEffect(() => {
    checkIfWon();
  })

  const handleResetGame = () => {
    setBoardValue([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setWinnerFound(false);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{xTurn ? "X" : "O"}</span></div>
      {
        winnerFound &&
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{xTurn ? "O" : "X"}</span></div>
      }
      <button style={buttonStyle} onClick={handleResetGame}>Reset</button>
      <div style={boardStyle}>
        {
          winnerFound &&
          <div style={blockInput} />
        }
        <div className="board-row" style={rowStyle}>
          <Square boardValue={boardValue} idx={0} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={1} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={2} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square boardValue={boardValue} idx={3} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={4} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={5} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square boardValue={boardValue} idx={6} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={7} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
          <Square boardValue={boardValue} idx={8} xTurn={xTurn} setXTurn={setXTurn} setBoardValue={setBoardValue} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game
// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );