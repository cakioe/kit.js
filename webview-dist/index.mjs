import e from"crypto-js";const t=e=>e.toUpperCase().replace(/[^A-Z0-9]/g,"_"),n=(t,n)=>{"sign"in t&&delete t.sign;const s=Object.keys(t).sort();let r={};for(const e of s)r[e]=t[e];const i=`${Object.keys(r).map((e=>`${e}=${r[e]}`)).join("&")}&key=${n}`;return e.MD5(i).toString(e.enc.Hex).toUpperCase()},s=(t,s)=>{"timestamp"in t||(t={...t,timestamp:Math.ceil((new Date).getTime()/1e3).toString()});let r={};Object.keys(t).forEach((e=>{r[e]=String(t[e])})),"sign"in r||(r={...r,sign:n(r,s)});const i=JSON.stringify(r),o=e.enc.Utf8.parse(i);return e.enc.Base64.stringify(o)},r=t=>{const n=e.enc.Base64.parse(t),s=e.enc.Utf8.stringify(n);return JSON.parse(s)},i=(e,t,s)=>n(e,s)===t;export{i as checkSignature,r as decryptBase64String,n as genSignature,s as toBase64String,t as toConstantCase};
//# sourceMappingURL=index.mjs.map
