import * as React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import AppContainer from '../ui/AppContainer';
import Index from '../ui/Index';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Index}/>
    </Route>
  </Router>
);