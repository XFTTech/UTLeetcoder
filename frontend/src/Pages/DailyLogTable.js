import React, { useState } from 'react';
import { Layout, DatePicker } from 'antd';
import DailyLog from '../component/DailyLog';
import { getUsers } from '../component/utils';

const { Content } = Layout;

const today = new Date((new Date().setDate(new Date().getDate() - 1))).toISOString().slice(0, 10);

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
            <DatePicker onChange={(date, dateString) => setSelectedDay(dateString)} />
            <DailyLog date={selectedDay} users={users} />
        </Content>
    );
}

export default DailyLogTable;