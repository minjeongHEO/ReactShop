/* eslint-disable */
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainContainer = (props) => {
  return (
    <Container>
      <Row>
        {props.shoes.map((data) => (
          <Col>
            <img src={data.img} width="80%" />
            <h4>{data.title}</h4>
            <p>{data.price}</p>
          </Col>
        ))}

        {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%" /> */}
      </Row>
    </Container>
  );
};

export default MainContainer;
