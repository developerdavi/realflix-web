import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeScreen from './Pages/HomeScreen';
import LoginScreen from './Pages/LoginScreen';
import AdminScreen from './Pages/AdminScreen';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/admin" component={AdminScreen} />
      </Switch>
    </Router>
  );
}
