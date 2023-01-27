import { Table } from 'antd';
import { useEffect, useState } from 'react';

const problem_url = 'https://leetcode.com/problems/';
const contest_url = 'https://leetcode.com/contest/';

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
                    window.location.href = problem_url + record.key;
                },
                onMouseEnter: (event) => {
                    event.target.style.color = 'blue';
                    event.target.style.textDecoration = 'underline';
                    document.body.style.cursor = 'pointer';
                },
                onMouseLeave: (event) => {
                    event.target.style.color = 'black';
                    event.target.style.textDecoration = 'none';
                    document.body.style.cursor = 'default';
                }
            };
        },
    },
    {
        title: 'Contest',
        dataIndex: 'contest',
        onCell: (record) => {
            return {
                onClick: (event) => {
                    window.location.href = contest_url + record.c_slug;
                },
                onMouseEnter: (event) => {
                    event.target.style.color = 'orange';
                    event.target.style.textDecoration = 'underline';
                    document.body.style.cursor = 'pointer';
                },
                onMouseLeave: (event) => {
                    event.target.style.color = 'black';
                    event.target.style.textDecoration = 'none';
                    document.body.style.cursor = 'default';
                }
            }
        },
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