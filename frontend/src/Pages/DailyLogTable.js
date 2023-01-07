import React, { useState } from 'react';
import { Layout, Row, Col, Typography, theme, DatePicker, Image } from 'antd';
import DailyLog from '../component/DailyLog';
import Difficulties from '../mobile/DailyLogMobile'
import { getRelativeUrl, getUsers, isMobile, getAllDate } from '../component/utils';
import dayjs from 'dayjs';
import github from '../github-mark/github-mark.png';

const { Header, Content } = Layout;

const all_dates = new Map();
let lastest_date = dayjs().format('YYYY-MM-DD');
getAllDate().then((res) => {
    for (const date of res.data) {
        all_dates.set(date, true);
    }
    if (all_dates.size > 0) {
        lastest_date = [...all_dates.keys()].reduce((a, b) => (dayjs(a) > dayjs(b) ? a : b));
    }
});

const disabledDate = (current) => {
    return !all_dates.has(current.format('YYYY-MM-DD'));
};

const query = getRelativeUrl()[1];

const DailyLogTable = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [selectedDay, setSelectedDay] = useState(() => {
        if (all_dates.has(query)) return query;
        return lastest_date;
    });

    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });

    const onDateChange = (date, dateString) => {
        setSelectedDay(dateString);
        // let tempUrl = '/UTLeetcoder/select_daily?' + dateString;
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
                    defaultValue={() => {
                        if (all_dates.has(query)) return dayjs(query);
                        return dayjs(lastest_date);
                    }}
                    disabledDate={disabledDate}
                    onChange={onDateChange}
                />
                {isMobile() ? <Difficulties date={selectedDay} users={users} /> : <DailyLog date={selectedDay} users={users} />}
            </Content>
        </>
    );
}

export default DailyLogTable;