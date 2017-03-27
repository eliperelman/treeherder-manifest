import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './ui/Navigation';
import Suites from './ui/Suites';
import Test from './ui/Test';
import NotFound from './ui/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './global.css';
import { Provider } from 'react-redux';
import { store, actions } from './redux/store';

function hasProps(search) {
  const params = new URLSearchParams(search);
  return (params.get('repo') && params.get('revision'));
}

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <main>
        <Switch>
          <Route exact path="/" render={props => (
            hasProps(props.location.search) ? React.createElement(Suites, props) : (
              React.createElement(NotFound, props))
          )} />
          <Route name="search" path="?revision=:revision&repo=:repo" handler={Suites} />
          <Route exact path="/:pushId/tests/:testId" component={Test} />
          <Route name="notfound" component={NotFound} />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

render((
  <Provider store={store}>
    <App actions={actions} />
  </Provider>
), document.getElementById('root'));
