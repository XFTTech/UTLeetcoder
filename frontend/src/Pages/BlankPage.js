import React from 'react';
import { Layout, Empty, Row, Col } from 'antd';
import EthanDescription from '../component/Ethan-ZYF';
import ZhuyuezxDescription from '../component/zhuyuezx';
const { Content } = Layout;

const BlankPage = () => {
    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <Row justify="center">
                <Col span={10}>
                    <EthanDescription />
                </Col>
                <Col span={10}>
                    <ZhuyuezxDescription />
                </Col>
            </Row>
        </Content>

    );
}

export default BlankPage;