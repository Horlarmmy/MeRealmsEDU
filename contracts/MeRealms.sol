// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MeRealms {
    // Struct
    struct Meme {
        uint256 id;
        string title;
        string url;
        address creator;
        uint256 supportAmount;
    }

    // State variables
    uint256 public memeCount;
    mapping(uint256 => Meme) public memes;

    // Events
    event MemeSubmitted(uint256 indexed memeId, string title, string url, address indexed creator);
    event SupportSent(uint256 indexed memeId, address indexed supporter, uint256 amount);

    // Submit a new meme
    function submitMeme(string memory _title, string memory _url) external {
        memeCount++;
        memes[memeCount] = Meme({
            id: memeCount,
            title: _title,
            url: _url,
            creator: msg.sender,
            supportAmount: 0
        });

        emit MemeSubmitted(memeCount, _title, _url, msg.sender);
    }

    // Support a meme creator by sending funds
    function supportCreator(uint256 _memeId) external payable {
        require(_memeId > 0 && _memeId <= memeCount, "Invalid meme ID.");
        require(msg.value > 0, "Support amount must be greater than zero.");

        Meme storage meme = memes[_memeId];
        meme.supportAmount += msg.value;

        (bool success, ) = meme.creator.call{value: msg.value}("");
        require(success, "Transfer to creator failed.");

        emit SupportSent(_memeId, msg.sender, msg.value);
    }

    // Get details of a meme
    function getMeme(uint256 _memeId)
        external
        view
        returns (
            uint256 id,
            string memory title,
            string memory url,
            address creator,
            uint256 supportAmount
        )
    {
        require(_memeId > 0 && _memeId <= memeCount, "Invalid meme ID.");

        Meme memory meme = memes[_memeId];
        return (
            meme.id,
            meme.title,
            meme.url,
            meme.creator,
            meme.supportAmount
        );
    }
}