import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("CoinFlip", function () {
  async function deployCoinFlipFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinFlip = await CoinFlip.deploy();
    const CoinFlipHack = await ethers.getContractFactory("CoinFlipHack");
    const coinFlipHack = await CoinFlipHack.deploy();

    return { coinFlip, coinFlipHack, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Set owner to other", async function () {
      const { coinFlip, coinFlipHack, owner, otherAccount } = await loadFixture(deployCoinFlipFixture);
      console.log('owner', owner.address)
      console.log('otherAccount', otherAccount.address)
      console.log('coinFlip', coinFlip.address)

      for (var i=0;i<10;i++) {
        await expect((coinFlipHack.connect(owner)).hack(coinFlip.address)).not.to.be.reverted;
      }
      console.log((await (coinFlip.connect(owner)).consecutiveWins()).toNumber())
      expect((await (coinFlip.connect(owner)).consecutiveWins()).toNumber()).to.equal(10);
    //   await expect((await coinFlip.connect(otherAccount)).flip()).to.be.revertedWith(
    //     "caller is not the owner"
    //   );
    //   await expect((await coinFlip.connect(otherAccount)).Fal1out({value: ethers.utils.parseEther('0.1')})).not.to.be.reverted;
    //   await expect((await coinFlip.connect(otherAccount)).collectAllocations()).not.to.be.reverted;
    });
  })
})