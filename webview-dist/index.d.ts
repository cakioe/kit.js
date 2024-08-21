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
export declare const toConstantCase: (value: string) => string;
/**
 * @example
 * ```typescript
 * import { genSignature } from '@cakioe/kit.js';
 * const value = genSignature(records, 'key');
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 */
export declare const genSignature: (args: Record<string, any>, signKey: string) => string;
/**
 * @example
 * ```typescript
 * import { toBase64String } from '@cakioe/kit.js';
 * const value = toBase64String(records, 'key');
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 */
export declare const toBase64String: (args: Record<string, any>, signKey: string) => string;
/**
 * @example
 * ```typescript
 * import { decryptBase64String } from '@cakioe/kit.js';
 * const value = decryptBase64String(record);
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 */
export declare const decryptBase64String: (value: string) => Record<string, any>;
/**
 * @example
 * ```typescript
 * import { checkSignature } from '@cakioe/kit.js';
 * const value = checkSignature(records, sign, signKey);
 * console.log(value);
 * ```
 *
 * @since 1.0.0
 */
export declare const checkSignature: (args: Record<string, any>, sign: string, signKey: string) => boolean;
/**
 * @example<https://juejin.cn/post/7000784414858805256>
 * ```typescript
 * import { disableDebugger } from '@cakioe/kit.js';
 * disableDebugger();
 * ```
 *
 * @since 1.0.0
 */
export declare const disableDebugger: () => void;
