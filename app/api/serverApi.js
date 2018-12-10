import apiUtils from './apiUtils' // 查询
import apiTrans from './apiUtils' // 翻译

/**
 * egGet
 * @param rid
 * @returns {*|Promise.<TResult>}
 */

// 词汇联想
export const getWords = params => {
    return apiUtils.commonGet('/suggest', params,'noLoad')
}
// 词汇详情
export const getWordDetail = params => {
    return apiUtils.commonGet('/jsonapi', params,'noLoad')
}

// 翻译
export const getTanslate = params => {
    return apiTrans.commonPost('/translate', params,'noLoad')
}