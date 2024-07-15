import CryptoJS from 'crypto-js'

/**
 * @method toConstantCase
 * @description: 切换为常量命名
 * @example: `can.i.reset.merchant_config.app_secret` => `CAN_I_RESET_MERCHANT_CONFIG_APP_SECRET`
 * @param value
 */
export const toConstantCase = (value: string): string => {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '_')
}

/**
 * @method genSignature
 * @description: 生成签名
 * @param args
 * @param signKey
 */
export const genSignature = (args: Record<string, any>, prefix: string, signKey: string): string => {
  let result = []

  // 删除签名 `sign`
  if ('sign' in args) {
    delete args['sign']
  }

  // 字典序排序
  const keys = Object.keys(args).sort()
  for (let i = 0; i < keys.length; i++) {
    const p = keys[i]
    const k = prefix ? `${prefix}[${p}]` : p
    const v = args[keys[i]]
    if (v === '' || v === undefined || v === null) {
      continue
    }

    if (typeof v === 'object' && !Array.isArray(v)) {
      result.push(genSignature(v, k, signKey))
    } else if (Array.isArray(v)) {
      v.forEach((item: any, index: number) => {
        const arrKey = `${k}[${index}]`
        if (item !== null && typeof item === 'object') {
          result.push(genSignature(item, arrKey, signKey))
        } else {
          result.push(`${encodeURIComponent(arrKey)}=${encodeURIComponent(item)}`)
        }
      })
    } else {
      result.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    }
  }

  let payload: Record<string, any> = {}
  for (const key of keys) {
    payload[key] = args[key]
  }

  // 拼接
  const hash = result.join('&')
  const signStr = `${hash}&key=${signKey}`

  // md5大写
  return CryptoJS.MD5(signStr).toString(CryptoJS.enc.Hex).toUpperCase()
}

/**
 * @method toBase64String
 * @description: 对象转base64
 * @param args
 * @param signKey
 */
export const toBase64String = (args: Record<string, any>, signKey: string): string => {
  // 增加字段
  if (!('timestamp' in args)) {
    args = {
      ...args,
      timestamp: Math.ceil(new Date().getTime() / 1000).toString()
    }
  }

  // 判断是否存在sign
  if (!('sign' in args)) {
    args = {
      ...args,
      sign: genSignature(args, '', signKey)
    }
  }

  const body = JSON.stringify(args)
  const bytes = CryptoJS.enc.Utf8.parse(body)

  return CryptoJS.enc.Base64.stringify(bytes)
}

/**
 * @method decryptBase64String
 * @description: base64解密
 * @param value
 */
export const decryptBase64String = (value: string): Record<string, any> => {
  const bytes = CryptoJS.enc.Base64.parse(value)
  const body = CryptoJS.enc.Utf8.stringify(bytes)

  return JSON.parse(body)
}

/**
 * @method checkSignature
 * @description: 校验签名
 * @param args
 * @param sign
 * @param signKey
 */
export const checkSignature = (args: Record<string, any>, sign: string, signKey: string): boolean => {
  return genSignature(args, '', signKey) === sign
}

/**
 * @description [禁用debugger](https://juejin.cn/post/7000784414858805256)
 * @method disableDebugger
 */
export const disableDebugger = () => {
  function block() {
    setInterval(() => {
      ;(function () {
        return false
      })
        ['constructor']('debugger')
        ['call']()
    }, 50)
  }

  try {
    block()
  } catch (err) {}
}
