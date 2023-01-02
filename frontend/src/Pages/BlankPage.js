import React from 'react';
import { Layout, Empty } from 'antd';
import EthanDescription from '../component/Ethan-ZYF';
const { Content } = Layout;

const BlankPage = () => {
    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <EthanDescription />
        </Content>

    );
}

export default BlankPage;