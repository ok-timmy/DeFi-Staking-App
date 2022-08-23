const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    development: {
      network_id: "*",
      port: "8080",
      host: "127.0.0.1"
    },
    inf_defi_app_ropsten: {
      network_id: 3,
      gasPrice: 2000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\ADMIN\\Desktop\\Projects\\DeFi-Staking-App\\contracts\\contracts\\ropsten.env', 'utf-8'), "https://ropsten.infura.io/v3/f059cdee92f14e13a0eb109b8f655c1e")
    }
  },
  compilers: {
    solc: {
      version: "0.8.13"
    }
  },
  db: {
    enabled: false,
    host: "127.0.0.1"
  }
};
