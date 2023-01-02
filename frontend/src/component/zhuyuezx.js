import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Card, Image } from 'antd';
import { getUserInfo } from './utils';
import HomePage from './zhuyuezx.png';
const { Meta } = Card;

const ZhuyuezxDescription = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserInfo("zhuyuezx").then((res) => {
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
                    height={350}
                    src={HomePage}
                />
            }
        >
            <Meta
                avatar={<Avatar src={user.avatar}
                    style={{ width: 100, height: 100 }}
                />}
                title="Jason Zhu"
                description="Love to create cool things through coding. 
                Leetcoder by enthusiasm!
                
                More stuff on 'zhuyuezx.github.io'"
            />
        </Card>
    )
};

export default ZhuyuezxDescription;