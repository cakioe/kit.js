# @cakioe/kit.js

Convert strings to constant case (UPPER_SNAKE_CASE).

## Installation

```sh
bun add @cakioe/kit.js --save


```sh
import { toConstantCase } from '@cakioe/kit.js'

const name = toConstantCase('can.i.reset.merchant_config.app_secret')
console.log(name) // CAN_I_RESET_MERCHANT_CONFIG_APP_SECRET
