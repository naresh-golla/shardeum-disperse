const hre = require("hardhat");

const main = async ()=>{
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("shm")
    await domainContract.deployed()
    console.log("contract depolyed to : ", domainContract.address)

    // let setDR = await domainContract.registers("contract",{value: hre.ethers.utils.parseEther("1")});
    // await setDR.wait();
    // console.log("Minted domain contract.shm")

    // setDR = await domainContract.setRecord("contract", "0x633E8B8aDCE8d98EbC2ae2b8ef2d176221e58a70");
    // await setDR.wait();

    // const addr = await domainContract.getAddress("contract");
    // console.log("owner of contract domain : ", addr);

    // const bal = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("contract bal after: ", hre.ethers.utils.formatEther(bal));
}

const runMain = async ()=>{
    try {
        await main()
        process.exit(0);
    } catch (error) {
        console.log("error: ",error)
        process.exit(1)
    }
}

runMain();