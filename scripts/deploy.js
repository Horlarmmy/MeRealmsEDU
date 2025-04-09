const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  try {
    // Deploy MemeNFT
    console.log("Deploying MemeNFT...");
    const MemeNFT = await hre.ethers.getContractFactory("MemeNFT");
    const memeNFT = await MemeNFT.deploy(deployer.address);
    await memeNFT.waitForDeployment();
    const memeNFTAddress = await memeNFT.getAddress();
    console.log(`MemeNFT deployed to: ${memeNFTAddress}`);

    // Deploy MeRealms
    console.log("Deploying MeRealms...");
    const MeRealms = await hre.ethers.getContractFactory("MeRealms");
    const meRealms = await MeRealms.deploy();
    await meRealms.waitForDeployment();
    const meRealmsAddress = await meRealms.getAddress();
    console.log(`MeRealms deployed to: ${meRealmsAddress}`);

    const contracts = {
      MemeNFT: memeNFTAddress,
      MeRealms: meRealmsAddress,
    };

    const outputPath = "contracts.json";
    fs.writeFileSync(outputPath, JSON.stringify(contracts, null, 2));
    console.log(`Contracts deployed and addresses saved to ${outputPath}`);
  } catch (error) {
    console.error("Error deploying contracts:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exitCode = 1;
});