import React from 'react';
import { useState, useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Image } from 'antd';
import { getUserInfo } from '../component/utils';

const { Meta } = Card;

const EthanDescription = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserInfo("Ethan-ZYF").then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);


    return (
        <Card
            style={{ width: 500 }}
            cover={
                <Image
                    alt="example"
                    width={500}
                    src="https://drive.google.com/file/d/1VH5p3G3xZiqPpNSbZ9O3gqC6h0-6nNj0/view?usp=share_link"
                />
            }
        >
            <Meta
                avatar={<Avatar src={user.avatar}
                    style={{ width: 100, height: 100 }}
                />}
                title="Ethan Zhao (Yifan Zhao)"
                description="1 year LeetCoder. Guardian of the LeetCode weekly contest."
            />
        </Card>
    );
}

export default EthanDescription;