import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';

/*
    props:
        data: the given user data statistics
*/

export const UserPie = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (props.data) {
            let temp = [
                {
                    type: 'easy',
                    value: props.data.easy_cnt ? props.data.easy_cnt : 0,
                },
                {
                    type: 'medium',
                    value: props.data.medium_cnt ? props.data.medium_cnt : 0,
                },
                {
                    type: 'hard',
                    value: props.data.hard_cnt ? props.data.hard_cnt : 0,
                },
            ];
            setData(temp);
        }
    }, [props]);
    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `${v} ¥`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
            },
            autoRotate: false,
            content: '{value}',
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? datum.type : 'Total';
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '32px',
                },
                customHtml: (container, view, datum, data) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
                },
            },
        },
        interactions: [
            {
                type: 'element-selected',
                cfg: {
                    start: [
                        {
                            trigger: 'element:click',
                            action: (e) => {
                                let key = e.event.data.data.type;
                                console.log(props.data[key]);
                            },
                        },
                    ],
                },
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
        color: ['#00AF9B', '#FFB800', '#EF4743'],
    };
    return <Pie {...config} />;
};