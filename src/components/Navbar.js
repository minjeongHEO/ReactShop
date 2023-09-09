import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const MainNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">🎂쪼꼬보이 편집숍 👜</Navbar.Brand>
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
            <Nav.Link href="#deets">More deets</Nav.Link>
            <NavDropdown title="MyPage 🕶" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">나의 정보</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">주문 내역</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">월간 일지</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">로그아웃</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
