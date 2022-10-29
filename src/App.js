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
  const [rwdBalance, setRwdBalance] = useState(0);
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
      "0xE7f384500cd1b782BD1cf50d4f6AB1cA990C3aa2"
    );
    const rwdContract = await new web3.eth.Contract(
      rwdABI.abi,
      "0x8F5FB0c4835f52B9EFA14126F506F2495FbBc1c9"
    );
    const decentralBankContract = await new web3.eth.Contract(
      decentralBankABI.abi,
      "0x450BF6b1f61E20b2739E410f5f9f9B3fC381c70c"
    );

    setTether(tetherContract);
    setRwd(rwdContract);
    setDecentralBank(decentralBankContract);

    setIsLoading(false);
    let tetherBalances = await tetherContract.methods
      .balanceOf(accounts[0])
      .call();
    setTetherBalance(tetherBalances);

    let RWDBalance = await rwdContract.methods
      .balanceOf(accounts[0])
      .call();
    setRwdBalance(RWDBalance);

   let decentralBankBalance = await decentralBankContract.methods
      .stakingBalance(accounts[0])
      .call();
    setStakingBalance(decentralBankBalance);
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

  // console.log(isLoading);
  // console.log(tether);
  // console.log(rwd);
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
