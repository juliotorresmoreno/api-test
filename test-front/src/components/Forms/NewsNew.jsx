
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ShowErrorMessage from '../ShowErrorMessage/ShowErrorMessage';
import * as actionsNews from '../../actions/news';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SignInFormProps extends RouteComponentProps {
  dispatch: ThunkDispatch
}

const NewsNew: React.FC<SignInFormProps> = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const onChange = (setter) => (evt) => {
    setter(evt.target.value);
  }
  const onFileChange = (setter) => (evt: React.ChangeEvent<FormControlElement>) => {
    setImageFile(evt.target.files[0])
    setter(evt.target.value);
  }

  const onSubmit = async (evt: React.FormEvent<HTMLElement>) => {
    evt.preventDefault();
    try {      
      await props.dispatch(actionsNews.create({
        title: title,
        content: content,
        image: imageFile
      }));
      alert('felicidades e ha creado con exito.');
      props.history.push('/');
    } catch (error) {
      const apiError: APIError<actionsUsers.User> = error;
      if (apiError.details) {
        setTitleError(apiError.details.title);
        setContentError(apiError.details.content);
      }
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Titulo</Form.Label>
        <Form.Control
          type="text" value={title}
          onChange={onChange(setTitle)}
        />
        <ShowErrorMessage msg={titleError} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contenido</Form.Label>
        <Form.Control
          style={{ minHeight: 200 }}
          as="textarea" value={content}
          onChange={onChange(setContent)} />
        <ShowErrorMessage msg={contentError} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Archivo</Form.Label>
        <Form.Control
          type="file" value={image}
          onChange={onFileChange(setImage)} />
        <ShowErrorMessage msg={contentError} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default withRouter(connect()(NewsNew));
