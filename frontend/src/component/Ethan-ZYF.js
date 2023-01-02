import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Card, Image } from 'antd';
import { getUserInfo } from './utils';
import HomePage from './Ethan-ZYF.png';
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
                    src={HomePage}
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