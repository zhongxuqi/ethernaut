import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Fallback", function () {
  async function deployFallbackFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Fallback = await ethers.getContractFactory("Fallback");
    const fallback = await Fallback.deploy();

    const FallbackHack = await ethers.getContractFactory("FallbackHack");
    const fallbackHack = await FallbackHack.deploy();

    return { fallback, fallbackHack, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { fallback, owner } = await loadFixture(deployFallbackFixture);

      expect(await fallback.owner()).to.equal(owner.address);
    });

    it("Set owner to other", async function () {
      const { fallback, fallbackHack, owner, otherAccount } = await loadFixture(deployFallbackFixture);
      console.log('owner', owner.address)
      console.log('otherAccount', otherAccount.address)
      console.log('fallback', fallback.address)
      console.log('fallbackHack', fallbackHack.address)

      expect(await fallback.owner()).to.equal(owner.address);

      await expect((await fallback.connect(otherAccount)).contribute({value: ethers.utils.parseEther('0.0009')})).not.to.be.reverted;
      await expect((await fallback.connect(otherAccount)).fallback({value: ethers.utils.parseEther('0.1')})).not.to.be.reverted;
      await expect(otherAccount.sendTransaction({
        to: fallback.address,
        value: ethers.utils.parseEther("1.0"),
        gasLimit: 30000000,
      })).not.to.be.reverted;
      expect(await fallback.owner()).to.equal(otherAccount.address);
    });
  })
})