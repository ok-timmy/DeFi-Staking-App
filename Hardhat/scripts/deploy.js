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
