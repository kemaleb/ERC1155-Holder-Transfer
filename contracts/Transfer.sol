// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";


contract TransferSFT is ERC1155Holder{

    function TransferToAddress(address tokenAddress,address to,uint256 id) external {
        require(IERC1155(tokenAddress).balanceOf(address(this),id) > 0,"Contract has not token.");
        IERC1155(tokenAddress).setApprovalForAll(to,true);
        uint256 amount = IERC1155(tokenAddress).balanceOf(address(this),id);
        require(IERC1155(tokenAddress).isApprovedForAll(address(this),to),"Not Approved For toAddress");
        IERC1155(tokenAddress).safeTransferFrom(address(this),to,id,amount,abi.encodePacked(address(this)));
    }


}