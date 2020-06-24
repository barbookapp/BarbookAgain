import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Feed from './feed';
import FeedDetail from './feed-detail';
import MyBookUpdate from './my-book-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FeedDetail} />
      <ErrorBoundaryRoute path={match.url} component={Feed} />
      <ErrorBoundaryRoute path={`${match.url}/:id/edit`} component={MyBookUpdate} />
      <ErrorBoundaryRoute path={`${match.url}/new`} component={MyBookUpdate} />
    </Switch>
  </>
);

export default Routes;
