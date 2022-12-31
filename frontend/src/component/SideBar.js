import React, { useState } from 'react';
import { Layout, Image, Menu, theme} from 'antd';
import leetcodeIcon from '../leetcode_icon.svg';
import { getUsers } from '../component/utils';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const SideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
    
    const menu_nav = (key) => {
        if (value_nav_pair.has(key)) {
            return value_nav_pair.get(key);
        }
        return '/';
    }

    const items = [
        getItem('Daily Log', '1', <TodayOutlinedIcon/>),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, users.map((user) => getItem(user, user))),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];

    return (
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
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    onMouseEnter={() => {
                        document.body.style.cursor = 'pointer';
                    }}
                    onMouseLeave={() => {
                        document.body.style.cursor = 'default';
                    }}
                />
            </div>
            <Menu 
                theme="dark" 
                defaultSelectedKeys={['1']} 
                mode="inline" 
                items={items} 
                onClick={(item) => {
                    window.location.href = menu_nav(item.key);
                }}
            />
        </Sider>
    )
}

export default SideBar;