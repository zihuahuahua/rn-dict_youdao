import apiUtils from './apiUtils'

/**
 * egGet
 * @param rid
 * @returns {*|Promise.<TResult>}
 */


export const egGet = (rid) => {
    return apiUtils.commonGet(``, 'noLoad')
}
// 词汇联想
export const getWords = params => {
    return apiUtils.commonGet('/suggest', params,'noLoad')
}
// 词汇详情
export const getWordDetail = params => {
    return apiUtils.commonGet('/jsonapi', params,'noLoad')
}
