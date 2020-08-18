
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ShowErrorMessage from '../ShowErrorMessage/ShowErrorMessage';
import * as actionsAuth from '../../actions/auth';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { isEmail } from './validator';

interface SignInFormProps extends RouteComponentProps {
  dispatch: ThunkDispatch
}

const SignInForm: React.FC<SignInFormProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChange = (setter) => (evt) => {
    setter(evt.target.value);
  }
  const onBlur = (setter, validator, alias) =>
    (evt: React.FocusEvent<HTMLInputElement>) => {
      const result = validator(alias, evt.target.value);
      setter(result);
    }

  const onSubmit = async (evt: React.FormEvent<HTMLElement>) => {
    evt.preventDefault();
    try {
      await props.dispatch(actionsAuth.login({
        email,
        password
      }));
      props.history.push('/');
    } catch (error) {
      console.log(error);
      const apiError: APIError<actionsUsers.User> = error;
      if (apiError.details) {
        setPasswordError('Usuario o contraseña invalido.');
      }
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email" value={email}
          onBlur={onBlur(setEmailError, isEmail, 'Email')}
          onChange={onChange(setEmail)}
        />
        <ShowErrorMessage msg={emailError} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password" value={password}
          onChange={onChange(setPassword)} />
        <ShowErrorMessage msg={passwordError} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default withRouter(connect()(SignInForm));
