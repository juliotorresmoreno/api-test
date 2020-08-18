
// @flow

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import NewsNew from '../../components/Forms/NewsNew';

interface NewPostProps {
  news: any[]
}

const NewPost: React.FC<NewPostProps> = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Espacio publicitario</h3>
            <p style={{ textAlign: 'justify' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Col>
          <Col md={{ span: 9 }}>
            <NewsNew />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect()(NewPost);
