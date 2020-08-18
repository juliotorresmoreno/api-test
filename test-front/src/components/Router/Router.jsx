// @flow

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '../Route';
import News from '../../pages/News';

const Router = () => {
  return (
    <>
      <Switch>
        <Route path='/' component={News} exact={true} />
        <Route path='/news' component={News} exact={false} />
      </Switch>
    </>
  )
}

export default Router;
