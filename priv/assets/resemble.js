/**
 * Minified by jsDelivr using Terser v5.17.1.
 * Original file: /npm/resemblejs@5.0.0/resemble.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var naiveFallback=function(){if("object"==typeof self&&self)return self;if("object"==typeof window&&window)return window;throw new Error("Unable to resolve global `this`")},getGlobalThis=function(){if("object"==typeof globalThis&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch(e){return naiveFallback()}try{return __global__||naiveFallback()}finally{delete Object.prototype.__global__}},isNode=function(){const e=getGlobalThis();return void 0!==e.process&&e.process.versions&&e.process.versions.node};!function(e,r){"use strict";"function"==typeof define&&define.amd?define([],r):"object"==typeof module&&module.exports?module.exports=r():e.resemble=r()}(this,(function(){"use strict";var e,r,t;function n(e,t){if(isNode())return r.createCanvas(e,t);var n=document.createElement("canvas");return n.width=e,n.height=t,n}isNode()?(r=require("canvas"),e=r.Image,t=r.loadImage):e=Image;var o={},i=o,a=function(r){var a,u,s,f,l,h=1,g={red:255,green:0,blue:255,alpha:255},c={r:0,g:0,b:0,a:0},d={flat:function(e,r){e[r]=g.red,e[r+1]=g.green,e[r+2]=g.blue,e[r+3]=g.alpha},movement:function(e,r,t,n){e[r]=(n.r*(g.red/255)+g.red)/2,e[r+1]=(n.g*(g.green/255)+g.green)/2,e[r+2]=(n.b*(g.blue/255)+g.blue)/2,e[r+3]=n.a},flatDifferenceIntensity:function(e,r,t,n){e[r]=g.red,e[r+1]=g.green,e[r+2]=g.blue,e[r+3]=I(t,n)},movementDifferenceIntensity:function(e,r,t,n){var o=I(t,n)/255*.8;e[r]=(1-o)*(n.r*(g.red/255))+o*g.red,e[r+1]=(1-o)*(n.g*(g.green/255))+o*g.green,e[r+2]=(1-o)*(n.b*(g.blue/255))+o*g.blue,e[r+3]=n.a},diffOnly:function(e,r,t,n){e[r]=n.r,e[r+1]=n.g,e[r+2]=n.b,e[r+3]=n.a}},b=d.flat,p=1200,m=!0,v={},w=[],y=[],x={red:16,green:16,blue:16,alpha:16,minBrightness:16,maxBrightness:240},B=!1,T=!1,M=!1,C=!1;function I(e,r){return(Math.abs(e.r-r.r)+Math.abs(e.g-r.g)+Math.abs(e.b-r.b))/3}function D(e,r,t,n,o){return e>(o.left||0)&&e<(o.right||t)&&r>(o.top||0)&&r<(o.bottom||n)}function S(){var e,r=y.length;for(e=0;e<r;e++)"function"==typeof y[e]&&y[e](v)}function k(e,r,t){var n,o;for(n=0;n<e;n++)for(o=0;o<r;o++)t(n,o)}function A(e,r){var t=e.width,o=e.height;M&&1===w.length&&(t=w[0].width,o=w[0].height);var i,a=n(t,o);a.getContext("2d").drawImage(e,0,0,t,o),i=a.getContext("2d").getImageData(0,0,t,o),w.push(i),r(i,t,o)}function O(r,n){var o,i=new e;i.setAttribute||(i.setAttribute=function(){}),m&&i.setAttribute("crossorigin","anonymous"),i.onerror=function(e){i.onload=null,i.onerror=null;const t=e?e+"":"Unknown error";w.push({error:`Failed to load image '${r}'. ${t}`}),n()},i.onload=function(){i.onload=null,i.onerror=null,A(i,n)},"string"==typeof r?(i.src=r,!isNode()&&i.complete&&i.naturalWidth>0&&i.onload()):void 0!==r.data&&"number"==typeof r.width&&"number"==typeof r.height?(w.push(r),n(r,r.width,r.height)):"undefined"!=typeof Buffer&&r instanceof Buffer?t(r).then((function(e){i.onload=null,i.onerror=null,A(e,n)})).catch((function(e){w.push({error:e?e+"":"Image load error."}),n()})):((o=new FileReader).onload=function(e){i.src=e.target.result},o.readAsDataURL(r))}function _(e,r,t){var n=Math.abs(e-r);return void 0!==e&&(void 0!==r&&(e===r||n<x[t]))}function E(e,r){var t=_(e.a,r.a,"alpha");return _(e.brightness,r.brightness,"minBrightness")&&t}function N(e,r,t){return.3*e+.59*r+.11*t}function P(e,r){var t=e.r===r.r,n=e.g===r.g,o=e.b===r.b;return t&&n&&o}function j(e,r,t,n,o,i){var a,u,s,f,l=0,h=0,g=0;for(z(e),a=-1;a<=1;a++)for(u=-1;u<=1;u++)if(0===a&&0===u);else{if(!F(c,r,4*((n+u)*i+(o+a))))continue;if(U(c),z(c),s=e,f=c,Math.abs(s.brightness-f.brightness)>x.maxBrightness&&l++,P(e,c)&&g++,Math.abs(c.h-e.h)>.3&&h++,h>1||l>1)return!0}return g<2}function R(e,r,t){"diffOnly"!==a&&(e[r]=t.brightness,e[r+1]=t.brightness,e[r+2]=t.brightness,e[r+3]=t.a*h)}function F(e,r,t){return r.length>t&&(e.r=r[t],e.g=r[t+1],e.b=r[t+2],e.a=r[t+3],!0)}function U(e){e.brightness=N(e.r,e.g,e.b)}function z(e){e.h=function(e,r,t){var n,o,i=e/255,a=r/255,u=t/255,s=Math.max(i,a,u),f=Math.min(i,a,u);if(s===f)n=0;else switch(o=s-f,s){case i:n=(a-u)/o+(a<u?6:0);break;case a:n=(u-i)/o+2;break;case u:n=(i-a)/o+4;break;default:n/=6}return n}(e.r,e.g,e.b)}function L(e,r,t,o){var i,g,c,d,m=e.data,w=r.data;C||(i=n(t,o),g=i.getContext("2d"),c=g.createImageData(t,o),d=c.data);var y,x=0,M={top:o,left:t,bottom:0,right:0},S=function(e,r){M.left=Math.min(e,M.left),M.right=Math.max(e,M.right),M.top=Math.min(r,M.top),M.bottom=Math.max(r,M.bottom)},A=Date.now();p&&B&&(t>p||o>p)&&(y=6);var O={r:0,g:0,b:0,a:0},N={r:0,g:0,b:0,a:0},P=!1;k(t,o,(function(e,r){if(!P&&(!y||r%y!=0&&e%y!=0)){var n=4*(r*t+e);if(F(O,m,n)&&F(N,w,n)){var i,g,c,p,v,M,k=function(e,r,t,n,o){var i,a,l,h=!0;if(u instanceof Array)for(a=!1,i=0;i<u.length;i++)if(D(e,r,t,n,u[i])){a=!0;break}if(s instanceof Array)for(l=!0,i=0;i<s.length;i++)if(D(e,r,t,n,s[i])){l=!1;break}return f?0!==I(o,f):void 0===a&&void 0===l||(!1!==a||!0!==l)&&(!0!==a&&!0!==l||(h=!0),!1!==a&&!1!==l||(h=!1),h)}(e,r,t,o,N);if(T)return U(O),U(N),void(E(O,N)||!k?C||R(d,n,N):(C||b(d,n,O,N),x++,S(e,r)));if(c=_((i=O).r,(g=N).r,"red"),p=_(i.g,g.g,"green"),v=_(i.b,g.b,"blue"),M=_(i.a,g.a,"alpha"),c&&p&&v&&M||!k?C||function(e,r,t){"diffOnly"!==a&&(e[r]=t.r,e[r+1]=t.g,e[r+2]=t.b,e[r+3]=t.a*h)}(d,n,O):B&&(U(O),U(N),j(O,m,0,r,e,t)||j(N,w,0,r,e,t))&&(E(O,N)||!k)?C||R(d,n,N):(C||b(d,n,O,N),x++,S(e,r)),C)x/(o*t)*100>l&&(P=!0)}}})),v.rawMisMatchPercentage=x/(o*t)*100,v.misMatchPercentage=v.rawMisMatchPercentage.toFixed(2),v.diffBounds=M,v.analysisTime=Date.now()-A,v.getImageDataUrl=function(e){if(C)throw Error("No diff image available - ran in compareOnly mode");var r=0;return e&&(r=function(e,r,t){var n=2;r.font="12px sans-serif";var o=r.measureText(e).width+2*n,i=22;o>t.width&&(t.width=o);return t.height+=i,r.fillStyle="#666",r.fillRect(0,0,t.width,i-4),r.fillStyle="#fff",r.fillRect(0,i-4,t.width,4),r.fillStyle="#fff",r.textBaseline="top",r.font="12px sans-serif",r.fillText(e,n,1),i}(e,g,i)),g.putImageData(c,0,r),i.toDataURL("image/png")},!C&&i.toBuffer&&(v.getBuffer=function(t){if(t){var n=i.width+2;i.width=3*n,g.putImageData(e,0,0),g.putImageData(r,n,0),g.putImageData(c,2*n,0)}else g.putImageData(c,0,0);return i.toBuffer()})}function W(e,r,t){var o;return e.height<t||e.width<r?((o=n(r,t).getContext("2d")).putImageData(e,0,0),o.getImageData(0,0,r,t)):e}function G(e){var r;if(e.errorColor)for(r in e.errorColor)e.errorColor.hasOwnProperty(r)&&(g[r]=void 0===e.errorColor[r]?g[r]:e.errorColor[r]);e.errorType&&d[e.errorType]&&(b=d[e.errorType],a=e.errorType),e.errorPixel&&"function"==typeof e.errorPixel&&(b=e.errorPixel),h=isNaN(Number(e.transparency))?h:e.transparency,void 0!==e.largeImageThreshold&&(p=e.largeImageThreshold),void 0!==e.useCrossOrigin&&(m=e.useCrossOrigin),void 0!==e.boundingBox&&(u=[e.boundingBox]),void 0!==e.ignoredBox&&(s=[e.ignoredBox]),void 0!==e.boundingBoxes&&(u=e.boundingBoxes),void 0!==e.ignoredBoxes&&(s=e.ignoredBoxes),void 0!==e.ignoreAreasColoredWith&&(f=e.ignoreAreasColoredWith)}function $(e){var t,n="function"==typeof e;n||(t=e);var a={setReturnEarlyThreshold:function(e){return e&&(C=!0,l=e),a},scaleToSameSize:function(){return M=!0,n&&e(),a},useOriginalSize:function(){return M=!1,n&&e(),a},ignoreNothing:function(){return x.red=0,x.green=0,x.blue=0,x.alpha=0,x.minBrightness=0,x.maxBrightness=255,B=!1,T=!1,n&&e(),a},ignoreLess:function(){return x.red=16,x.green=16,x.blue=16,x.alpha=16,x.minBrightness=16,x.maxBrightness=240,B=!1,T=!1,n&&e(),a},ignoreAntialiasing:function(){return x.red=32,x.green=32,x.blue=32,x.alpha=32,x.minBrightness=64,x.maxBrightness=96,B=!0,T=!1,n&&e(),a},ignoreColors:function(){return x.alpha=16,x.minBrightness=16,x.maxBrightness=240,B=!1,T=!0,n&&e(),a},ignoreAlpha:function(){return x.red=16,x.green=16,x.blue=16,x.alpha=255,x.minBrightness=16,x.maxBrightness=240,B=!1,T=!1,n&&e(),a},repaint:function(){return n&&e(),a},outputSettings:function(e){return G(e),a},onComplete:function(e){y.push(e);var n=function(){!function(e,r){function t(){var e,r;if(2===w.length){if(w[0].error||w[1].error)return(v={}).error=w[0].error?w[0].error:w[1].error,void S();e=w[0].width>w[1].width?w[0].width:w[1].width,r=w[0].height>w[1].height?w[0].height:w[1].height,w[0].width===w[1].width&&w[0].height===w[1].height?v.isSameDimensions=!0:v.isSameDimensions=!1,v.dimensionDifference={width:w[0].width-w[1].width,height:w[0].height-w[1].height},L(W(w[0],e,r),W(w[1],e,r),e,r),S()}}i!==o&&G(i),w=[],O(e,t),O(r,t)}(r,t)};return n(),$(n)},setupCustomTolerance:function(e){for(var r in x)e.hasOwnProperty(r)&&(x[r]=e[r])}};return a}var q={onComplete:function(e){y.push(e),O(r,(function(e,r,t){!function(e,r,t){var n=0,o=0,i=0,a=0,u=0,s=0,f=0,l=0;k(r,t,(function(t,h){var g=4*(h*r+t),c=e[g],d=e[g+1],b=e[g+2],p=e[g+3],m=N(c,d,b);c===d&&c===b&&p&&(0===c?l++:255===c&&f++),n++,o+=c/255*100,i+=d/255*100,a+=b/255*100,u+=(255-p)/255*100,s+=m/255*100})),v.red=Math.floor(o/n),v.green=Math.floor(i/n),v.blue=Math.floor(a/n),v.alpha=Math.floor(u/n),v.brightness=Math.floor(s/n),v.white=Math.floor(f/n*100),v.black=Math.floor(l/n*100),S()}(e.data,r,t)}))},compareTo:function(e){return $(e)},outputSettings:function(e){return G(e),q}};return q};function u(e,r,t){switch(r){case"nothing":e.ignoreNothing();break;case"less":e.ignoreLess();break;case"antialiasing":e.ignoreAntialiasing();break;case"colors":e.ignoreColors();break;case"alpha":e.ignoreAlpha();break;default:throw new Error("Invalid ignore: "+r)}e.setupCustomTolerance(t)}return a.compare=function(e,r,t,n){var o,i;"function"==typeof t?(o=t,i={}):(o=n,i=t||{});var s,f=a(e);i.output&&f.outputSettings(i.output),s=f.compareTo(r),i.returnEarlyThreshold&&s.setReturnEarlyThreshold(i.returnEarlyThreshold),i.scaleToSameSize&&s.scaleToSameSize();var l=i.tolerance||{};"string"==typeof i.ignore?u(s,i.ignore,l):i.ignore&&i.ignore.forEach&&i.ignore.forEach((function(e){u(s,e,l)})),s.onComplete((function(e){e.error?o(e.error):o(null,e)}))},a.outputSettings=function(e){return i=e,a},a}));
