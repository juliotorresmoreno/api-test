
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SignInForm from '../../components/Forms/SignInForm';

const styles = {
  Row: {
    marginLeft: 0,
    marginRight: 0
  }
}

const Signin = () => {
  return (
    <>
      <Row style={styles.Row}>
        <Col md={{ offset: 4, span: 4 }}>
          <header>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Ingresa
            </h3>
          </header><br />
          <SignInForm />
        </Col>
      </Row>
    </>
  );
}

export default Signin;
