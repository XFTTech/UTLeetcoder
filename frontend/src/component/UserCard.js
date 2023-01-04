import React from 'react';
import { Typography } from 'antd';
import { Avatar } from 'antd';
import { Col, Row, Image } from 'antd';
import { userUrl } from './utils';
import leetcode_icon from '../leetcode.svg';

const default_avatar = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

export const UserCard = (props) => {
    return (<Row>
        <Col span={12}>
            <Row span={2}>
                <Typography.Title
                    style={{
                        color: 'navy',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                    }}
                    level={2}
                >
                    {props.user.lcid}
                </Typography.Title>
                <Image
                    preview={false}
                    width={30}
                    height={30}
                    src={leetcode_icon}
                    style={{
                        marginTop: 5,
                        marginLeft: 10,
                        display: 'block',
                    }}
                    onClick={() => {
                        window.open(userUrl + props.user.lcid);
                    }}
                    onMouseEnter={(e) => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onMouseLeave={(e) => {
                        document.body.style.cursor = 'default';
                    }}
                />
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