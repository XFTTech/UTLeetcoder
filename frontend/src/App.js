import React from 'react';
import { Typography, Layout, theme } from 'antd';
import SideBar from './component/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Image } from 'antd';
import github from './github-mark/github-mark.png';
const { Header, Footer } = Layout;


const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();
    const location_header_content = {
        '/UTLeetcoder/': 'Project Developers',
        '/UTLeetcoder/select_daily': 'Check Daily Logs Here',
        '/UTLeetcoder/select_weekly': 'Check Weekly Logs Here',
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBar />
            <Layout className="site-layout">
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
                                {
                                    location_header_content[location.pathname] ? 
                                    location_header_content[location.pathname]:
                                    'UTLeetcoder'
                                }
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
                <Outlet/>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    UTLeetcoder ©2022 Created by <a href="https://github.com/Ethan-ZYF">Ethan-ZYF</a>, <a href="
                        https://github.com/zhuyuezx">zhuyuezx</a>, and <a href="https://github.com/Yorafa">Yorafa</a>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;