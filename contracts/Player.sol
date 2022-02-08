//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Player is ERC721 {
    constructor(
      string memory name,
      string memory symbol
    ) ERC721(name, symbol ) public {}

    event NFTCreated (
    uint tokenId,
    string imageURL,
    uint date,
    address payable from
  );


    function mintNFT(string memory _tokenURI) external {
       uint _tokenId = totalSupply().add(1);
       _safeMint(msg.sender, _tokenId);
       _setTokenURI(_tokenId, _tokenURI);
       emit NFTCreated(_tokenId, _tokenURI, now, msg.sender);
    }
}
