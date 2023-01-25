import { React, useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, theme, Result, Image } from 'antd';
import github from '../github-mark/github-mark.png';
import { getLastUpdate, isMobile, getUserTotalSub } from '../component/utils';
import { SmileOutlined } from '@ant-design/icons';
import Podium from '../component/Podium';

const { Header, Content } = Layout;

const isMobiled = isMobile();

const MainPage = () => {
    const [tt, setTt] = useState(() => {
        getLastUpdate().then((res) => {
            let temp = res.data;
            temp = temp.replace('T', ' ');
            temp = temp.substring(0, temp.length - 8);
            setTt(temp);
        }).catch((err) => {
            console.error(err);
        });
    });
    const [sortedTotal, setSortedTotal] = useState([]);
    const [sortedRank, setSortedRank] = useState([]);
    useEffect(() => {
        getUserTotalSub().then((res) => {
            let temp = Object.entries(res.data);
            temp = temp.map((item) => item[1]);
            let tempRank = [...temp];
            tempRank.sort((a, b) => {
                return b.contestRating - a.contestRating;
            });
            let tempTotal = [...temp];
            tempTotal.sort((a, b) => {
                return b.totalSubs - a.totalSubs;
            });
            setSortedTotal(tempTotal);
            setSortedRank(tempRank);
        }).catch((err) => {
            console.error(err);
        });
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                            Leaderboard
                        </Typography.Title>
                    </Col>
                    <Col span={4}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
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
                                // window.location.href = 'https://github.com/XFTTech/UTLeetcoder';
                                // open a new tab
                                window.open(
                                    'https://github.com/XFTTech/UTLeetcoder'
                                );
                            }}
                        />
                    </Col>
                </Row>
            </Header>
            <Content
                style={{
                    margin: '16px 16px',
                }}
            >
                {!isMobiled ? <>
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={12}
                            style={{
                                minWidth: 400,
                            }}
                        >
                            <Podium stats={sortedTotal} type={"totalSubs"} />
                        </Col>
                        <Col span={12}
                            style={{
                                minWidth: 400,
                            }}
                        >
                            <Podium stats={sortedRank} type={"contestRating"} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>

                        </Col>
                        <Col span={8}>
                            <Result
                                icon={<SmileOutlined />}
                                title={'last update at: ' + tt}
                            />
                        </Col>
                        <Col span={8}>

                        </Col>

                    </Row>
                </> : <>
                    <Row>
                        <Col span={12}
                            style={{
                                minWidth: 400,
                            }}
                        >
                            <Podium stats={sortedTotal} type={"totalSubs"} />
                        </Col>
                        <Col span={12}
                            style={{
                                minWidth: 400,
                            }}
                        >
                            <Podium stats={sortedRank} type={"contestRating"} />
                        </Col>
                    </Row>
                    <Row>
                        <Result
                            icon={<SmileOutlined />}
                            title={'last update at: ' + tt}
                        />
                    </Row>
                </>}
            </Content>
        </>
    );
}

export default MainPage;