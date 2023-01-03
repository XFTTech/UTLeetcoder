import React from 'react';
import { Layout, Row, Col, Typography, theme } from 'antd';
import EthanDescription from '../component/Ethan-ZYF';
import Yorafa from '../component/Yorafa';
import ZhuyuezxDescription from '../component/zhuyuezx';
import { Image } from 'antd';
import github from '../github-mark/github-mark.png';
const { Header, Content } = Layout;


const BlankPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Row
                    style={{
                        height: '100%',
                    }}
                >
                    <Col span={20}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Typography.Title
                            style={{
                                color: 'black',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }}
                            level={3}
                        >
                            Project Developers
                        </Typography.Title>
                    </Col>
                    <Col span={4}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 16,
                        }}
                    >
                        <Image
                            preview={false}
                            width={45}
                            height={45}
                            src={github}
                            style={{
                                display: 'block',
                            }}
                            onMouseEnter={() => {
                                document.body.style.cursor = 'pointer';
                            }}
                            onMouseLeave={() => {
                                document.body.style.cursor = 'default';
                            }}
                            onClick={() => {
                                // window.location.href = 'https://github.com/Ethan-ZYF/UTLeetcoder';
                                // open a new tab
                                window.open(
                                    'https://github.com/Ethan-ZYF/UTLeetcoder'
                                );
                            }}
                        />
                    </Col>
                </Row>
            </Header>
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
                        <ZhuyuezxDescription />
                    </Col>
                    <Col span={8}>
                        <Yorafa />
                    </Col>
                </Row>
            </Content>
        </>
    );
}

export default BlankPage;