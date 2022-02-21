const returnDateAndHighestTradingVolume = data => {

  let tradingVolumes = data.total_volumes.map(volume => volume[1])
  let dateThatHaveHighestTradingVolume = data.total_volumes.find(datapoint => datapoint[1] === Math.max(...tradingVolumes))
  
  const dateAndHighestTradingVolume = {
    date: dateThatHaveHighestTradingVolume[0],
    volume_in_fiat: dateThatHaveHighestTradingVolume[1]
  }

  return dateAndHighestTradingVolume

}

module.exports = { returnDateAndHighestTradingVolume }