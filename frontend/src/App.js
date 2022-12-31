import React, { useState } from 'react';
import { Typography, Image, Layout, Menu, theme, DatePicker } from 'antd';
import leetcodeIcon from './leetcode_icon.svg';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DailyLog from './component/DailyLog';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


const items = [
    getItem('Daily Log', '1', <TodayOutlinedIcon/>),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const today = new Date((new Date().setDate(new Date().getDate() - 1))).toISOString().slice(0, 10);

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedDay, setSelectedDay] = useState(today);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 45,
                        width: 45,
                        margin: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <Image
                        preview={false}
                        width={45}
                        height={45}
                        style={{
                        }}
                    
                        src={leetcodeIcon}
                    />
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
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
                                color: 'black',
                                marginLeft: 16,
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }}
                            level={3}
                        >
                            UTLeetcoders
                        </Typography.Title>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '16px 16px',
                    }}
                >
                    <DatePicker onChange={(date, dateString) => setSelectedDay(dateString)} />
                    <DailyLog date={selectedDay} />
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
};
export default App;