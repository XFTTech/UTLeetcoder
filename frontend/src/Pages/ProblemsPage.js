import { Layout, Row, Col, Image, Typography, theme } from 'antd';
import { useEffect, useState } from 'react';
import github from '../github-mark/github-mark.png';
import { getProblemList } from '../component/utils';
import { ProblemsTable } from '../component/ProblemsTable';

const { Header, Content } = Layout;

const ProblemsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([]);

    useEffect(() => {
        getProblemList().then((res) => {
            let tempData = Object.entries(res.data).map(([key, value]) => {
                return {
                    key: value.TitleSlug,
                    questionId: value.ID,
                    title: value.Title,
                    contest: value.ContestID_en,
                    numbq: value.ProblemIndex,
                    rating: value.Rating.toFixed(0),
                };
            });
            setData(tempData);
        });
    }, []);

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
                            Problem List, source from <a href="https://zerotrac.github.io/leetcode_problem_rating/#/">zerotrac</a>
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
                    width: '90%',
                    margin: 'auto',
                    marginTop: 16,
                }}
            >
                <ProblemsTable data={data} />
            </Content>

        </>
    );
};
export default ProblemsPage;