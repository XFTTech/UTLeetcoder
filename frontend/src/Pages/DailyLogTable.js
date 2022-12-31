import React, { useState } from 'react';
import { Typography, Layout, theme, DatePicker } from 'antd';
import SideBar from '../component/SideBar';
import DailyLog from '../component/DailyLog';
import { getUsers } from '../component/utils';

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
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SideBar />
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        {/* <Breadcrumb.Item>DailyLog</Breadcrumb.Item> */}
                        {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        <Typography.Title
                            style={{
                                color: 'navy',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                fontFamily: 'Tahoma',
                            }}
                            level={3}
                        >
                            Daily Log on {selectedDay}
                        </Typography.Title>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '16px 16px',
                    }}
                >
                    <DatePicker onChange={(date, dateString) => setSelectedDay(dateString)} />
                    <DailyLog date={selectedDay} users={users} />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    UTLeetcoders ©2022 Created by <a href="https://github.com/Ethan-ZYF">Ethan-ZYF</a>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default DailyLogTable;