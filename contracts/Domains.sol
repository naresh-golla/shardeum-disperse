//SPDX-License-Identifier: UNLICENSED 

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Base64} from "./libraries/Base64.sol";
import "hardhat/console.sol";
import "./libraries/StringUtils.sol";

contract Domains is ERC721URIStorage {

    error Unauthorized();
    error AlreadyRegistered();
    error InvalidName(string name);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public tld;

    mapping(string => address) public domains;
    mapping(string => string) public records;
    mapping(uint => string) public names;

    address payable public owner;

    string svgPartOne = '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#a)" d="M0 0h270v270H0z"/><defs><filter id="b" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><svg x="15" y="15" width="120" height="108" viewBox="0 0 120 108" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.4358 77.2888L16.7213 100H103.279L90.5643 77.2888H29.4358Z" fill="white"/><path d="M60 22.7112L47.2856 0L4 77.2889H29.4358L60 22.7112Z" fill="white"/><path d="M90.5642 77.2889H116L72.7145 -3.05176e-05L60 22.7111L90.5642 77.2889Z" fill="white"/><path d="M60 73.3853C67.6037 73.3853 73.7677 67.0303 73.7677 59.1909C73.7677 51.3515 67.6037 44.9964 60 44.9964C52.3964 44.9964 46.2324 51.3515 46.2324 59.1909C46.2324 67.0303 52.3964 73.3853 60 73.3853Z" fill="white"/></svg><defs><linearGradient id="a" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#cb5eee"/><stop offset="1" stop-color="#0cd7e4" stop-opacity=".99"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#b)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string svgPartTwo = '</text></svg>';

    constructor(string memory _tld) ERC721("Web3 user name NFT on shardeum | SHM", "Web3 User Name") payable {
        owner = payable(msg.sender);
        tld = _tld;
        console.log("%s name services deployed", _tld);
    }

    function price(string calldata name) public pure returns(uint){
        uint len = StringUtils.strlen(name);
        require(len > 2);
        if(len == 3){
            return 90 * 10**17;
        }else if(len == 4){
            return 50 * 10**17;
        }else if(len == 5){
            return 30 * 10**17;
        }else{
            return 10 * 10**17;
        }
    }

    function registers(string calldata name) public payable {
        // require(domains[name] == address(0));
        if(domains[name] != address(0)) revert AlreadyRegistered();
        if(!valid(name)) revert InvalidName(name);

        uint _price = price(name);
        require(msg.value >= _price, "not enough SHM paid");

        string memory _name = string(abi.encodePacked(name, ".", tld));
        console.log("_name", _name);

        string memory finalSvg = string(abi.encodePacked(svgPartOne, _name, svgPartTwo));

        uint256 newRecordId = _tokenIds.current();
        uint256 length = StringUtils.strlen(name);
        string memory strLen = Strings.toString(length);

        console.log("Registering %s on the contract with tokenId %d", name, newRecordId);

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"',
                        _name,
                        '","description":"Web3 user name NFT on shardeum | SHM","image":"data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '","length":"',
                        strLen,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(abi.encodePacked("data:application/json;base64,", json));

        console.log("\n--------------------------------------------------------");
        console.log("Final tokenURI", finalTokenUri);
        console.log("--------------------------------------------------------\n");

        _safeMint(msg.sender, newRecordId); 
        _setTokenURI(newRecordId, finalTokenUri);

        domains[name] = msg.sender;
        console.log("%s has registred a domain", msg.sender);

        names[newRecordId] = name;
        _tokenIds.increment();
    }

    function getAddress(string calldata name) public view returns (address){
        return domains[name];
    }
    
    function setRecord(string calldata name ,string calldata record) public {
        // require(domains[name] == msg.sender);
        if(msg.sender != domains[name]) revert Unauthorized();
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory){
        return records[name];
    }

    modifier onlyOwner(){
        require(isOwner());
        _;
    }

    function isOwner() public view returns (bool){
        return msg.sender == owner;
    }

    function withdraw() public onlyOwner{
        uint amount = address(this).balance;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "failed to withdraw SHM");
    }

    function getAllNames() public view returns(string[] memory){
        string[] memory allNames = new string[](_tokenIds.current());
        for(uint i = 0; i < _tokenIds.current(); i++){
            console.log("iteration i  names[i] ", names[i]);
            console.log("iteration i  allNames[i] ", allNames[i]);
            allNames[i] = names[i];
        }
        return allNames;
    }

    function valid(string calldata name) public pure returns(bool){
        return StringUtils.strlen(name) >= 3 && StringUtils.strlen(name) <= 10;
    }
}

