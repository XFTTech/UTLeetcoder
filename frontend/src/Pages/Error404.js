import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Error404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to="/UTLeetcoder"><Button>Back to Homepage</Button></Link>}
  />
);

export default Error404;