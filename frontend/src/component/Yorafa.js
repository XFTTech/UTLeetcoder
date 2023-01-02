import React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, Card } from 'antd';
import { getUserInfo } from './utils';
const { Meta } = Card;
const scale = 400;

const Yorafa = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserInfo("Yorafa").then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);


    return (
        // set the width of poster and video to 500
        <Card
            style={{
                width: scale,
                height : scale,
            }}
            cover={
                <video
                    id="my-video"
                    class="video-js"
                    controls
                    preload="auto"
                    width="550"
                    height="auto"
                    poster="https://yorafa.com/wp-content/uploads/2023/01/Yorafa-scaled.jpg"
                    data-setup="{}"
              >
                    <source src='https://yorafa.com/wp-content/uploads/2023/01/YorafaItai.mp4' type="video/mp4" />
              </video>
            }
        >
            <Meta
                avatar={<Avatar src={user.avatar}
                    style={{ width: 64, height: 64 }}
                />}
                title="Yorafa (Tianle Wang)"
                description="Do or do not, there is no try."
            />
        </Card>
    );
}

export default Yorafa;