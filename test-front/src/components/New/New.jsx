
// @flow

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Post, DefaultState } from '../../store/types';
import * as actionsNews from '../../actions/news';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

interface NewProps extends RouteComponentProps {
  data: Post,
  userProfileId: state.auth.profile.id,
  dispatch: ThunkDispatch
}

function parseContent(post: Post) {
  if (!post.content) {
    return '';
  }
  return post.content.substr(0, 100);
}

const mapProps = (state: DefaultState) => ({
  userProfileId: state.auth.profile.id
});

const New: React.FC<NewProps> = (props) => {
  const onRedirect = () => {
    props.history.push('/news/' + props.data._id);
  }
  const onDelete = () => {
    var r = window.confirm("¿Estas seguro de elimiar este post?");
    if (r === true) {
      props.dispatch(actionsNews.remove(props.data._id));
    }
  }
  return (
    <>
      <Card>
        <Card.Img
          variant="left" src={props.data.imageUrl}
          style={{ maxHeight: 200 }} />
        <Card.Body>
          <Card.Title>{props.data.title}</Card.Title>
          <Card.Text>
            {parseContent(props.data.content)}
          </Card.Text>
          <Button variant="primary" onClick={onRedirect}>
            Leer mas
          </Button>
          {props.data.userId === props.userProfileId && (
            <>
              &nbsp;
              <Button variant="danger" onClick={onDelete}>
                Eliminar
              </Button>
            </>)}
        </Card.Body>
      </Card>
    </>
  );
};

export default withRouter(connect(mapProps)(New));
