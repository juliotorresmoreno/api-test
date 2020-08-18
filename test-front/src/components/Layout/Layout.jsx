
import React from 'react';
import Router from '../Router';
import UnauthenticateNavBar from '../UnauthenticateNavBar/UnauthenticateNavBar';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import Route from '../Route';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import { DefaultState } from '../../store/types';
import Footer from '../Footer/Footer';
import AuthenticateNavBar from '../AuthenticateNavBar/AuthenticateNavBar';

const mapProps = (state: DefaultState) => ({
  logged: state.auth.logged
});

interface LayoutProps {
  logged: Boolean
}

const Layout: React.FC<LayoutProps> = (props) => {
  if (!props.logged) {
    return (
      <>
        <UnauthenticateNavBar />
        <br />
        <Switch>
          <Route component={() => <Redirect to='/sign-in' />} path='/' exact />
          <Route component={SignIn} path='/sign-in' exact />
          <Route component={SignUp} path='/sign-up' exact />
          <Route component={Router} />
        </Switch>
        <br /><br />
        <Footer />
      </>
    );
  }
  return (
    <>
      <AuthenticateNavBar />
      <br />
      <Router />
    </>
  );
}

export default connect(mapProps)(Layout);
