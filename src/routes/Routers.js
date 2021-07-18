import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import App from '../pages/App';
import Field from '../components/Field/Field';
import Winner from '../components/Winner/Winner';


const Routers = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Field}/>
                <Route exact path="/triki" component={App}/>
                <Route exact path="/winner" component={Winner}/>                
            </Switch>
        </BrowserRouter>
    );
}
export default Routers;