import React, {useState} from 'react';
import './Field.css';
import  Cookies from 'universal-cookie';

const cookies = new Cookies();
const posPlayer1 = [];
const posPlayer2 = [];
const Field = () =>{
    window.ethereum.autoRefreshOnNetworkChange=false;

    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const HourPlay = new Date().toLocaleTimeString();

    const catchPlayer1 = (e) => {
        setPlayer1(e.target.value.trim());
    }
    
    const catchPlayer2 = (e) => {
        setPlayer2(e.target.value.trim());
    }
    
    const startGame = async e => {
        e.preventDefault();
    if(player1!==""&&player2!==""){
            let params = {
                    "play":{
                        id:player1+"-"+player2+"-"+HourPlay,
                        move:0,
                            "players":[
                                {
                                    "player1":{
                                        name:player1,
                                        squares:posPlayer1,
                                    }
                                },
                                {
                                    "player2":{
                                        name:player2,
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
                .then(data => {
                    cookies.set('id',data.body,{path:"/"});
                    cookies.set('player1',player1,{path:"/"});
                    cookies.set('player2',player2,{path:"/"});
                    window.location.href="./triki";
                });
            }
            catch(e){
                alert(e);
            }

        }
        else{
            alert("Please enter a name for players");
        }
    }
    return(
      <div className="containerBack">
        <form onSubmit={startGame}>
            <div className="button">
            <label className="customText">Please enter the name of the players</label>
                <div className="rowInput"> 
                    <div className="input-group flex-nowrap inputCustom">
                        <input type="text" className="form-control inpCustom" placeholder="player1" value={player1} onChange={catchPlayer1} aria-describedby="addon-wrapping"></input>
                    </div>
                    <div className="input-group flex-nowrap inputCustom">
                        <input type="text" className="form-control inpCustom" placeholder="player2" value={player2} onChange={catchPlayer2} aria-describedby="addon-wrapping"></input>
                    </div>
                </div>      
                <button type="submit" className="btn btn-success btnCustom">Start game</button>
            </div>
        </form>
        </div>
    )
}
export default Field;
