import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { Typography, Layout, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
import SideBar from '../component/SideBar';
const default_avatar = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
const lcurl = "https://leetcode.com/";

const { Header, Content, Footer } = Layout;

export const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
        });
    }, []);
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        {/* <Breadcrumb.Item>DailyLog</Breadcrumb.Item> */}
                        {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        <Typography.Title
                            style={{
                                color: 'black',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }}
                            level={3}
                        >
                            UTLeetcoders
                        </Typography.Title>
                    </div>
                </Header>
                <Content
                    style={{
                        width: '50%',
                        margin: 'auto',
                        marginTop: 16,
                    }}
                >
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Typography.Title
                                    style={{
                                        color: 'navy',
                                        marginLeft: 16,
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}
                                    level={2}
                                    onClick={() => {
                                        window.open(lcurl + user.lcid);
                                    }}
                                    onMouseEnter={(e) => {
                                        document.body.style.cursor = 'pointer';
                                        e.target.style.color = 'blue';
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        document.body.style.cursor = 'default';
                                        e.target.style.color = 'navy';
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    {user.lcid}
                                </Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Title
                                    style={{
                                        color: '#2F8819',
                                        marginLeft: 16,
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}
                                    level={5}
                                >
                                    WeChat ID: {user.wxid ? user.wxid : "N/A"}
                                </Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Text
                                    style={{
                                        color: 'black',
                                        marginLeft: 16,
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}
                                >
                                    Name: {(user.fname ? user.fname : "") + " " + (user.lname ? user.lname : "")}
                                </Typography.Text>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Avatar
                                size={64}
                                src={user.avatar === "" ? default_avatar : user.avatar}
                                style={{
                                    margin: 'auto',
                                    display: 'block',
                                }}
                            />
                        </Col>
                    </Row>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    UTLeetcoders ©2022 Created by <a href="https://github.com/Ethan-ZYF">Ethan-ZYF</a>
                </Footer>
            </Layout>
        </Layout>
    );
}