import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Fallout", function () {
  async function deployFalloutFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Fallout = await ethers.getContractFactory("Fallout");
    const fallout = await Fallout.deploy();

    return { fallout, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Set owner to other", async function () {
      const { fallout, owner, otherAccount } = await loadFixture(deployFalloutFixture);
      console.log('owner', owner.address)
      console.log('otherAccount', otherAccount.address)
      console.log('fallout', fallout.address)

      await expect((await fallout.connect(otherAccount)).collectAllocations()).to.be.revertedWith(
        "caller is not the owner"
      );
      await expect((await fallout.connect(otherAccount)).Fal1out({value: ethers.utils.parseEther('0.1')})).not.to.be.reverted;
      await expect((await fallout.connect(otherAccount)).collectAllocations()).not.to.be.reverted;
    });
  })
})