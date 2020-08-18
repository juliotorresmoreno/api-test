
import React from 'react';
import { Form } from 'react-bootstrap';

interface ShowErrorMessageProps {
  msg: String
}

const ShowErrorMessage: React.FC<ShowErrorMessageProps> = ({ msg }) => {
  return (
    <Form.Text className="text-danger">
      {msg}
    </Form.Text>
  );
}

export default ShowErrorMessage;
