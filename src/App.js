import React, { useEffect, useState } from "react";
import ReactSpinner from "react-bootstrap-spinner";
import TopNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Web3 from "web3";
import tetherABI from "./truffle_abis/contracts/Tether.json";
import rwdABI from "./truffle_abis/contracts/RWD.json";
import decentralBankABI from "./truffle_abis/contracts/DecentralBank.json";
import Main from "./components/Main";

function App() {
  const [account, setAccount] = useState();
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState(0);
  const [rwdBalance, setRwdbalance] = useState(0);
  const [stakingBalance, setStakingBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadBlockchainData = async () => {
    setIsLoading(true);
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

    setTether(tetherContract);
    setRwd(rwdContract);
    setDecentralBank(decentralBankContract);

    setIsLoading(false);
    let tetherBalances = await tetherContract.methods
      .balanceOf(accounts[0])
      .call();
    setTetherBalance(tetherBalances);
  };

  const stakeTokens = (amount) => {
    setIsLoading(true);
    tether.methods
      .approve(decentralBank._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        decentralBank.methods
          .depositTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setIsLoading(false);
          });
      });
  };

  const unstakeTokens = () => {
    setIsLoading(true);
    decentralBank.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setIsLoading(false);
      });
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

  console.log(isLoading);
  console.log(tether);
  console.log(rwd);
  console.log(decentralBank);

  return (
    <>
      <TopNavbar account={account} loadBlockchainData={loadBlockchainData} />
      {isLoading ? (
        <div className="text-center" style={{ minHeight: "100vh" }}>
          <ReactSpinner type="border" color="info" size="4" />
        </div>
      ) : (
        <Main
          tetherBalance={tetherBalance}
          rwdBalance={rwdBalance}
          stakingBalance={stakingBalance}
          stakeTokens={stakeTokens}
          unstakeTokens={unstakeTokens}
        />
      )}
      <Footer />
    </>
  );
}

export default App;

// let tetherSymbol = await tetherContract.methods.symbol().call();
// let rwdName = await rwdContract.methods.name().call();
// let rwdSymbol = await rwdContract.methods.symbol().call();
// let decentralBankName = await decentralBankContract.methods.name().call();
// let decentralBankStakingBalance = await decentralBankContract.methods
//   .stakingBalance("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
//   .call();
// await tetherContract.methods.transfer("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 1).call();
// let bal = await tetherContract.methods.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8").call();

// console.log(bal);

// console.log(
//   rwdSymbol,
//   tetherSymbol,
//   tetherBalances,
//   decentralBankStakingBalance
// );
// console.log(tetherName, rwdName, decentralBankName);
