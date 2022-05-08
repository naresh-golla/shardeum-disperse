// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("@ethersproject/bignumber");
const hre = require("hardhat");
const { ethers } = require("hardhat");

const ETHER = BigNumber.from(10).pow(BigNumber.from(18));

const getTokenValue = (value) => BigNumber.from(value).mul(ETHER);

const recipients = [
  "0x422938990FED07aEb904260b1094943afC2e366d",
  "0x633E8B8aDCE8d98EbC2ae2b8ef2d176221e58a70",
  "0x97f67736CcF4da7cD5a12752dF3B1548Fb90699e",
  "0x7e5EEFa83B4732Ac651E43E8c7e54c8Cd7d7c283",
  "0x77E07C1431BAb269e6075a7408c4e2f78d8dccDD",
];

const values = [
  getTokenValue(10),
  getTokenValue(20),
  getTokenValue(30),
  getTokenValue(40),
  getTokenValue(50),
];

const logBalance = async (aliceContract, address) => {
  const balance = await aliceContract.balanceOf(address);
  console.log(`${address} has ${balance} ALICE token`);
};

const logAddressBalance = async (address, provider) => {
  const balance = await provider.getBalance(address);
  console.log(`${address} has ${hre.ethers.utils.formatEther(balance)} ether`);
};

async function main() {
  const [aliceSigner, bobSigner] = await hre.ethers.getSigners();
  const Alice = await hre.ethers.getContractFactory("Alice");
  const Disperse = await hre.ethers.getContractFactory("Disperse");
  const alice = await Alice.deploy("Alice", "ALICE");
  const provider = new ethers.providers.JsonRpcProvider();

  console.log("provider",provider)

  await alice.deployed();
  const totalSupply = await alice.totalSupply();

  console.log(`Address: ${alice.address}`);
  console.log(`TotalSupply: ${ethers.utils.formatEther(totalSupply)}`);
  const disperse = await Disperse.deploy();

  await disperse.deployed();

  const approve = await alice.approve(
    disperse.address,
    BigNumber.from(150).mul(ETHER)
  );

  const transfer = await disperse.disperseToken(
    alice.address,
    recipients,
    values
  );

  await Promise.all(
    recipients.map(async (add) => {
      await logBalance(alice, add);
    })
  );

  // * Disperse ethers

  // Log recipients ether balance before disperse
  console.log("Ether balance of address before disperse");
  await Promise.all(
    recipients.map(async (recipient) => {
      await logAddressBalance(recipient, provider);
    })
  );

  const disperseEther = await disperse.disperseEther(recipients, values, {
    value: BigNumber.from(150).mul(ETHER),
  });
  await disperseEther.wait();

  console.log("Ether balance of address after disperse");
  await Promise.all(
    recipients.map(async (recipient) => {
      await logAddressBalance(recipient, provider);
    })
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
