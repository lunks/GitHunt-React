import React from 'react';
import { Route, Switch } from 'react-router';
import routes from './index';
import Navbar from '../components/Navbar';

const ReactGA = process.browser ? require('react-ga') : {};

const Panel =
  typeof window !== 'undefined'
    ? require('apollo-client-devtools').Panel
    : null;
console.log('tried loading panel', Panel);

if (process.browser) {
  // Initialize Analytics
  ReactGA.initialize('UA-74643563-4');
}

function logPageView() {
  if (process.browser) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  return null;
}

const Layout = () => (
  <div>
    <Route path="/" component={logPageView} />
    <Navbar />
    <div className="container">
      <Switch>
        {routes.map(route => <Route key={`route-${route.name}`} {...route} />)}
      </Switch>
    </div>
    {!!Panel && (
      <div>
        <div id="devtools" />
        <Panel />
      </div>
    )}
  </div>
);

export default Layout;
