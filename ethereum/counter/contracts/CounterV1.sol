//SPDX-License-Identifier: UNLICENSED

import "./Proxiable.sol";

pragma solidity ^0.8.0;

contract CounterV1 is Proxiable {
    address public owner;
    bool initialized;
    uint32 public counter;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function initialize() public {
        require(owner == address(0), "Already initalized");
        require(!initialized, "Already initalized");
        owner = msg.sender;
        initialized = true;
    }

    function increase() external {
        counter++;
    }

    function upgrade(address newImplementation) external onlyOwner {
        upgradeTo(newImplementation);
    }
}
