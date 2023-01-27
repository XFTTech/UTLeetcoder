import { Button, Table, theme } from 'antd';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: 'QuestionId',
        dataIndex: 'questionId',
    },
    {
        title: 'Title',
        dataIndex: 'title',
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
    },
];

export const ProblemsTable = (props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [loading, setLoading] = useState(false);

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