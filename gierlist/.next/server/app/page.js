(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4391:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>x,tree:()=>c}),s(908),s(4140),s(5866);var r=s(3191),i=s(8716),a=s(7922),n=s.n(a),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,908)),"C:\\Users\\negia\\Desktop\\gierlist\\gierlist\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,4140)),"C:\\Users\\negia\\Desktop\\gierlist\\gierlist\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}],u=["C:\\Users\\negia\\Desktop\\gierlist\\gierlist\\app\\page.tsx"],d="/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6599:(e,t,s)=>{Promise.resolve().then(s.bind(s,3771))},2291:(e,t,s)=>{Promise.resolve().then(s.bind(s,8743))},229:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,2994,23)),Promise.resolve().then(s.t.bind(s,6114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,9671,23)),Promise.resolve().then(s.t.bind(s,1868,23)),Promise.resolve().then(s.t.bind(s,4759,23))},3771:(e,t,s)=>{"use strict";s.d(t,{default:()=>a});var r=s(326),i=s(5047);s(7577);let a=()=>{let e=(0,i.useRouter)(),t=t=>{e.push(t)};return r.jsx("nav",{className:"bg-gray-800 p-4",children:(0,r.jsxs)("div",{className:"container mx-auto flex justify-between items-center",children:[r.jsx("h1",{className:"text-white text-2xl font-bold",children:"Gierlist"}),(0,r.jsxs)("div",{className:"space-x-4",children:[r.jsx("button",{className:"text-white hover:bg-gray-700 px-3 py-2 rounded",onClick:()=>t("/"),children:"Home"}),r.jsx("button",{className:"text-white hover:bg-gray-700 px-3 py-2 rounded",onClick:()=>t("/profile"),children:"Profile"}),r.jsx("button",{className:"text-white hover:bg-gray-700 px-3 py-2 rounded",onClick:()=>t("/Stream"),children:"Go Live"})]})]})})}},8743:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(326),i=s(4099),a=s(5047),n=s(7577);let o=({stream:e})=>{let t=(0,a.useRouter)();return(0,r.jsxs)("div",{onClick:()=>{t.push(`/streams/${e.user._id}`)},className:"bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer",children:[r.jsx("h2",{className:"text-xl font-semibold mb-2",children:e.streamName}),(0,r.jsxs)("p",{className:"text-gray-400",children:["by ",e.user.username]})]})},l=()=>{let[e,t]=(0,n.useState)([]),s=(0,a.useRouter)(),l=async()=>{try{let e=await i.Z.get("http://localhost:3000/api/stream");e.data.success&&t(e.data.streams)}catch(e){}};return(0,n.useEffect)(()=>{l()},[]),(0,r.jsxs)("div",{className:"min-h-screen bg-gray-900 text-white p-6",children:[(0,r.jsxs)("div",{className:"text-center mb-8",children:[r.jsx("h1",{className:"text-4xl font-bold mb-2",children:"Gierlist"}),r.jsx("p",{className:"text-lg text-gray-400",children:"Discover live streams from top creators"}),r.jsx("div",{children:r.jsx("button",{className:"w-fit bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2",onClick:()=>{s.push("/signup")},children:"Join The community"})})]}),r.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:e.length>0?e.map((e,t)=>r.jsx(o,{stream:e},t)):(0,r.jsxs)("div",{className:"col-span-full text-center",children:[r.jsx("p",{children:"No streams available \uD83D\uDEA6"}),r.jsx("button",{className:"w-fit bg-orange-600 hover:bg-orange-700 p-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2",onClick:()=>{s.push("/Stream")},children:"Go Live Yourself"})]})})]})}},4140:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u,metadata:()=>c});var r=s(9510);s(7272);var i=s(8570);let a=(0,i.createProxy)(String.raw`C:\Users\negia\Desktop\gierlist\gierlist\app\navbar.tsx`),{__esModule:n,$$typeof:o}=a;a.default;let l=(0,i.createProxy)(String.raw`C:\Users\negia\Desktop\gierlist\gierlist\app\navbar.tsx#default`),c={title:"Gierlist",description:"Generated by create next app"};function u({children:e}){return r.jsx("html",{lang:"en",children:(0,r.jsxs)("body",{children:[r.jsx(l,{}),e]})})}},908:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>o});var r=s(8570);let i=(0,r.createProxy)(String.raw`C:\Users\negia\Desktop\gierlist\gierlist\app\page.tsx`),{__esModule:a,$$typeof:n}=i;i.default;let o=(0,r.createProxy)(String.raw`C:\Users\negia\Desktop\gierlist\gierlist\app\page.tsx#default`)},7272:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[948,772,99],()=>s(4391));module.exports=r})();