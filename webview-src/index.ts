import CryptoJS from 'crypto-js'

/**
 * @example
 * ```typescript
 * import { toConstantCase } from '@cakioe/kit.js';
 * const value = toConstantCase('can.i.reset.merchant_config.app_secret');
 * console.log(value); // CAN_I_RESET_MERCHANT_CONFIG_APP_SECRET
 * ```
 *
 * @since 1.0.0
 */
export const toConstantCase = (value: string): string => {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '_')
}

/**
 * @example
 * ```typescript
 * import { genSignature } from '@cakioe/kit.js';
 * const value = genSignature(records, 'key');
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 * @deprecated 1.6.0
 * @see {@link Signatory.genSignature}
 */
export const genSignature = (args: Record<string, any>, signKey: string): string => {
  let result: Record<string, any> = []

  // delete `sign` of fields when exists
  if ('sign' in args) {
    delete args['sign']
  }

  const addValues = (prefix: string, obj: any) => {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((val, index) => {
          addValues(`${prefix}[${index}]`, val)
        })
      } else {
        Object.keys(obj).forEach(key => {
          addValues(`${prefix}[${key}]`, obj[key])
        })
      }
    } else {
      if (obj !== '' && obj !== 'NULL') {
        result.push(`${prefix}=${encodeURI(obj)}`)
      }
    }
  }

  Object.keys(args).forEach(key => {
    addValues(key, args[key])
  })

  // sort the result
  result.sort()

  let payload = encodeURI(result.join('&'))
  payload = `${payload}&key=${signKey}`

  // uppercase the md5 hash
  return CryptoJS.MD5(payload).toString(CryptoJS.enc.Hex).toUpperCase()
}

/**
 * @example
 * ```typescript
 * import { toBase64String } from '@cakioe/kit.js';
 * const value = toBase64String(records, 'key');
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 * @deprecated 1.6.0
 * @see {@link Signatory.toBase64String}
 */
export const toBase64String = (args: Record<string, any>, signKey: string): string => {
  // add timestamp in args when not exist
  if (!('timestamp' in args)) {
    args = {
      ...args,
      timestamp: Math.ceil(new Date().getTime() / 1000).toString()
    }
  }

  // check `sign` of fields exist or not
  if (!('sign' in args)) {
    args = {
      ...args,
      sign: genSignature(args, signKey)
    }
  }

  const body = JSON.stringify(args)
  const bytes = CryptoJS.enc.Utf8.parse(body)

  return CryptoJS.enc.Base64.stringify(bytes)
}

/**
 * @example
 * ```typescript
 * import { decryptBase64String } from '@cakioe/kit.js';
 * const value = decryptBase64String(record);
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 * @deprecated 1.6.0
 * @see {@link Signatory.decryptBase64String}
 */
export const decryptBase64String = (value: string): Record<string, any> => {
  const bytes = CryptoJS.enc.Base64.parse(value)
  const body = CryptoJS.enc.Utf8.stringify(bytes)

  return JSON.parse(body)
}

/**
 * @example
 * ```typescript
 * import { checkSignature } from '@cakioe/kit.js';
 * const value = checkSignature(records, sign, signKey);
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 * @deprecated 1.6.0
 * @see {@link Signatory.checkSignature}
 */
export const checkSignature = (args: Record<string, any>, sign: string, signKey: string): boolean => {
  return genSignature(args, signKey) === sign
}

/**
 * @example<https://juejin.cn/post/7000784414858805256>
 * ```typescript
 * import { disableDebugger } from '@cakioe/kit.js';
 * disableDebugger();
 * ```
 *
 * @since 1.0.0
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

interface Service {
  genSignature(params: Record<string, any>): string
  toBase64String(params: Record<string, any>): string
  decryptBase64String(params: string): Record<string, any>
  checkSignature(params: Record<string, any>, sign: string): boolean
}

/**
 * The class of signatory.
 *
 * @example
 *
 * ```typescript
 * import Signatory from '@cakioe/kit.js';
 * const singer = new Signatory('key');
 * const value = singer.genSignature(record);
 * console.log(value);
 * ```
 *
 * @since 1.5.0
 */
export class Signatory implements Service {
  protected appKey: string
  constructor(appKey: string) {
    this.appKey = appKey
  }

  /**
   * @example
   * ```typescript
   * import Signatory from '@cakioe/kit.js';
   * const singer = new Signatory('key');
   * const value = singer.genSignature(record);
   * console.log(value);
   * ```
   *
   * @since 1.5.0
   */
  genSignature(params: Record<string, any>): string {
    let result: Record<string, any> = []

    // delete `sign` of fields when exists
    if ('sign' in params) {
      delete params['sign']
    }

    const addValues = (prefix: string, obj: any) => {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach((val, index) => {
            addValues(`${prefix}[${index}]`, val)
          })
        } else {
          Object.keys(obj).forEach(key => {
            addValues(`${prefix}[${key}]`, obj[key])
          })
        }
      } else {
        if (obj !== '' && obj !== 'NULL') {
          result.push(`${prefix}=${encodeURI(obj)}`)
        }
      }
    }

    Object.keys(params).forEach(key => {
      addValues(key, params[key])
    })

    // sort the result
    result.sort()

    let payload = encodeURI(result.join('&'))
    payload = `${payload}&key=${this.appKey}`

    // uppercase the md5 hash
    return CryptoJS.MD5(payload).toString(CryptoJS.enc.Hex).toUpperCase()
  }

  /**
   * @example
   * ```typescript
   * import Signatory from '@cakioe/kit.js';
   * const singer = new Signatory('key');
   * const value = singer.genSignature(records);
   * console.log(value);
   * ```
   *
   * @since 1.5.0
   */
  toBase64String(params: Record<string, any>): string {
    // add timestamp in args when not exist
    if (!('timestamp' in params)) {
      params = {
        ...params,
        timestamp: Math.ceil(new Date().getTime() / 1000).toString()
      }
    }

    // check `sign` of fields exist or not
    if (!('sign' in params)) {
      params = {
        ...params,
        sign: genSignature(params, this.appKey)
      }
    }

    const body = JSON.stringify(params)
    const bytes = CryptoJS.enc.Utf8.parse(body)

    return CryptoJS.enc.Base64.stringify(bytes)
  }

  /**
   * @example
   * ```typescript
   * import Signatory from '@cakioe/kit.js';
   * const singer = new Signatory('key');
   * const value = singer.decryptBase64String(record);
   * console.log(value);
   * ```
   *
   * @since 1.5.0
   */
  decryptBase64String(params: string): Record<string, any> {
    const bytes = CryptoJS.enc.Base64.parse(params)
    const body = CryptoJS.enc.Utf8.stringify(bytes)

    return JSON.parse(body)
  }

  /**
   * @example
   * ```typescript
   * import Signatory from '@cakioe/kit.js';
   * const singer = new Signatory('key');
   * const value = singer.checkSignature(record, sign);
   * console.log(value);
   * ```
   *
   * @since 1.5.0
   */
  checkSignature(params: Record<string, any>, sign: string): boolean {
    return this.genSignature(params) === sign
  }
}

