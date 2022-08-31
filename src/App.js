import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";
import TopNavbar from "./components/Navbar";
import Tether from "./Assets/Tether-USDT-Logo.png";
import Token from "./Assets/RewardToken.png";
import Eth from "./Assets/eth-logo.png";
import Footer from "./components/Footer";
import Web3 from "web3";
import tetherABI from "./truffle_abis/contracts/Tether.json";
import rwdABI from "./truffle_abis/contracts/RWD.json";
import decentralBankABI from "./truffle_abis/contracts/DecentralBank.json";

function App() {
  const [account, setAccount] = useState();
  const [tether, setTether] = useState();
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rwdBalance, setRwdbalance] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
    // const networkId = await web3.eth.net.getId();
    // console.log(networkId, "Network ID");
    // const tetherData = await tether.networks
    // console.log(tetherData);

    var Contract = require("web3-eth-contract");
    await Contract.setProvider(
      "https://ropsten.infura.io/v3/694a9ca220cb436a9a63b74bfdbe560e"
    );
    const tetherContract = await new web3.eth.Contract(
      tetherABI.abi,
      "0x09f9b8E0FfE8CD8b5010453DE716d725b28A9216"
    );
    const rwdContract = await new web3.eth.Contract(
      rwdABI.abi,
      "0x5BDE8FB49F7Ee517Ed1d6bA0d2D0f700C3C21b70"
    );
    const decentralBankContract = await new web3.eth.Contract(
      decentralBankABI.abi,
      "0xA52853e5c2163571EFD91dD37dba0729bD0fd8Aa"
    );
    // let tetherBalance = await tetherContract.methods.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8").call()
    let tetherName = await tetherContract.methods.name().call();
    let tetherSymbol = await tetherContract.methods.symbol().call();
    let rwdName = await rwdContract.methods.name().call();
    let rwdSymbol = await rwdContract.methods.symbol().call();
    let decentralBankName = await decentralBankContract.methods.name().call();
    // let decentralBankSymbol = await decentralBankContract.methods.symbol().call();

    console.log(tetherContract);
    console.log(rwdContract);
    console.log(decentralBankContract);
    console.log( rwdSymbol, tetherSymbol);
    console.log(tetherName, rwdName, decentralBankName);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Please Install Metamask!!");
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <>
      <TopNavbar account={account} loadBlockchainData={loadBlockchainData} />
      <Container className="mt-5">
        {" "}
        <Card className="shadow p-4 my-3">
          <h1>Welcome, to Decentral Bank</h1>
          <p className="lead">How Much Would You Like to stake?</p>
          <InputGroup>
            <InputGroup.Text>
              <Image src={Eth} alt="Eth" width={20} height={20} />{" "}
              <span className="ml-2">USDT</span>
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
                style={{ width: "15rem", height: "15rem" }}
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
                style={{ width: "15rem", height: "15rem" }}
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
