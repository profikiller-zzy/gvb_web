
export function parseToken(token) {
    let payload = token.split(".")[1];
    // 下面从内向外解释代码
    // replace(/-/g, "+").replace(/_/g, "/") 将Base64Url 编码转化为标准的Base64 编码字符集
    // window.atob进行Base64解码
    // escape对解析后的字符串进行编码，确保在所有计算机上都能读取该字符串
    // decodeURIComponent对编码后的字符串进行解码，还原为原始字符串
    // JSON.parse将解码后的字符串解析为JSON对象，这个JSON对象就是JWT Token中包含的用户信息
    let info = JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
    return info
}