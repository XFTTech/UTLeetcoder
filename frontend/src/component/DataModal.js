import React, { useState, useEffect } from 'react';
import { Empty, Row, Typography } from 'antd';
import { problemUrl } from './utils';
import { Modal, Pagination } from "antd";

const { Link } = Typography;
const PAGE_SIZE = 15;

const DataModal = (props) => {
    const { visible, data, difficulty, getModalVisible } = props;
    const [color, setColor] = useState('black');
    const [did, setDid] = useState(true);
    const [page, setPage] = useState(1);
    const [showPage, setShowPage] = useState(true);

    useEffect(() => {
        if (data.length !== 0) {
            let color;
            if (difficulty === 'easy') color = 'green';
            else if (difficulty === 'medium') color = 'orange';
            else color = 'red';
            setColor(color);
            setDid(true);
            setPage(1);
            if (data.length > PAGE_SIZE) setShowPage(true);
            else setShowPage(false);
        } else {
            setDid(false);
            setShowPage(false);
        }
    }, [data, difficulty]);
    const handleCancel = (e) => {
        getModalVisible(false);
    };
    return (
        <Modal
            open={visible}
            footer={null}
            onDestory={handleCancel}
            onCancel={handleCancel}
            width='50%'
            title={difficulty + ' problems'}
            bodyStyle={{
                height: '50vh',
                overflow: 'auto',
                marginTop: '1px',
            }}
        >
            {did ? (data.slice((page - 1) * PAGE_SIZE, Math.min(page * PAGE_SIZE, data.length)).map((item) => (
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
                        <Typography
                            style={{
                                color: color,
                                fontSize: 18,
                            }}>
                            [{item}]
                        </Typography>
                    </Link>
                </ Row>
            ))) : <Empty />}
            {did && showPage ? <Pagination
                style={{
                    // at bottom center
                    marginTop: '10px',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: 15,
                    width: '100%',
                }}
                current={page}
                total={data.length}
                pageSize={PAGE_SIZE}
                showSizeChanger={false}
                onChange={(change) => {
                    setPage(change);
                }}
            />: null }
        </Modal>
    );
}
export default DataModal;