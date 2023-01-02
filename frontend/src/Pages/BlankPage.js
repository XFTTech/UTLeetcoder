import React from 'react';
import { Layout, Empty } from 'antd';

const { Content } = Layout;

const BlankPage = () => {
    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <Empty />
        </Content>
              
    );
}

export default BlankPage;