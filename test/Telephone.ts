import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Telephone", function () {
  async function deployTelephoneFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Telephone = await ethers.getContractFactory("Telephone");
    const telephone = await Telephone.deploy();
    const TelephoneHack = await ethers.getContractFactory("TelephoneHack");
    const telephoneHack = await TelephoneHack.deploy();

    return { telephone, telephoneHack, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Set owner to other", async function () {
      const { telephone, telephoneHack, owner, otherAccount } = await loadFixture(deployTelephoneFixture);
      console.log('owner', owner.address)
      console.log('otherAccount', otherAccount.address)
      console.log('telephone', telephone.address)

      expect(await (telephone.connect(otherAccount)).owner()).to.equal(owner.address);
      await expect((telephoneHack.connect(otherAccount)).hack(telephone.address)).not.to.be.reverted;
      expect(await (telephone.connect(otherAccount)).owner()).to.equal(otherAccount.address);
    });
  })
})