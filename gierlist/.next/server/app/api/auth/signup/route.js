"use strict";(()=>{var e={};e.id=654,e.ids=[654],e.modules={1185:e=>{e.exports=require("mongoose")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6113:e=>{e.exports=require("crypto")},1969:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>x,patchFetch:()=>w,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>v,staticGenerationAsyncStorage:()=>h});var s={};t.r(s),t.d(s,{POST:()=>c});var a=t(9303),n=t(8716),i=t(670),o=t(7070),u=t(3646),p=t(3077),l=t(2023),d=t.n(l);async function c(e){await (0,u.Z)();let{username:r,email:t,password:s}=await e.json();try{if(await p.Z.findOne({email:t}))return o.NextResponse.json({success:!1,message:"user already exists"});let e=await d().hash(s,10),a=await d().hash(r,10),n=await p.Z.create({username:r,email:t,password:e,streamKey:a});return o.NextResponse.json({sucess:!0,user:n},{status:200})}catch(e){return o.NextResponse.json({success:!1,message:e.message},{status:400})}}let m=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/auth/signup/route",pathname:"/api/auth/signup",filename:"route",bundlePath:"app/api/auth/signup/route"},resolvedPagePath:"C:\\Users\\negia\\Desktop\\gierlist\\gierlist\\app\\api\\auth\\signup\\route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:v}=m,x="/api/auth/signup/route";function w(){return(0,i.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:h})}},3646:(e,r,t)=>{t.d(r,{Z:()=>o});var s=t(1185),a=t.n(s);let n=process.env.MONGODB_URI;if(!n)throw Error("Please define the MONGODB_URI environment variable inside .env.local");let i=global.mongoose;i||(i=global.mongoose={conn:null,promise:null});let o=async function(){return i.conn||(i.promise||(i.promise=a().connect(n,{bufferCommands:!1}).then(e=>e)),i.conn=await i.promise),i.conn}},3077:(e,r,t)=>{t.d(r,{Z:()=>i});var s=t(1185),a=t.n(s);let n=new(a()).Schema({username:{type:String,required:[!0,"Please provide a username"],unique:!0},email:{type:String,required:[!0,"Please provide an email"],unique:!0},password:{type:String,required:[!0,"Please provide a password"]},streamKey:{type:String,required:!0,unique:!0},stream:[{type:a().Schema.Types.ObjectId,ref:"Stream"}]}),i=a().models.User||a().model("User",n)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,972,23],()=>t(1969));module.exports=s})();