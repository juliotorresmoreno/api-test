
// @flow

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SignUpForm from '../../components/Forms/SignUpForm';

const styles = {
  Row: {
    marginLeft: 0,
    marginRight: 0
  }
}

const SignUp = () => {
  return (
    <>
      <Row style={styles.Row}>
        <Col md={{ offset: 3, span: 6 }}>
          <header>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Registrate</h3>
          </header><br />
          <SignUpForm />
        </Col>
      </Row>
    </>
  );
};

export default SignUp;
