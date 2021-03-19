import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Principal from './components/Principal'
import NovoCelular from './components/NovoCelular'

export default props => {

    return(
        <Router>
            <Switch>
             <Route exact path='/'>
                <Principal></Principal>
            </Route>

            <Route exact path='/criar'>
                <NovoCelular tipo={false}/>
            </Route>

            <Route exact path={`/editar/:idAltera`}>
                <NovoCelular tipo={true}/>
            </Route>
            </Switch>
        </Router>
    )
}