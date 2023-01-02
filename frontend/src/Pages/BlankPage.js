import React from 'react';
import { Layout } from 'antd';
import EthanDescription from '../component/Ethan-ZYF';
import Yorafa from '../component/Yorafa';
const { Content } = Layout;

const BlankPage = () => {
    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <EthanDescription />
            <Yorafa />
        </Content>

    );
}

export default BlankPage;