import React, { useEffect } from 'react';
import { useState } from 'react';
import { Layout, Row, Col, Typography, theme, Image } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
import UserCard from '../component/UserCard';
import UserPie from '../component/UserPie';
import Error404 from './Error404';
import { getAllStats, isMobile } from '../component/utils';
import github from '../github-mark/github-mark.png';

const { Header, Content } = Layout;

const UserProfile = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
            setUserFound(true);
        }).catch((err) => {
            // console.log(err);
            setUserFound(false);
        });
        getAllStats().then((res) => {
            setData(res.data[id]);
        });
    }, [id]);

    if (!userFound) {
        return <Error404 />;
    }

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Row
                    style={{
                        height: '100%',
                    }}
                >
                    <Col span={20}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Typography.Title
                            style={{
                                color: 'black',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                fontFamily: 'Verdana',
                            }}
                            level={3}
                        >
                            {`${id}'s Profile`}
                        </Typography.Title>
                    </Col>
                    <Col span={4}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            MarginRight: 'auto',
                        }}
                    >
                        <Image
                            preview={false}
                            width={45}
                            height={45}
                            src={github}
                            style={{
                                display: 'block',
                            }}
                            onMouseEnter={() => {
                                document.body.style.cursor = 'pointer';
                            }}
                            onMouseLeave={() => {
                                document.body.style.cursor = 'default';
                            }}
                            onClick={() => {
                                // window.location.href = 'https://github.com/Ethan-ZYF/UTLeetcoder';
                                // open a new tab
                                window.open(
                                    'https://github.com/Ethan-ZYF/UTLeetcoder'
                                );
                            }}
                        />
                    </Col>
                </Row>
            </Header>
            {!isMobile()?<Content
                style={{
                    width: '50%',
                    margin: 'auto',
                    marginTop: 16,
                }}
            >
                <UserCard user={user} />
                <UserPie data={data} user={user} />
            </Content>:<><Content style={{
                    width: 'auto',
                    margin: 'auto',
                }}
            >
                <UserCard user={user} />
            </Content>
            <UserPie data={data} user={user} /></>
            }
            
        </>
    );
};
export default UserProfile;