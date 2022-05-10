require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const fs = require("fs");
const MUMBAI_RPC = process.env.MUMBAI_RPC;
const ROPSTEN_RPC = process.env.ROPSTEN_RPC;
const RINKEBY_RPC = process.env.RINKEBY_RPC;
const GOERLI_RPC = process.env.GOERLI_RPC;
const KOVAN_RPC = process.env.KOVAN_RPC;
const SKALE_RPC = process.env.SKALE_RPC;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

const SHARDEUM_RPC = process.env.SHARDEUM_RPC;
const privateKey = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
/**
 *     hardhat: {
      chainId: 8080,
    }, 
 * ropsten: {
      url: ROPSTEN_RPC,
      accounts: [privateKey],
    },
    rinkeby: {
      url: RINKEBY_RPC,
      accounts: [privateKey],
    },
    goerli: {
      url: GOERLI_RPC,
      accounts: [privateKey],
    },
    kovan: {
      url: KOVAN_RPC,
      accounts: [privateKey],
    },
    mumbai: {
      url: MUMBAI_RPC,
      accounts: [privateKey],
    },
    skale: {
      url: SKALE_RPC,
      accounts: [privateKey],
      gasPrice: 100000,
    },
    etherscan: {
    apiKey: ETHERSCAN_KEY,
  },

 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    shardeum: {
      url: SHARDEUM_RPC,
      accounts: [privateKey],
      chainId: 8080,
    }
  },
};
