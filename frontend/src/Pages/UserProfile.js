import React, { Component } from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Typography } from 'antd';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
const default_avatar = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
const lcurl = "https://leetcode.com/";

const { Title } = Typography;

export const UserProfile = () => {
    const { id } = useParams();
    console.log(id);
    const [user, setUser] = useState(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
        });
        return {};
    });
    // console.log(user);
    return (
        <>
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
        </>
    );
}