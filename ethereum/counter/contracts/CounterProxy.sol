//SPDX-License-Identifier: UNLICENSED

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Proxy.sol";

pragma solidity ^0.8.0;

contract CounterProxy is Proxy {
    constructor(bytes memory init, address implementation) {
        assembly {
            sstore(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7,
                implementation
            )
        }
        (bool success, ) = implementation.delegatecall(init);
        require(success, "Init failed");
    }

    function _implementation()
        internal
        view
        override
        returns (address implementation)
    {
        assembly {
            implementation := sload(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7
            )
        }
    }
}
