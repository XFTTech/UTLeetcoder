import React, { useEffect } from 'react';
import { useState } from 'react';
import { Typography, Layout } from 'antd';
import { Avatar } from 'antd';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
import { userUrl } from '../component/utils';
import Error404 from './Error404';

const default_avatar = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

const { Content } = Layout;

export const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(true);

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
            setUserFound(true);
        }).catch((err) => {
            // console.log(err);
            setUserFound(false);
        });
    }, [id]);

    if (!userFound) {
        return <Error404 />;
    }

    return (
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
                                window.open(userUrl + user.lcid);
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
    );
}