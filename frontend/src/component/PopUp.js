import React, { useState, useEffect } from 'react';
import { Popup } from 'antd-mobile'
import { problemUrl } from './utils';
import { Empty, Row, Typography } from 'antd';

const { Link } = Typography;

const PopUp = (props) => {
    const { visible, data, difficulty, getModalVisible } = props;
    const [did, setDid] = useState(true);
    const [color, setColor] = useState('black');

    useEffect(() => {
        if (data.length !== 0) {
            let color;
            if (difficulty === 'easy') color = 'green';
            else if (difficulty === 'medium') color = 'orange';
            else color = 'red';
            setColor(color);
            setDid(true);
        } else {
            setDid(false);
        }
    }, [data, difficulty]);


    return (
        <Popup
            visible={visible}
            onMaskClick={() => {
                getModalVisible(false);
            }}
        >
            <div
                style={{ height: '40vh', overflowY: 'scroll', padding: '20px' }}
            >
                {did ? (data.map((item) => (
                    <Row key={item}>
                        <Link href={problemUrl + item + '/'}
                            target="_blank"
                        >
                            <Typography
                                style={{ color: color }}
                            >
                                [{item}]
                            </Typography>
                        </Link>
                    </Row>
                ))) : (
                    <Empty />
                )}
            </div>
        </Popup >
    );
};

export default PopUp;