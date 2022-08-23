const DecentralBank = artifacts.require("DecentralBank");

module.exports = function (deployer) {
  deployer.deploy(DecentralBank);
};