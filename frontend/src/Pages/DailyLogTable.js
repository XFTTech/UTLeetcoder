import React, { useState } from 'react';
import { Layout, DatePicker } from 'antd';
import DailyLog from '../component/DailyLog';
import { getUsers } from '../component/utils';
import { getAllDate } from '../component/utils';
import dayjs from 'dayjs';

const { Content } = Layout;

const formatDate = (date) => date + 'T05:00:00.000Z';

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
    const [selectedDay, setSelectedDay] = useState(lastest_date);
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });

    return (
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
    );
}

export default DailyLogTable;