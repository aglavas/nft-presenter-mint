const { ethers } = require("hardhat");

async function main() {
  
  //Mario
  /* const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld");
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorld", "SPRM"); */

  //Luigi
  /* const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldOZ");
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldOZ", "SPRMO"); */

  //Yoshi
  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldERC1155");
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldERC1155", "SPRME");

  await superMarioWorld.deployed();
  console.log("Success! Contract was deployed to: ", superMarioWorld.address);

  //Mario
  /* await superMarioWorld.mint("https://ipfs.io/ipfs/Qmch3m7DEFYRaZiFG6gc8qgkBMS3nrTvM5h5v9xZK6rGEz") */

  /* //Luigi
  await superMarioWorld.mint("https://ipfs.io/ipfs/QmYoVjXNGbAVHKucFJ3xw8MMxWqFXHtyWPLzf4EB8aLW4f"); */

  //Yoshi
  await superMarioWorld.mint(10, "https://ipfs.io/ipfs/QmUYMgqe6AQVaw2UjYJ2NdAEdRnSB2k6VdMnHjhQ1swvMG");

  console.log("NFT successfully minted");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });