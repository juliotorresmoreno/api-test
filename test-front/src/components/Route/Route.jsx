// @flow

import React from 'react';
import { Route as RRDRoute } from 'react-router-dom';
import { RouteProps } from './@types';

const Route: React.FC<RouteProps> = (props) => {
  return (
    <RRDRoute {...props} />
  );
}

export default Route;
