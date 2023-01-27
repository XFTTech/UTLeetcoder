import { Table } from 'antd';
import { useEffect, useState } from 'react';

const url = 'https://leetcode.com/problems/';

const columns = [
    {
        title: 'QuestionId',
        dataIndex: 'questionId',
        sorter: (a, b) => a.questionId - b.questionId,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        onCell: (record) => {
            return {
                onClick: (event) => {
                    window.location.href = url + record.key;
                },
                onMouseEnter: (event) => {
                    event.target.style.color = 'blue';
                    document.body.style.cursor = 'pointer';
                },
                onMouseLeave: (event) => {
                    event.target.style.color = 'black';
                    document.body.style.cursor = 'default';
                }
            };
        },
    },
    {
        title: 'Contest',
        dataIndex: 'contest',
    },
    {
        title: 'Q#',
        dataIndex: 'numbq',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        sorter: (a, b) => a.rating - b.rating,
    },
];

export const ProblemsTable = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props]);

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};