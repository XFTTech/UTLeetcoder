import { Alert, Row, Col } from 'antd';

const Podium = (props) => {
    
    return (
        <Row> 
            <Col span={6}></Col>
            <Col span={3}>
                <div style={{height:"15vh"}}></ div>
                <Alert message="2nd" type="warning" style={
                    {
                        height: '15vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }/>
            </Col>
            <Col span={3}>
            <div style={{height:"10vh"}}></ div>
                <Alert message="1st" type="info" style={
                    {
                        height: '20vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }/>
            </Col>
            <Col span={3}>
                <div style={{height:"20vh"}}></ div>
                <Alert message="3rd" type="error" style={
                    {
                        height: '10vh',
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }
                }/>
            </Col>
            <Col span={6}></Col>
        </ Row>
    );
};

export default Podium;