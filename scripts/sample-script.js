const hre = require('hardhat')

async function main() {
  // We get the contract to deploy
  const Player = await hre.ethers.getContractFactory('Player')
  const player = await Player.deploy('PLAY', 'PLAY')

  await player.deployed()

  console.log('Player Contract deployed to:', player.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
