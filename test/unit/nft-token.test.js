const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Token Unit Tests", function () {
          const TOKEN_URI =
              "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

          let nftToken, deployer;

          beforeEach(async () => {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              await deployments.fixture(["nftToken"]);
              nftToken = await ethers.getContract("NftToken");
          });

          it("Allows users to mint an NFT, and updates appropriately", async function () {
              const txResponse = await nftToken.mintNft(TOKEN_URI);
              await txResponse.wait(1);
              const tokenURI = await nftToken.tokenURI(1);
              const tokenCounter = await nftToken.getTokenCounter();

              assert.equal(tokenCounter.toString(), "1");
              assert.equal(tokenURI, await nftToken.getokenURI(1));
          });
      });
