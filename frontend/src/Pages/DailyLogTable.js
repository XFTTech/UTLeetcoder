import React, { useState } from 'react';
import { Typography, Layout, theme, DatePicker } from 'antd';
import SideBar from '../component/SideBar';
import DailyLog from '../component/DailyLog';
import { getUsers, userLoader } from '../component/utils';

const { Header, Content, Footer } = Layout;

const today = new Date((new Date().setDate(new Date().getDate() - 1))).toISOString().slice(0, 10);

const DailyLogTable = () => {
    const [selectedDay, setSelectedDay] = useState(today);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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