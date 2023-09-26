/* eslint-disable */
import axios from 'axios';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const MainNav = () => {
  let navigate = useNavigate(); //이 Hook을 사용하려면 라우터 컴포넌트 내에서만 호출해야 합니다.
  /* 1
  axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
    a.data;
  });
  */
  /* 2
  useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data;
    })
  });
  */
  let result = useQuery(
    '작명',
    () =>
      axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
        console.log('틈만나면 자동으로 refetch');
        return a.data;
      }),
    { staleTime: 1000 }
  );

  /**
   * https://codingapple1.github.io/userdata.json
   */
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">🎂쪼꼬보이 편집숍 👜</Navbar.Brand> */}

        {/* <Navbar.Brand> */}
        {/* <Link to="/">🎂쪼꼬보이 편집숍 👜</Link> */}
        {/* </Navbar.Brand> */}

        <Navbar.Brand
          onClick={() => {
            navigate('/');
          }}
        >
          🎂쪼꼬보이 편집숍 👜
        </Navbar.Brand>

        {/* <Nav className="ms-auto">{result.isLoading ? '로딩중' : result.data.name}</Nav> */}
        <Nav className="ms-auto">
          {result.isLoading && '로딩중'}
          {result.error && '에러남'}
          {result.data && result.data.name}
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">쪼보 Pick</Nav.Link>
            <Nav.Link href="#pricing">BEST</Nav.Link>
            <Nav.Link href="#pricing">clothes</Nav.Link>
            <Nav.Link href="#pricing">bag</Nav.Link>
            <Nav.Link href="#pricing">Jewelry</Nav.Link>
            <Nav.Link href="#pricing">vintage</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="#deets"
              onClick={() => {
                navigate('/cart');
              }}
            >
              장바구니
            </Nav.Link>

            <NavDropdown title="MyPage 🕶" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">나의 정보</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">주문 내역</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">로그아웃</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey={2} href="#memes">
              Dark Theme🌛
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
