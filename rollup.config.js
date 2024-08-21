import { readFileSync } from 'fs'
import { cwd } from 'process'
import { join } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const createConfig = (options = {}) => {
  const { input = 'webview-src/index.ts', external = [], additionalConfigs = [] } = options

  const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json'), 'utf8'))

  return [
    {
      input,
      output: [
        {
          file: pkg.exports.import,
          format: 'esm'
        },
        {
          file: pkg.exports.require,
          format: 'cjs'
        }
      ],
      plugins: [
        typescript({
          declaration: true,
          declarationDir: `./${pkg.exports.import.split('/')[0]}`
        }),
        terser(),
        nodeResolve()
      ],
      external: [...external, ...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
      onwarn: warning => {
        throw Object.assign(new Error(), warning)
      }
    },

    ...(Array.isArray(additionalConfigs) ? additionalConfigs : [additionalConfigs])
  ]
}

export default createConfig
