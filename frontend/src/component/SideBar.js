import React, { useState } from 'react';
import { Layout, Image, Menu } from 'antd';
import testLogo from '../test_logo.png';
import { getRelativeUrl, getUsers } from '../component/utils';
import {
    DesktopOutlined,
    UserOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { isMobile } from '../component/utils';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const path = getRelativeUrl().substring(1);

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(() => isMobile());
    const [open] = useState(() => {
        if (isMobile()) return null;
        return 'sub1';
    });
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });

    const items = [
        getItem(<Link to="/select_daily">Daily Log</Link>, 'select_daily', <CalendarOutlined />),
        getItem(<Link to="/select_weekly">Weekly Log</Link>, 'select_weekly', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, users.map((user) => {
            let temp = "/" + user;
            return (getItem(<Link to={temp}>{user}</Link>, user));
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
                    marginTop: 10,
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
                defaultOpenKeys={[open]}
                defaultSelectedKeys={[path]}
                mode="inline"
                items={items}
            />
        </Sider >
    )
}

export default SideBar;