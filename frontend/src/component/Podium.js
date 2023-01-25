import { Alert, Row, Col, Avatar, List, Typography } from 'antd';
import { useState, useEffect } from 'react';

const Height = 400;
const Width = 400;
const First = 250;
const Second = 200;
const Third = 150;
const color1 = '#ff7a59';
const color2 = '#5340ff';
const color3 = '#f7b600';

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
            <Row>
                <Col span={24}>
                    <Typography.Title
                        level={2}
                        style={{
                            textAlign: 'center',
                            color: 'navy'
                        }}
                    >
                        {type === "totalSubs" ? "Top 10 Submitters" : "Top 10 Contestants"}
                    </Typography.Title>
                </Col>
            </Row>
            <Row
                style={{
                    minHeight: Height,
                    minWidth: Width,
                }}
                align="bottom">
                <Col span={3}></Col>
                <Col span={6}>

                    <div style={{
                        height: Height - Second,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={second?.avatar} style={{
                            position: 'absolute',
                            bottom: Second,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert
                        message={"2nd " + (second && type !== "" ? (second[type]).toFixed(0) : "")}
                        style={{
                                height: Second,
                                fontSize: '1.5em',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                backgroundColor: color2,
                                borderColor: color2,
                                color: 'white',
                            }} />
                </Col>
                <Col span={6} >
                    <div style={{
                        height: Height - First,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={first?.avatar} style={{

                            position: 'absolute',
                            bottom: First,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert
                        message={"1st " + (first && type !== "" ? first[type].toFixed(0) : "")}
                        color="blue"
                        style={{
                            height: First,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            backgroundColor: color1,
                            borderColor: color1,
                        }} />
                </Col>
                <Col span={6}>
                    <div style={{
                        height: Height - Third,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={third?.avatar} style={{
                            position: 'absolute',
                            bottom: Third,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} />
                    </ div>
                    <Alert
                        message={"3rd " + (third && type !== "" ? third[type].toFixed(0) : "")}
                        type="error"
                        style={{
                            height: Third,
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            backgroundColor: color3,
                            borderColor: color3,
                        }} />
                </Col>
            </ Row>
            <Row
                style={{
                    minWidth: 500,
                }}
            >
                <Col span={3}></Col>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={others}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item["avatar"]} size={60} />}
                                    title={item["username"]}
                                    description={item[type].toFixed(0)}
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