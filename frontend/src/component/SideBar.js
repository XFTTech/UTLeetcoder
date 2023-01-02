import React, { useState } from 'react';
import { Layout, Image, Menu } from 'antd';
import testLogo from '../test_logo.png';
import { getUsers } from '../component/utils';
import {
    DesktopOutlined,
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });

    const value_nav_pair = new Map([
        ['1', 'select_daily']
    ]);

    users.forEach((user) => {
        value_nav_pair.set(user, user);
    });

    const items = [
        getItem(<Link to="/select_daily">Daily Log</Link>, '1', <CalendarOutlined />),
        getItem(<Link to="/select_weekly">Weekly Log</Link>, '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, users.map((user) => {
            let temp = "/" + user;
            return ( getItem(<Link to={temp}>{user}</Link>, user) );
        })),
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div
                style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop : 10,
                }}
            >
            <Link to="/">
                <Image
                    preview={false}
                    width={45}
                    height={45}
                    src={testLogo}
                    onMouseEnter={() => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = 'default';
                    }}
                    onClick={() => {
                        window.location.href = '/';
                    }}
                /> 
            </Link>
            </div>
            <Menu
                theme="dark"
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </Sider >
    )
}

export default SideBar;