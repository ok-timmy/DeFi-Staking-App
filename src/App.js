import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";
import TopNavbar from "./components/Navbar";
import Tether from "./Assets/Tether-USDT-Logo.png";
import Token from "./Assets/RewardToken.png";
import Eth from "./Assets/eth-logo.png";
import Footer from "./components/Footer";
import Web3 from "web3";
// import tether from "./contracts/Tether.sol/Tether.json";
// import rwd from "./contracts/RWD.sol/RWD.json";

function App() {

  
  const [account, setAccount] = useState();
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({})
  const [decentralBank, setDecentralBank] = useState({})
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rwdBalance, setRwdbalance] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadWeb3 = async() =>{
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }else {
      alert("Please Install Metamask!!");
    }
  }

  const loadBlockchainData = async() => {
    const web3 = window.web3;
    const account1 = await web3.eth.getAccounts();
    setAccount(account1)
    console.log(account1);
    const networkId = await web3.eth.net.getId();
    // console.log(networkId, "Network ID");
    // const tetherData = await tether.networks[networkId]
    // console.log(tetherData);
  } 


  useEffect(() => {
   loadWeb3();
   loadBlockchainData()
  }, [])
  
  return (
    <>
      <TopNavbar account = {account}/>
      <Container className="mt-5">
        {" "}
        <Card className="shadow p-4 my-3">
          <h1>Welcome, to Decentral Bank</h1>
          <p className="lead">How Much Would You Like to stake?</p>
          <InputGroup>
            <InputGroup.Text>
              <Image src={Eth} alt="Eth" width={20} height={20} /> <span className="ml-2">USDT</span>
            </InputGroup.Text>
            <Form.Control aria-label="Amount" />
            <Button variant="info">Stake</Button>
          </InputGroup>
        </Card>
      </Container>

      <Container fluid={true} className="px-lg-5">
        <Row>
          <Col lg={6} className=" px-lg-5 mb-3">
            <Card className="my-lg-4 shadow px-5">
              <Card.Img
                variant="top"
                src={Tether}
                style={{ width: "15rem", height:'15rem' }}
                className="p-5 mx-auto"
              />

              <Card.Title className="display-4 mx-auto bg-white pb-4">
                100.0
              </Card.Title>
            </Card>
          </Col>
          <Col lg={6} className=" px-lg-5 mb-3">
            <Card className="my-lg-4 shadow">
              <Card.Img
                src={Token}
                style={{ width: "15rem", height:'15rem' }}
                className="p-5 mx-auto"
              />

              <Card.Title className="display-4 mx-auto bg-white pb-4">
                100.0
              </Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="">
        {" "}
        <Card className="shadow p-4 my-3">
          <h6 className="mx-auto display-4">Airdrop</h6>
          <p className="lead mx-auto">Airdrop Happens In</p>
          <p className="mx-auto display-4">00:00</p>
        </Card>
      </Container>
      {/* <div>App</div> */}
      <Footer />
    </>
  );
}

export default App;
