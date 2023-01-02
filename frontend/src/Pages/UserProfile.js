import React, { useEffect } from 'react';
import { useState } from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../component/utils';
import { UserCard } from '../component/UserCard';
import { UserPie } from '../component/UserPie';
import Error404 from './Error404';
import { getAllStats } from '../component/utils';

const { Content } = Layout;

export const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        getUserInfo(id).then((res) => {
            setUser(res.data);
            setUserFound(true);
        }).catch((err) => {
            // console.log(err);
            setUserFound(false);
        });
        getAllStats().then((res) => {
            setData(res.data[id]);
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
            <UserPie data={data} user={user} />
        </Content>
    );
}