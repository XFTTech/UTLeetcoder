import React, { useState } from 'react';
import { Layout, Image, Menu } from 'antd';
import leetcodeIcon from '../leetcode_icon.svg';
import { getUsers } from '../component/utils';
import {
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
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
        getItem(<Link to="/select_daily">Daily Log</Link>, '1', <TodayOutlinedIcon />),
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
                    margin: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
            <Link to="/">
                <Image
                    preview={false}
                    width={45}
                    height={45}
                    src={leetcodeIcon}
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