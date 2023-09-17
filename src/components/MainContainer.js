/* eslint-disable */
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const MainContainer = (props) => {
  return (
    <Container>
      <Row>
        {props.shoes.map((data) => (
          <Col>
            <Link to={`/detail/${data.id}`}>
              {/* <img src={data.img} width="80%" /> */}
              <img src={`https://codingapple1.github.io/shop/shoes${data.id + 1}.jpg`} width="80%" />
              <h4>{data.title}</h4>
              <p>{data.price}</p>
            </Link>
          </Col>
        ))}
        {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%" /> */}
      </Row>
    </Container>
  );
};

export default MainContainer;
