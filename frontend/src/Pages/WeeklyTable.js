import React, { useState } from 'react';
import { Layout} from 'antd';
import { getUsers, getWeeks } from '../component/utils';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import WeeklyLog from '../component/WeeklyLog';

const { Content } = Layout;
const getItem = (label, key) => {
    return {
        label,
        key,
        icon : <TodayOutlinedIcon />
    };
};

const WeeklyTable = () => {
    const [users, setUsers] = useState(() => {
        getUsers().then((res) => {
            setUsers(res.data);
        });
        return [];
    });
    const [weeks, setWeeks] = useState(() => {
        getWeeks().then((res) => {
            setWeeks(res.data);
        });
        return [];
    });
    const [content, setContent] = useState('Click to select a week');
    const items = weeks.map((week) => {
        return getItem(week, week);
    });

    const handleMenuClick = (e) => {
        message.info('Switch to ' + e.key + '.');
        if (e.key !== 'Click to select a week'){
            setContent(e.key);
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Content
            style={{
                margin: '16px 16px',
            }}
        >
            <Space wrap>
                <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                    {content}
                    <DownOutlined />
                    </Space>
                </Button>
                </Dropdown>
            </Space>
            <WeeklyLog week={content} users={users} />
        </Content>
    );
}

export default WeeklyTable;