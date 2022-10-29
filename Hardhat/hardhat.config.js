require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: `${process.env.NODE_GOERLI_URL}`,
         accounts: [`${process.env.PRIVATE_KEY}`]
      },
   },
};
