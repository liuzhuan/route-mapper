'use strict';

/**
 * mapper format such as:
 * {
 *   'source_mapper': 'target_mapper'
 * }
 */
var mapper = {};

function define(value) {
    if (!value) return;
    mapper = value;
}

function get(raw) {
    for (var key in mapper) {
        const reg = initReg(key);
        const result = reg.exec(raw);
        if (result) {
            const fields = getParamFields(key);
            const params = result.slice(1);
            const target_schema = mapper[key];
            // console.log('fields:', fields, ', params:', params);
            return getTransformedResult(target_schema, fields, params);
        }
    }

    return null;
}

/**
 * Use value of params to replace fields in raw String.
 * @param {String} raw 
 * @param {Array} fields 
 * @param {Array} params 
 */
function getTransformedResult(raw, fields, params) {
    let result = raw;
    if (!fields || fields.length <= 0) {
        return result;
    }
    
    fields.forEach(function(item, i) {
        const reg = new RegExp(item, 'g');
        result = result.replace(reg, params[i]);
    });

    return result;
}

/**
 * 获取 key 对应的正则表达式，将 key 中 {value} 格式转换为 ([^/]+)
 * 将 ? 替换为 \?
 * @param {String} key 
 */
function initReg(policy) {
    policy = policy.replace(/\{[^\/]+\}/g, '([^/]+)')
        .replace(/\?/g, '\\?');
    return new RegExp('^' + policy + '$');
}

function getParamFields(policy) {
    return policy.match(/\{[^\/]+\}/g);
}

module.exports = {
    get: get,
    define: define
}