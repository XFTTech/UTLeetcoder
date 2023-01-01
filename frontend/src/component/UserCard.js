import React from 'react';
import { Typography } from 'antd';
import { Avatar } from 'antd';
import { Col, Row } from 'antd';
import { userUrl } from './utils';

const default_avatar = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

export const UserCard = (props) => {
    return (<Row>
        <Col span={12}>
            <Row>
                <Typography.Title
                    style={{
                        color: 'navy',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                    level={2}
                    onClick={() => {
                        window.open(userUrl + props.user.lcid);
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
                    {props.user.lcid}
                </Typography.Title>
            </Row>
            <Row>
                <Typography.Title
                    style={{
                        color: '#2F8819',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                    level={5}
                >
                    WeChat ID: {props.user.wxid ? props.user.wxid : "N/A"}
                </Typography.Title>
            </Row>
            <Row>
                <Typography.Text
                    style={{
                        color: 'black',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                >
                    Name: {(props.user.fname ? props.user.fname : "") + " " + (props.user.lname ? props.user.lname : "")}
                </Typography.Text>
            </Row>
        </Col>
        <Col span={12}>
            <Avatar
                size={64}
                src={props.user.avatar === "" ? default_avatar : props.user.avatar}
                style={{
                    marginLeft: 'auto',
                    display: 'block',
                }}
            />
        </Col>
    </Row>
    );
};