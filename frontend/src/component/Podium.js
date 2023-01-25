import { Alert, Row, Col, Avatar, List, Typography } from 'antd';
import ListBody from 'antd/es/transfer/ListBody';
import { useState, useEffect } from 'react';
const { Title, Paragraph } = Typography;

const Height = 400;
const Width = 400;
const First = 300;
const Second = 240;
const Third = 180;
const color1 = '#DC0000';
const color2 = '#5340ff';
const color3 = '#f7b600';
const link_color = '#FFFFFF';

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
                <Col span={2}></Col>
                <Col span={7}>

                    <div style={{
                        height: Height - Second,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={second?.avatar} style={{
                            position: 'absolute',
                            bottom: Second,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} 
                        onClick= {() => {
                            window.location.href = "/" + second?.username;
                        }}
                        onMouseEnter={(e) => {
                            document.body.style.cursor = "pointer";
                        }}
                        onMouseLeave={(e) => {
                            document.body.style.cursor = "default";
                        }}
                        />
                    </ div>
                    <Alert
                        message={
                        <Typography>
                            <Title 
                                level={3}
                                style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    document.body.style.cursor = "pointer";
                                    e.target.style.textDecoration = "underline";
                                    e.target.style.color = link_color;

                                }}
                                onMouseLeave={(e) => {
                                    document.body.style.cursor = "default";
                                    e.target.style.textDecoration = "none";
                                    e.target.style.color = "white";
                                }}
                                onClick={() => {
                                    window.location.href = "/" + second?.username;
                                }}
                            >
                                {second?.username}
                            </Title>
                            <Paragraph
                                style={{
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                {"2nd " + (second && type !== "" ? second[type].toFixed(0) : "")}
                            </Paragraph>
                        </Typography>
                        }
                        style={{
                                height: Second,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                display: 'block',
                                backgroundColor: color2,
                                borderColor: color2,
                                color: 'white',
                            }} />
                </Col>
                <Col span={7} >
                    <div style={{
                        height: Height - First,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={first?.avatar} style={{

                            position: 'absolute',
                            bottom: First,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} 
                        onClick= {() => {
                            window.location.href = "/" + first?.username;
                        }}
                        onMouseEnter={(e) => {
                            document.body.style.cursor = "pointer";
                        }}
                        onMouseLeave={(e) => {
                            document.body.style.cursor = "default";
                        }}/>
                    </ div>
                    <Alert
                        message={
                        <Typography>
                            <Title 
                                level={3}
                                style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    document.body.style.cursor = "pointer";
                                    e.target.style.textDecoration = "underline";
                                    e.target.style.color = link_color;
                                }}
                                onMouseLeave={(e) => {
                                    document.body.style.cursor = "default";
                                    e.target.style.textDecoration = "none";
                                    e.target.style.color = "white";
                                }}
                                onClick={() => {
                                    window.location.href = "/" + first?.username;
                                }}
                            >
                                {first?.username}
                            </Title>
                            <Paragraph
                                fontSize={20}
                                style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                            >
                                {"1st " + (first && type !== "" ? first[type].toFixed(0) : "")}
                            </Paragraph>
                        </Typography>
                        }
                        color="blue"
                        style={{
                            height: First,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'block',
                            backgroundColor: color1,
                            borderColor: color1,
                            color: 'white',
                        }} />
                </Col>
                <Col span={7}>
                    <div style={{
                        height: Height - Third,
                    }}>
                        <Avatar size={{ xs: 40, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }} src={third?.avatar} style={{
                            position: 'absolute',
                            bottom: Third,
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                        }} 
                        onClick={() => {
                            window.location.href = "/" + third?.username;
                        }}
                        onMouseEnter={(e) => {
                            document.body.style.cursor = "pointer";
                        }}
                        onMouseLeave={(e) => {
                            document.body.style.cursor = "default";
                        }}
                        />
                    </ div>
                    <Alert
                        description={
                        <Typography>
                            <Title 
                                level={3}
                                style={{
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                                onMouseEnter={(e) => {
                                    document.body.style.cursor = "pointer";
                                    e.target.style.textDecoration = "underline";
                                    e.target.style.color = link_color;
                                }}
                                onMouseLeave={(e) => {
                                    document.body.style.cursor = "default";
                                    e.target.style.textDecoration = "none";
                                    e.target.style.color = 'white';
                                }}
                                onClick={() => {
                                    window.location.href = "/" + third?.username;
                                }}
                            >
                                {third?.username}
                            </Title>
                            <Paragraph
                                fontSize={20}
                                style={{
                                    marginTop: 0,
                                    textAlign: 'center',
                                    color: 'white'
                                }}
                            >
                                {"3rd " + (third && type !== "" ? third[type].toFixed(0) : "")}
                            </Paragraph>
                        </Typography>
                        }
                        type="error"
                        style={{
                            height: Third,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'block',
                            backgroundColor: color3,
                            borderColor: color3,
                            color: 'white',
                        }} />
                </Col>
            </ Row>
            <Row
                style={{
                    minWidth: 500,
                }}
            >
                <Col span={1}></Col>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={others}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                    <Avatar 
                                        src={item["avatar"]} 
                                        size={60} 
                                        onMouseEnter={(e) => {
                                            document.body.style.cursor = "pointer";
                                        }}
                                        onMouseLeave={(e) => {
                                            document.body.style.cursor = "default";
                                        }}
                                        onClick={() => {
                                            window.location.href = "/" + item["username"];
                                        }}
                                    />
                                }
                                    title={(<Typography
                                        onMouseEnter={(e) => {
                                            document.body.style.cursor = "pointer";
                                            e.target.style.textDecoration = "underline";
                                        }}
                                        onMouseLeave={(e) => {
                                            document.body.style.cursor = "default";
                                            e.target.style.textDecoration = "none";
                                        }}
                                        onClick={() => {
                                            window.location.href = "/" + item["username"];
                                        }}
                                    >
                                        {item["username"]}
                                    </Typography>)}
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