/**
 * @method toConstantCase
 * @description: 切换为常量命名
 * @example: `can.i.reset.merchant_config.app_secret` => `CAN_I_RESET_MERCHANT_CONFIG_APP_SECRET`
 * @param value
 */
export function toConstantCase(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '_')
}
