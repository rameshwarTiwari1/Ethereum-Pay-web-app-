//https://eth-goerli.g.alchemy.com/v2/5vh7uE7vJmvvBH2SQU4qDGYhesYatxuJ


require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/5vh7uE7vJmvvBH2SQU4qDGYhesYatxuJ',
      accounts: ['cd8373827f8c44cf20b78da63ebf91b3e78d4cc839d38809abe811b95ec43b6c'],
    }
  }
}