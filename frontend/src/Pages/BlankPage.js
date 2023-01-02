import React from 'react';
import { Layout, Row, Col } from 'antd';
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
            <Row
                gutter={[16, 16]}
            >
                <Col span={8}>
                    <EthanDescription />
                </Col>
                <Col span={8}>
                    <Yorafa />
                </Col>
            </Row>
        </Content>

    );
}

export default BlankPage;