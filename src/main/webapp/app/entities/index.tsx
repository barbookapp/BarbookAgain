import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bottle from './bottle';
import Spirit from './spirit';
import Category from './category';
import SubCategory from './sub-category';
import PrimaryBarrel from './primary-barrel';
import SecondaryBarrel from './secondary-barrel';
import Distillery from './distillery';
import Brand from './brand';
import Parent from './parent';
import UserHistory from './user-history';
import MyBook from './my-book';
import Favorite from './favorite';
import Feed from './feed';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}bottle`} component={Bottle} />
      <ErrorBoundaryRoute path={`${match.url}spirit`} component={Spirit} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}sub-category`} component={SubCategory} />
      <ErrorBoundaryRoute path={`${match.url}primary-barrel`} component={PrimaryBarrel} />
      <ErrorBoundaryRoute path={`${match.url}secondary-barrel`} component={SecondaryBarrel} />
      <ErrorBoundaryRoute path={`${match.url}distillery`} component={Distillery} />
      <ErrorBoundaryRoute path={`${match.url}brand`} component={Brand} />
      <ErrorBoundaryRoute path={`${match.url}parent`} component={Parent} />
      <ErrorBoundaryRoute path={`${match.url}user-history`} component={UserHistory} />
      <ErrorBoundaryRoute path={`${match.url}my-book`} component={MyBook} />
      <ErrorBoundaryRoute path={`${match.url}favorite`} component={Favorite} />
      <ErrorBoundaryRoute path={`${match.url}feed`} component={Feed} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
