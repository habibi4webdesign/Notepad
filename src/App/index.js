import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from 'routes/index';

const App = () => (
  <div>
    <Router>
      <div className="app">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
