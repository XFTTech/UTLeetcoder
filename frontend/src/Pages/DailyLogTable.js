import React, { useState } from 'react';
import { Layout, DatePicker } from 'antd';
import DailyLog from '../component/DailyLog';
import { getUsers } from '../component/utils';
import dayjs from 'dayjs';

const { Content } = Layout;

const today = new Date().toLocaleString('en-CA').split(',')[0].replaceAll('/', '-');

const DailyLogTable = () => {
    const [selectedDay, setSelectedDay] = useState(today);
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
                defaultValue={dayjs(today)}
                onChange={(date, dateString) => setSelectedDay(dateString)} 
            />
            <DailyLog date={selectedDay} users={users} />
        </Content>
    );
}

export default DailyLogTable;