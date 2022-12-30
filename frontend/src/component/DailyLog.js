import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Col, Row, Typography } from 'antd';
import axios from 'axios';
import { fontStyle } from '@mui/system';

const { Text, Link } = Typography;
// import Highlighter from 'react-highlight-words';
const url = "https://leetcode.com/problems/"

const fileClient = axios.create({
    baseURL: 'http://localhost:3000/data',
    timeout: 10000
});

const getUsers = async () => {
    return await fileClient.get("leetcoder_ids.json");
};

const getDailyStats = async (date) => {
    return await fileClient.get("daily_stats/" + date + ".json");
};

const DailyLog = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                searchText
            ) : (
                text
            ),
    }
    );
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            ...getColumnSearchProps('user'),
        },
        {
            title: 'Easy',
            dataIndex: 'easy_cnt',
            key: 'easy_cnt',
            sorter: (a, b) => a - b,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Medium',
            dataIndex: 'medium_cnt',
            key: 'medium_cnt',
            sorter: (a, b) => a - b,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hard',
            dataIndex: 'hard_cnt',
            key: 'hard_cnt',
            sorter: (a, b) => a - b,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    // const today = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().slice(0, 10);
    const getData = async () => {
        let dailyStatsList;
        let result = [];
        await getDailyStats(props.date)
            .then((res) => {
                dailyStatsList = new Map(Object.entries(res.data));
            })
            .catch((err) => {
                console.error(err);
            });
        await getUsers()
            .then((res) => {
                res.data.forEach((user) => {
                    let userdata = dailyStatsList.get(user)
                    if (userdata) {
                        let usermap = new Map(Object.entries(userdata ? userdata : {}));
                        usermap.set('key', user);
                        result.push(JSON.parse(JSON.stringify(Object.fromEntries(usermap))));
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
        return result;
    };
    const [data, setData] = useState(() => {
        getData().then((res) => {
            setData(res);
        });
    });

    return <Table
        columns={columns}
        expandable={{
            expandedRowRender: (record) => (
                <Row key={record.key}>
                    <Col span={8} key='easy'>
                        {(record.easy).map((item) => (
                            <Row key={item} >
                                <Link href={url + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'green',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    [{item}]
                                </Link>
                            </ Row>
                        ))}
                    </Col>

                    <Col span={8} key='medium'>
                        {(record.medium).map((item) => (
                            <Row key={item}>
                                <Link href={url + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'orange',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    [{item}]
                                </Link>
                            </ Row>
                        ))
                        }
                    </Col >
                    <Col span={8} key='hard'>
                        {(record.hard).map((item) => (
                            <Row key={item}>
                                <Link href={url + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'red',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    [{item}]
                                </Link>
                            </ Row>
                        ))}
                    </Col>
                </Row >
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
    />;
};
export default DailyLog;