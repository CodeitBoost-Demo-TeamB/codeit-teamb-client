import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicGroupList from './pages/PublicGroupList';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PublicGroupList} />
      </Switch>
    </Router>
  );
}

export default App;
