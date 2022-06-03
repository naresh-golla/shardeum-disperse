const hre = require("hardhat");

const main = async ()=>{
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("shm")
    await domainContract.deployed()
    console.log("contract depolyed to : ", domainContract.address)

    let setDR = await domainContract.registers("contract","rec..",{value: hre.ethers.utils.parseEther("10")});
    await setDR.wait();
    console.log("Minted domain contract.shm")

    // setDR = await domainContract.setRecord("contract", "0x633E8B8aDCE8d98EbC2ae2b8ef2d176221e58a70");
    // await setDR.wait();

    // const addr = await domainContract.getAddress("contract");
    // console.log("owner of contract domain : ", addr);

    // const bal = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("contract bal after: ", hre.ethers.utils.formatEther(bal));

    // let setDR0 = await domainContract.registers("12345678-0","aaa",{value: hre.ethers.utils.parseEther("10")});
    // await setDR0.wait();
    // let setDR1 = await domainContract.registers("12345678-1","bbb",{value: hre.ethers.utils.parseEther("10")});
    // await setDR1.wait();

    // let allNames = await domainContract.getAllNames();
    // console.log("allNames-->",allNames);

    // let fetchGroup = await domainContract.fetchGroup(1);
    // console.log("fetchGroup-->",fetchGroup);

    // let getAllNamesOfAddress = await domainContract.getAllNamesOfAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // // let getAllNamesOfAddress = await domainContract.getAllNamesOfAddress("0x422938990FED07aEb904260b1094943afC2e366d");
    // console.log("getAllNamesOfAddress-->",getAllNamesOfAddress);

    // let fetchGroupOfAddress = await domainContract.fetchGroupOfAddress(0);
    // console.log("fetchGroupOfAddress-->",fetchGroupOfAddress);

    // let getAllNamesCount = await domainContract.getAllNamesCount();
    // console.log("getAllNamesCount-->",getAllNamesCount);

    // // let getAllNamesOfAddressCount = await domainContract.getAllNamesOfAddressCount("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // let getAllNamesOfAddressCount = await domainContract.getAllNamesOfAddressCount("0x422938990FED07aEb904260b1094943afC2e366d");
    // console.log("getAllNamesOfAddressCount-->",getAllNamesOfAddressCount);
    
    // let getAllData = await domainContract.getAllData();
    // console.log("getAllData-->",getAllData);

    // let getAllDataOfAddress = await domainContract.getAllDataOfAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    // console.log("getAllDataOfAddress-->",getAllDataOfAddress);

    // let getAllDataOfAddress1 = await domainContract.getAllDataOfAddress("0x422938990FED07aEb904260b1094943afC2e366d");
    // console.log("getAllDataOfAddress1-->",getAllDataOfAddress1);

        const bal = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("contract bal after: ", hre.ethers.utils.formatEther(bal));



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