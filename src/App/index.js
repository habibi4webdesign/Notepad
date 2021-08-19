import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routes } from 'routes/index';

const App = () => (
  <div>
    <Router>
      <div>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </div>
    </Router>
  </div>
);

export default App;
