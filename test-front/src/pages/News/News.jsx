
// @flow

import React from 'react';
import { connect } from 'react-redux';

import List from './List';
import NewPost from './NewPost';
import { Switch, Route } from 'react-router-dom';

interface NewsProps {
  news: any[]
}

const News: React.FC<NewsProps> = (props) => {
  return (
    <>
      <Switch>
        <Route path='/news/new' component={NewPost} />
        <Route path='/' component={List} exact={true} />
      </Switch>
    </>
  );
};

export default connect()(News);
