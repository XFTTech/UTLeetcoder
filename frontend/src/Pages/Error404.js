import React from 'react';
import { Button, Result } from 'antd';

const Error404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => window.location.href = "/"}>Back Home</Button>}
  />
);

export default Error404;