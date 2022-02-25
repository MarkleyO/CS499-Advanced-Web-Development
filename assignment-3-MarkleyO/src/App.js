import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Search from './pages/Search';

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div>
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
