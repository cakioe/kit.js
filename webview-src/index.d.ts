type toConstantCase = (value: string) => string
type genSignature = (args: Record<string, any>, signKey: string) => string
type toBase64String = (args: Record<string, any>, signKey: string) => string
type decryptBase64String = (value: string) => Record<string, any>
type checkSignature = (args: Record<string, any>, sign: string, signKey: string) => boolean

declare module '@cakioe/kit.js' {
  export var toConstantCase: toConstantCase
  export var genSignature: genSignature
  export var toBase64String: toBase64String
  export var decryptBase64String: decryptBase64String
  export var checkSignature: checkSignature
}
