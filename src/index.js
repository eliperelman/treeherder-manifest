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

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <main>
        <Switch>
          <Route exact path="/" component={NotFound} />
          <Route exact path="/:pushId" component={Suites} />
          <Route exact path="/:pushId/tests/:testId" component={Test} />
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
