import React, { useState, useEffect } from 'react';
import { Empty, Row, Typography } from 'antd';
import { problemUrl } from './utils';
import { Modal } from "antd";

const { Link } = Typography;

const DataModal = (props) => {
    const {visible, data, difficulty, getModalVisible} = props;
    const [color, setColor] = useState('black');
    const [did, setDid] = useState(true);

    useEffect(() => {
        if (data.length !== 0) {
            let color;
            if (difficulty === 'easy') color = 'green';
            else if (difficulty === 'medium') color = 'orange';
            else color = 'red';
            setColor(color);
            setDid(true);
        }else{
            setDid(false);
        }
    }, [data, difficulty]);
    const handleCancel = (e) => {
        getModalVisible(false);
    };
    return (
        <>
            <Modal
                open={visible}
                footer={null}
                onDestory={handleCancel}
                onCancel={handleCancel}
                width="50%"
                height="50%"
            >
                {did?data.map((item) => (
                <Row key={item}>
                    <Link href={problemUrl + item + '/'}
                        target="_blank"
                        onMouseOver={(e) => {
                            e.target.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.textDecoration = 'none';
                        }}
                    >
                        <Typography style={{color: color}}>[{item}]</Typography>
                    </Link>
                </ Row>
            )):<Empty />}
            </Modal>
        </>
    );
}
export default DataModal;