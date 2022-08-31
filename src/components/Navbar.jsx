import React from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import Bank from "../Assets/token-logo.png"

function TopNavbar({account, loadBlockchainData}) {
  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>

      <Nav.Link><Image src={Bank} alt="Bank Logo"/></Nav.Link>

      <Button variant="info" onClick={()=> loadBlockchainData}>{account ? `${account[0].slice(0, 6)}.....${account[0].slice(36)}` : "Connect Wallet"}</Button>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
