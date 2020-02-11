!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Splain",[],t):"object"==typeof exports?exports.Splain=t():e.Splain=t()}("undefined"!=typeof window?window:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DefaultConfig={maxWeight:1e3,token:{open:"{{",close:"}}"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(6);function o(e,t){const n=e.indexOf(t.token.open);let o=e.indexOf(t.token.open,n+t.token.open.length),i=e.indexOf(t.token.close,n+t.token.open.length);if(i<0||n<0)return null;for(;i>=0&&o>=0&&o<i;){o=e.indexOf(t.token.open,i+t.token.open.length);const n=e.indexOf(t.token.close,i+t.token.close.length);i=n>=0?n:i}return-1===i?null:new r.Token(e.substring(n,i+t.token.close.length),t)}t.findTokens=function(e,t){const n=[];for(;e;){const r=o(e,t);r?(n.push(r),e=e.replace(r.raw,"")):e=""}return n}},function(e,t,n){"use strict";var r=function(e){return function(e){return!!e&&"object"==typeof e}(e)&&!function(e){var t=Object.prototype.toString.call(e);return"[object RegExp]"===t||"[object Date]"===t||function(e){return e.$$typeof===o}(e)}(e)},o="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function i(e,t){return!1!==t.clone&&t.isMergeableObject(e)?a((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function s(e,t,n){return e.concat(t).map((function(e){return i(e,n)}))}function c(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(t){return e.propertyIsEnumerable(t)})):[]}(e))}function u(e,t){try{return t in e}catch(e){return!1}}function a(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||s,n.isMergeableObject=n.isMergeableObject||r,n.cloneUnlessOtherwiseSpecified=i;var o=Array.isArray(t);return o===Array.isArray(e)?o?n.arrayMerge(e,t,n):function(e,t,n){var r={};return n.isMergeableObject(e)&&c(e).forEach((function(t){r[t]=i(e[t],n)})),c(t).forEach((function(o){(function(e,t){return u(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))})(e,o)||(u(e,o)&&n.isMergeableObject(t[o])?r[o]=function(e,t){if(!t.customMerge)return a;var n=t.customMerge(e);return"function"==typeof n?n:a}(o,n)(e[o],t[o],n):r[o]=i(t[o],n))})),r}(e,t,n):i(t,n)}a.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,n){return a(e,n,t)}),{})};var l=a;e.exports=l},function(e,t,n){"use strict";const r=n(0),o=n(4),i=n(7);e.exports=new class{constructor(){this.config=r.DefaultConfig,this.dictionary=new o.Dictionary,this.processor=new i.Processor(this.dictionary)}process(e,t={},n=!1){return this.processor.process(e,this.config,n,{contexts:t})}execute(e){return this.process(e).value}addEntry(e){this.dictionary.addEntry(e,this.config)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),o=n(5),i=n(1),s=n(0);t.Dictionary=class{constructor(){this.entries={}}addEntry(e,t=s.DefaultConfig,n=!0){this.entries=r(this.entries,e),n&&(this.rebuildDictionary(this.entries,t),this.reweighDictionary(this.entries,t),this.balanceWeights(this.entries,t))}getEntries(e){const t=e.split(".").reduce((e,t)=>e?e[t]:null,this.entries);return t?Array.isArray(t)?t:this.getFloodedEntry(t):null}getFloodedEntry(e){return Object.values(e).map(e=>Array.isArray(e)?e:this.getFloodedEntry(e)).reduce((e,t)=>e.concat(t),[])}convertEntriesToEntry(e){return e.map(e=>e instanceof o.Entry?e:e.value?new o.Entry(e.value,e.contexts,e.weight):new o.Entry(e))}rebuildDictionary(e=this.entries,t){for(const[n,r]of Object.entries(e))Array.isArray(r)?e[n]=this.convertEntriesToEntry(r):this.rebuildDictionary(r,t)}balanceWeights(e=this.entries,t){Object.values(e).forEach(e=>{if(Array.isArray(e)){const n=Math.min(...e.map(e=>e.computedWeight));e.forEach(e=>{e.computedWeight=Math.min(Math.ceil(e.computedWeight/n),t.maxWeight)})}else this.balanceWeights(e,t)})}reweighDictionary(e=this.entries,t){const n=this.getEntries.bind(this),r=(new Date).getTime();function o(e,t=[]){return e.reduce((e,n)=>e+s(n,t),0)}function s(e,s=[]){if(e.lastWeighed===r)return e.lastWeighed;const c=i.findTokens(e.value,t).reduce((e,r)=>s.filter(e=>r.raw===e.raw).length<1?(s.push(r),r.pure?e+(o(n(r.value)||[],s)||0):i.findTokens(r.value,t).reduce((e,t)=>e+(o(n(t.value)||[],s)||0),0)):e,0)||1;return e.computedWeight=c,e.lastWeighed=r,c}Object.values(e).forEach(e=>{Array.isArray(e)?e.forEach(e=>{s(e)}):this.reweighDictionary(e,t)})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Entry=class{constructor(e,t={},n=1){this.computedWeight=1,this.lastWeighed=-1,this.value=e,this.contexts=t,this.weight=n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1);t.Token=class{constructor(e,t){this.raw=e,this.value=e.substring(t.token.open.length,e.length-t.token.close.length),this.pure=0===r.findTokens(this.value,t).length}}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),i=n(0),s=n(8),c=r(n(2));class u{constructor(e){this.info={contexts:{},breakdown:[]},this.dictionary=e}process(e,t=i.DefaultConfig,n=!0,r=null){n&&(this.info={contexts:{},breakdown:[]}),r&&(this.info=c.default(this.info,r));let a="";for(;e!==a;)a=e,o.findTokens(e,t).forEach(n=>{if(n.pure){const r=s.executeToken(n,this.dictionary,t,this.info);this.info.breakdown.push({token:n,contexts:this.info.contexts,selectedEntry:r}),e=e.replace(n.raw,r?r.value:n.raw)}else{const r=new u(this.dictionary).process(n.value,t,!1,{contexts:this.info.contexts,breakdown:[]});this.info.breakdown.push({inpureTokenResolution:r}),e=e.replace(n.raw,r.value)}});return this.info.value=e,this.info}}t.Processor=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(9);t.executeToken=function(e,t,n,o){const i=t.getEntries(e.value);if(!i)return null;const s=i.filter(e=>r.matchContexts(e,o.contexts)),c=[];return s.forEach(e=>{for(let t=0;t<Math.min(e.computedWeight*e.weight,n.maxWeight);t++)c.push(e)}),0===c.length?null:c[Math.floor(Math.random()*c.length)]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.matchContexts=function(e,t){if(0===Object.keys(e.contexts).length)return!0;const n=Object.keys(e.contexts).filter(e=>t[e]);if(0===n.length)return!0;let r=!1;return n.forEach(n=>{e.contexts[n].filter(e=>t[n].indexOf(e)>=0).length>0&&(r=!0)}),r}}])}));