import { Alert, Row, Col, Avatar } from 'antd';
import { useState, useEffect } from 'react';

const Podium = (props) => {
    const [first, setFirst] = useState();
    // const [second, setSecond] = useState();
    // const [third, setThird] = useState();
    // const [others, setOthers] = useState([]);
    // const [type, setType] = useState("");
    useEffect(() => {
        if (props.stats.length === 0) return;
        setFirst(props.stats[0]);
        // setSecond(props.stats[1]);
        // setThird(props.stats[2]);
        // setType(props.type);
        // setOthers(props.stats.slice(3, 10));
    }, [props]);
    return (
        <Row>
            <Col span={6}></Col>
            <Col span={4}>

                <div style={{
                    height: "15vh",
                    display: 'block',
                }}></ div>
                <Alert message="2nd" type="warning" style={
                    {
                        height: '15vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                } />
            </Col>
            <Col span={4} >
                <div style={{
                    height: "10vh",
                    display: 'flex',
                }}>
                    <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={first?.avatar} style={{
                        marginBottom: '1px',
                        position: 'absolute',
                        // center the avatar
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                    }} />
                </ div>
                <Alert message="1st" type="info" style={
                    {
                        height: '20vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                } />
            </Col>
            <Col span={4}>
                <div style={{ height: "20vh" }}></ div>
                <Alert message="3rd" type="error" style={
                    {
                        height: '10vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                } />
            </Col>
            <Col span={6}></Col>
        </ Row>
    );
};

export default Podium;