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
    await rwd.transfer(decentralBank.address, "1000000000000000000000000");

    console.log("Successfully transferred 1 Million tokens to decentral bank");

    console.log("    ");

    const [owner, spender] = await ethers.getSigners();
    //Transfer 1000 Tokens to the Customer
    await tether.transfer(spender.address, "1000000000000000000000");
    console.log(
      "Successfully called tether transfer function and 100 tether tokens have been trnasferred to the Customer"
    );

    const BN1 = await tether.balanceOf(spender.address);
    const BN3 = await tether.balanceOf(owner.address);
    console.log(
      "BN1 :",
      ethers.utils.formatEther(BN1),
      "Tether token for Spender"
    );
    console.log(
      "BN3 :",
      ethers.utils.formatEther(BN3),
      "Tether token for Owner"
    );
    const BN2 = await rwd.balanceOf(decentralBank.address);
    console.log(
      "BN2",
      ethers.utils.formatEther(BN2),
      "Reward Tokens in the Decentral bank"
    );

    assert.equal(1000, ethers.utils.formatEther(BN1));
    assert.equal(ethers.utils.formatEther(BN2), 1000000);

    // console.log(decentralBank.address);
    // console.log(owner.address);
    // console.log(spender.address);
    // const signer = tether.signer;
    // console.log(signer);
   const isTetherApproved = await tether.approve(decentralBank.address, "10000000000000000000");

   if(isTetherApproved) {
    await decentralBank.depositTokens("10000000000000000000")
    console.log("Deposit token ran properly")
   } else {
    console.log("Deposit tokens function could not run properly ")
   }


    await tether.approve(owner.address, "10000000000000000000");
    console.log("Tether approve function successful");
    console.log(
      ethers.utils.formatEther(await tether.balanceOf(spender.address)),
      "Tether Tokens as Spender Balance"
    );
    console.log(
      ethers.utils.formatEther(await tether.balanceOf(owner.address)),
      "Tether tokens as Owner Balance"
    );

    console.log("calling decentralbank deposit token function");
    // await decentralBank.depositTokens("10000000000000000000");


    const bal = await decentralBank.stakingBalance(owner.address);
    assert.equal(ethers.utils.formatEther(bal), 10.0);
    
    // await decentralBank.unstakeTokens();
    // const bal2 = await decentralBank.stakingBalance(owner.address);
    // assert.equal(ethers.utils.formatEther(bal2), 0.0);
    
    
    await decentralBank.issueTokens();
    const bal3 = await rwd.balanceOf(owner.address);
    // assert.equal(ethers.utils.formatEther(bal3), 0.0);
    console.log(ethers.utils.formatEther(bal3));
  });

  // it("Check Staking for Customer", async () => {
  // });
});
