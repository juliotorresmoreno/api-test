
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ShowErrorMessage from '../ShowErrorMessage';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { isName, isEmail, isSecurePassword, isSecurePasswordConfirm } from './validator';
import * as actionsUsers from '../../actions/users';
import { APIError } from '../../utils/errors';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const styles: any = {
  terms: {
    textAlign: 'justify'
  }
};

interface SignUpFormProps extends RouteComponentProps {
  dispatch: ThunkDispatch
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

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
      await props.dispatch(actionsUsers.create({
        name,
        email,
        lastName,
        password
      }));
      console.log('Registro exitoso')
      alert('Registro exitoso');
      props.history.push('/sign-in');
    } catch (error) {
      console.log(error);
      const apiError: APIError<actionsUsers.User> = error;
      if (apiError.details) {
        setNameError(apiError.details.name);
        setLastNameError(apiError.details.lastName);
        setEmailError(apiError.details.email);
        setPasswordError(apiError.details.password);
      }
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              name='Nombres'
              type="text" value={name}
              onBlur={onBlur(setNameError, isName, 'Nombres')}
              onChange={onChange(setName)} />
            <ShowErrorMessage msg={nameError} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text" value={lastName}
              onBlur={onBlur(setLastNameError, isName, 'Apellidos')}
              onChange={onChange(setLastName)}
            />
            <ShowErrorMessage msg={lastNameError} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email" value={email}
          onBlur={onBlur(setEmailError, isEmail, 'Email')}
          onChange={onChange(setEmail)}
        />
        <ShowErrorMessage msg={emailError} />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password" value={password}
              onBlur={onBlur(setPasswordError, isSecurePassword, 'Contraseña')}
              onChange={onChange(setPassword)} />
          </Form.Group>
          <ShowErrorMessage msg={passwordError} />
        </Col>
        <Col>
          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Label>Reescribir contraseña</Form.Label>
            <Form.Control
              type="password" value={passwordConfirm}
              onBlur={onBlur(
                setPasswordConfirmError,
                isSecurePasswordConfirm(password),
                'Reescribir contraseña'
              )}
              onChange={onChange(setPasswordConfirm)} />
            <ShowErrorMessage msg={!passwordError ? passwordConfirmError : ''} />
          </Form.Group>
        </Col>
      </Row>

      <h5>Terminos y condiciones</h5>
      <p style={styles.terms}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged. &nbsp;
        <Link to='/terms'>Leer mas</Link>.
      </p>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          onChange={() => setAcceptTerms(!acceptTerms)}
          type="checkbox" checked={acceptTerms}
          label="Acepto los terminos y condiciones" />
      </Form.Group>

      <Button disabled={!acceptTerms} type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default withRouter(connect()(SignUpForm));
