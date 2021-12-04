const returnTimeMachineAnswer = data => {
  let bitcoinPrices = data.prices.map(datapoint => datapoint[1])
  let lowestPrice = data.prices.find(datapoint => datapoint[1] === Math.min(...bitcoinPrices))
  let newBitcoinPrices = bitcoinPrices.slice(bitcoinPrices.indexOf(lowestPrice[1]), bitcoinPrices.length)
  let highestPrice = data.prices.find(datapoint => datapoint[1] === Math.max(...newBitcoinPrices))
  let timeMachine = {
    buy: lowestPrice[0],
    sell: highestPrice[0],
    message: ''
  }
  if (lowestPrice[1] === highestPrice[1]) {
    timeMachine.message = 'Bear market! Don\'t buy or sell!'
    timeMachine.buy = ''
    timeMachine.sell = ''
    return timeMachine
  }
  return timeMachine
}

module.exports = { returnTimeMachineAnswer }