import React, { useEffect } from 'react';
import { useState } from 'react';
import { Layout, DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserDailyStats, getUserInfo } from '../component/utils';
import { UserCard } from '../component/UserCard';
import { UserPie } from '../component/UserPie';

const { Content } = Layout;

export const UserProfile = () => {
    const { id } = useParams();
    const [selectedDay, setSelectedDay] = useState('');
    const [user, setUser] = useState({});
    const [daily, setDaily] = useState(new Map());
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
        });
        getUserDailyStats(id).then((res) => {
            let tempDailyMap = new Map(Object.entries(res.data ? res.data : {}));
            setDaily(tempDailyMap);
            setDailyData(daily.get(selectedDay));
        });
    }, [id, selectedDay]);
    return (
        <Content
            style={{
                width: '50%',
                margin: 'auto',
                marginTop: 16,
            }}
        >
            <UserCard user={user} />
            <DatePicker onChange={(date, dateString) => setSelectedDay(dateString)} />
            <UserPie daily={dailyData} />
        </Content>
    );
}