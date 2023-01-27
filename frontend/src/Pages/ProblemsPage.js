import { Layout, Row, Col, Image, Typography, theme, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import github from '../github-mark/github-mark.png';
import { getProblemList } from '../component/utils';
import { ProblemsTable } from '../component/ProblemsTable';
import { NumericInput } from '../component/NumerInput';
import useEventListener from '@use-it/event-listener';

const { Header, Content } = Layout;

const ProblemsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([]);
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // add event listener to handle keyup event if it has not been added
        getProblemList().then((res) => {
            let tempData = Object.entries(res.data).map(([key, value]) => {
                return {
                    key: value.TitleSlug,
                    questionId: value.ID,
                    title: value.Title,
                    contest: value.ContestID_en,
                    numbq: value.ProblemIndex,
                    rating: value.Rating.toFixed(0),
                    c_slug: value.ContestSlug,
                };
            });
            setData(tempData);
            setFilteredData(tempData);
        });
    }, []);
    
    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            filterData();
        }
    };
    useEventListener('keyup', handleKeyUp);

    const filterData = () => {
        if (minRating === '' && maxRating === '') {
            return;
        }
        var mn = Number.MIN_SAFE_INTEGER;
        var mx = Number.MAX_SAFE_INTEGER;
        if (minRating !== '') mn = parseInt(minRating);
        if (maxRating !== '') mx = parseInt(maxRating);
        setFilteredData(
            data.filter((item) => {
                var cur = parseInt(item.rating);
                if (minRating === '') return cur <= mx;
                if (maxRating === '') return cur >= mn;
                return cur >= mn && cur <= mx;
            })
        );
    };

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
                <Input.Group
                    style={{
                        marginBottom: '1vh',
                    }}
                    compact>
                    <Typography.Text
                        style={{
                            marginRight: '1vw',
                            marginLeft: '0.4vw',
                            fontSize: '1.2rem',
                        }}
                    >
                        Filter by Rating Interval:
                    </Typography.Text>
                    <NumericInput
                        id="min_rating_interval"
                        value={minRating}
                        onChange={setMinRating}
                        style={{
                            width: 100,
                            textAlign: 'center',
                            borderRadius: '5px 0 0 5px',
                        }}
                        // prevent non-numberic input
                        placeholder="Minimum"
                    />
                    <Input
                        className="site-input-split"
                        style={{
                            width: 30,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: 'none',
                        }}
                        placeholder="~"
                        disabled
                    />
                    <NumericInput
                        id="max_rating_interval"
                        value={maxRating}
                        onChange={setMaxRating}
                        className="site-input-right"
                        style={{
                            width: 100,
                            textAlign: 'center',
                        }}
                        placeholder="Maximum"
                    />
                    <Button
                        style={{
                            fontSize: '0.95rem',
                        }}
                        onClick={filterData}
                        type="primary"
                    >
                        Filter
                    </Button>
                    <Button
                        style={{
                            fontSize: '0.95rem',
                        }}
                        onClick={() => {
                            setMinRating('');
                            setMaxRating('');
                            setFilteredData(data);
                        }}
                        type="primary"
                    >
                        Reset
                    </Button>
                </Input.Group>
                <ProblemsTable data={filteredData} />
            </Content>
        </>
    );
};
export default ProblemsPage;