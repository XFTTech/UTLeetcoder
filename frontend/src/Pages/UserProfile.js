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
    console.log(id);
    const [user, setUser] = useState({});
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
        });
    }, []);
    // console.log(user);
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
                        margin: '16px 16px',
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <Avatar size={64} src={user.avatar === "" ? default_avatar : user.avatar} />
                        </Col>
                    </Row>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={12}>Leetcode ID:</Col>
                        <Col span={12}>{user.lcid}</Col>
                    </Row>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={12}>WeChat ID:</Col>
                        <Col span={12}>{user.wxid ? user.wxid : ""}</Col>
                    </Row>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={12}>Name:</Col>
                        <Col span={12}>{user.fname ? user.fname : "" + " " + user.lname ? user.lname : ""}</Col>
                    </Row>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={12}>Leetcode Home Page:</Col>
                        <Col span={12}>{lcurl + user.lcid + '/'}</Col>
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