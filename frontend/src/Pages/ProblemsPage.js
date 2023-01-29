import { Layout, Row, Col, Image, Typography, theme, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import github from '../github-mark/github-mark.png';
import { getProblemList } from '../component/utils';
import { ProblemsTable } from '../component/ProblemsTable';
import { NumericInput } from '../component/NumerInput';

const { Header, Content } = Layout;

const filterDataByRating = (data, minRating, maxRating) => {
    if (minRating === '' && maxRating === '') {
        return data;
    }
    var mn = Number.MIN_SAFE_INTEGER;
    var mx = Number.MAX_SAFE_INTEGER;
    if (minRating !== '') mn = parseInt(minRating);
    if (maxRating !== '') mx = parseInt(maxRating);
    return data.filter((item) => {
        var cur = parseInt(item.rating);
        if (minRating === '') return cur <= mx;
        if (maxRating === '') return cur >= mn;
        return cur >= mn && cur <= mx;
    })
};

const filterDataByKeyword = (data, keyword) => {
    if (keyword === '') {
        return data;
    }
    const reg = /^\d+$/;
    if (reg.test(keyword)) {
        return data.filter((item) => {
            return item.questionId.toString().includes(keyword);
        });
    } else {
        return data.filter((item) => {
            return item.title.toLowerCase().includes(keyword.toLowerCase());
        });
    }
};

const filterDataByContest = (data, contest) => {
    if (contest === '') {
        return data;
    }
    return data.filter((item) => {
        return item.contest.toLowerCase().includes(contest.toLowerCase());
    });
}

const ProblemsPage = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState(() => {
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
        });
    });
    const [minRating, setMinRating] = useState('');
    const [maxRating, setMaxRating] = useState('');
    const [keyword, setKeyword] = useState('');
    const [contest, setContest] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        let tempData = filterDataByRating(data, minRating, maxRating);
        tempData = filterDataByKeyword(tempData, keyword);
        tempData = filterDataByContest(tempData, contest);
        setFilteredData(tempData);
    }, [data, minRating, maxRating, keyword, contest]);

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
                    <NumericInput
                        addonBefore="Rating Range"
                        value={minRating}
                        onChange={setMinRating}
                        style={{
                            width: 200,
                            textAlign: 'center',
                        }}
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
                        value={maxRating}
                        onChange={setMaxRating}
                        className="site-input-right"
                        style={{
                            width: 100,
                            textAlign: 'center',
                            marginRight: '1vw',
                            borderRadius: '0 5px 5px 0',
                        }}
                        placeholder="Maximum"
                    />
                    <Input
                        addonBefore="Keyword"
                        onChange={(event) => {
                            setKeyword(event.target.value);
                        }}
                        style={{
                            width: 200,
                            textAlign: 'center',
                            borderRadius: '0 5px 5px 0',
                        }}
                        placeholder="id or title"
                        value={keyword}
                    />
                    <Input 
                        disabled
                        style={{
                            width: 0,
                            marginRight: '1vw',
                            pointerEvents: 'none',
                            borderRadius: '0 5px 5px 0',
                        }}
                        placeholder=""
                    />
                    <NumericInput
                        addonBefore="Contest"
                        value={contest}
                        onChange={setContest}
                        style={{
                            width: 200,
                            textAlign: 'center',
                            borderRadius: '0 5px 5px 0',
                        }}
                        placeholder="contest number"
                    />
                    <Input 
                        disabled
                        style={{
                            width: 0,
                            marginRight: '1vw',
                            pointerEvents: 'none',
                            borderRadius: '0 5px 5px 0',
                        }}
                        placeholder=""
                    />
                    <Button
                        style={{
                            fontSize: '0.95rem',
                            borderRadius: '5px 5px 5px 5px',
                        }}
                        onClick={() => {
                            setMinRating('');
                            setMaxRating('');
                            setKeyword('');
                            setContest('');
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