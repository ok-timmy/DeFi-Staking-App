// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const TetherContract = await hre.ethers.getContractFactory("Tether");
  const RewardContract = await hre.ethers.getContractFactory("RWD");
  const DecentralBankContract = await hre.ethers.getContractFactory(
    "DecentralBank"
  );

  const TetherDeployed = await TetherContract.deploy();
  const RewardDeployed = await RewardContract.deploy();

  const tether = await TetherDeployed.deployed();
  const rwd = await RewardDeployed.deployed();
  const DecentralBankDeployed = await DecentralBankContract.deploy(
    tether.address,
    rwd.address
  );
  await DecentralBankDeployed.deployed();

  //Transfer all the RWD tokens to the decentral Bank
  const tx1 = await rwd.transfer(
    DecentralBankDeployed.address,
    "1000000000000000000000000"
  );

  //Distribute 100 tokens to the investor
  const tx2 = await tether.transfer(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "100000000000000000000"
  );

  const BN = await tether.balanceOf(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  // console.log(tx1);
  // console.log(tx2);
  console.log(ethers.utils.formatEther(BN));

  console.log("This Contract was deployed to:", TetherDeployed.address);
  console.log("This Contract was deployed to:", await TetherDeployed.name());

  console.log("This Contract was deployed to:", RewardDeployed.address);
  console.log("This Contract was deployed to:", await RewardDeployed.name());

  console.log("This Contract was deployed to:", DecentralBankDeployed.address);
  console.log(
    "This Contract was deployed to:",
    await DecentralBankDeployed.name()
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    // console.log(error.message);
    console.error(error);
    process.exit(1);
    // process.exitCode = 1;
  });
