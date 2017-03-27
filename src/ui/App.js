import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Suites from './Suites';
import Test from './Test';
import NotFound from './NotFound';

function hasProps(search) {
  const params = new URLSearchParams(search);

  return params.get('repo') && params.get('revision');
}

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <main>
        <Switch>
          <Route exact path="/" render={props => (hasProps(props.location.search) ?
            <Suites {...props} /> :
            <NotFound {...props} />)} />
          <Route name="search" path="?revision=:revision&repo=:repo" handler={Suites} />
          <Route exact path="/:pushId/tests/:testId" component={Test} />
          <Route name="notfound" component={NotFound} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
