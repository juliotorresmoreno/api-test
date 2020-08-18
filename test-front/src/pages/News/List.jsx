
// @flow

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import New from '../../components/New';
import { DefaultState } from '../../store/types';
import * as actionsNews from '../../actions/news';

const mapProps = (state: DefaultState) => ({
  news: state.news.data,
  userProfileId: state.auth.profile.id
});

interface HomeProps {
  news: any[],
  userProfileId: String,
  dispatch: ThunkDispatch
}

const Home: React.FC<HomeProps> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState(true);
  // eslint-disable-next-line
  useEffect(() => {
    if (!loaded) {
      console.log('news');
      props.dispatch(actionsNews.list());
      setLoaded(true);
    }
  });
  const onTextSearchChange = (evt) => {
    setFilter(evt.target.value);
  }
  const news = Array.isArray(props.news) ? props.news : [];
  const onSearch = (evt: React.ChangeEvent<FormControlElement>) => {
    const query = {
      content: filter
    }
    if (userId) {
      query.userId = props.userProfileId;
    }
    props.dispatch(actionsNews.list(query));
  };
  const onOnlyMe = (evt: React.ChangeEvent<FormControlElement>) => {
    setUserId(!userId);
  };
  console.log('news', news);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Espacio publicitario</h3>
            <p style={{ textAlign: 'justify' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Col>
          <Col md={{ span: 9 }}>
            <Row>
              <Col md={{ span: 10 }}>
                <Form.Control
                  type='text' value={filter}
                  onChange={onTextSearchChange} />
              </Col>
              <Col md={{ span: 2 }}>
                <Button onClick={onSearch}>
                  Buscar
                </Button>
              </Col>
              <Col>
                <Form.Check
                  onChange={onOnlyMe}
                  checked={userId}
                  type='checkbox'
                  label='Solo yo' />
              </Col>
            </Row>
            <br />
            <Row>
              {news.map((post, key) => {
                return (
                  <Col key={key} md={{ span: 6 }}>
                    <New data={post} />
                    <br />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect(mapProps)(Home);
