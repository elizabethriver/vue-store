const url = 'https://api.coincap.io/v2'

const getAssets = () => {
  return fetch(`${url}/assets?limit=20`)
    .then(res => res.json())
    .then(res => res.data)
}

const getAsset = (value) => {
  // console.log(`${url}/assets/${value}`)
  return fetch(`${url}/assets/${value}`)
    .then(res => res.json())
    .then(res => res.data)
}

const getAssetHistory = (value) => {
  const now = new Date();
  // console.log(now)
  const end = now.getTime();
  // console.log(end)
  now.setDate(now.getDate() - 1);
  const start = now.getTime()
  // console.log(start)

  // console.log(`${url}/assets/${value}/history?interval=h1&start=${start}&end=${end}`)
  return fetch(`${url}/assets/${value}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(res => res.data)
}

const getMarkets = (value) => {
  console.log(`${url}/assets/${value}/markets?limit=5`)
  return fetch(`${url}/assets/${value}/markets?limit=5`)
  .then((res) => res.json())
  .then((res) => res.data)
}

const getExchanges = (id) => {
  console.log(`${url}/exchanges/${id}`)
  return fetch(`${url}/exchanges`)
  .then((res) => res.json())
  .then((res) => res.data)
}
//  getExchanges('bitcoin').then(res => console.log(res))
// getMarkets('bitcoin').then(resp=> console.log(resp))
export default {
  getAssets,
  getAsset,
  getAssetHistory,
  getMarkets,
  getExchanges
}