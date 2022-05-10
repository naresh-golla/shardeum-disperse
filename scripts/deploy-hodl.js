const hre = require("hardhat");

async function main() {
  const Hodl = await hre.ethers.getContractFactory("Hodl");
  const hodl_ = await Hodl.deploy("10000000000000000000000000000");

  await hodl_.deployed();

  console.log("Token deployed to:", hodl_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });