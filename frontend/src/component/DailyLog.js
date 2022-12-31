import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Col, Row, Typography } from 'antd';
import { getUsers, getDailyStats, userUrl, problemUrl} from './utils';

const { Link } = Typography;
/*
    props: 
        date: string of date in format "YYYY-MM-DD"
*/
const DailyLog = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState();

    useEffect(() => {
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
        if (props.date === '') return;
        getData().then((res) => {
            setData(res);
        });
    }, [props.date]);

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
            width: '20%',
            onCell: (record) => {
                return {
                    onClick: () => {
                        window.open(userUrl + record.user + '/');
                    },
                    onMouseOver: (e) => {
                        e.target.style.cursor = 'pointer';
                        e.target.style.color = 'blue';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.color = 'navy';
                    },
                    style: {
                        color: 'navy',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Arial',
                    }
                }
            },
            ...getColumnSearchProps('user'),
        },
        {
            title: 'Easy',
            dataIndex: 'easy_cnt',
            key: 'easy_cnt',
            width: '25%',
            sorter: (a, b) => a.easy_cnt - b.easy_cnt,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Medium',
            dataIndex: 'medium_cnt',
            key: 'medium_cnt',
            width: '25%',
            sorter: (a, b) => a.medium_cnt - b.medium_cnt,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Hard',
            dataIndex: 'hard_cnt',
            key: 'hard_cnt',
            width: '25%',
            sorter: (a, b) => a.hard_cnt - b.hard_cnt,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    return <Table
        columns={columns}
        expandable={{
            expandedRowRender: (record) => (
                <Row key={record.key}
                    gutter={30}
                    style={{
                        marginLeft: '25%',
                    }}
                >
                    <Col span={8}
                        key='easy'
                        style={{
                            borderLeft: '1px solid #e8e8e8',
                        }}
                    >
                        {(record.easy).map((item) => (
                            <Row key={item} >
                                <Link href={problemUrl + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'green',
                                        fontSize: '16px'
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

                    <Col span={8}
                        key='medium'
                        style={{
                            borderLeft: '1px solid #e8e8e8',
                            borderRight: '1px solid #e8e8e8',
                        }}
                    >
                        {(record.medium).map((item) => (
                            <Row key={item}>
                                <Link href={problemUrl + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'orange',
                                        fontSize: '16px'
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
                    <Col span={8}
                        key='hard'
                        style={{
                            borderRight: '1px solid #e8e8e8',
                        }}
                    >
                        {(record.hard).map((item) => (
                            <Row key={item}>
                                <Link href={problemUrl + item + '/'}
                                    target="_blank"
                                    style={{
                                        color: 'red',
                                        fontSize: '16px'
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