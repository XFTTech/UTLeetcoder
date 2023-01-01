import React, { useEffect } from 'react';
import { useState } from 'react';
import { Layout, DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
import { UserCard } from '../component/UserCard';
import { UserPie } from '../component/UserPie';
import Error404 from './Error404';
import { getUserDailyStats } from '../component/utils';

const { Content } = Layout;

export const UserProfile = () => {
    const { id } = useParams();
    const [selectedDay, setSelectedDay] = useState('');
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(true);
    const [daily, setDaily] = useState(new Map());
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
            setUserFound(true);
        }).catch((err) => {
            // console.log(err);
            setUserFound(false);
        });
        getUserDailyStats(id).then((res) => {
            let tempDailyMap = new Map(Object.entries(res.data ? res.data : {}));
            setDaily(tempDailyMap);
            setDailyData(daily.get(selectedDay));
        });
    }, [id]);

    if (!userFound) {
        return <Error404 />;
    }

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