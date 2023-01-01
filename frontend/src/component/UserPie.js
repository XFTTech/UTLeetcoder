import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

/*
    props:
        daily: the given daily statistics
*/

export const UserPie = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (props.daily) {
            let temp = [
                {
                    type: 'Easy',
                    value: props.daily.easy_cnt? props.daily.easy_cnt : 0,
                },
                {
                    type: 'Medium',
                    value: props.daily.medium_cnt? props.daily.medium_cnt : 0,
                },
                {
                    type: 'Hard',
                    value: props.daily.hard_cnt? props.daily.hard_cnt : 0,
                },
            ];
            setData(temp);
        }
    }, [props]);
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{value} {name}',
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        color: ['#008000', '#FFA500', '#FF0000'],
    };
    return <Pie {...config} />;
};