import React from 'react';
import { Router, Route, Switch }from 'react-router-dom';
import UserEdit from './users/UserEdit';
import HomePage from './HomePage'
import history from '../history';

const App = () => {
  return (
    <div className = "App">
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/users/edit/:id" exact component={UserEdit} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;