import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Card, Image } from 'antd';
import { getUserInfo } from './utils';
import HomePage from './Ethan-ZYF.png';
const { Meta } = Card;
const scale = 400;

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
            style={{
                width: scale,
                height : scale,
            }}
            cover={
                <Image
                    alt="example"
                    width={scale}
                    src={HomePage}
                />
            }
        >
            <Meta
                avatar={<Avatar src={user.avatar}
                    style={{ width: 64, height: 64 }}
                />}
                title="Ethan Zhao (Yifan Zhao)"
                description="1 year LeetCoder. Guardian of the LeetCode weekly contest."
            />
        </Card>
    );
}

export default EthanDescription;