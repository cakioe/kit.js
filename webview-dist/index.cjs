"use strict";var e=require("crypto-js");const t=(n,r,s="")=>{let o=[];"sign"in n&&delete n.sign;const c=Object.keys(n).sort();for(let e=0;e<c.length;e++){const i=c[e],a=s?`${s}[${i}]`:i,p=n[c[e]];""!==p&&null!=p&&("object"!=typeof p||Array.isArray(p)?Array.isArray(p)?p.forEach(((e,n)=>{const s=`${a}[${n}]`;null!==e&&"object"==typeof e?o.push(t(e,r,s)):o.push(`${encodeURIComponent(s)}=${encodeURIComponent(e)}`)})):o.push(`${encodeURIComponent(a)}=${encodeURIComponent(p)}`):o.push(t(p,r,a)))}for(const e of c)n[e];const i=`${o.join("&")}&key=${r}`;return e.MD5(i).toString(e.enc.Hex).toUpperCase()};exports.checkSignature=(e,n,r)=>t(e,r,"")===n,exports.decryptBase64String=t=>{const n=e.enc.Base64.parse(t),r=e.enc.Utf8.stringify(n);return JSON.parse(r)},exports.disableDebugger=()=>{try{setInterval((()=>{(function(){return!1}).constructor("debugger").call()}),50)}catch(e){}},exports.genSignature=t,exports.toBase64String=(n,r)=>{"timestamp"in n||(n={...n,timestamp:Math.ceil((new Date).getTime()/1e3).toString()}),"sign"in n||(n={...n,sign:t(n,r,"")});const s=JSON.stringify(n),o=e.enc.Utf8.parse(s);return e.enc.Base64.stringify(o)},exports.toConstantCase=e=>e.toUpperCase().replace(/[^A-Z0-9]/g,"_");
//# sourceMappingURL=index.cjs.map
