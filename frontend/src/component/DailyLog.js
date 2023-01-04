import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { getDailyStats, userUrl } from './utils';
import Highlighter from 'react-highlight-words';
import DataModal from './DataModal';

/*
    props: 
        date: string of date in format "YYYY-MM-DD"
        users: list of users
*/
const DailyLog = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState();
    const [modalData, setModalData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDifficulty, setModalDifficulty] = useState('');

    const getModalVisible = (visible) => {
        setModalVisible(visible);
    };

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
            props.users.forEach((user) => {
                let userdata = dailyStatsList.get(user)
                if (userdata) {
                    let usermap = new Map(Object.entries(userdata ? userdata : {}));
                    usermap.set('key', user);
                    result.push(JSON.parse(JSON.stringify(Object.fromEntries(usermap))));
                }
            });
            return result;
        };
        if (props.date === '') return;
        getData().then((res) => {
            setData(res);
        });
    }, [props]);

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
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width: '20%',
            onCell: (record) => {
                return {
                    onClick: () => {
                        window.open('/UTLeetcoder/' + record.user);
                    },
                    onMouseOver: (e) => {
                        e.target.style.cursor = 'pointer';
                        e.target.orig_bg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = 'lightcyan';
                        e.target.style.color = 'blue';
                        e.target.style.textDecoration = 'underline';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.color = 'navy';
                        e.target.style.textDecoration = 'none';
                        e.target.style.backgroundColor = e.target.orig_bg;
                    },
                    style: {
                        borderRadius: '0px',
                        color: 'navy',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Trebuchet MS',
                    }
                }
            },
            onHeaderCell: (column) => {
                return {
                    style: {
                        color: 'navy',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                    }
                }
            },
            ...getColumnSearchProps('user'),
        },
        {
            title: 'Easy',
            dataIndex: 'easy_cnt',
            key: 'easy_cnt',
            width: '20%',
            sorter: (a, b) => a.easy_cnt - b.easy_cnt,
            sortDirections: ['descend', 'ascend'],
            onCell: (record) => {
                return {
                    onClick: () => {
                        // alert('click easy: ' + record.user);
                        setModalData(record.easy);
                        setModalVisible(true);
                        setModalDifficulty('easy');
                    },
                    onMouseOver: (e) => {
                        e.target.style.cursor = 'pointer';
                        e.target.orig_bg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = 'lightgreen';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.backgroundColor = e.target.orig_bg;
                    },
                    style: {
                        color: 'green',
                        fontSize: '18px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }
            },
            onHeaderCell: (column) => {
                return {
                    style: {
                        color: 'green',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        textAlign: 'center',
                    }
                }
            },
        },
        {
            title: 'Medium',
            dataIndex: 'medium_cnt',
            key: 'medium_cnt',
            width: '20%',
            sorter: (a, b) => a.medium_cnt - b.medium_cnt,
            sortDirections: ['descend', 'ascend'],
            onCell: (record) => {
                return {
                    onClick: () => {
                        setModalData(record.medium);
                        setModalVisible(true);
                        setModalDifficulty('medium');
                    },
                    onMouseOver: (e) => {
                        e.target.style.cursor = 'pointer';
                        e.target.orig_bg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = '#FFDB89';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.backgroundColor = e.target.orig_bg;
                    },
                    style: {
                        color: 'orange',
                        fontSize: '18px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }
            },
            onHeaderCell: (column) => {
                return {
                    style: {
                        color: 'orange',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        textAlign: 'center',
                    }
                }
            },
        },
        {
            title: 'Hard',
            dataIndex: 'hard_cnt',
            key: 'hard_cnt',
            width: '20%',
            sorter: (a, b) => a.hard_cnt - b.hard_cnt,
            sortDirections: ['descend', 'ascend'],
            onCell: (record) => {
                return {
                    onClick: () => {
                        setModalData(record.hard);
                        setModalVisible(true);
                        setModalDifficulty('hard');
                    },
                    onMouseOver: (e) => {
                        e.target.style.cursor = 'pointer';
                        e.target.orig_bg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = 'lightcoral';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.backgroundColor = e.target.orig_bg;
                    },
                    style: {
                        color: 'red',
                        fontSize: '18px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }
            },
            onHeaderCell: (column) => {
                return {
                    style: {
                        color: 'red',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        textAlign: 'center',
                    }
                }
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            width: '20%',
            sorter: (a, b) => a.total - b.total,
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend',
            onCell: (record) => {
                return {
                    onMouseOver: (e) => {
                        e.target.orig_bg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = 'lightgray';
                    },
                    onMouseLeave: (e) => {
                        e.target.style.backgroundColor = e.target.orig_bg;
                    },
                    style: {
                        borderRadius: '0px',
                        color: 'black',
                        fontSize: '18px',
                        fontFamily: 'Helvetica',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }
            },
            onHeaderCell: (column) => {
                return {
                    style: {
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        textAlign: 'center',
                    }
                }
            },
        },
    ];

    return <>
        <Table
            columns={columns}
            dataSource={data}
            pagination={{
                position: ['bottomCenter'],
                defaultPageSize: 10,
            }}
        />
        <DataModal visible={modalVisible} data={modalData} difficulty={modalDifficulty}  getModalVisible={getModalVisible}/>
    </>
};
export default DailyLog;