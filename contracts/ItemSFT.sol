// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155.sol";

contract ItemSFT is ERC1155 {

    constructor(uint256 _totalSupply,address _address,uint256 _id) {
        _mint(_address, _id, _totalSupply, "");
    }
}

