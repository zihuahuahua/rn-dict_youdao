import axios from 'axios';
import api from '../config/config'
// console.log(api,'apiBaseUrl')
const APIUtils = {
  base: api.apiBaseUrl,
  transBaseUrl: api.transBaseUrl,
  XML2jsobj: function (node) {
    var data = {};

    // append a value
    function Add(name, value) {
      if (data[name]) {
        if (data[name].constructor != Array) {
          data[name] = [data[name]];
        }
        data[name][data[name].length] = value;
      }
      else {
        data[name] = value;
      }
    }

    // element attributes
    var c, cn;
    if (node.attributes) {
      for (c = 0; cn = node.attributes[c]; c++) {
        Add(cn.name, cn.value);
      }
    }

    // child elements
    for (c = 0; cn = node.childNodes[c]; c++) {
      if (cn.nodeType == 1) {
        if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
          // text value
          Add(cn.nodeName, cn.firstChild.nodeValue);
        }
        else {
          // sub-object
          Add(cn.nodeName, this.XML2jsobj(cn));
        }
      }
    }
    return data;
  },
  code: function (d) {
    return d.match(/code="(\d+?)"/g)[0].split('=')[1].replace(/"/g, "")
  },
  /**
   * 公用post请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  commonPost: (url, params, type) => {
    let time = new Date().getTime()
    if (type !== 'noLoad') {
      // Toast.loading('正在加载...', 0, null);
    }
    if (Object.prototype.toString.call(params) !== '[object Object]') {
      params = {}
    }
    return axios({
      url: url == '/translate' ? APIUtils.transBaseUrl + url : APIUtils.base + url,
      method: 'post',
      data: params,
      timeout: 6000,
      responseType: 'json',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then(res => {
      let time1 = new Date().getTime()
      console.log(url + '接口耗时=======' + (time1 - time) / 1000 + '秒')
      // console.log('Toast',type)
      if (type !== 'noLoad') {
        // Toast.hide();
      }
      return res
    }).catch(error => {
      // Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
      console.log(error, '=========')
    })
  },
  /**
   * 公用get请求
   * @param url
   * @returns {Promise.<TResult>}
   */
  commonGet: (url, params, type) => {
    // Toast.loading('正在加载...', 0, null);
    let time = new Date().getTime()
    if (type !== 'noLoad') {
      // Toast.loading('正在加载...', 0, null);
    }
    return axios({
      url: APIUtils.base + url,
      responseType: 'json',
      params: params,
      timeout: 6000,
    }).then(res => {
      let time1 = new Date().getTime()
      console.log(url + '接口耗时=======' + (time1 - time) / 1000 + '秒')
      if (type !== 'noLoad') {
        // Toast.hide();
      }
      // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))
      // return APIUtils.XML2jsobj(res.data.documentElement)
      return res
    }).catch(error => {
      // Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
      console.log(error)
    })
  },
  jsonGet: (url, type) => {
    if (type !== 'noLoad') {
      // Toast.loading('正在加载...', 0, null);
    }
    return axios({
      url: APIUtils.jsonBaseUrl + url,
      responseType: 'json',
      timeout: 6000,
    }).then(res => {
      console.log(url + '接口返回数据========', res);
      // Toast.hide();
      return res;
    }).catch(error => {
      console.log(error);
      if (type !== 'noLoad') {
        // Toast.hide();
      }
      // Toast.info('网络连接失败，请检查您的网络设置并稍后再试', 2, null, false)
      return null;
    })
  }
}
export default APIUtils
