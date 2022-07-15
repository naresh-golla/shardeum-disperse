export const chains = {
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  maticmum: 80001,
  skale: 416452918254875,
  shardeum:8080,
};

export const disperseAddresses = {
  3:
    import.meta.VITE_DISPERSE_ROPSTEN ||
    "0x0cD252390E7e46D7Ecf48D225fBB56D8fBd6Faf1",
  4:
    import.meta.VITE_DISPERSE_RINKEBY ||
    "0x3399dCff80b82f78af79686f9f5Cd731AD765786",
  5:
    import.meta.VITE_DISPERSE_GOERLI ||
    "0xD286f3D834E6030F178C395C9ba33d32B427cAD3",
  42:
    import.meta.VITE_DISPERSE_KOVAN ||
    "0x0cD252390E7e46D7Ecf48D225fBB56D8fBd6Faf1",
  80001:
    import.meta.VITE_DISPERSE_MATIC_MUMBAI ||
    "0xaf6f4A737188571d128477DEe81d54Bc63De6d80",
  416452918254875:
    import.meta.VITE_DISPERSE_SKALE ||
    "0x73a41d6b7889fBF94d059C943bc58dd18c600bfa",
  8080:
    import.meta.VITE_DISPERSE_SHARDEUM ||
    "0x2c81BFFBC20c2ed38a6F90f949687fD970279e57",
};

export const scans = {
  3: "https://ropsten.etherscan.io/",
  4: "https://rinkeby.etherscan.io/",
  5: "https://goerli.etherscan.io/",
  42: "https://kovan.etherscan.io/",
  80001: "https://mumbai.polygonscan.com/",
  416452918254875: "http://faint-acubens.explorer.dappnet.skalenodes.com/",
  8080: "https://explorer.liberty10.shardeum.org/",
};

export const warnMessage =
  "*Supports ropsten, rinkeby, goerli, kovan, skale and mumbai(matic) Shardeum*";
