const { assert } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { deserialize } = require("v8");
// const helpers = require("hardhat-network-helpers");

// const { expect } = require("chai")
//   .use(require("chai-as-promised"))
//   .should();
require("chai")
  .use(require("chai-as-promised"))
  .should();

describe("Mock Tether Deployment", async () => {
  it("matches name successfully", async () => {
    const TetherContract = await ethers.getContractFactory("Tether");
    const TetherDeployed = await TetherContract.deploy();
    const name = await TetherDeployed.name();
    const symbol = await TetherDeployed.symbol();
    assert.equal("Mock Tether Token", name);
    assert.equal("USDT", symbol);
  });

  it("Matches Name Successfully", async () => {
    const RewardContract = await ethers.getContractFactory("RWD");
    const RewardDeployed = await RewardContract.deploy();
    const name = await RewardDeployed.name();
    const symbol = await RewardDeployed.symbol();
    assert.equal("Reward Token", name);
    assert.equal("RWD", symbol);
  });

  it("Matches Name Successfully", async () => {
    const DecentralBankContract = await ethers.getContractFactory(
      "DecentralBank"
    );
    const TetherContract = await ethers.getContractFactory("Tether");
    const RewardContract = await ethers.getContractFactory("RWD");
    const TetherDeployed = await TetherContract.deploy();
    const RewardDeployed = await RewardContract.deploy();

    const tether = await TetherDeployed.deployed();
    const rwd = await RewardDeployed.deployed();
    const DecentralBankDeployed = await DecentralBankContract.deploy(
      tether.address,
      rwd.address
    );
    const name = await DecentralBankDeployed.name();
    assert.equal("Decentral Bank", name);
  });
  it("Has Transferred all Tokens to the Decentral Bank", async () => {
    const DecentralBankContract = await ethers.getContractFactory(
      "DecentralBank"
    );
    const TetherContract = await ethers.getContractFactory("Tether");
    const RewardContract = await ethers.getContractFactory("RWD");
    const TetherDeployed = await TetherContract.deploy();
    const RewardDeployed = await RewardContract.deploy();

    const tether = await TetherDeployed.deployed();
    const rwd = await RewardDeployed.deployed();
    const DecentralBankDeployed = await DecentralBankContract.deploy(
      tether.address,
      rwd.address
    );
    const decentralBank = await DecentralBankDeployed.deployed();
    // Transfer 1 Million Tokens to the Decentral Bank
    await rwd.transfer(
      DecentralBankDeployed.address,
      "1000000000000000000000000"
    );

    //Transfer 100 Tokens to the Customer
    await tether.transfer(
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      "100000000000000000000"
    );
    const BN1 = await tether.balanceOf(
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    );

    // console.log(BN1);
    console.log("BN1",ethers.utils.formatEther(BN1));
    const BN2 = await rwd.balanceOf(decentralBank.address);
    console.log("BN2",ethers.utils.formatEther(BN2))

    assert.equal(100.0, ethers.utils.formatEther(BN1));
    assert.equal(ethers.utils.formatEther(BN2), 1000000);
    const [owner, spender] = await ethers.getSigners();
    console.log(owner.address);
    console.log(spender.address);
    // console.log(await tether.balanceOf(owner.address));
    // const signer = tether.signer;
    // console.log(signer);
    await tether
      .approve(decentralBank.address, "10000000000000000000", spender.address );
    await decentralBank
      .depositTokens("10000000000000000000",  owner.address);
    // const bal = await decentralBank.stakingBalance["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"];
    // assert.equal(bal, 10);
  });

  // it("Check Staking for Customer", async () => {
  // });
});
