import './Winner.css';
import  Cookies from 'universal-cookie';

const cookies = new Cookies();

const Winner = () =>{
    window.ethereum.autoRefreshOnNetworkChange=false;
    let message ="";
    let winner = "";
    winner = cookies.get('winner');
    if (winner === ""){
        message ="There are no winners";
    }else{
        message = "Congratulations "+winner+" you have won the game";
    }

    const reset = () =>{
        window.location.href="/";  
    }

    return(
        <div className="containerBack">
            <div className="button">
            <label className="customText">{message}</label>
                <div className="rowInput"> 
                </div>      
                <button className="btn btn-success btnCustom" onClick={reset}>Try again</button>
            </div>
        </div>
    )
}
export default Winner;