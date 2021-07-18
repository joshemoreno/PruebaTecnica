import React, {useState} from 'react';
import '../css/App.css';
import Board from '../components/Board/Board';
import Cookies from 'universal-cookie';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cookies = new Cookies();
const posPlayer1 = [];
const posPlayer2 = [];
let move=1;

const App = () => {

  window.ethereum.autoRefreshOnNetworkChange=false;
  const [players] = useState({
    0:cookies.get('player1'),
    1:cookies.get('player2')
  });
  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));

  const reset = (winner) => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    cookies.set('winner',winner,{path:"/"});
    window.location.href="./winner";
  }

  const checkForWinner = newSquares => {
    setTurn(turn === 'X' ? 'O' : 'X');
    setTimeout(function(){
    for(let i = 0; i < winningPositions.length; i++) {
      const [a,b,c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a]);
      }
    }
  }, 100);

  if(!newSquares.includes(null)){
    endGame(null);
  }
  }

  const handleClick = square =>{
    let newSquare = [...squares];
    newSquare.splice(square,1,turn);
    setSquares(newSquare);
    checkForWinner(newSquare);
      if (turn==="X"){
        posPlayer1.push(square);
      }else{
        posPlayer2.push(square);
      }

      let params = {
        "play":{
           id:cookies.get('id'),
           move:move,
           turn:turn,
                "players":[
                    {
                        "player1":{
                            name:players[0],
                            squares:posPlayer1,
                        }
                    },
                    {
                        "player2":{
                            name:players[1],
                            squares:posPlayer2,
                        }
                    },
                ]
            }
        };

      let config = {
          mode:'cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'X-Api-Key':'wexgkjiK7J6HidcXr6sG5RgMSVV3Alf4eiYr0spj'
          },
          body: JSON.stringify(params)
      };

      try{
          fetch('https://8eskw18iy5.execute-api.us-east-2.amazonaws.com/deploy/startgame', config)
          .then(response => response.json())
          .then(data => (data));
      }
      catch(e){
          alert(e);
      }
      move=move+1;
  };

  const endGame = (winner) => {
    setTurn(null);
    if(winner==="X"){
      winner=cookies.get('player1');
    }else if (winner==="O"){
      winner=cookies.get('player2');
    }else{
      winner="";
    }

    let params = {
        "play":{
            id:cookies.get('id'),
            winner:winner
            }
        };

      let config = {
          mode:'cors',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'X-Api-Key':'wexgkjiK7J6HidcXr6sG5RgMSVV3Alf4eiYr0spj'
          },
          body: JSON.stringify(params)
      };
      
      try{
          fetch('https://8eskw18iy5.execute-api.us-east-2.amazonaws.com/deploy/startgame', config)
          .then(response => response.json())
          .then(data => (data));
      }
      catch(e){
          alert(e);
      }
      reset(winner);
  };

   return (
        <div className="containerBack">
          <div className="names">
            <label className="name"><label className="name2">player1: </label>{players[0]}</label>
            <label className="name"><label className="name2">player2: </label>{players[1]}</label>
          </div>
          <Board turn={turn} squares={squares} onClick={handleClick} />
        </div>
  );
}

export default App;
