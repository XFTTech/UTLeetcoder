import { Alert, Row, Col, Avatar, List } from 'antd';
import { useState, useEffect } from 'react';

const Podium = (props) => {
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [third, setThird] = useState(null);
    const [others, setOthers] = useState([]);
    const [type, setType] = useState("");
    useEffect(() => {
        if (props.stats.length === 0) return;
        setFirst(props.stats[0]);
        setSecond(props.stats[1]);
        setThird(props.stats[2]);
        setType(props.type);
        setOthers(props.stats.slice(3, 10));
    }, [props]);
    // fix the height of the podium
    return (
        <>
            <Row
                style={{
                    minHeight: 200,
                }}
                align="bottom">
                <Col span={6}></Col>
                <Col span={4}>

                    <div style={{
                        height: 100,
                    }}>
                        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={second?.avatar} style={{
                            position: 'absolute',
                            bottom: 100,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert message={"2nd " + (second && type !== "" ?(second[type]).toFixed(0):"")} type="warning" style={
                        {
                            height: 100,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }
                    } />
                </Col>
                <Col span={4} >
                    <div style={{
                        height: 80,
                    }}>
                        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={first?.avatar} style={{

                            position: 'absolute',
                            bottom: 120,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert message={"1st " + (first && type !== "" ?first[type].toFixed(0):"")} type="info" style={
                        {
                            height: 120,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'block',
                        }
                    } />
                </Col>
                <Col span={4}>
                    <div style={{
                        height: 120,
                    }}>
                        <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={third?.avatar} style={{
                            position: 'absolute',
                            bottom: 80,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert message={"3rd " + (third && type !== "" ?third[type].toFixed(0):"")} type="error" style={
                        {
                            height: 80,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }
                    } />
                </Col>
            </ Row>
            <Row>
                    <Col span={6}></Col>
                    <Col span={12}>
                    <List
                itemLayout="horizontal"
                dataSource={others}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item["avatar"]} />}
                    title={item[type].toFixed(0)}
                    />
                </List.Item>
                )}
            />
                    </Col>
            </Row>
        </>
    );
};

export default Podium;