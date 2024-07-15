/**
 * @method toConstantCase
 * @description: Convert strings to constant case (UPPER_SNAKE_CASE).
 * @param {string} value - The input string to convert.
 * @returns {string} The converted string in constant case.
 */
export declare function toConstantCase(value: string): string

/**
 * @method genSignature
 * @description: 生成签名
 * @param {Record<string, any>} args - 传入的对象
 * @param {string} signKey - 签名密钥
 * @param {string} prefix - 对象或数组key
 * @returns {string} 生成签名后的md5字符串
 */
export declare function genSignature(args: Record<string, any>, signKey: string, prefix: string): string

/**
 * @method toBase64String
 * @description: 对象转base64
 * @param {Record<string, any>} args - 传入的对象
 * @param {string} signKey - 签名密钥
 * @returns {string} 对象生成的base64编码字符串
 */
export declare function toBase64String(args: Record<string, any>, signKey: string): string

/**
 * @method decryptBase64String
 * @description: base64解密
 * @param {string} value - 需要解密的base64编码字符串
 * @returns Record<string, any> - 解密后的对象
 */
export declare function decryptBase64String(value: string): Record<string, any>

/**
 * @method checkSignature
 * @description: 校验签名
 * @param {Record<string, any>} args - 传入的对象
 * @param {string} sign - 签名
 * @param {string} signKey - 签名密钥
 * @returns boolean
 */
export declare function checkSignature(args: Record<string, any>, sign: string, signKey: string): boolean

/**
 * @method disableDebugger
 * @description: 禁用调试
 */
export declare function disableDebugger(): void
