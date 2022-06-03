// struct GroupAll {
//     string allNames;
//     address domains_;
//     string records;
//     uint id;
// }
// mapping(uint => GroupAll) groupAllMaps;

// function getAllNames() public returns(GroupAll memory){
//     GroupAll memory temp;
//     for(uint i = 0; i < _tokenIds.current(); i++){
//         temp.allNames = names[i];
//         temp.domains_ = domains[names[i]];
//         temp.records = records[names[i]];
//         temp.id = i;

//         groupAllMaps[i] = temp;
//     }
//     return temp;
// }


// function fetchGroup(uint index) public view returns(GroupAll memory){
//     return groupAllMaps[index];
// }

// struct GroupAllOfAddress {
//     string allNames;
//     address domains_;
//     string records;
//     uint id;
// }
// mapping(uint => GroupAllOfAddress) groupAllOfAddressMaps;

// function getAllNamesOfAddress(address addr_) public returns(GroupAllOfAddress memory){
//     GroupAllOfAddress memory temp;
//     for(uint i = 0; i < _tokenIds.current(); i++){
//         if(addr_ == domains[names[i]]){
//             temp.allNames = names[i];
//             temp.domains_ = domains[names[i]];
//             temp.records = records[names[i]];
//             temp.id = i;

//             groupAllOfAddressMaps[i] = temp;
//         }
//     }
//     return temp;
// }
// function fetchGroupOfAddress(uint index) public view returns(GroupAllOfAddress memory){
//     return groupAllOfAddressMaps[index];
// }