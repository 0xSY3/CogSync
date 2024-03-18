import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      accounts: [{
        privateKey: `${process.env.ACCOUNT_PK}`,
        balance: "1000000000000000000000000"
      }
      ],
    },
    local: {
      url: "http://183.115.42.672:1283",
      accounts: [`${process.env.ACCOUNT_PK}`,], // just a test account, use an .env file please
    },
    calibnet: {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [`${process.env.ACCOUNT_PK}`,], // just a test account, use an .env file please
    },
    spicynet: {
      url: "https://spicy-rpc.chiliz.com/",
      accounts: [`${process.env.ACCOUNT2_PK}`,], // just a test account, use an .env file please
    },
  },
};

export default config;
