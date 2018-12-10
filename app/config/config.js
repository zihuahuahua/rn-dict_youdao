
let config ={
  'development':'http://dict.youdao.com',
}
let jsonconfig = {
  // 'development':'https://dynamictest.91quzou.com',
}
let apiBaseUrl = config[process.env.NODE_ENV]
let jsonBaseUrl = jsonconfig[process.env.NODE_ENV]
export default {
    "apiBaseUrl": 'http://dict.youdao.com',
    "transBaseUrl": 'http://fanyi.youdao.com',
}