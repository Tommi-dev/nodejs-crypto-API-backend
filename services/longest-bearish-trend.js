const returnLongestBearishTrend = data => {
  let days = [0]
  let di = 0
  for (let i = 1; i < data.prices.length; i++) {
    if (data.prices[i][1] < data.prices[i - 1][1]) {
      days[di] += 1
      continue
    }
    di += 1
    days.push(0)
  }
  return Math.max(...days)
}

module.exports = { returnLongestBearishTrend }