require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "rinkeby",
   networks: {
      hardhat: {},
      rinkeby: {
         url: `${process.env.NODE_RINKEBY_URL}`,
         accounts: [`${process.env.PRIVATE_KEY}`]
      },
      ropsten: {
         url: `${process.env.NODE_ROPSTEN_URL}`,
         accounts: [`${process.env.PRIVATE_KEY}`]
      },
   },
};
