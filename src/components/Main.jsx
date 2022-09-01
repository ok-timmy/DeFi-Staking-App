import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import Tether from "../Assets/Tether-USDT-Logo.png";
import Token from "../Assets/RewardToken.png";
import Eth from "../Assets/eth-logo.png";
import Web3 from "web3";

const Main = ({
  tetherBalance,
  rwdBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
}) => {
  const [amount, setAmount] = useState();

  console.log(amount);
  return (
    <>
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
            <Form.Control
              aria-label="Amount"
              defaultValue={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              variant="info"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const newAmount = Web3.utils.toWei(amount.toString(), "wei");
                stakeTokens(newAmount);
              }}
            >
              Stake
            </Button>
          </InputGroup>
          <p className="pt-3">
            Balance: {Web3.utils.fromWei(tetherBalance.toString(), "ether")}
          </p>
          <Button variant="info" onClick={()=> unstakeTokens()}>Withdraw All Tokens</Button>
        </Card>
      </Container>

      <Container fluid={true} className="px-lg-5">
        <Row>
          <Col lg={6} className=" px-lg-5 mb-3">
            <Card className="my-lg-4 shadow px-5">
              <Card.Title
                className="mt-3 mx-auto bg-white pb-4"
                style={{ fontSize: "2rem", fontWeight: "400" }}
              >
                Staking Balance
              </Card.Title>
              <Card.Img
                variant="top"
                src={Tether}
                style={{ width: "15rem", height: "15rem" }}
                className="p-5 mx-auto"
              />

              <Card.Title className="display-4 mx-auto bg-white pb-4">
                {Web3.utils.fromWei(stakingBalance.toString(), "ether")}
              </Card.Title>
            </Card>
          </Col>
          <Col lg={6} className=" px-lg-5 mb-3">
            <Card className="my-lg-4 shadow">
              <Card.Title
                className="mt-3 mx-auto bg-white pb-4"
                style={{ fontSize: "2rem", fontWeight: "400" }}
              >
                Reward Balance
              </Card.Title>
              <Card.Img
                src={Token}
                style={{ width: "15rem", height: "15rem" }}
                className="p-5 mx-auto"
              />

              <Card.Title className="display-4 mx-auto bg-white pb-4">
                {Web3.utils.fromWei(rwdBalance.toString(), "ether")}
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
    </>
  );
};

export default Main;
