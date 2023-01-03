import React, { useState } from 'react';
import { Layout, Row, Col, Typography, theme, DatePicker, Image } from 'antd';
import DailyLog from '../component/DailyLog';
import { getUsers } from '../component/utils';
import { getAllDate } from '../component/utils';
import dayjs from 'dayjs';
import github from '../github-mark/github-mark.png';
import { useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const formatDate = (date) => date + 'T05:00:00.000Z';

const useQuery = () => {
    const { search } = useLocation();
    console.log(search);
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

const all_dates = new Map();
let lastest_date = new Date(0);
getAllDate().then((res) => {
    for (const date of res.data) {
        all_dates.set(date, true);
        // compare date with lastest_date
        const fmtDay = formatDate(date);
        const day = new Date(fmtDay);
        if (day > lastest_date) lastest_date.setTime(day.getTime());
    }
    lastest_date = lastest_date.toLocaleString('en-CA').split(',')[0].replaceAll('/', '-');
});

const disabledDate = (current) => {
    return !all_dates.has(current.format('YYYY-MM-DD'));
};

const DailyLogTable = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const query = useQuery();
    for (const [key, value] of query.entries()) {
        console.log(key, value);
    }

    const [selectedDay, setSelectedDay] = useState(lastest_date);
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });

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
                            }}
                            level={3}
                        >
                            {'Daily Log for ' + selectedDay}
                        </Typography.Title>
                    </Col>
                    <Col span={4}
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 16,
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
            <Content
                style={{
                    margin: '16px 16px',
                }}
            >
                <DatePicker
                    defaultValue={dayjs(lastest_date)}
                    disabledDate={disabledDate}
                    onChange={(date, dateString) => setSelectedDay(dateString)}
                />
                <DailyLog date={selectedDay} users={users} />
            </Content>
        </>
    );
}

export default DailyLogTable;