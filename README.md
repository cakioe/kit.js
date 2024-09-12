## Installation

```sh
$ bun add @cakioe/kit.js --save
```

```typescript
import Signatory from '@cakioe/kit.js';

const singer = new Signatory('key');
const value = singer.genSignature(record);

console.log(value);
```

### genSignature / 生成签名
According to the incoming map, the null value is filtered out and the signature is performed

根据传入的map，过滤掉空值后进行签名

### toBase64String / 将数据转成base64
Append the map to the sign signature field and convert it to a base64 string

将map追加sign签名字段，并转为base64字符串

### checkSignature / 校验签名
Verify the signature of the incoming map and the signature

校验签名