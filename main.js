var De=Object.defineProperty;var Qi=Object.getOwnPropertyDescriptor;var Gi=Object.getOwnPropertyNames;var Yi=Object.prototype.hasOwnProperty;var Jn=(t,n)=>{for(var e in n)De(t,e,{get:n[e],enumerable:!0})},Zi=(t,n,e,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of Gi(n))!Yi.call(t,o)&&o!==e&&De(t,o,{get:()=>n[o],enumerable:!(r=Qi(n,o))||r.enumerable});return t};var Xi=t=>Zi(De({},"__esModule",{value:!0}),t);var Su={};Jn(Su,{default:()=>Pe});module.exports=Xi(Su);var $=require("obsidian");var Ki={summary:"abstract",tldr:"abstract",hint:"tip",important:"tip",check:"success",done:"success",help:"question",faq:"question",caution:"warning",attention:"warning",fail:"failure",missing:"failure",error:"danger",cite:"quote"},Ji={note:"memo",abstract:"clipboard",info:"information_source",todo:"ballot_box_with_check",tip:"bulb",success:"white_check_mark",question:"question",warning:"warning",failure:"x",danger:"no_entry",bug:"bug",example:"pushpin",quote:"speech_balloon"},to=new Set([2,3,4,5,6,7,8,9,10,11,12,13,15,17,34]);function Be(t,n=[],e=[]){if(!n.length)return t;let r=structuredClone(t.blocks),o=new Map(r.map(p=>[p.block_id,p])),a=new Map(n.map(p=>[p.start,p])),i=new Set(n.map(p=>p.end)),l=new Set,u=new Set;function f(p){return p.block_type!==2?"":(p.text?.elements??[]).map(h=>h.text_run?.content??"").join("")}function s(p){let h=[],g=[],x;function I(k){if(!x){h.push(k);return}let S=o.get(k);if(!to.has(S.block_type)){x=void 0,e.push("Callout \u4E2D\u7684\u56FE\u7247\u3001\u8868\u683C\u3001\u4EE3\u7801\u6216\u5D4C\u5957\u5361\u7247\u6309\u539F\u987A\u5E8F\u653E\u5728\u76F8\u90BB\u4F4D\u7F6E\u3002"),h.push(k);return}if(!x.id){x.id=crypto.randomUUID();let w=Ki[x.kind]??x.kind,E={block_id:x.id,block_type:19,callout:{emoji_id:Ji[w]??"memo",background_color:1,border_color:1},children:[]};r.push(E),o.set(E.block_id,E),h.push(E.block_id)}o.get(x.id).children.push(k)}for(let k of p){let S=o.get(k);if(!S)throw new Error("Callout \u8F6C\u6362\u7F3A\u5C11\u6587\u6863\u5757\u3002");let w=f(S);if(a.has(w))u.add(k),l.add(w),g.length&&e.push("\u5D4C\u5957 Callout \u5728\u98DE\u4E66\u4E2D\u6309\u987A\u5E8F\u5C55\u5F00\u4E3A\u72EC\u7ACB\u5361\u7247\u3002"),g.push({...a.get(w)}),x=g.at(-1);else if(i.has(w)){if(u.add(k),g.at(-1)?.end!==w)throw new Error("Callout \u8F6C\u6362\u540E\u7684\u8FB9\u754C\u65E0\u6CD5\u5339\u914D\u3002");g.pop(),x=g.length?{...g.at(-1),id:void 0}:void 0}else S.children?.length&&(S.children=s(S.children)),I(k),!x&&g.length&&(x={...g.at(-1),id:void 0})}if(g.length)throw new Error("Callout \u8F6C\u6362\u540E\u7684\u7ED3\u675F\u6807\u8BB0\u7F3A\u5931\u3002");return h}let c=s(t.first_level_block_ids);if(l.size!==n.length)throw new Error("\u98DE\u4E66\u8F6C\u6362\u540E\u672A\u80FD\u5B9A\u4F4D\u5168\u90E8 Callout\uFF0C\u8BF7\u68C0\u67E5\u5F15\u7528\u683C\u5F0F\u3002");return{first_level_block_ids:c,blocks:r.filter(p=>!u.has(p.block_id))}}var eo="blk_631fefbbae02400430b8f9f4";function Re(t,n){let{first_level_block_ids:e,blocks:r}=t??{};if(!Array.isArray(e)||!e.length||!Array.isArray(r))throw new Error("\u98DE\u4E66\u672A\u8FD4\u56DE\u53EF\u5199\u5165\u7684\u6587\u6863\u5757\u3002");let o=new Map(r.map(p=>[p.block_id,p])),a=new Set,i=[],l=[],u={children_id:[],descendants:[]};for(let p of e){let h=[],g=[p];for(;g.length;){let x=g.pop(),I=o.get(x);if(!x||!I||a.has(x))throw new Error("\u98DE\u4E66\u8FD4\u56DE\u4E86\u65E0\u6548\u7684\u6587\u6863\u5757\u7ED3\u6784\u3002");a.add(x);let{parent_id:k,revision_id:S,...w}=I;if(w.table?.property){let{merge_info:E,...A}=w.table.property;w.table={...w.table,property:A}}if(w.block_type===27&&(i.push({id:x,token:w.image?.token}),w.image={token:""}),w.block_type===32&&!w.children?.length){let E=crypto.randomUUID();w.children=[E],o.set(E,{block_id:E,block_type:2,text:{elements:[]}})}if(h.push(w),h.length>1e3)throw new Error("\u5355\u4E2A\u8868\u683C\u6216\u5D4C\u5957\u7ED3\u6784\u8D85\u8FC7\u98DE\u4E66\u7684\u5199\u5165\u4E0A\u9650\uFF0C\u8BF7\u62C6\u5C0F\u540E\u518D\u53D1\u5E03\u3002");for(let E of(w.children??[]).slice().reverse())g.push(E)}u.descendants.length+h.length>1e3&&(l.push(u),u={children_id:[],descendants:[]}),u.children_id.push(p),u.descendants.push(...h)}if(l.push(u),i.length!==n.length)throw new Error("\u98DE\u4E66\u8F6C\u6362\u540E\u7684\u56FE\u7247\u6570\u91CF\u4E0E\u539F\u7B14\u8BB0\u4E0D\u540C\uFF08\u542B Mermaid \u5360\u4F4D\uFF09\u3002\u8BF7\u5C1D\u8BD5\u5C06\u56FE\u7247\u5355\u72EC\u653E\u5728\u4E00\u884C\u3002");let f=new Map(n.map(p=>[p.placeholder,p])),s=i.some(({token:p})=>/^https?:\/\//i.test(p??"")),c=new Map(i.map(({id:p,token:h},g)=>[p,s?f.get(h):n[g]]));if(new Set(c.values()).size!==n.length||[...c.values()].some(p=>!p))throw new Error("\u98DE\u4E66\u8FD4\u56DE\u7684\u56FE\u7247\u6216 Mermaid \u4F4D\u7F6E\u65E0\u6CD5\u4E0E\u539F\u7B14\u8BB0\u5339\u914D\u3002");for(let p of l)for(let[h,g]of p.descendants.entries()){let x=c.get(g.block_id);x?.mermaid!==void 0&&(p.descendants[h]={block_id:g.block_id,block_type:40,add_ons:{component_type_id:eo,record:JSON.stringify({data:x.mermaid,theme:"default",view:"chart"})}},c.delete(g.block_id))}return{batches:l,assetByBlock:c}}var tr="https://open.feishu.cn/open-apis",no="https://accounts.feishu.cn/oauth/v3/token";function Xt(t,n){if(typeof t!="string"||!/^[\w-]+$/.test(t))throw new Error(`\u98DE\u4E66\u672A\u8FD4\u56DE\u6709\u6548\u7684${n}\u3002`);return t}function nr(t){let n=t.trim(),e;try{e=new URL(n.includes("://")?n:"https://"+n)}catch{throw new Error("\u8BF7\u586B\u5199\u98DE\u4E66\u5DE5\u4F5C\u533A\u57DF\u540D\u6216\u8BE5\u5DE5\u4F5C\u533A\u5185\u4EFB\u610F\u6587\u6863\u94FE\u63A5\u3002")}if(e.protocol!=="https:"||!/(?:^|\.)feishu\.cn$/.test(e.hostname)||e.username||e.password||e.port)throw new Error("\u8BF7\u586B\u5199 HTTPS \u98DE\u4E66\u5DE5\u4F5C\u533A\u57DF\u540D\u6216\u6587\u6863\u94FE\u63A5\uFF08feishu.cn\uFF09\u3002");return e.origin}function Ot(t,n){let e;try{e=new URL(t)}catch{throw new Error("feishu_url \u987B\u4E3A\u5DF2\u914D\u7F6E\u5DE5\u4F5C\u533A\u5185\u7684\u98DE\u4E66\u6587\u6863\u94FE\u63A5\u3002")}let r=/^\/docx\/([\w-]+)\/?$/.exec(e.pathname);if(!r||e.origin!==n||e.username||e.password)throw new Error("feishu_url \u987B\u4E3A\u5DF2\u914D\u7F6E\u5DE5\u4F5C\u533A\u5185\u7684\u98DE\u4E66\u6587\u6863\u94FE\u63A5\u3002");return{id:r[1],url:`${n}/docx/${r[1]}`}}function er(t){let n=t?.document_revision_id;if(!Number.isSafeInteger(n)||n<0)throw new Error("\u98DE\u4E66\u672A\u8FD4\u56DE\u6709\u6548\u7684\u6587\u6863\u7248\u672C\uFF0C\u5DF2\u505C\u6B62\u66F4\u65B0\uFF0C\u8BF7\u68C0\u67E5\u539F\u6587\u6863\u3002");return n}function rr(t){if(/^ou_[\w-]+$/.test(t))return{member_type:"openid",member_id:t};if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return{member_type:"email",member_id:t};throw new Error("\u8BF7\u5728 Feishu Publisher \u8BBE\u7F6E\u4E2D\u586B\u5199\u98DE\u4E66\u4F01\u4E1A\u90AE\u7BB1\u6216\u5F53\u524D\u5E94\u7528\u7684 Open ID\u3002")}var wt=class extends Error{constructor(n,e,r){super(n,{cause:r}),this.url=e}},se=class{constructor(n,{appId:e,appSecret:r}){this.request=n,this.appId=e,this.appSecret=r}async send(n,e,r,o,a="application/json; charset=utf-8"){let i;try{i=await this.request({url:e,method:r,contentType:a,body:o,throw:!1,headers:this.token?{Authorization:`Bearer ${this.token}`}:{}})}catch{throw new Error(`${n}\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u3002`)}let l;try{l=i.json}catch{throw new Error(`${n}\u5931\u8D25\uFF0C\u98DE\u4E66\u8FD4\u56DE\u4E86\u65E0\u6CD5\u8BFB\u53D6\u7684\u54CD\u5E94\uFF08HTTP ${i.status}\uFF09\u3002`)}if(i.status>=300||l?.code!==0){let u=Object.entries(i.headers??{}).find(([p])=>p.toLowerCase()==="x-tt-logid")?.[1],f=Number.isInteger(l?.code)?`\uFF0C\u98DE\u4E66\u9519\u8BEF\u7801 ${l.code}`:"",s=u&&/^[\w-]+$/.test(u)?`\uFF0C\u8BF7\u6C42 ID ${u}`:"",c=new Error(`${n}\u5931\u8D25\uFF08HTTP ${i.status}${f}${s}\uFF09\u3002\u8BF7\u6838\u5BF9\u5BF9\u5E94\u7684\u98DE\u4E66\u5E94\u7528\u6743\u9650\u53CA\u53D1\u5E03\u72B6\u6001\u3002`);throw c.definiteFailure=i.status<500&&Number.isInteger(l?.code)&&l.code!==0,c}return l}async authenticate(){let n=new URLSearchParams({grant_type:"client_credentials",client_id:this.appId,client_secret:this.appSecret}),r=(await this.send("\u83B7\u53D6\u98DE\u4E66\u8BBF\u95EE\u51ED\u8BC1",no,"POST",n.toString(),"application/x-www-form-urlencoded")).access_token;if(typeof r!="string"||!/^[A-Za-z0-9._~+/-]+=*$/.test(r)||/\s/.test(r))throw new Error("\u98DE\u4E66\u672A\u8FD4\u56DE\u6709\u6548\u7684\u8BBF\u95EE\u51ED\u8BC1\u3002");this.token=r}async waitForEdit(){let n=(this.lastEditAt??0)+360-Date.now();n>0&&await new Promise(e=>setTimeout(e,n)),this.lastEditAt=Date.now()}async json(n,e,r,o){return r!=="GET"&&/\/docx\/v1\/documents\/[^/]+\/blocks\//.test(e)&&await this.waitForEdit(),(await this.send(n,tr+e,r,JSON.stringify(o))).data}convert(n){return this.json("\u8F6C\u6362 Markdown","/docx/v1/documents/blocks/convert","POST",{content_type:"markdown",content:n})}async enablePublicReading(n,e){let r;try{r=new URL(n)}catch{throw new Error("\u8BF7\u5728\u7B14\u8BB0\u7684 feishu_url \u5C5E\u6027\u4E2D\u586B\u5199\u98DE\u4E66\u6587\u6863\u94FE\u63A5\u3002")}let o=/^\/docx\/([\w-]+)\/?$/.exec(r.pathname);if(!o||r.origin!==e||r.username||r.password)throw new Error("feishu_url \u5FC5\u987B\u662F\u5DF2\u914D\u7F6E\u5DE5\u4F5C\u533A\u5185\u7684\u98DE\u4E66\u6587\u6863\u94FE\u63A5\u3002");this.token||await this.authenticate();let a=await this.json("\u5F00\u542F\u4E92\u8054\u7F51\u53EA\u8BFB\u5206\u4EAB",`/drive/v1/permissions/${o[1]}/public?type=docx`,"PATCH",{external_access:!0,link_share_entity:"anyone_readable"});if(a?.permission_public?.link_share_entity!=="anyone_readable"||a.permission_public.external_access===!1)throw new Error("\u98DE\u4E66\u672A\u786E\u8BA4\u4E92\u8054\u7F51\u53EA\u8BFB\u6743\u9650\u3002\u8BF7\u5728\u6587\u6863\u7684\u5206\u4EAB\u9762\u677F\u68C0\u67E5\uFF0C\u6216\u7528\u65E0\u75D5\u7A97\u53E3\u9A8C\u8BC1\u3002");return`${e}/docx/${o[1]}`}async uploadImage(n,e,r,o=-1){let a=new FormData;a.append("file_name",n.name),a.append("parent_type","docx_image"),a.append("parent_node",r),a.append("size",String(n.data.byteLength)),a.append("file",new Blob([n.data],{type:n.mime}),n.name);let i=new Response(a),l=await i.arrayBuffer(),u=(this.lastUploadAt??0)+220-Date.now();u>0&&await new Promise(c=>setTimeout(c,u)),this.lastUploadAt=Date.now();let f=await this.send("\u4E0A\u4F20\u672C\u5730\u56FE\u7247",tr+"/drive/v1/medias/upload_all","POST",l,i.headers.get("content-type")),s=Xt(f.data?.file_token,"\u56FE\u7247\u7D20\u6750 ID");return this.json("\u5199\u5165\u56FE\u7247\u5757",`${e}/blocks/${r}?document_revision_id=${o}`,"PATCH",{replace_image:{token:s,align:2}})}async listVersions(n,e){let{id:r}=Ot(n,e);this.token||await this.authenticate();let o=[],a=new Set,i;do{let l=new URLSearchParams({obj_type:"docx",page_size:"100",...i?{page_token:i}:{}}),u=await this.json("\u8BFB\u53D6\u98DE\u4E66\u547D\u540D\u7248\u672C",`/drive/v1/files/${r}/versions?${l}`,"GET");if(!u||u.items!=null&&!Array.isArray(u.items))throw new Error("\u98DE\u4E66\u672A\u8FD4\u56DE\u6709\u6548\u7684\u7248\u672C\u5217\u8868\uFF0C\u8BF7\u68C0\u67E5\u7248\u672C\u7BA1\u7406\u6743\u9650\u3002");if(o.push(...u.items??[]),i=u.has_more?u.page_token:null,u.has_more&&(!i||a.has(i)))throw new Error("\u98DE\u4E66\u7248\u672C\u5217\u8868\u5206\u9875\u5F02\u5E38\uFF0C\u5DF2\u505C\u6B62\u53D1\u5E03\u3002");i&&a.add(i)}while(i);return o}async versionDelay(){await new Promise(n=>setTimeout(n,1e3))}async ensureNamedVersion(n,e,r,o){let{id:a,url:i}=Ot(n,e),l=p=>String(p.status)==="0"&&p.name===r&&typeof p.version=="string"&&p.version.length>0,u=await this.listVersions(i,e),f=u.find(p=>l(p)&&(!o?.id||p.version===o.id));if(f)return{created:!1,version:f.version};let s=o?.id,c=(p,h)=>{let g=new wt(p,i,h);return g.snapshot={name:r,id:s||"",url:i},g};if(o&&!s)throw c("\u4E0A\u6B21\u7248\u672C\u4FDD\u5B58\u8BF7\u6C42\u7ED3\u679C\u4E0D\u660E\uFF0C\u76EE\u524D\u672A\u67E5\u5230\u5BF9\u5E94\u547D\u540D\u7248\u672C\u3002\u8BF7\u5148\u5728\u98DE\u4E66\u201C\u67E5\u770B\u5DF2\u5B58\u7248\u672C\u201D\u4E2D\u6838\u5BF9\uFF0C\u907F\u514D\u91CD\u590D\u521B\u5EFA\u7248\u672C\u3002");if(!s){let p;try{p=await this.json("\u4FDD\u5B58\u98DE\u4E66\u547D\u540D\u7248\u672C",`/drive/v1/files/${a}/versions`,"POST",{name:r,obj_type:"docx"})}catch(h){throw h.definiteFailure?new wt("\u6B63\u6587\u5DF2\u53D1\u5E03\uFF0C\u4F46\u98DE\u4E66\u62D2\u7EDD\u4FDD\u5B58\u547D\u540D\u7248\u672C\u3002"+h.message,i,h):c("\u6B63\u6587\u5DF2\u53D1\u5E03\uFF0C\u4F46\u98DE\u4E66\u547D\u540D\u7248\u672C\u4FDD\u5B58\u672A\u786E\u8BA4\u3002"+h.message,h)}if(s=p?.version,typeof s!="string"||!s)throw c("\u98DE\u4E66\u5DF2\u63A5\u6536\u7248\u672C\u4FDD\u5B58\u8BF7\u6C42\uFF0C\u4F46\u672A\u8FD4\u56DE\u53EF\u6838\u5BF9\u7684\u7248\u672C\u6807\u8BC6\uFF0C\u8BF7\u5148\u5728\u98DE\u4E66\u68C0\u67E5\u3002")}for(let p=0;p<8;p++){try{u=await this.listVersions(i,e)}catch(g){throw c("\u7248\u672C\u4FDD\u5B58\u8BF7\u6C42\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u67E5\u8BE2\u72B6\u6001\u5931\u8D25\u3002"+g.message,g)}if(u.find(g=>l(g)&&g.version===s))return{created:!o,version:s};p<7&&await this.versionDelay()}throw c("\u98DE\u4E66\u7248\u672C\u4FDD\u5B58\u4ECD\u672A\u786E\u8BA4\u3002\u63D2\u4EF6\u5DF2\u8BB0\u5F55\u5F85\u5B8C\u6210\u7684\u7248\u672C\u6807\u8BC6\uFF1B\u518D\u6B21\u53D1\u5E03\u4F1A\u5148\u67E5\u8BE2\u8BE5\u8BF7\u6C42\uFF0C\u4E0D\u4F1A\u91CD\u590D\u63D0\u4EA4\u3002")}async writePlan(n,e,r,o){let a=`/docx/v1/documents/${n}`,i=[];for(let l of e){let u=await this.json("\u5199\u5165\u6587\u6863\u5757",`${a}/blocks/${n}/descendant?document_revision_id=${o}&client_token=${crypto.randomUUID()}`,"POST",{...l,index:-1});o=er(u);let f=new Map((u.block_id_relations??[]).map(({temporary_block_id:s,block_id:c})=>[s,c]));for(let s of l.children_id)i.push(Xt(f.get(s),"\u65B0\u589E\u6587\u6863\u5757 ID"));for(let s of l.descendants){let c=r.get(s.block_id);if(!c)continue;let p=await this.uploadImage(c,a,Xt(f.get(s.block_id),"\u56FE\u7247\u5757 ID"),o);o=er(p)}}return{revision:o,roots:i}}async update({url:n,title:e,markdown:r,assets:o,origin:a,collaborator:i,callouts:l=[],warnings:u=[]}){let{id:f,url:s}=Ot(n,a);await this.authenticate();let{batches:c,assetByBlock:p}=Re(Be(await this.convert(r),l,u),o),h=`/docx/v1/documents/${f}`,g=await this.json("\u8BFB\u53D6\u539F\u6587\u6863\u7248\u672C",h,"GET"),x=g?.document?.revision_id;if(!Number.isSafeInteger(x)||x<0)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u98DE\u4E66\u539F\u6587\u6863\u7248\u672C\uFF0C\u672A\u66F4\u65B0\u6B63\u6587\u3002");let I=await this.json("\u8BFB\u53D6\u539F\u6587\u6863\u6B63\u6587",`${h}/blocks/${f}?document_revision_id=${x}`,"GET");if(!I?.block||typeof I.block!="object")throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u539F\u6587\u6863\u6B63\u6587\uFF0C\u672A\u6267\u884C\u66F4\u65B0\u3002");let k=I.block.children??[];if(!Array.isArray(k)||k.some(S=>typeof S!="string"))throw new Error("\u539F\u6587\u6863\u5757\u7ED3\u6784\u5F02\u5E38\uFF0C\u672A\u66F4\u65B0\u6B63\u6587\u3002");g.document.title!==e&&u.push("\u672C\u6B21\u4FDD\u7559\u98DE\u4E66\u539F\u6587\u6863\u6807\u9898\uFF0C\u4E3B\u94FE\u63A5\u4FDD\u6301\u4E0D\u53D8\u3002");try{let S=await this.writePlan(f,c,p,x);if((await this.json("\u6821\u9A8C\u66F4\u65B0\u540E\u7684\u6587\u6863\u7248\u672C",h,"GET"))?.document?.revision_id!==S.revision)throw new Error("\u53D1\u5E03\u8FC7\u7A0B\u4E2D\u539F\u6587\u6863\u7248\u672C\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u5220\u9664\u65E7\u6B63\u6587\u3002");let E=await this.json("\u6821\u9A8C\u66F4\u65B0\u540E\u7684\u6B63\u6587",`${h}/blocks/${f}?document_revision_id=${S.revision}`,"GET"),A=[...k,...S.roots];if(!Array.isArray(E?.block?.children)||E.block.children.length!==A.length||E.block.children.some((b,F)=>b!==A[F]))throw new Error("\u53D1\u5E03\u8FC7\u7A0B\u4E2D\u539F\u6587\u6863\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u5220\u9664\u65E7\u6B63\u6587\uFF0C\u8BF7\u6253\u5F00\u539F\u94FE\u63A5\u68C0\u67E5\u540E\u91CD\u8BD5\u3002");k.length&&await this.json("\u66FF\u6362\u65E7\u6B63\u6587",`${h}/blocks/${f}/children/batch_delete?document_revision_id=${S.revision}&client_token=${crypto.randomUUID()}`,"DELETE",{start_index:0,end_index:k.length})}catch(S){throw new wt("\u539F\u6587\u6863\u66F4\u65B0\u672A\u5B8C\u6210\uFF0C\u53EF\u80FD\u4FDD\u7559\u65E7\u6B63\u6587\u548C\u90E8\u5206\u65B0\u5185\u5BB9\u3002"+S.message,s,S)}if(i)try{await this.json("\u6388\u4E88\u98DE\u4E66\u8D26\u53F7\u53EF\u7BA1\u7406\u6743\u9650",`/drive/v1/permissions/${f}/members?type=docx`,"POST",{...i,perm:"full_access"})}catch(S){throw new wt("\u539F\u6587\u6863\u6B63\u6587\u5DF2\u66F4\u65B0\uFF0C\u4F46\u534F\u4F5C\u8005\u53EF\u7BA1\u7406\u6743\u9650\u672A\u786E\u8BA4\u3002"+S.message,s,S)}return s}async publish({title:n,markdown:e,assets:r,origin:o,collaborator:a,callouts:i=[],warnings:l=[]}){await this.authenticate();let{batches:u,assetByBlock:f}=Re(Be(await this.convert(e),i,l),r),s=await this.json("\u521B\u5EFA\u6587\u6863","/docx/v1/documents","POST",{title:n}),c=Xt(s?.document?.document_id,"\u6587\u6863 ID"),p=`/docx/v1/documents/${c}`,h=`${o}/docx/${c}`;try{for(let g of u){let x=await this.json("\u5199\u5165\u6587\u6863\u5757",`${p}/blocks/${c}/descendant?document_revision_id=-1`,"POST",{...g,index:-1}),I=new Map((x?.block_id_relations??[]).map(({temporary_block_id:k,block_id:S})=>[k,S]));for(let k of g.descendants){let S=f.get(k.block_id);if(!S)continue;let w=Xt(I.get(k.block_id),"\u56FE\u7247\u5757 ID");await this.uploadImage(S,p,w)}}}catch(g){throw new wt("\u98DE\u4E66\u5DF2\u521B\u5EFA\u6587\u6863\uFF0C\u4F46\u5185\u5BB9\u53EF\u80FD\u4E0D\u5B8C\u6574\u3002"+g.message,h,g)}try{await this.json("\u6388\u4E88\u98DE\u4E66\u8D26\u53F7\u53EF\u7BA1\u7406\u6743\u9650",`/drive/v1/permissions/${c}/members?type=docx`,"POST",{...a,perm:"full_access"})}catch(g){throw new wt("\u6587\u6863\u5185\u5BB9\u5DF2\u5199\u5165\uFF0C\u8D26\u53F7\u6388\u6743\u5931\u8D25\uFF0C\u94FE\u63A5\u53EF\u80FD\u6682\u65F6\u65E0\u6CD5\u6253\u5F00\u3002"+g.message,h,g)}return h}};function ro(t){if(typeof t=="string"&&[...t.trim()].length>1024)throw new Error("version \u5C5E\u6027\u4E0D\u80FD\u8D85\u8FC7 1024 \u4E2A\u5B57\u7B26\u3002");if(t==null||t==="")return"1.0";if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&t.trim())return t.trim();throw new Error('\u7B14\u8BB0 version \u5C5E\u6027\u987B\u4E3A\u6587\u672C\u6216\u6570\u5B57\uFF0C\u4F8B\u5982 version: "1.0"\u3002')}function ir(t,n,e=!1){let r=ro(t.version),o=typeof t.feishu_url=="string"?t.feishu_url.trim():"";if(t.feishu_url!=null&&typeof t.feishu_url!="string")throw new Error("feishu_url \u987B\u4E3A\u98DE\u4E66\u6587\u6863\u94FE\u63A5\u6587\u672C\u3002");let a;return!e&&o?a=Ot(o,n).url:!e&&typeof t.feishu_pending_url=="string"&&(a=Ot(t.feishu_pending_url,n).url),{action:a?"update":"create",url:a,version:r,initialUrl:o}}function Oe(t,n,e,r=!0){if((typeof t.feishu_url=="string"?t.feishu_url.trim():"")!==n.initialUrl)throw new Error("\u53D1\u5E03\u671F\u95F4 feishu_url \u88AB\u4FEE\u6539\uFF0C\u672A\u8986\u76D6\u7B14\u8BB0\u5C5E\u6027\uFF0C\u8BF7\u4ECE\u53D1\u5E03\u7ED3\u679C\u624B\u52A8\u4FDD\u5B58\u94FE\u63A5\u3002");(t.version==null||t.version==="")&&(t.version=n.version),r?(t.feishu_url=e,delete t.feishu_published_version,delete t.feishu_pending_url,delete t.feishu_pending_version,delete t.feishu_pending_snapshot):(t.feishu_pending_url=e,t.feishu_pending_version=n.version)}var io={};function dt(t,n){let e=n||io,r=typeof e.includeImageAlt=="boolean"?e.includeImageAlt:!0,o=typeof e.includeHtml=="boolean"?e.includeHtml:!0;return ar(t,r,o)}function ar(t,n,e){if(oo(t)){if("value"in t)return t.type==="html"&&!e?"":t.value;if(n&&"alt"in t&&t.alt)return t.alt;if("children"in t)return or(t.children,n,e)}return Array.isArray(t)?or(t,n,e):""}function or(t,n,e){let r=[],o=-1;for(;++o<t.length;)r[o]=ar(t[o],n,e);return r.join("")}function oo(t){return!!(t&&typeof t=="object")}var lr=document.createElement("i");function jt(t){let n="&"+t+";";lr.innerHTML=n;let e=lr.textContent;return e.charCodeAt(e.length-1)===59&&t!=="semi"||e===n?!1:e}function G(t,n,e,r){let o=t.length,a=0,i;if(n<0?n=-n>o?0:o+n:n=n>o?o:n,e=e>0?e:0,r.length<1e4)i=Array.from(r),i.unshift(n,e),t.splice(...i);else for(e&&t.splice(n,e);a<r.length;)i=r.slice(a,a+1e4),i.unshift(n,0),t.splice(...i),a+=1e4,n+=1e4}function K(t,n){return t.length>0?(G(t,t.length,0,n),t):n}var ur={}.hasOwnProperty;function ce(t){let n={},e=-1;for(;++e<t.length;)ao(n,t[e]);return n}function ao(t,n){let e;for(e in n){let o=(ur.call(t,e)?t[e]:void 0)||(t[e]={}),a=n[e],i;if(a)for(i in a){ur.call(o,i)||(o[i]=[]);let l=a[i];lo(o[i],Array.isArray(l)?l:l?[l]:[])}}}function lo(t,n){let e=-1,r=[];for(;++e<n.length;)(n[e].add==="after"?t:r).push(n[e]);G(t,0,0,r)}function fe(t,n){let e=Number.parseInt(t,n);return e<9||e===11||e>13&&e<32||e>126&&e<160||e>55295&&e<57344||e>64975&&e<65008||(e&65535)===65535||(e&65535)===65534||e>1114111?"\uFFFD":String.fromCodePoint(e)}function Z(t){return t.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}var W=bt(/[A-Za-z]/),Q=bt(/[\dA-Za-z]/),sr=bt(/[#-'*+\--9=?A-Z^-~]/);function Tt(t){return t!==null&&(t<32||t===127)}var Kt=bt(/\d/),cr=bt(/[\dA-Fa-f]/),fr=bt(/[!-/:-@[-`{-~]/);function T(t){return t!==null&&t<-2}function O(t){return t!==null&&(t<0||t===32)}function z(t){return t===-2||t===-1||t===32}var At=bt(/\p{P}|\p{S}/u),lt=bt(/\s/);function bt(t){return n;function n(e){return e!==null&&e>-1&&t.test(String.fromCharCode(e))}}function P(t,n,e,r){let o=r?r-1:1/0,a=0;return i;function i(u){return z(u)?(t.enter(e),l(u)):n(u)}function l(u){return z(u)&&a++<o?(t.consume(u),l):(t.exit(e),n(u))}}function je(t,n,e,r,o,a){let i=0;return l;function l(s){return a>0&&z(s)?(t.enter(r),u(s)):f(s)}function u(s){return z(s)&&i<a?(t.consume(s),i++,u):(t.exit(r),f(s))}function f(s){return i>=o?n(s):e(s)}}var hr={tokenize:uo};function uo(t){let n=t.attempt(this.parser.constructs.contentInitial,r,o),e;return n;function r(l){if(l===null){t.consume(l);return}return t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),P(t,n,"linePrefix")}function o(l){return t.enter("paragraph"),a(l)}function a(l){let u=t.enter("chunkText",{contentType:"text",previous:e});return e&&(e.next=u),e=u,i(l)}function i(l){if(l===null){t.exit("chunkText"),t.exit("paragraph"),t.consume(l);return}return T(l)?(t.consume(l),t.exit("chunkText"),a):(t.consume(l),i)}}var gt=class{constructor(){this.index=new Map,this.map=[]}add(n,e,r){pr(this,n,e,r,!1)}addBefore(n,e,r){pr(this,n,e,r,!0)}consume(n){if(this.map.sort(function(a,i){return a[0]-i[0]}),this.map.length===0)return;let e=this.map.length,r=[];for(;e>0;)e-=1,r.push(n.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),n.length=this.map[e][0];r.push(n.slice()),n.length=0;let o=r.pop();for(;o;){for(let a of o)n.push(a);o=r.pop()}this.map.length=0,this.index.clear()}};function pr(t,n,e,r,o){if(e===0&&r.length===0)return;let a=t.index.get(n);if(a){a[1]+=e,o?(r.push(...a[2]),a[2]=r):a[2].push(...r);return}let i=[n,e,r];t.map.push(i),t.index.set(n,i)}var dr={tokenize:so},mr={tokenize:co};function so(t){let n=this,e=[],r=0,o,a,i;return l;function l(w){if(r<e.length){let E=e[r];return n.containerState=E[1],t.attempt(E[0].continuation,u,f)(w)}return f(w)}function u(w){if(r++,n.containerState._closeFlow){n.containerState._closeFlow=void 0,o&&S();let E=n.events.length,A=E,b;for(;A--;)if(n.events[A][0]==="exit"&&n.events[A][1].type==="chunkFlow"){b=n.events[A][1].end;break}k(r);let F=E;for(;F<n.events.length;)n.events[F][1].end={...b},F++;let M=new gt;return M.add(A+1,0,n.events.slice(E)),M.add(E,F-E,[]),M.consume(n.events),f(w)}return l(w)}function f(w){if(r===e.length){if(!o)return p(w);if(o.currentConstruct&&o.currentConstruct.concrete)return g(w);n.interrupt=!!(o.currentConstruct&&!o._gfmTableDynamicInterruptHack)}return n.containerState={},t.check(mr,s,c)(w)}function s(w){return o&&S(),k(r),p(w)}function c(w){return n.parser.lazy[n.now().line]=r!==e.length,i=n.now().offset,g(w)}function p(w){return n.containerState={},t.attempt(mr,h,g)(w)}function h(w){return r++,e.push([n.currentConstruct,n.containerState]),p(w)}function g(w){if(w===null){o&&S(),k(0),t.consume(w);return}return o=o||n.parser.flow(n.now()),t.enter("chunkFlow",{_tokenizer:o,contentType:"flow",previous:a}),x(w)}function x(w){if(w===null){I(t.exit("chunkFlow"),!0),k(0),t.consume(w);return}return T(w)?(t.consume(w),I(t.exit("chunkFlow")),r=0,n.interrupt=void 0,l):(t.consume(w),x)}function I(w,E){let A=n.sliceStream(w);if(E&&A.push(null),w.previous=a,a&&(a.next=w),a=w,o.defineSkip(w.start),o.write(A),n.parser.lazy[w.start.line]){let b=o.events.length;for(;b--;)if(o.events[b][1].start.offset<i&&(!o.events[b][1].end||o.events[b][1].end.offset>i))return;let F=n.events.length,M=F,R,y;for(;M--;)if(n.events[M][0]==="exit"&&n.events[M][1].type==="chunkFlow"){if(R){y=n.events[M][1].end;break}R=!0}for(k(r),b=F;b<n.events.length;)n.events[b][1].end={...y},b++;let D=new gt;D.add(M+1,0,n.events.slice(F)),D.add(F,b-F,[]),D.consume(n.events)}}function k(w){let E=e.length;for(;E-- >w;){let A=e[E];n.containerState=A[1],A[0].exit.call(n,t)}e.length=w}function S(){o.write([null]),a=void 0,o=void 0,n.containerState._closeFlow=void 0}}function co(t,n,e){return P(t,t.attempt(this.parser.constructs.document,n,e),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function kt(t){if(t===null||O(t)||lt(t))return 1;if(At(t))return 2}function yt(t,n,e){let r=[],o=-1;for(;++o<t.length;){let a=t[o].resolveAll;a&&!r.includes(a)&&(n=a(n,e),r.push(a))}return n}var Jt={name:"attention",resolveAll:fo,tokenize:ho};function fo(t,n){let e=-1,r;for(;++e<t.length;)if(t[e][0]==="enter"&&t[e][1].type==="attentionSequence"&&t[e][1]._close){let o=e;for(;o--;)if(t[o][0]==="exit"&&t[o][1].type==="attentionSequence"&&t[o][1]._open&&n.sliceSerialize(t[o][1]).charCodeAt(0)===n.sliceSerialize(t[e][1]).charCodeAt(0)){if((t[o][1]._close||t[e][1]._open)&&(t[e][1].end.offset-t[e][1].start.offset)%3&&!((t[o][1].end.offset-t[o][1].start.offset+t[e][1].end.offset-t[e][1].start.offset)%3))continue;let a=t[o][1].end.offset-t[o][1].start.offset>1&&t[e][1].end.offset-t[e][1].start.offset>1?2:1,i={...t[o][1].end},l={...t[e][1].start};gr(i,-a),gr(l,a);let u={type:a>1?"strongSequence":"emphasisSequence",start:i,end:{...t[o][1].end}},f={type:a>1?"strongSequence":"emphasisSequence",start:{...t[e][1].start},end:l},s={type:a>1?"strongText":"emphasisText",start:{...t[o][1].end},end:{...t[e][1].start}},c={type:a>1?"strong":"emphasis",start:{...u.start},end:{...f.end}};t[o][1].end={...u.start},t[e][1].start={...f.end},r=[],t[o][1].end.offset-t[o][1].start.offset&&(r=K(r,[["enter",t[o][1],n],["exit",t[o][1],n]])),r=K(r,[["enter",c,n],["enter",u,n],["exit",u,n],["enter",s,n]]),r=K(r,yt(n.parser.constructs.insideSpan.null,t.slice(o+1,e),n)),r=K(r,[["exit",s,n],["enter",f,n],["exit",f,n],["exit",c,n]]);let p=0;t[e][1].end.offset-t[e][1].start.offset&&(p=2,r=K(r,[["enter",t[e][1],n],["exit",t[e][1],n]])),G(t,o-1,e-o+3,r),e=o+r.length-p-2;break}}for(e=-1;++e<t.length;)t[e][1].type==="attentionSequence"&&(t[e][1].type="data");return t}function ho(t,n){let e=this.parser.constructs.attentionMarkers.null,r=this.previous,o=kt(r),a;return i;function i(u){return a=u,t.enter("attentionSequence"),l(u)}function l(u){if(u===a)return t.consume(u),l;let f=t.exit("attentionSequence"),s=kt(u),c=!s||s===2&&o||e.includes(u)&&u!==42&&u!==95,p=!o||o===2&&s||e.includes(r)&&r!==42&&r!==95;return f._open=!!(a===42?c:c&&(o||!p)),f._close=!!(a===42?p:p&&(s||!c)),n(u)}}function gr(t,n){t.column+=n,t.offset+=n,t._bufferIndex+=n}var Ne={name:"autolink",tokenize:po};function po(t,n,e){let r=0;return o;function o(h){return t.enter("autolink"),t.enter("autolinkMarker"),t.consume(h),t.exit("autolinkMarker"),t.enter("autolinkProtocol"),a}function a(h){return W(h)?(t.consume(h),i):h===64?e(h):f(h)}function i(h){return h===43||h===45||h===46||Q(h)?(r=1,l(h)):f(h)}function l(h){return h===58?(t.consume(h),r=0,u):(h===43||h===45||h===46||Q(h))&&r++<32?(t.consume(h),l):(r=0,f(h))}function u(h){return h===62?(t.exit("autolinkProtocol"),t.enter("autolinkMarker"),t.consume(h),t.exit("autolinkMarker"),t.exit("autolink"),n):h===null||h===32||h===60||Tt(h)?e(h):(t.consume(h),u)}function f(h){return h===64?(t.consume(h),s):sr(h)?(t.consume(h),f):e(h)}function s(h){return Q(h)?c(h):e(h)}function c(h){return h===46?(t.consume(h),r=0,s):h===62?(t.exit("autolinkProtocol").type="autolinkEmail",t.enter("autolinkMarker"),t.consume(h),t.exit("autolinkMarker"),t.exit("autolink"),n):p(h)}function p(h){if((h===45||Q(h))&&r++<63){let g=h===45?p:c;return t.consume(h),g}return e(h)}}var ut={partial:!0,tokenize:mo};function mo(t,n,e){return r;function r(a){return z(a)?P(t,o,"linePrefix")(a):o(a)}function o(a){return a===null||T(a)?n(a):e(a)}}var he={continuation:{tokenize:ko},exit:xo,name:"blockQuote",tokenize:go};function go(t,n,e){let r=this;return o;function o(i){if(i===62){let l=r.containerState;return l.open||(t.enter("blockQuote",{_container:!0}),l.open=!0),t.enter("blockQuotePrefix"),t.enter("blockQuoteMarker"),t.consume(i),t.exit("blockQuoteMarker"),a}return e(i)}function a(i){return z(i)?(t.enter("blockQuotePrefixWhitespace"),t.consume(i),t.exit("blockQuotePrefixWhitespace"),t.exit("blockQuotePrefix"),n):(t.exit("blockQuotePrefix"),n(i))}}function ko(t,n,e){let r=this;return o;function o(i){return z(i)?P(t,a,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i):a(i)}function a(i){return t.attempt(he,n,e)(i)}}function xo(t){t.exit("blockQuote")}var pe={name:"characterEscape",tokenize:wo};function wo(t,n,e){return r;function r(a){return t.enter("characterEscape"),t.enter("escapeMarker"),t.consume(a),t.exit("escapeMarker"),o}function o(a){return fr(a)?(t.enter("characterEscapeValue"),t.consume(a),t.exit("characterEscapeValue"),t.exit("characterEscape"),n):e(a)}}var me={name:"characterReference",tokenize:bo};function bo(t,n,e){let r=this,o=0,a,i;return l;function l(c){return t.enter("characterReference"),t.enter("characterReferenceMarker"),t.consume(c),t.exit("characterReferenceMarker"),u}function u(c){return c===35?(t.enter("characterReferenceMarkerNumeric"),t.consume(c),t.exit("characterReferenceMarkerNumeric"),f):(t.enter("characterReferenceValue"),a=31,i=Q,s(c))}function f(c){return c===88||c===120?(t.enter("characterReferenceMarkerHexadecimal"),t.consume(c),t.exit("characterReferenceMarkerHexadecimal"),t.enter("characterReferenceValue"),a=6,i=cr,s):(t.enter("characterReferenceValue"),a=7,i=Kt,s(c))}function s(c){if(c===59&&o){let p=t.exit("characterReferenceValue");return i===Q&&!jt(r.sliceSerialize(p))?e(c):(t.enter("characterReferenceMarker"),t.consume(c),t.exit("characterReferenceMarker"),t.exit("characterReference"),n)}return i(c)&&o++<a?(t.consume(c),s):e(c)}}var te={partial:!0,tokenize:yo};function yo(t,n,e){let r=this;return o;function o(i){return i===null?e(i):(t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),a)}function a(i){return r.parser.lazy[r.now().line]?e(i):n(i)}}var de={concrete:!0,name:"codeFenced",tokenize:So};function So(t,n,e){let r=this,o={partial:!0,tokenize:A},a=0,i=0,l;return u;function u(b){return f(b)}function f(b){let F=r.events[r.events.length-1];return a=F&&F[1].type==="linePrefix"?F[2].sliceSerialize(F[1],!0).length:0,l=b,t.enter("codeFenced"),t.enter("codeFencedFence"),t.enter("codeFencedFenceSequence"),s(b)}function s(b){return b===l?(i++,t.consume(b),s):i<3?e(b):(t.exit("codeFencedFenceSequence"),z(b)?P(t,c,"whitespace")(b):c(b))}function c(b){return b===null||T(b)?(t.exit("codeFencedFence"),r.interrupt?n(b):t.check(te,x,E)(b)):(t.enter("codeFencedFenceInfo"),t.enter("chunkString",{contentType:"string"}),p(b))}function p(b){return b===null||T(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),c(b)):z(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),P(t,h,"whitespace")(b)):b===96&&b===l?e(b):(t.consume(b),p)}function h(b){return b===null||T(b)?c(b):(t.enter("codeFencedFenceMeta"),t.enter("chunkString",{contentType:"string"}),g(b))}function g(b){return b===null||T(b)?(t.exit("chunkString"),t.exit("codeFencedFenceMeta"),c(b)):b===96&&b===l?e(b):(t.consume(b),g)}function x(b){return t.attempt(o,E,I)(b)}function I(b){return t.enter("lineEnding"),t.consume(b),t.exit("lineEnding"),k}function k(b){return a>0&&z(b)?P(t,S,"linePrefix",a+1)(b):S(b)}function S(b){return b===null||T(b)?t.check(te,x,E)(b):(t.enter("codeFlowValue"),w(b))}function w(b){return b===null||T(b)?(t.exit("codeFlowValue"),S(b)):(t.consume(b),w)}function E(b){return t.exit("codeFenced"),n(b)}function A(b,F,M){let R=0;return y;function y(B){return b.enter("lineEnding"),b.consume(B),b.exit("lineEnding"),D}function D(B){return b.enter("codeFencedFence"),z(B)?P(b,N,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(B):N(B)}function N(B){return B===l?(b.enter("codeFencedFenceSequence"),L(B)):M(B)}function L(B){return B===l?(R++,b.consume(B),L):R>=i?(b.exit("codeFencedFenceSequence"),z(B)?P(b,j,"whitespace")(B):j(B)):M(B)}function j(B){return B===null||T(B)?(b.exit("codeFencedFence"),F(B)):M(B)}}}var ee={name:"codeIndented",tokenize:Io},Co={partial:!0,tokenize:Eo};function Io(t,n,e){return r;function r(l){return t.enter("codeIndented"),je(t,o,e,"linePrefix",4,4)(l)}function o(l){return l===null?i(l):T(l)?t.attempt(Co,o,i)(l):(t.enter("codeFlowValue"),a(l))}function a(l){return l===null||T(l)?(t.exit("codeFlowValue"),o(l)):(t.consume(l),a)}function i(l){return t.exit("codeIndented"),n(l)}}function Eo(t,n,e){let r=this;return o;function o(i){return r.parser.lazy[r.now().line]?e(i):T(i)?(t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),o):je(t,n,a,"linePrefix",4,4)(i)}function a(i){return T(i)?o(i):e(i)}}var He={name:"codeText",previous:To,resolve:_o,tokenize:Ao};function _o(t){let n=t.length-4,e=3,r,o;if((t[e][1].type==="lineEnding"||t[e][1].type==="space")&&(t[n][1].type==="lineEnding"||t[n][1].type==="space")){for(r=e;++r<n;)if(t[r][1].type==="codeTextData"){t[e][1].type="codeTextPadding",t[n][1].type="codeTextPadding",e+=2,n-=2;break}}for(r=e-1,n++;++r<=n;)o===void 0?r!==n&&t[r][1].type!=="lineEnding"&&(o=r):(r===n||t[r][1].type==="lineEnding")&&(t[o][1].type="codeTextData",r!==o+2&&(t[o][1].end=t[r-1][1].end,t.splice(o+2,r-o-2),n-=r-o-2,r=o+2),o=void 0);return t}function To(t){return t!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Ao(t,n,e){let r=this,o=0,a,i;return l;function l(p){return t.enter("codeText"),t.enter("codeTextSequence"),u(p)}function u(p){return p===96?(t.consume(p),o++,u):(t.exit("codeTextSequence"),f(p))}function f(p){return p===null?e(p):p===32?(t.enter("space"),t.consume(p),t.exit("space"),f):p===96?(i=t.enter("codeTextSequence"),a=0,c(p)):T(p)?(t.enter("lineEnding"),t.consume(p),t.exit("lineEnding"),f):(t.enter("codeTextData"),s(p))}function s(p){return p===null||p===32||p===96||T(p)?(t.exit("codeTextData"),f(p)):(t.consume(p),s)}function c(p){return p===96?(t.consume(p),a++,c):a===o?(t.exit("codeTextSequence"),t.exit("codeText"),n(p)):(i.type="codeTextData",s(p))}}var ge=class{constructor(n){this.left=n?[...n]:[],this.right=[]}get(n){if(n<0||n>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+n+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return n<this.left.length?this.left[n]:this.right[this.right.length-n+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(n,e){let r=e??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(n,r):n>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-n+this.left.length).reverse():this.left.slice(n).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(n,e,r){let o=e||0;this.setCursor(Math.trunc(n));let a=this.right.splice(this.right.length-o,Number.POSITIVE_INFINITY);return r&&ne(this.left,r),a.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(n){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(n)}pushMany(n){this.setCursor(Number.POSITIVE_INFINITY),ne(this.left,n)}unshift(n){this.setCursor(0),this.right.push(n)}unshiftMany(n){this.setCursor(0),ne(this.right,n.reverse())}setCursor(n){if(!(n===this.left.length||n>this.left.length&&this.right.length===0||n<0&&this.left.length===0))if(n<this.left.length){let e=this.left.splice(n,Number.POSITIVE_INFINITY);ne(this.right,e.reverse())}else{let e=this.right.splice(this.left.length+this.right.length-n,Number.POSITIVE_INFINITY);ne(this.left,e.reverse())}}};function ne(t,n){let e=0;if(n.length<1e4)t.push(...n);else for(;e<n.length;)t.push(...n.slice(e,e+1e4)),e+=1e4}function ke(t){let n={},e=-1,r,o,a,i,l,u,f,s=new ge(t);for(;++e<s.length;){for(;e in n;)e=n[e];if(r=s.get(e),e&&r[1].type==="chunkFlow"&&s.get(e-1)[1].type==="listItemPrefix"&&(u=r[1]._tokenizer.events,a=0,a<u.length&&u[a][1].type==="lineEndingBlank"&&(a+=2),a<u.length&&u[a][1].type==="content"))for(;++a<u.length&&u[a][1].type!=="content";)u[a][1].type==="chunkText"&&(u[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]==="enter")r[1].contentType&&(Object.assign(n,Fo(s,e)),e=n[e],f=!0);else if(r[1]._container){for(a=e,o=void 0;a--;)if(i=s.get(a),i[1].type==="lineEnding"||i[1].type==="lineEndingBlank")i[0]==="enter"&&(o&&(s.get(o)[1].type="lineEndingBlank"),i[1].type="lineEnding",o=a);else if(!(i[1].type==="linePrefix"||i[1].type==="listItemIndent"))break;o&&(r[1].end={...s.get(o)[1].start},l=s.slice(o,e),l.unshift(r),s.splice(o,e-o+1,l))}}return G(t,0,Number.POSITIVE_INFINITY,s.slice(0)),!f}function Fo(t,n){let e=t.get(n)[1],r=t.get(n)[2],o=n-1,a=[],i=e._tokenizer;i||(i=r.parser[e.contentType](e.start),e._contentTypeTextTrailing&&(i._contentTypeTextTrailing=!0));let l=i.events,u=[],f={},s,c,p=-1,h=e,g=0,x=0,I=[x];for(;h;){for(;t.get(++o)[1]!==h;);a.push(o),h._tokenizer||(s=r.sliceStream(h),h.next||s.push(null),c&&i.defineSkip(h.start),h._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=!0),i.write(s),h._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=void 0)),c=h,h=h.next}for(h=e;++p<l.length;)l[p][0]==="exit"&&l[p-1][0]==="enter"&&l[p][1].type===l[p-1][1].type&&l[p][1].start.line!==l[p][1].end.line&&(x=p+1,I.push(x),h._tokenizer=void 0,h.previous=void 0,h=h.next);for(i.events=[],h?(h._tokenizer=void 0,h.previous=void 0):I.pop(),p=I.length;p--;){let k=l.slice(I[p],I[p+1]),S=a.pop();u.push([S,S+k.length-1]),t.splice(S,2,k)}for(u.reverse(),p=-1;++p<u.length;)f[g+u[p][0]]=g+u[p][1],g+=u[p][1]-u[p][0]-1;return f}var $e={resolve:zo,tokenize:Po},Lo={partial:!0,tokenize:Mo};function zo(t){return ke(t),t}function Po(t,n){let e;return r;function r(l){return t.enter("content"),e=t.enter("chunkContent",{contentType:"content"}),o(l)}function o(l){return l===null?a(l):T(l)?t.check(Lo,i,a)(l):(t.consume(l),o)}function a(l){return t.exit("chunkContent"),t.exit("content"),n(l)}function i(l){return t.consume(l),t.exit("chunkContent"),e.next=t.enter("chunkContent",{contentType:"content",previous:e}),e=e.next,o}}function Mo(t,n,e){let r=this;return o;function o(i){return t.exit("chunkContent"),t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),P(t,a,"linePrefix")}function a(i){if(i===null||T(i))return e(i);let l=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&l&&l[1].type==="linePrefix"&&l[2].sliceSerialize(l[1],!0).length>=4?n(i):t.interrupt(r.parser.constructs.flow,e,n)(i)}}function xe(t,n,e,r,o,a,i,l,u){let f=u||Number.POSITIVE_INFINITY,s=0;return c;function c(k){return k===60?(t.enter(r),t.enter(o),t.enter(a),t.consume(k),t.exit(a),p):k===null||k===32||k===41||Tt(k)?e(k):(t.enter(r),t.enter(i),t.enter(l),t.enter("chunkString",{contentType:"string"}),x(k))}function p(k){return k===62?(t.enter(a),t.consume(k),t.exit(a),t.exit(o),t.exit(r),n):(t.enter(l),t.enter("chunkString",{contentType:"string"}),h(k))}function h(k){return k===62?(t.exit("chunkString"),t.exit(l),p(k)):k===null||k===60||T(k)?e(k):(t.consume(k),k===92?g:h)}function g(k){return k===60||k===62||k===92?(t.consume(k),h):h(k)}function x(k){return!s&&(k===null||k===41||O(k))?(t.exit("chunkString"),t.exit(l),t.exit(i),t.exit(r),n(k)):s<f&&k===40?(t.consume(k),s++,x):k===41?(t.consume(k),s--,x):k===null||k===32||k===40||Tt(k)?e(k):(t.consume(k),k===92?I:x)}function I(k){return k===40||k===41||k===92?(t.consume(k),x):x(k)}}function we(t,n,e,r,o,a){let i=this,l=0,u;return f;function f(h){return t.enter(r),t.enter(o),t.consume(h),t.exit(o),t.enter(a),s}function s(h){return l>999||h===null||h===91||h===93&&!u||h===94&&!l&&"_hiddenFootnoteSupport"in i.parser.constructs?e(h):h===93?(t.exit(a),t.enter(o),t.consume(h),t.exit(o),t.exit(r),n):T(h)?(t.enter("lineEnding"),t.consume(h),t.exit("lineEnding"),s):(t.enter("chunkString",{contentType:"string"}),c(h))}function c(h){return h===null||h===91||h===93||T(h)||l++>999?(t.exit("chunkString"),s(h)):(t.consume(h),u||(u=!z(h)),h===92?p:c)}function p(h){return h===91||h===92||h===93?(t.consume(h),l++,c):c(h)}}function be(t,n,e,r,o,a){let i;return l;function l(p){return p===34||p===39||p===40?(t.enter(r),t.enter(o),t.consume(p),t.exit(o),i=p===40?41:p,u):e(p)}function u(p){return p===i?(t.enter(o),t.consume(p),t.exit(o),t.exit(r),n):(t.enter(a),f(p))}function f(p){return p===i?(t.exit(a),u(i)):p===null?e(p):T(p)?(t.enter("lineEnding"),t.consume(p),t.exit("lineEnding"),P(t,f,"linePrefix")):(t.enter("chunkString",{contentType:"string"}),s(p))}function s(p){return p===i||p===null||T(p)?(t.exit("chunkString"),f(p)):(t.consume(p),p===92?c:s)}function c(p){return p===i||p===92?(t.consume(p),s):s(p)}}function Ft(t,n){let e;return r;function r(o){return T(o)?(t.enter("lineEnding"),t.consume(o),t.exit("lineEnding"),e=!0,r):z(o)?P(t,r,e?"linePrefix":"lineSuffix")(o):n(o)}}var qe={name:"definition",tokenize:Do},vo={partial:!0,tokenize:Bo};function Do(t,n,e){let r=this,o;return a;function a(h){return t.enter("definition"),i(h)}function i(h){return we.call(r,t,l,e,"definitionLabel","definitionLabelMarker","definitionLabelString")(h)}function l(h){return o=Z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),h===58?(t.enter("definitionMarker"),t.consume(h),t.exit("definitionMarker"),u):e(h)}function u(h){return O(h)?Ft(t,f)(h):f(h)}function f(h){return xe(t,s,e,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(h)}function s(h){return t.attempt(vo,c,c)(h)}function c(h){return z(h)?P(t,p,"whitespace")(h):p(h)}function p(h){return h===null||T(h)?(t.exit("definition"),r.parser.defined.push(o),n(h)):e(h)}}function Bo(t,n,e){return r;function r(l){return O(l)?Ft(t,o)(l):e(l)}function o(l){return be(t,a,e,"definitionTitle","definitionTitleMarker","definitionTitleString")(l)}function a(l){return z(l)?P(t,i,"whitespace")(l):i(l)}function i(l){return l===null||T(l)?n(l):e(l)}}var Ue={name:"hardBreakEscape",tokenize:Ro};function Ro(t,n,e){return r;function r(a){return t.enter("hardBreakEscape"),t.consume(a),o}function o(a){return T(a)?(t.exit("hardBreakEscape"),n(a)):e(a)}}var Ve={name:"headingAtx",resolve:Oo,tokenize:jo};function Oo(t,n){let e=t.length-2,r=3;if(t[r][1].type==="whitespace"&&(r+=2),e-2>r&&t[e][1].type==="whitespace"&&(e-=2),t[e][1].type==="atxHeadingSequence"&&(r===e-1||e-4>r&&t[e-2][1].type==="whitespace")&&(e-=r+1===e?2:4),e>r){let o={type:"atxHeadingText",start:t[r][1].start,end:t[e][1].end},a={type:"chunkText",start:t[r][1].start,end:t[e][1].end,contentType:"text"};G(t,r,e-r+1,[["enter",o,n],["enter",a,n],["exit",a,n],["exit",o,n]])}return t}function jo(t,n,e){let r=0;return o;function o(s){return t.enter("atxHeading"),a(s)}function a(s){return t.enter("atxHeadingSequence"),i(s)}function i(s){return s===35&&r++<6?(t.consume(s),i):s===null||O(s)?(t.exit("atxHeadingSequence"),l(s)):e(s)}function l(s){return s===35?(t.enter("atxHeadingSequence"),u(s)):s===null||T(s)?(t.exit("atxHeading"),n(s)):z(s)?P(t,l,"whitespace")(s):(t.enter("atxHeadingText"),f(s))}function u(s){return s===35?(t.consume(s),u):(t.exit("atxHeadingSequence"),l(s))}function f(s){return s===null||s===35||O(s)?(t.exit("atxHeadingText"),l(s)):(t.consume(s),f)}}var kr=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],We=["pre","script","style","textarea"];var Qe={concrete:!0,name:"htmlFlow",resolveTo:Ho,tokenize:$o},No={partial:!0,tokenize:qo};function Ho(t){let n=t.length;for(;n--&&!(t[n][0]==="enter"&&t[n][1].type==="htmlFlow"););return n>1&&t[n-2][1].type==="linePrefix"&&(t[n][1].start=t[n-2][1].start,t[n+1][1].start=t[n-2][1].start,t.splice(n-2,2)),t}function $o(t,n,e){let r=this,o,a,i,l,u;return f;function f(d){return s(d)}function s(d){return t.enter("htmlFlow"),t.enter("htmlFlowData"),t.consume(d),c}function c(d){return d===33?(t.consume(d),p):d===47?(t.consume(d),a=!0,x):d===63?(t.consume(d),o=3,r.interrupt?n:m):W(d)?(t.consume(d),i=String.fromCharCode(d),I):e(d)}function p(d){return d===45?(t.consume(d),o=2,h):d===91?(t.consume(d),o=5,l=0,g):W(d)?(t.consume(d),o=4,r.interrupt?n:m):e(d)}function h(d){return d===45?(t.consume(d),r.interrupt?n:m):e(d)}function g(d){let J="CDATA[";return d===J.charCodeAt(l++)?(t.consume(d),l===J.length?r.interrupt?n:N:g):e(d)}function x(d){return W(d)?(t.consume(d),i=String.fromCharCode(d),I):e(d)}function I(d){if(d===null||d===47||d===62||O(d)){let J=d===47,It=i.toLowerCase();return!J&&!a&&We.includes(It)?(o=1,r.interrupt?n(d):N(d)):kr.includes(i.toLowerCase())?(o=6,J?(t.consume(d),k):r.interrupt?n(d):N(d)):(o=7,r.interrupt&&!r.parser.lazy[r.now().line]?e(d):a?S(d):w(d))}return d===45||Q(d)?(t.consume(d),i+=String.fromCharCode(d),I):e(d)}function k(d){return d===62?(t.consume(d),r.interrupt?n:N):e(d)}function S(d){return z(d)?(t.consume(d),S):y(d)}function w(d){return d===47?(t.consume(d),y):d===58||d===95||W(d)?(t.consume(d),E):z(d)?(t.consume(d),w):y(d)}function E(d){return d===45||d===46||d===58||d===95||Q(d)?(t.consume(d),E):A(d)}function A(d){return d===61?(t.consume(d),b):z(d)?(t.consume(d),A):w(d)}function b(d){return d===null||d===60||d===61||d===62||d===96?e(d):d===34||d===39?(t.consume(d),u=d,F):z(d)?(t.consume(d),b):M(d)}function F(d){return d===u?(t.consume(d),u=null,R):d===null||T(d)?e(d):(t.consume(d),F)}function M(d){return d===null||d===34||d===39||d===47||d===60||d===61||d===62||d===96||O(d)?A(d):(t.consume(d),M)}function R(d){return d===47||d===62||z(d)?w(d):e(d)}function y(d){return d===62?(t.consume(d),D):e(d)}function D(d){return d===null||T(d)?N(d):z(d)?(t.consume(d),D):e(d)}function N(d){return d===45&&o===2?(t.consume(d),U):d===60&&o===1?(t.consume(d),V):d===62&&o===4?(t.consume(d),rt):d===63&&o===3?(t.consume(d),m):d===93&&o===5?(t.consume(d),at):T(d)&&(o===6||o===7)?(t.exit("htmlFlowData"),t.check(No,ft,L)(d)):d===null||T(d)?(t.exit("htmlFlowData"),L(d)):(t.consume(d),N)}function L(d){return t.check(te,j,ft)(d)}function j(d){return t.enter("lineEnding"),t.consume(d),t.exit("lineEnding"),B}function B(d){return d===null||T(d)?L(d):(t.enter("htmlFlowData"),N(d))}function U(d){return d===45?(t.consume(d),m):N(d)}function V(d){return d===47?(t.consume(d),i="",it):N(d)}function it(d){if(d===62){let J=i.toLowerCase();return We.includes(J)?(t.consume(d),rt):N(d)}return W(d)&&i.length<8?(t.consume(d),i+=String.fromCharCode(d),it):N(d)}function at(d){return d===93?(t.consume(d),m):N(d)}function m(d){return d===62?(t.consume(d),rt):d===45&&o===2?(t.consume(d),m):N(d)}function rt(d){return d===null||T(d)?(t.exit("htmlFlowData"),ft(d)):(t.consume(d),rt)}function ft(d){return t.exit("htmlFlow"),n(d)}}function qo(t,n,e){return r;function r(o){return t.enter("lineEnding"),t.consume(o),t.exit("lineEnding"),t.attempt(ut,n,e)}}var Ge={name:"htmlText",tokenize:Uo};function Uo(t,n,e){let r=this,o,a,i;return l;function l(m){return t.enter("htmlText"),t.enter("htmlTextData"),t.consume(m),u}function u(m){return m===33?(t.consume(m),f):m===47?(t.consume(m),A):m===63?(t.consume(m),w):W(m)?(t.consume(m),M):e(m)}function f(m){return m===45?(t.consume(m),s):m===91?(t.consume(m),a=0,g):W(m)?(t.consume(m),S):e(m)}function s(m){return m===45?(t.consume(m),h):e(m)}function c(m){return m===null?e(m):m===45?(t.consume(m),p):T(m)?(i=c,V(m)):(t.consume(m),c)}function p(m){return m===45?(t.consume(m),h):c(m)}function h(m){return m===62?U(m):m===45?p(m):c(m)}function g(m){let rt="CDATA[";return m===rt.charCodeAt(a++)?(t.consume(m),a===rt.length?x:g):e(m)}function x(m){return m===null?e(m):m===93?(t.consume(m),I):T(m)?(i=x,V(m)):(t.consume(m),x)}function I(m){return m===93?(t.consume(m),k):x(m)}function k(m){return m===62?U(m):m===93?(t.consume(m),k):x(m)}function S(m){return m===null||m===62?U(m):T(m)?(i=S,V(m)):(t.consume(m),S)}function w(m){return m===null?e(m):m===63?(t.consume(m),E):T(m)?(i=w,V(m)):(t.consume(m),w)}function E(m){return m===62?U(m):w(m)}function A(m){return W(m)?(t.consume(m),b):e(m)}function b(m){return m===45||Q(m)?(t.consume(m),b):F(m)}function F(m){return T(m)?(i=F,V(m)):z(m)?(t.consume(m),F):U(m)}function M(m){return m===45||Q(m)?(t.consume(m),M):m===47||m===62||O(m)?R(m):e(m)}function R(m){return m===47?(t.consume(m),U):m===58||m===95||W(m)?(t.consume(m),y):T(m)?(i=R,V(m)):z(m)?(t.consume(m),R):U(m)}function y(m){return m===45||m===46||m===58||m===95||Q(m)?(t.consume(m),y):D(m)}function D(m){return m===61?(t.consume(m),N):T(m)?(i=D,V(m)):z(m)?(t.consume(m),D):R(m)}function N(m){return m===null||m===60||m===61||m===62||m===96?e(m):m===34||m===39?(t.consume(m),o=m,L):T(m)?(i=N,V(m)):z(m)?(t.consume(m),N):(t.consume(m),j)}function L(m){return m===o?(t.consume(m),o=void 0,B):m===null?e(m):T(m)?(i=L,V(m)):(t.consume(m),L)}function j(m){return m===null||m===34||m===39||m===60||m===61||m===96?e(m):m===47||m===62||O(m)?R(m):(t.consume(m),j)}function B(m){return m===47||m===62||O(m)?R(m):e(m)}function U(m){return m===62?(t.consume(m),t.exit("htmlTextData"),t.exit("htmlText"),n):e(m)}function V(m){return t.exit("htmlTextData"),t.enter("lineEnding"),t.consume(m),t.exit("lineEnding"),it}function it(m){return z(m)?P(t,at,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m):at(m)}function at(m){return t.enter("htmlTextData"),i(m)}}var Lt={name:"labelEnd",resolveAll:Go,resolveTo:Yo,tokenize:Zo},Vo={tokenize:Xo},Wo={tokenize:Ko},Qo={tokenize:Jo};function Go(t){let n=-1,e=[];for(;++n<t.length;){let r=t[n][1];if(e.push(t[n]),r.type==="labelImage"||r.type==="labelLink"||r.type==="labelEnd"){let o=r.type==="labelImage"?4:2;r.type="data",n+=o}}return t.length!==e.length&&G(t,0,t.length,e),t}function Yo(t,n){let e=t.length,r=0,o,a,i;for(;e--;){let s=t[e][1];if(o){if(s.type==="link"||s.type==="labelLink"&&s._inactive)break;t[e][0]==="enter"&&s.type==="labelLink"&&(s._inactive=!0)}else if(a){if(t[e][0]==="enter"&&(s.type==="labelImage"||s.type==="labelLink")&&!s._balanced&&(o=e,s.type!=="labelLink")){r=2;break}}else s.type==="labelEnd"&&(a=e)}let l={type:t[o][1].type==="labelLink"?"link":"image",start:{...t[o][1].start},end:{...t[t.length-1][1].end}},u={type:"label",start:{...t[o][1].start},end:{...t[a][1].end}},f={type:"labelText",start:{...t[o+r+2][1].end},end:{...t[a-2][1].start}};return i=[["enter",l,n],["enter",u,n]],i=K(i,t.slice(o+1,o+r+3)),i=K(i,[["enter",f,n]]),i=K(i,yt(n.parser.constructs.insideSpan.null,t.slice(o+r+4,a-3),n)),i=K(i,[["exit",f,n],t[a-2],t[a-1],["exit",u,n]]),i=K(i,t.slice(a+1)),i=K(i,[["exit",l,n]]),G(t,o,t.length,i),t}function Zo(t,n,e){let r=this,o=r._labelStarts,a,i;if(o){for(;o.length>0&&o[o.length-1]._balanced;)o.pop();a=o[o.length-1]}return l;function l(p){return a?a._inactive?c(p):(i=r.parser.defined.includes(Z(r.sliceSerialize({start:a.end,end:r.now()}))),t.enter("labelEnd"),t.enter("labelMarker"),t.consume(p),t.exit("labelMarker"),t.exit("labelEnd"),u):e(p)}function u(p){return p===40?t.attempt(Vo,s,i?s:c)(p):p===91?t.attempt(Wo,s,i?f:c)(p):i?s(p):c(p)}function f(p){return t.attempt(Qo,s,c)(p)}function s(p){return o.pop(),n(p)}function c(p){return a._balanced=!0,e(p)}}function Xo(t,n,e){return r;function r(c){return t.enter("resource"),t.enter("resourceMarker"),t.consume(c),t.exit("resourceMarker"),o}function o(c){return O(c)?Ft(t,a)(c):a(c)}function a(c){return c===41?s(c):xe(t,i,l,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(c)}function i(c){return O(c)?Ft(t,u)(c):s(c)}function l(c){return e(c)}function u(c){return c===34||c===39||c===40?be(t,f,e,"resourceTitle","resourceTitleMarker","resourceTitleString")(c):s(c)}function f(c){return O(c)?Ft(t,s)(c):s(c)}function s(c){return c===41?(t.enter("resourceMarker"),t.consume(c),t.exit("resourceMarker"),t.exit("resource"),n):e(c)}}function Ko(t,n,e){let r=this;return o;function o(l){return we.call(r,t,a,i,"reference","referenceMarker","referenceString")(l)}function a(l){return r.parser.defined.includes(Z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?n(l):e(l)}function i(l){return e(l)}}function Jo(t,n,e){return r;function r(a){return t.enter("reference"),t.enter("referenceMarker"),t.consume(a),t.exit("referenceMarker"),o}function o(a){return a===93?(t.enter("referenceMarker"),t.consume(a),t.exit("referenceMarker"),t.exit("reference"),n):e(a)}}var Ye={name:"labelStartImage",resolveAll:Lt.resolveAll,tokenize:ta};function ta(t,n,e){let r=this,o;return a;function a(u){return t.enter("labelImage"),t.enter("labelImageMarker"),t.consume(u),t.exit("labelImageMarker"),i}function i(u){return u===91?(t.enter("labelMarker"),t.consume(u),t.exit("labelMarker"),o=t.exit("labelImage"),l):e(u)}function l(u){return u===94&&"_hiddenFootnoteSupport"in r.parser.constructs?e(u):(r._labelStarts=r._labelStarts||[],r._labelStarts.push(o),n(u))}}var Ze={name:"labelStartLink",resolveAll:Lt.resolveAll,tokenize:ea};function ea(t,n,e){let r=this,o;return a;function a(l){return t.enter("labelLink"),t.enter("labelMarker"),t.consume(l),t.exit("labelMarker"),o=t.exit("labelLink"),i}function i(l){return l===94&&"_hiddenFootnoteSupport"in r.parser.constructs?e(l):(r._labelStarts=r._labelStarts||[],r._labelStarts.push(o),n(l))}}var re={name:"lineEnding",tokenize:na};function na(t,n){return e;function e(r){return t.enter("lineEnding"),t.consume(r),t.exit("lineEnding"),P(t,n,"linePrefix")}}var zt={name:"thematicBreak",tokenize:ra};function ra(t,n,e){let r=0,o;return a;function a(f){return t.enter("thematicBreak"),i(f)}function i(f){return o=f,l(f)}function l(f){return f===o?(t.enter("thematicBreakSequence"),u(f)):r>=3&&(f===null||T(f))?(t.exit("thematicBreak"),n(f)):e(f)}function u(f){return f===o?(t.consume(f),r++,u):(t.exit("thematicBreakSequence"),z(f)?P(t,l,"whitespace")(f):l(f))}}var X={continuation:{tokenize:la},exit:sa,name:"list",tokenize:aa},ia={partial:!0,tokenize:ca},oa={partial:!0,tokenize:ua};function aa(t,n,e){let r=this,o=r.events[r.events.length-1],a=o&&o[1].type==="linePrefix"?o[2].sliceSerialize(o[1],!0).length:0,i=0;return l;function l(h){let g=r.containerState.type||(h===42||h===43||h===45?"listUnordered":"listOrdered");if(g==="listUnordered"?!r.containerState.marker||h===r.containerState.marker:Kt(h)){if(r.containerState.type||(r.containerState.type=g,t.enter(g,{_container:!0})),g==="listUnordered")return t.enter("listItemPrefix"),h===42||h===45?t.check(zt,e,f)(h):f(h);if(!r.interrupt||h===49)return t.enter("listItemPrefix"),t.enter("listItemValue"),u(h)}return e(h)}function u(h){return Kt(h)&&++i<10?(t.consume(h),u):(!r.interrupt||i<2)&&(r.containerState.marker?h===r.containerState.marker:h===41||h===46)?(t.exit("listItemValue"),f(h)):e(h)}function f(h){return t.enter("listItemMarker"),t.consume(h),t.exit("listItemMarker"),r.containerState.marker=r.containerState.marker||h,t.check(ut,r.interrupt?e:s,t.attempt(ia,p,c))}function s(h){return r.containerState.initialBlankLine=!0,a++,p(h)}function c(h){return z(h)?(t.enter("listItemPrefixWhitespace"),t.consume(h),t.exit("listItemPrefixWhitespace"),p):e(h)}function p(h){return r.containerState.size=a+r.sliceSerialize(t.exit("listItemPrefix"),!0).length,n(h)}}function la(t,n,e){let r=this;return r.containerState._closeFlow=void 0,t.check(ut,o,a);function o(l){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,P(t,n,"listItemIndent",r.containerState.size+1)(l)}function a(l){return r.containerState.furtherBlankLines||!z(l)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,i(l)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,t.attempt(oa,n,i)(l))}function i(l){return r.containerState._closeFlow=!0,r.interrupt=void 0,P(t,t.attempt(X,n,e),"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l)}}function ua(t,n,e){let r=this;return P(t,o,"listItemIndent",r.containerState.size+1);function o(a){let i=r.events[r.events.length-1];return i&&i[1].type==="listItemIndent"&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?n(a):e(a)}}function sa(t){t.exit(this.containerState.type)}function ca(t,n,e){let r=this;return P(t,o,"listItemPrefixWhitespace",r.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function o(a){let i=r.events[r.events.length-1];return!z(a)&&i&&i[1].type==="listItemPrefixWhitespace"?n(a):e(a)}}var ye={name:"setextUnderline",resolveTo:fa,tokenize:ha};function fa(t,n){let e=new gt,r=t.length,o,a,i;for(;r--;)if(t[r][0]==="enter"){if(t[r][1].type==="content"){o=r;break}t[r][1].type==="paragraph"&&(a=r)}else t[r][1].type==="content"&&e.add(r,1,[]),!i&&t[r][1].type==="definition"&&(i=r);let l={type:"setextHeading",start:{...t[o][1].start},end:{...t[t.length-1][1].end}};return t[a][1].type="setextHeadingText",i?(e.add(a,0,[["enter",l,n]]),e.add(i+1,0,[["exit",t[o][1],n]]),t[o][1].end={...t[i][1].end}):t[o][1]=l,e.add(t.length,0,[["exit",l,n]]),e.consume(t),t}function ha(t,n,e){let r=this,o;return a;function a(f){let s=r.events.length,c;for(;s--;)if(r.events[s][1].type!=="lineEnding"&&r.events[s][1].type!=="linePrefix"&&r.events[s][1].type!=="content"){c=r.events[s][1].type==="paragraph";break}return!r.parser.lazy[r.now().line]&&(r.interrupt||c)?(t.enter("setextHeadingLine"),o=f,i(f)):e(f)}function i(f){return t.enter("setextHeadingLineSequence"),l(f)}function l(f){return f===o?(t.consume(f),l):(t.exit("setextHeadingLineSequence"),z(f)?P(t,u,"lineSuffix")(f):u(f))}function u(f){return f===null||T(f)?(t.exit("setextHeadingLine"),n(f)):e(f)}}var xr={tokenize:pa};function pa(t){let n=this,e=t.attempt(ut,r,t.attempt(this.parser.constructs.flowInitial,o,P(t,t.attempt(this.parser.constructs.flow,o,t.attempt($e,o)),"linePrefix")));return e;function r(a){if(a===null){t.consume(a);return}return t.enter("lineEndingBlank"),t.consume(a),t.exit("lineEndingBlank"),n.currentConstruct=void 0,e}function o(a){if(a===null){t.consume(a);return}return t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),n.currentConstruct=void 0,e}}var wr={resolveAll:Cr()},br=Sr("string"),yr=Sr("text");function Sr(t){return{resolveAll:Cr(t==="text"?ma:void 0),tokenize:n};function n(e){let r=this,o=this.parser.constructs[t],a=e.attempt(o,i,l);return i;function i(s){return f(s)?a(s):l(s)}function l(s){if(s===null){e.consume(s);return}return e.enter("data"),e.consume(s),u}function u(s){return f(s)?(e.exit("data"),a(s)):(e.consume(s),u)}function f(s){if(s===null)return!0;let c=o[s],p=-1;if(c)for(;++p<c.length;){let h=c[p];if(!h.previous||h.previous.call(r,r.previous))return!0}return!1}}}function Cr(t){return n;function n(e,r){let o=-1,a;for(;++o<=e.length;)a===void 0?e[o]&&e[o][1].type==="data"&&(a=o,o++):(!e[o]||e[o][1].type!=="data")&&(o!==a+2&&(e[a][1].end=e[o-1][1].end,e.splice(a+2,o-a-2),o=a+2),a=void 0);return t?t(e,r):e}}function ma(t,n){let e=new gt,r=0;for(;++r<=t.length;)if((r===t.length||t[r][1].type==="lineEnding")&&t[r-1][1].type==="data"){let o=t[r-1][1],a=n.sliceStream(o),i=a.length,l=-1,u=0,f;for(;i--;){let s=a[i];if(typeof s=="string"){for(l=s.length;s.charCodeAt(l-1)===32;)u++,l--;if(l)break;l=-1}else if(s===-2)f=!0,u++;else if(s!==-1){i++;break}}if(n._contentTypeTextTrailing&&r===t.length&&(u=0),u){let s={type:r===t.length||f||u<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:i?l:o.start._bufferIndex+l,_index:o.start._index+i,line:o.end.line,column:o.end.column-u,offset:o.end.offset-u},end:{...o.end}};o.end={...s.start},o.start.offset===o.end.offset?Object.assign(o,s):e.add(r,0,[["enter",s,n],["exit",s,n]])}r++}return e.consume(t),t}var Xe={};Jn(Xe,{attentionMarkers:()=>Sa,contentInitial:()=>ga,disable:()=>Ca,document:()=>da,flow:()=>xa,flowInitial:()=>ka,insideSpan:()=>ya,string:()=>wa,text:()=>ba});var da={42:X,43:X,45:X,48:X,49:X,50:X,51:X,52:X,53:X,54:X,55:X,56:X,57:X,62:he},ga={91:qe},ka={[-2]:ee,[-1]:ee,32:ee},xa={35:Ve,42:zt,45:[ye,zt],60:Qe,61:ye,95:zt,96:de,126:de},wa={38:me,92:pe},ba={[-5]:re,[-4]:re,[-3]:re,33:Ye,38:me,42:Jt,60:[Ne,Ge],91:Ze,92:[Ue,pe],93:Lt,95:Jt,96:He},ya={null:[Jt,wr]},Sa={null:[42,95]},Ca={null:[]};function Ir(t,n,e){let r={_bufferIndex:-1,_index:0,line:e&&e.line||1,column:e&&e.column||1,offset:e&&e.offset||0},o={},a=[],i=[],l=[],u=!0,f={attempt:R(F),check:R(M),consume:E,enter:A,exit:b,interrupt:R(M,{interrupt:!0})},s={code:null,containerState:{},defineSkip:k,events:[],now:I,parser:t,previous:null,sliceSerialize:g,sliceStream:x,write:h},c=n.tokenize.call(s,f),p;return n.resolveAll&&a.push(n),s;function h(L){return i=K(i,L),S(),i[i.length-1]!==null?[]:(y(n,0),s.events=yt(a,s.events,s),s.events)}function g(L,j){return Ea(x(L),j)}function x(L){return Ia(i,L)}function I(){let{_bufferIndex:L,_index:j,line:B,column:U,offset:V}=r;return{_bufferIndex:L,_index:j,line:B,column:U,offset:V}}function k(L){o[L.line]=L.column,N()}function S(){for(;r._index<i.length;){let L=i[r._index];if(typeof L=="string"){let j=r._index;for(r._bufferIndex<0&&(r._bufferIndex=0);r._index===j&&r._bufferIndex<L.length;)w(L.charCodeAt(r._bufferIndex))}else w(L)}}function w(L){u=void 0,p=L,c=c(L)}function E(L){T(L)?(r.line++,r.column=1,r.offset+=L===-3?2:1,N()):L!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===i[r._index].length&&(r._bufferIndex=-1,r._index++)),s.previous=L,u=!0}function A(L,j){let B=j||{};return B.type=L,B.start=I(),s.events.push(["enter",B,s]),l.push(B),B}function b(L){let j=l.pop();return j.end=I(),s.events.push(["exit",j,s]),j}function F(L,j){y(L,j.from)}function M(L,j){j.restore()}function R(L,j){return B;function B(U,V,it){let at,m,rt,ft;return Array.isArray(U)?J(U):"tokenize"in U?J([U]):d(U);function d(Y){return Gt;function Gt(ht){let Et=ht!==null&&Y[ht],Bt=ht!==null&&Y.null,ve=[...Array.isArray(Et)?Et:Et?[Et]:[],...Array.isArray(Bt)?Bt:Bt?[Bt]:[]];return J(ve)(ht)}}function J(Y){return at=Y,m=0,Y.length===0?it:It(Y[m])}function It(Y){return Gt;function Gt(ht){return ft=D(),rt=Y,Y.partial||(s.currentConstruct=Y),Y.name&&s.parser.constructs.disable.null.includes(Y.name)?ue(ht):Y.tokenize.call(j?Object.assign(Object.create(s),j):s,f,Me,ue)(ht)}}function Me(Y){return u=!0,L(rt,ft),V}function ue(Y){return u=!0,ft.restore(),++m<at.length?It(at[m]):it}}}function y(L,j){L.resolveAll&&!a.includes(L)&&a.push(L),L.resolve&&G(s.events,j,s.events.length-j,L.resolve(s.events.slice(j),s)),L.resolveTo&&(s.events=L.resolveTo(s.events,s))}function D(){let L=I(),j=s.previous,B=s.currentConstruct,U=s.events.length,V=Array.from(l);return{from:U,restore:it};function it(){r=L,s.previous=j,s.currentConstruct=B,s.events.length=U,l=V,N()}}function N(){r.line in o&&r.column<2&&(r.column=o[r.line],r.offset+=o[r.line]-1)}}function Ia(t,n){let e=n.start._index,r=n.start._bufferIndex,o=n.end._index,a=n.end._bufferIndex,i;if(e===o)i=[t[e].slice(r,a)];else{if(i=t.slice(e,o),r>-1){let l=i[0];typeof l=="string"?i[0]=l.slice(r):i.shift()}a>0&&i.push(t[o].slice(0,a))}return i}function Ea(t,n){let e=-1,r=[],o;for(;++e<t.length;){let a=t[e],i;if(typeof a=="string")i=a;else switch(a){case-5:{i="\r";break}case-4:{i=`
`;break}case-3:{i=`\r
`;break}case-2:{i=n?" ":"	";break}case-1:{if(!n&&o)continue;i=" ";break}default:i=String.fromCharCode(a)}o=a===-2,r.push(i)}return r.join("")}function Ke(t){let r={constructs:ce([Xe,...(t||{}).extensions||[]]),content:o(hr),defined:[],document:o(dr),flow:o(xr),lazy:{},string:o(br),text:o(yr)};return r;function o(a){return i;function i(l){return Ir(r,a,l)}}}function Je(t){for(;!ke(t););return t}var Er=/[\0\t\n\r]/g;function tn(){let t=1,n="",e=!0,r;return o;function o(a,i,l){a=n+(typeof a=="string"?a.toString():new TextDecoder(i||void 0).decode(a));let u=[],f=0;for(n="",e&&(a.charCodeAt(0)===65279&&f++,e=void 0);f<a.length;){Er.lastIndex=f;let s=Er.exec(a),c=s&&s.index!==void 0?s.index:a.length,p=a.charCodeAt(c);if(!s){n=a.slice(f);break}if(p===10&&f===c&&r)u.push(-3),r=void 0;else switch(r&&(u.push(-5),r=void 0),f<c&&(u.push(a.slice(f,c)),t+=c-f),p){case 0:{u.push(65533),t++;break}case 9:{let h=Math.ceil(t/4)*4;for(u.push(-2);t++<h;)u.push(-1);break}case 10:{u.push(-4),t=1;break}default:r=!0,t=1}f=c+1}return l&&(r&&u.push(-5),n&&u.push(n),u.push(null)),u}}var _a=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Se(t){return t.replace(_a,Ta)}function Ta(t,n,e){if(n)return n;if(e.charCodeAt(0)===35){let o=e.charCodeAt(1),a=o===120||o===88;return fe(e.slice(a?2:1),a?16:10)}return jt(e)||t}function Nt(t){return!t||typeof t!="object"?"":"position"in t||"type"in t?_r(t.position):"start"in t||"end"in t?_r(t):"line"in t||"column"in t?en(t):""}function en(t){return Tr(t&&t.line)+":"+Tr(t&&t.column)}function _r(t){return en(t&&t.start)+"-"+en(t&&t.end)}function Tr(t){return t&&typeof t=="number"?t:1}var Fr={}.hasOwnProperty;function Ce(t,n,e){return n&&typeof n=="object"&&(e=n,n=void 0),Aa(e)(Je(Ke(e).document().write(tn()(t,n,!0))))}function Aa(t){let n={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(Xn),autolinkProtocol:R,autolinkEmail:R,atxHeading:a(Gn),blockQuote:a(ht),characterEscape:R,characterReference:R,codeFenced:a(Et),codeFencedFenceInfo:i,codeFencedFenceMeta:i,codeIndented:a(Et,i),codeText:a(Bt,i),codeTextData:R,data:R,codeFlowValue:R,definition:a(ve),definitionDestinationString:i,definitionLabelString:i,definitionTitleString:i,emphasis:a(Ni),hardBreakEscape:a(Yn),hardBreakTrailing:a(Yn),htmlFlow:a(Zn,i),htmlFlowData:R,htmlText:a(Zn,i),htmlTextData:R,image:a(Hi),label:i,link:a(Xn),listItem:a($i),listItemValue:p,listOrdered:a(Kn,c),listUnordered:a(Kn),paragraph:a(qi),reference:d,referenceString:i,resourceDestinationString:i,resourceTitleString:i,setextHeading:a(Gn),strong:a(Ui),thematicBreak:a(Wi)},exit:{atxHeading:u(),atxHeadingSequence:A,autolink:u(),autolinkEmail:Gt,autolinkProtocol:Y,blockQuote:u(),characterEscapeValue:y,characterReferenceMarkerHexadecimal:It,characterReferenceMarkerNumeric:It,characterReferenceValue:Me,characterReference:ue,codeFenced:u(I),codeFencedFence:x,codeFencedFenceInfo:h,codeFencedFenceMeta:g,codeFlowValue:y,codeIndented:u(k),codeText:u(B),codeTextData:y,data:y,definition:u(),definitionDestinationString:E,definitionLabelString:S,definitionTitleString:w,emphasis:u(),hardBreakEscape:u(N),hardBreakTrailing:u(N),htmlFlow:u(L),htmlFlowData:y,htmlText:u(j),htmlTextData:y,image:u(V),label:at,labelText:it,lineEnding:D,link:u(U),listItem:u(),listOrdered:u(),listUnordered:u(),paragraph:u(),referenceString:J,resourceDestinationString:m,resourceTitleString:rt,resource:ft,setextHeading:u(M),setextHeadingLineSequence:F,setextHeadingText:b,strong:u(),thematicBreak:u()}};Lr(n,(t||{}).mdastExtensions||[]);let e={};return r;function r(C){let _={type:"root",children:[]},v={stack:[_],tokenStack:[],config:n,enter:l,exit:f,buffer:i,resume:s,data:e},H=[],q=-1;for(;++q<C.length;)if(C[q][1].type==="listOrdered"||C[q][1].type==="listUnordered")if(C[q][0]==="enter")H.push(q);else{let ot=H.pop();q=o(C,ot,q)}for(q=-1;++q<C.length;){let ot=n[C[q][0]];Fr.call(ot,C[q][1].type)&&ot[C[q][1].type].call(Object.assign({sliceSerialize:C[q][2].sliceSerialize},v),C[q][1])}if(v.tokenStack.length>0){let ot=v.tokenStack[v.tokenStack.length-1];(ot[1]||Ar).call(v,void 0,ot[0])}for(_.position={start:St(C.length>0?C[0][1].start:{line:1,column:1,offset:0}),end:St(C.length>0?C[C.length-2][1].end:{line:1,column:1,offset:0})},q=-1;++q<n.transforms.length;)_=n.transforms[q](_)||_;return _}function o(C,_,v){let H=_-1,q=-1,ot=!1,_t,pt,Yt,Zt;for(;++H<=v;){let tt=C[H];switch(tt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{tt[0]==="enter"?q++:q--,Zt=void 0;break}case"lineEndingBlank":{tt[0]==="enter"&&(_t&&!Zt&&!q&&!Yt&&(Yt=H),Zt=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Zt=void 0}if(!q&&tt[0]==="enter"&&tt[1].type==="listItemPrefix"||q===-1&&tt[0]==="exit"&&(tt[1].type==="listUnordered"||tt[1].type==="listOrdered")){if(_t){let Rt=H;for(pt=void 0;Rt--;){let mt=C[Rt];if(mt[1].type==="lineEnding"||mt[1].type==="lineEndingBlank"){if(mt[0]==="exit")continue;pt&&(C[pt][1].type="lineEndingBlank",ot=!0),mt[1].type="lineEnding",pt=Rt}else if(!(mt[1].type==="linePrefix"||mt[1].type==="blockQuotePrefix"||mt[1].type==="blockQuotePrefixWhitespace"||mt[1].type==="blockQuoteMarker"||mt[1].type==="listItemIndent"))break}Yt&&(!pt||Yt<pt)&&(_t._spread=!0),_t.end=Object.assign({},pt?C[pt][1].start:tt[1].end),C.splice(pt||H,0,["exit",_t,tt[2]]),H++,v++}if(tt[1].type==="listItemPrefix"){let Rt={type:"listItem",_spread:!1,start:Object.assign({},tt[1].start),end:void 0};_t=Rt,C.splice(H,0,["enter",Rt,tt[2]]),H++,v++,Yt=void 0,Zt=!0}}}return C[_][1]._spread=ot,v}function a(C,_){return v;function v(H){l.call(this,C(H),H),_&&_.call(this,H)}}function i(){this.stack.push({type:"fragment",children:[]})}function l(C,_,v){this.stack[this.stack.length-1].children.push(C),this.stack.push(C),this.tokenStack.push([_,v||void 0]),C.position={start:St(_.start),end:void 0}}function u(C){return _;function _(v){C&&C.call(this,v),f.call(this,v)}}function f(C,_){let v=this.stack.pop(),H=this.tokenStack.pop();if(H)H[0].type!==C.type&&(_?_.call(this,C,H[0]):(H[1]||Ar).call(this,C,H[0]));else throw new Error("Cannot close `"+C.type+"` ("+Nt({start:C.start,end:C.end})+"): it\u2019s not open");v.position.end=St(C.end)}function s(){return dt(this.stack.pop())}function c(){this.data.expectingFirstListItemValue=!0}function p(C){if(this.data.expectingFirstListItemValue){let _=this.stack[this.stack.length-2];_.start=Number.parseInt(this.sliceSerialize(C),10),this.data.expectingFirstListItemValue=void 0}}function h(){let C=this.resume(),_=this.stack[this.stack.length-1];_.lang=C}function g(){let C=this.resume(),_=this.stack[this.stack.length-1];_.meta=C}function x(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function I(){let C=this.resume(),_=this.stack[this.stack.length-1];_.value=C.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function k(){let C=this.resume(),_=this.stack[this.stack.length-1];_.value=C.replace(/(\r?\n|\r)$/g,"")}function S(C){let _=this.resume(),v=this.stack[this.stack.length-1];v.label=_,v.identifier=Z(this.sliceSerialize(C)).toLowerCase()}function w(){let C=this.resume(),_=this.stack[this.stack.length-1];_.title=C}function E(){let C=this.resume(),_=this.stack[this.stack.length-1];_.url=C}function A(C){let _=this.stack[this.stack.length-1];if(!_.depth){let v=this.sliceSerialize(C).length;_.depth=v}}function b(){this.data.setextHeadingSlurpLineEnding=!0}function F(C){let _=this.stack[this.stack.length-1];_.depth=this.sliceSerialize(C).codePointAt(0)===61?1:2}function M(){this.data.setextHeadingSlurpLineEnding=void 0}function R(C){let v=this.stack[this.stack.length-1].children,H=v[v.length-1];(!H||H.type!=="text")&&(H=Vi(),H.position={start:St(C.start),end:void 0},v.push(H)),this.stack.push(H)}function y(C){let _=this.stack.pop();_.value+=this.sliceSerialize(C),_.position.end=St(C.end)}function D(C){let _=this.stack[this.stack.length-1];if(this.data.atHardBreak){let v=_.children[_.children.length-1];v.position.end=St(C.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&n.canContainEols.includes(_.type)&&(R.call(this,C),y.call(this,C))}function N(){this.data.atHardBreak=!0}function L(){let C=this.resume(),_=this.stack[this.stack.length-1];_.value=C}function j(){let C=this.resume(),_=this.stack[this.stack.length-1];_.value=C}function B(){let C=this.resume(),_=this.stack[this.stack.length-1];_.value=C}function U(){let C=this.stack[this.stack.length-1];if(this.data.inReference){let _=this.data.referenceType||"shortcut";C.type+="Reference",C.referenceType=_,delete C.url,delete C.title}else delete C.identifier,delete C.label;this.data.referenceType=void 0}function V(){let C=this.stack[this.stack.length-1];if(this.data.inReference){let _=this.data.referenceType||"shortcut";C.type+="Reference",C.referenceType=_,delete C.url,delete C.title}else delete C.identifier,delete C.label;this.data.referenceType=void 0}function it(C){let _=this.sliceSerialize(C),v=this.stack[this.stack.length-2];v.label=Se(_),v.identifier=Z(_).toLowerCase()}function at(){let C=this.stack[this.stack.length-1],_=this.resume(),v=this.stack[this.stack.length-1];if(this.data.inReference=!0,v.type==="link"){let H=C.children;v.children=H}else v.alt=_}function m(){let C=this.resume(),_=this.stack[this.stack.length-1];_.url=C}function rt(){let C=this.resume(),_=this.stack[this.stack.length-1];_.title=C}function ft(){this.data.inReference=void 0}function d(){this.data.referenceType="collapsed"}function J(C){let _=this.resume(),v=this.stack[this.stack.length-1];v.label=_,v.identifier=Z(this.sliceSerialize(C)).toLowerCase(),this.data.referenceType="full"}function It(C){this.data.characterReferenceType=C.type}function Me(C){let _=this.sliceSerialize(C),v=this.data.characterReferenceType,H;v?(H=fe(_,v==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):H=jt(_);let q=this.stack[this.stack.length-1];q.value+=H}function ue(C){let _=this.stack.pop();_.position.end=St(C.end)}function Y(C){y.call(this,C);let _=this.stack[this.stack.length-1];_.url=this.sliceSerialize(C)}function Gt(C){y.call(this,C);let _=this.stack[this.stack.length-1];_.url="mailto:"+this.sliceSerialize(C)}function ht(){return{type:"blockquote",children:[]}}function Et(){return{type:"code",lang:null,meta:null,value:""}}function Bt(){return{type:"inlineCode",value:""}}function ve(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function Ni(){return{type:"emphasis",children:[]}}function Gn(){return{type:"heading",depth:0,children:[]}}function Yn(){return{type:"break"}}function Zn(){return{type:"html",value:""}}function Hi(){return{type:"image",title:null,url:"",alt:null}}function Xn(){return{type:"link",title:null,url:"",children:[]}}function Kn(C){return{type:"list",ordered:C.type==="listOrdered",start:null,spread:C._spread,children:[]}}function $i(C){return{type:"listItem",spread:C._spread,checked:null,children:[]}}function qi(){return{type:"paragraph",children:[]}}function Ui(){return{type:"strong",children:[]}}function Vi(){return{type:"text",value:""}}function Wi(){return{type:"thematicBreak"}}}function St(t){return{line:t.line,column:t.column,offset:t.offset}}function Lr(t,n){let e=-1;for(;++e<n.length;){let r=n[e];Array.isArray(r)?Lr(t,r):Fa(t,r)}}function Fa(t,n){let e;for(e in n)if(Fr.call(n,e))switch(e){case"canContainEols":{let r=n[e];r&&t[e].push(...r);break}case"transforms":{let r=n[e];r&&t[e].push(...r);break}case"enter":case"exit":{let r=n[e];r&&Object.assign(t[e],r);break}}}function Ar(t,n){throw t?new Error("Cannot close `"+t.type+"` ("+Nt({start:t.start,end:t.end})+"): a different token (`"+n.type+"`, "+Nt({start:n.start,end:n.end})+") is open"):new Error("Cannot close document, a token (`"+n.type+"`, "+Nt({start:n.start,end:n.end})+") is still open")}function nn(t,n){let e=String(t);if(typeof n!="string")throw new TypeError("Expected character");let r=0,o=e.indexOf(n);for(;o!==-1;)r++,o=e.indexOf(n,o+n.length);return r}function rn(t){if(typeof t!="string")throw new TypeError("Expected a string");return t.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}var Ct=(function(t){if(t==null)return Ma;if(typeof t=="function")return Ie(t);if(typeof t=="object")return Array.isArray(t)?La(t):za(t);if(typeof t=="string")return Pa(t);throw new Error("Expected function, string, or object as test")});function La(t){let n=[],e=-1;for(;++e<t.length;)n[e]=Ct(t[e]);return Ie(r);function r(...o){let a=-1;for(;++a<n.length;)if(n[a].apply(this,o))return!0;return!1}}function za(t){let n=t;return Ie(e);function e(r){let o=r,a;for(a in t)if(o[a]!==n[a])return!1;return!0}}function Pa(t){return Ie(n);function n(e){return e&&e.type===t}}function Ie(t){return n;function n(e,r,o){return!!(va(e)&&t.call(this,e,typeof r=="number"?r:void 0,o||void 0))}}function Ma(){return!0}function va(t){return t!==null&&typeof t=="object"&&"type"in t}var Pr=[],Ee=!0,st=!1,Pt="skip";function Ht(t,n,e,r){if(!t||typeof t!="object")throw new Error("Unexpected value `"+t+"` for `tree`, expected node");let o=!0,a,i,l,u;if(typeof e=="function"||e&&typeof e=="object"?(a=n,i=e,r&&(o=!1)):(i=n,e&&(o=!1)),typeof i=="function")l=i;else if(i&&typeof i=="object"){if(!(i.enter===null||i.enter===void 0))if(typeof i.enter=="function")l=i.enter;else throw new Error("Unexpected value `"+i.enter+"` for `visitors.enter`, expected optional visitor");if(typeof i.exit=="function")u=i.exit;else throw new Error("Unexpected value `"+i.exit+"` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)")}else throw new Error("Unexpected value `"+i+"` for `enter` or `visitors`, expected visitor or object with visitors");let f=Ct(a),s=o?1:-1;c(t,void 0,[])();function c(p,h,g){let x=p&&typeof p=="object"?p:{};if(typeof x.type=="string"){let k=typeof x.tagName=="string"?x.tagName:typeof x.name=="string"?x.name:void 0;Object.defineProperty(I,"name",{value:"node ("+(p.type+(k?"<"+k+">":""))+")"})}return I;function I(){let k=!a||f(p,h,g[g.length-1]||void 0),S=Pr;if(l&&k&&(S=zr(l(p,g,h)),S[0]===st))return S;if("children"in p&&p.children){let w=p;if(w.children&&S[0]!==Pt){let E=(o?-1:w.children.length)+s,A=[...g,w];for(;E>-1&&E<w.children.length;){let b=w.children[E],F=c(b,E,A)();if(F[0]===st)return F;E=typeof F[1]=="number"?F[1]:E+s}}}if(u&&k){let w=zr(u(p,g,h));if(w[0]===Pt)throw new Error("Unexpected value `"+w[0]+"` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing");if(w[0]===st||typeof w[1]=="number")return w}return S}}}function zr(t){return Array.isArray(t)?t:typeof t=="number"?[Ee,t]:t==null?Pr:[t]}function on(t,n,e){let o=Ct((e||{}).ignore||[]),a=Da(n),i=-1;for(;++i<a.length;)Ht(t,l);function l(f,s,c){if(f.type==="text"&&typeof c=="number")return u(f,s,c);if(o(f,c,s[s.length-1]))return Pt}function u(f,s,c){let p=s[s.length-1],h=a[i][0],g=a[i][1],x=0,I=!1,k=[];h.lastIndex=0;let S=h.exec(f.value);for(;S;){let E=S.index,A={index:S.index,input:S.input,stack:[...s,f]},b=g(...S,A);if(typeof b=="string"&&(b=b.length>0?{type:"text",value:b}:void 0),b===!1)h.lastIndex=E+1;else{if(x!==E&&w({type:"text",value:f.value.slice(x,E)}),Array.isArray(b))for(let F of b)w(F);else b&&w(b);x=E+S[0].length,I=!0}if(!h.global)break;S=h.exec(f.value)}return I?(x<f.value.length&&w({type:"text",value:f.value.slice(x)}),p.children.splice(c,1,...k)):k=[f],c+k.length;function w(E){let A=k[k.length-1];A&&A.type==="text"&&E.type==="text"?A.value+=E.value:k.push(E)}}}function Da(t){if(!Array.isArray(t))throw new TypeError("Expected find and replace tuple or list of tuples");let n=[],e=!t[0]||Array.isArray(t[0])?t:[t],r=-1;for(;++r<e.length;){let o=e[r];n.push([Ba(o[0]),Ra(o[1])])}return n}function Ba(t){return typeof t=="string"?new RegExp(rn(t),"g"):t}function Ra(t){return typeof t=="function"?t:function(){return t}}var an="phrasing",ln=["autolink","link","image","label"];function sn(){return{transforms:[qa],enter:{literalAutolink:Oa,literalAutolinkEmail:un,literalAutolinkHttp:un,literalAutolinkWww:un},exit:{literalAutolink:$a,literalAutolinkEmail:Ha,literalAutolinkHttp:ja,literalAutolinkWww:Na}}}function cn(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:an,notInConstruct:ln},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:an,notInConstruct:ln},{character:":",before:"[ps]",after:"\\/",inConstruct:an,notInConstruct:ln}]}}function Oa(t){this.enter({type:"link",title:null,url:"",children:[]},t)}function un(t){this.config.enter.autolinkProtocol.call(this,t)}function ja(t){this.config.exit.autolinkProtocol.call(this,t)}function Na(t){this.config.exit.data.call(this,t);let n=this.stack[this.stack.length-1];n.type,n.url="http://"+this.sliceSerialize(t)}function Ha(t){this.config.exit.autolinkEmail.call(this,t)}function $a(t){this.exit(t)}function qa(t){on(t,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Ua],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,Va]],{ignore:["link","linkReference"]})}function Ua(t,n,e,r,o){let a="";if(!Mr(o)||(/^w/i.test(n)&&(e=n+e,n="",a="http://"),!Wa(e)))return!1;let i=Qa(e+r);if(!i[0])return!1;let l={type:"link",title:null,url:a+n+i[0],children:[{type:"text",value:n+i[0]}]};return i[1]?[l,{type:"text",value:i[1]}]:l}function Va(t,n,e,r){return!Mr(r,!0)||/[-\d_]$/.test(e)?!1:{type:"link",title:null,url:"mailto:"+n+"@"+e,children:[{type:"text",value:n+"@"+e}]}}function Wa(t){let n=t.split(".");return!(n.length<2||n[n.length-1]&&(/_/.test(n[n.length-1])||!/[a-zA-Z\d]/.test(n[n.length-1]))||n[n.length-2]&&(/_/.test(n[n.length-2])||!/[a-zA-Z\d]/.test(n[n.length-2])))}function Qa(t){let n=/[!"&'),.:;<>?\]}]+$/.exec(t);if(!n)return[t,void 0];t=t.slice(0,n.index);let e=n[0],r=e.indexOf(")"),o=nn(t,"("),a=nn(t,")");for(;r!==-1&&o>a;)t+=e.slice(0,r+1),e=e.slice(r+1),r=e.indexOf(")"),a++;return[t,e]}function Mr(t,n){let e=t.input.charCodeAt(t.index-1);return(t.index===0||lt(e)||At(e))&&(!n||e!==47)}vr.peek=nl;function Ga(){this.buffer()}function Ya(t){this.enter({type:"footnoteReference",identifier:"",label:""},t)}function Za(){this.buffer()}function Xa(t){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},t)}function Ka(t){let n=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Z(this.sliceSerialize(t)).toLowerCase(),e.label=n}function Ja(t){this.exit(t)}function tl(t){let n=this.resume(),e=this.stack[this.stack.length-1];e.type,e.identifier=Z(this.sliceSerialize(t)).toLowerCase(),e.label=n}function el(t){this.exit(t)}function nl(){return"["}function vr(t,n,e,r){let o=e.createTracker(r),a=o.move("[^"),i=e.enter("footnoteReference"),l=e.enter("reference");return a+=o.move(e.safe(e.associationId(t),{after:"]",before:a})),l(),i(),a+=o.move("]"),a}function fn(){return{enter:{gfmFootnoteCallString:Ga,gfmFootnoteCall:Ya,gfmFootnoteDefinitionLabelString:Za,gfmFootnoteDefinition:Xa},exit:{gfmFootnoteCallString:Ka,gfmFootnoteCall:Ja,gfmFootnoteDefinitionLabelString:tl,gfmFootnoteDefinition:el}}}function hn(t){let n=!1;return t&&t.firstLineBlank&&(n=!0),{handlers:{footnoteDefinition:e,footnoteReference:vr},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function e(r,o,a,i){let l=a.createTracker(i),u=l.move("[^"),f=a.enter("footnoteDefinition"),s=a.enter("label");return u+=l.move(a.safe(a.associationId(r),{before:u,after:"]"})),s(),u+=l.move("]:"),r.children&&r.children.length>0&&(l.shift(4),u+=l.move((n?`
`:" ")+a.indentLines(a.containerFlow(r,l.current()),n?Dr:rl))),f(),u}}function rl(t,n,e){return n===0?t:Dr(t,n,e)}function Dr(t,n,e){return(e?"":"    ")+t}var il=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];dn.attention=ll;dn.peek=ul;function pn(){return{canContainEols:["delete"],enter:{strikethrough:ol},exit:{strikethrough:al}}}function mn(){return{handlers:{delete:dn},unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:il}]}}function ol(t){this.enter({type:"delete",children:[],position:void 0},t)}function al(t){this.exit(t)}function dn(t,n,e,r){let o=e.createTracker(r),a=e.stack.includes("strikethrough")?"~":"~~",i=e.enter("strikethrough"),l=o.move(a);return l+=e.containerPhrasing(t,{...o.current(),before:l,after:"~"}),l+=o.move(a),i(),l}function ll(){return{construct:"strikethrough",markers:["~"],sizes:[2,1]}}function ul(){return"~"}function sl(t){return t.length}function Rr(t,n){let e=n||{},r=(e.align||[]).concat(),o=e.stringLength||sl,a=[],i=[],l=[],u=[],f=0,s=-1;for(;++s<t.length;){let x=[],I=[],k=-1;for(t[s].length>f&&(f=t[s].length);++k<t[s].length;){let S=cl(t[s][k]);if(e.alignDelimiters!==!1){let w=o(S);I[k]=w,(u[k]===void 0||w>u[k])&&(u[k]=w)}x.push(S)}i[s]=x,l[s]=I}let c=-1;if(typeof r=="object"&&"length"in r)for(;++c<f;)a[c]=Br(r[c]);else{let x=Br(r);for(;++c<f;)a[c]=x}c=-1;let p=[],h=[];for(;++c<f;){let x=a[c],I="",k="";x===99?(I=":",k=":"):x===108?I=":":x===114&&(k=":");let S=e.alignDelimiters===!1?1:Math.max(1,u[c]-I.length-k.length),w=I+"-".repeat(S)+k;e.alignDelimiters!==!1&&(S=I.length+S+k.length,S>u[c]&&(u[c]=S),h[c]=S),p[c]=w}i.splice(1,0,p),l.splice(1,0,h),s=-1;let g=[];for(;++s<i.length;){let x=i[s],I=l[s],k=e.fillRows===!1?Math.max(1,i[s===1?0:s].length):f;c=-1;let S=[];for(;++c<k;){let w=x[c]||"",E="",A="";if(e.alignDelimiters!==!1){let b=u[c]-(I[c]||0),F=a[c];if(F===114)E=" ".repeat(b);else if(F===99){let M=b/2;b%2?(E=" ".repeat(M+.5),A=" ".repeat(M-.5)):(E=" ".repeat(M),A=E)}else A=" ".repeat(b)}e.delimiterStart!==!1&&!c&&S.push("|"),e.padding!==!1&&!(e.alignDelimiters===!1&&w==="")&&(e.delimiterStart!==!1||c)&&S.push(" "),e.alignDelimiters!==!1&&S.push(E),S.push(w),e.alignDelimiters!==!1&&S.push(A),e.padding!==!1&&S.push(" "),(e.delimiterEnd!==!1||c!==k-1)&&S.push("|")}g.push(e.delimiterEnd===!1?S.join("").replace(/ +$/,""):S.join(""))}return g.join(`
`)}function cl(t){return t==null?"":String(t)}function Br(t){let n=typeof t=="string"?t.codePointAt(0):0;return n===67||n===99?99:n===76||n===108?108:n===82||n===114?114:0}var Or={}.hasOwnProperty;function jr(t,n){let e=n||{};function r(o,...a){let i=r.invalid,l=r.handlers;if(o&&Or.call(o,t)){let u=String(o[t]);i=Or.call(l,u)?l[u]:r.unknown}if(i)return i.call(this,o,...a)}return r.handlers=e.handlers||{},r.invalid=e.invalid,r.unknown=e.unknown,r}var fl={}.hasOwnProperty;function gn(t,n){let e=-1,r;if(n.extensions)for(;++e<n.extensions.length;)gn(t,n.extensions[e]);for(r in n)if(fl.call(n,r))switch(r){case"extensions":break;case"unsafe":{Nr(t[r],n[r]);break}case"join":{Nr(t[r],n[r]);break}case"handlers":{hl(t[r],n[r]);break}default:t.options[r]=n[r]}return t}function Nr(t,n){n&&t.push(...n)}function hl(t,n){n&&Object.assign(t,n)}function Hr(t,n,e,r){let o=e.enter("blockquote"),a=e.createTracker(r);a.move("> "),a.shift(2);let i=e.indentLines(e.containerFlow(t,a.current()),pl);return o(),i}function pl(t,n,e){return">"+(e?"":" ")+t}function _e(t,n){return $r(t,n.inConstruct,!0)&&!$r(t,n.notInConstruct,!1)}function $r(t,n,e){if(typeof n=="string"&&(n=[n]),!n||n.length===0)return e;let r=-1;for(;++r<n.length;)if(t.includes(n[r]))return!0;return!1}function kn(t,n,e,r){let o=-1;for(;++o<e.unsafe.length;)if(e.unsafe[o].character===`
`&&_e(e.stack,e.unsafe[o]))return/[ \t]/.test(r.before)?"":" ";return`\\
`}function qr(t,n){let e=String(t),r=e.indexOf(n),o=r,a=0,i=0;if(typeof n!="string")throw new TypeError("Expected substring");for(;r!==-1;)r===o?++a>i&&(i=a):a=1,o=r+n.length,r=e.indexOf(n,o);return i}function ie(t,n){return!!(n.options.fences===!1&&t.value&&!t.lang&&/[^ \r\n]/.test(t.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(t.value))}function Ur(t){let n=t.options.fence||"`";if(n!=="`"&&n!=="~")throw new Error("Cannot serialize code with `"+n+"` for `options.fence`, expected `` ` `` or `~`");return n}function Vr(t,n,e,r){let o=Ur(e),a=t.value||"",i=o==="`"?"GraveAccent":"Tilde";if(ie(t,e)){let c=e.enter("codeIndented"),p=e.indentLines(a,ml);return c(),p}let l=e.createTracker(r),u=o.repeat(Math.max(qr(a,o)+1,3)),f=e.enter("codeFenced"),s=l.move(u);if(t.lang){let c=e.enter(`codeFencedLang${i}`);s+=l.move(e.safe(t.lang,{before:s,after:" ",encode:["`"],...l.current()})),c()}if(t.lang&&t.meta){let c=e.enter(`codeFencedMeta${i}`);s+=l.move(" "),s+=l.move(e.safe(t.meta,{before:s,after:`
`,encode:["`"],...l.current()})),c()}return s+=l.move(`
`),a&&(s+=l.move(a+`
`)),s+=l.move(u),f(),s}function ml(t,n,e){return(e?"":"    ")+t}function $t(t){let n=t.options.quote||'"';if(n!=='"'&&n!=="'")throw new Error("Cannot serialize title with `"+n+"` for `options.quote`, expected `\"`, or `'`");return n}function Wr(t,n,e,r){let o=$t(e),a=o==='"'?"Quote":"Apostrophe",i=e.enter("definition"),l=e.enter("label"),u=e.createTracker(r),f=u.move("[");return f+=u.move(e.safe(e.associationId(t),{before:f,after:"]",...u.current()})),f+=u.move("]: "),l(),!t.url||/[\0- \u007F]/.test(t.url)?(l=e.enter("destinationLiteral"),f+=u.move("<"),f+=u.move(e.safe(t.url,{before:f,after:">",...u.current()})),f+=u.move(">")):(l=e.enter("destinationRaw"),f+=u.move(e.safe(t.url,{before:f,after:t.title?" ":`
`,...u.current()}))),l(),t.title&&(l=e.enter(`title${a}`),f+=u.move(" "+o),f+=u.move(e.safe(t.title,{before:f,after:o,...u.current()})),f+=u.move(o),l()),i(),f}function Qr(t){let n=t.options.emphasis||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize emphasis with `"+n+"` for `options.emphasis`, expected `*`, or `_`");return n}function et(t){return"&#x"+t.toString(16).toUpperCase()+";"}function qt(t,n,e){let r=kt(t),o=kt(n);return r===void 0?o===void 0?e==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:o===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?o===void 0?{inside:!1,outside:!1}:o===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:o===void 0?{inside:!1,outside:!1}:o===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}xn.peek=dl;function xn(t,n,e,r){let o=Qr(e),a=e.enter("emphasis"),i=e.createTracker(r),l=i.move(o),u=i.move(e.containerPhrasing(t,{after:o,before:l,...i.current()})),f=u.charCodeAt(0),s=qt(r.before.charCodeAt(r.before.length-1),f,o);s.inside&&(u=et(f)+u.slice(1));let c=u.charCodeAt(u.length-1),p=qt(r.after.charCodeAt(0),c,o);p.inside&&(u=u.slice(0,-1)+et(c));let h=i.move(o);return a(),e.attentionEncodeSurroundingInfo={after:p.outside,before:s.outside},l+u+h}function dl(t,n,e){return e.options.emphasis||"*"}function oe(t,n,e,r){let o,a,i;typeof e=="function"||e&&typeof e=="object"?(o=n,a=e,i=r):(a=n,i=e),typeof a=="function"?Ht(t,o,wn(a),i):Ht(t,o,gl(a),i)}function gl(t){return!t||typeof t!="object"?t:{enter:typeof t.enter=="function"?wn(t.enter):t.enter,exit:typeof t.exit=="function"?wn(t.exit):t.exit}}function wn(t){return n;function n(e,r,o){return t(e,o,r[r.length-1])}}function Te(t,n){let e=!1;return oe(t,function(r){if("value"in r&&/\r?\n|\r/.test(r.value)||r.type==="break")return e=!0,st}),!!((!t.depth||t.depth<3)&&dt(t)&&(n.options.setext||e))}function Gr(t,n,e,r){let o=Math.max(Math.min(6,t.depth||1),1),a=e.createTracker(r);if(Te(t,e)){let s=e.enter("headingSetext"),c=e.enter("phrasing"),p=e.containerPhrasing(t,{...a.current(),before:`
`,after:`
`});return c(),s(),p+`
`+(o===1?"=":"-").repeat(p.length-(Math.max(p.lastIndexOf("\r"),p.lastIndexOf(`
`))+1))}let i="#".repeat(o),l=e.enter("headingAtx"),u=e.enter("phrasing");a.move(i+" ");let f=e.containerPhrasing(t,{before:"# ",after:`
`,...a.current()});return/^[\t ]/.test(f)&&(f=et(f.charCodeAt(0))+f.slice(1)),f=f?i+" "+f:i,e.options.closeAtx&&(f+=" "+i),u(),l(),f}bn.peek=kl;function bn(t){return t.value||""}function kl(){return"<"}yn.peek=xl;function yn(t,n,e,r){let o=$t(e),a=o==='"'?"Quote":"Apostrophe",i=e.enter("image"),l=e.enter("label"),u=e.createTracker(r),f=u.move("![");return f+=u.move(e.safe(t.alt,{before:f,after:"]",...u.current()})),f+=u.move("]("),l(),!t.url&&t.title||/[\0- \u007F]/.test(t.url)?(l=e.enter("destinationLiteral"),f+=u.move("<"),f+=u.move(e.safe(t.url,{before:f,after:">",...u.current()})),f+=u.move(">")):(l=e.enter("destinationRaw"),f+=u.move(e.safe(t.url,{before:f,after:t.title?" ":")",...u.current()}))),l(),t.title&&(l=e.enter(`title${a}`),f+=u.move(" "+o),f+=u.move(e.safe(t.title,{before:f,after:o,...u.current()})),f+=u.move(o),l()),f+=u.move(")"),i(),f}function xl(){return"!"}Sn.peek=wl;function Sn(t,n,e,r){let o=t.referenceType,a=e.enter("imageReference"),i=e.enter("label"),l=e.createTracker(r),u=l.move("!["),f=e.safe(t.alt,{before:u,after:"]",...l.current()});u+=l.move(f+"]["),i();let s=e.stack;e.stack=[],i=e.enter("reference");let c=e.safe(e.associationId(t),{before:u,after:"]",...l.current()});return i(),e.stack=s,a(),o==="full"||!f||f!==c?u+=l.move(c+"]"):o==="shortcut"?u=u.slice(0,-1):u+=l.move("]"),u}function wl(){return"!"}Cn.peek=bl;function Cn(t,n,e){let r=t.value||"",o="`",a=-1;for(;new RegExp("(^|[^`])"+o+"([^`]|$)").test(r);)o+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=" "+r+" ");++a<e.unsafe.length;){let i=e.unsafe[a],l=e.compilePattern(i),u;if(i.atBreak)for(;u=l.exec(r);){let f=u.index;r.charCodeAt(f)===10&&r.charCodeAt(f-1)===13&&f--,r=r.slice(0,f)+" "+r.slice(u.index+1)}}return o+r+o}function bl(){return"`"}function In(t,n){let e=dt(t);return!!(!n.options.resourceLink&&t.url&&!t.title&&t.children&&t.children.length===1&&t.children[0].type==="text"&&(e===t.url||"mailto:"+e===t.url)&&/^[a-z][a-z+.-]+:/i.test(t.url)&&!/[\0- <>\u007F]/.test(t.url))}En.peek=yl;function En(t,n,e,r){let o=$t(e),a=o==='"'?"Quote":"Apostrophe",i=e.createTracker(r),l,u;if(In(t,e)){let s=e.stack;e.stack=[],l=e.enter("autolink");let c=i.move("<");return c+=i.move(e.containerPhrasing(t,{before:c,after:">",...i.current()})),c+=i.move(">"),l(),e.stack=s,c}l=e.enter("link"),u=e.enter("label");let f=i.move("[");return f+=i.move(e.containerPhrasing(t,{before:f,after:"](",...i.current()})),f+=i.move("]("),u(),!t.url&&t.title||/[\0- \u007F]/.test(t.url)?(u=e.enter("destinationLiteral"),f+=i.move("<"),f+=i.move(e.safe(t.url,{before:f,after:">",...i.current()})),f+=i.move(">")):(u=e.enter("destinationRaw"),f+=i.move(e.safe(t.url,{before:f,after:t.title?" ":")",...i.current()}))),u(),t.title&&(u=e.enter(`title${a}`),f+=i.move(" "+o),f+=i.move(e.safe(t.title,{before:f,after:o,...i.current()})),f+=i.move(o),u()),f+=i.move(")"),l(),f}function yl(t,n,e){return In(t,e)?"<":"["}_n.peek=Sl;function _n(t,n,e,r){let o=t.referenceType,a=e.enter("linkReference"),i=e.enter("label"),l=e.createTracker(r),u=l.move("["),f=e.containerPhrasing(t,{before:u,after:"]",...l.current()});u+=l.move(f+"]["),i();let s=e.stack;e.stack=[],i=e.enter("reference");let c=e.safe(e.associationId(t),{before:u,after:"]",...l.current()});return i(),e.stack=s,a(),o==="full"||!f||f!==c?u+=l.move(c+"]"):o==="shortcut"?u=u.slice(0,-1):u+=l.move("]"),u}function Sl(){return"["}function Ut(t){let n=t.options.bullet||"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bullet`, expected `*`, `+`, or `-`");return n}function Yr(t){let n=Ut(t),e=t.options.bulletOther;if(!e)return n==="*"?"-":"*";if(e!=="*"&&e!=="+"&&e!=="-")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(e===n)throw new Error("Expected `bullet` (`"+n+"`) and `bulletOther` (`"+e+"`) to be different");return e}function Zr(t){let n=t.options.bulletOrdered||".";if(n!=="."&&n!==")")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOrdered`, expected `.` or `)`");return n}function Ae(t){let n=t.options.rule||"*";if(n!=="*"&&n!=="-"&&n!=="_")throw new Error("Cannot serialize rules with `"+n+"` for `options.rule`, expected `*`, `-`, or `_`");return n}function Xr(t,n,e,r){let o=e.enter("list"),a=e.bulletCurrent,i=t.ordered?Zr(e):Ut(e),l=t.ordered?i==="."?")":".":Yr(e),u=n&&e.bulletLastUsed?i===e.bulletLastUsed:!1;if(!t.ordered){let s=t.children?t.children[0]:void 0;if((i==="*"||i==="-")&&s&&(!s.children||!s.children[0])&&e.stack[e.stack.length-1]==="list"&&e.stack[e.stack.length-2]==="listItem"&&e.stack[e.stack.length-3]==="list"&&e.stack[e.stack.length-4]==="listItem"&&e.indexStack[e.indexStack.length-1]===0&&e.indexStack[e.indexStack.length-2]===0&&e.indexStack[e.indexStack.length-3]===0&&(u=!0),Ae(e)===i&&s){let c=-1;for(;++c<t.children.length;){let p=t.children[c];if(p&&p.type==="listItem"&&p.children&&p.children[0]&&p.children[0].type==="thematicBreak"){u=!0;break}}}}u&&(i=l),e.bulletCurrent=i;let f=e.containerFlow(t,r);return e.bulletLastUsed=i,e.bulletCurrent=a,o(),f}function Kr(t){let n=t.options.listItemIndent||"one";if(n!=="tab"&&n!=="one"&&n!=="mixed")throw new Error("Cannot serialize items with `"+n+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return n}function Jr(t,n,e,r){let o=Kr(e),a=e.bulletCurrent||Ut(e);n&&n.type==="list"&&n.ordered&&(a=(typeof n.start=="number"&&n.start>-1?n.start:1)+(e.options.incrementListMarker===!1?0:n.children.indexOf(t))+a);let i=a.length+1;(o==="tab"||o==="mixed"&&(n&&n.type==="list"&&n.spread||t.spread))&&(i=Math.ceil(i/4)*4);let l=e.createTracker(r);l.move(a+" ".repeat(i-a.length)),l.shift(i);let u=e.enter("listItem"),f=e.indentLines(e.containerFlow(t,l.current()),s);return u(),f;function s(c,p,h){return p?(h?"":" ".repeat(i))+c:(h?a:a+" ".repeat(i-a.length))+c}}function ti(t,n,e,r){let o=e.enter("paragraph"),a=e.enter("phrasing"),i=e.containerPhrasing(t,r);return a(),o(),i}var Tn=Ct(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function ei(t,n,e,r){return(t.children.some(function(i){return Tn(i)})?e.containerPhrasing:e.containerFlow).call(e,t,r)}function ni(t){let n=t.options.strong||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize strong with `"+n+"` for `options.strong`, expected `*`, or `_`");return n}An.peek=Cl;function An(t,n,e,r){let o=ni(e),a=e.enter("strong"),i=e.createTracker(r),l=i.move(o+o),u=i.move(e.containerPhrasing(t,{after:o,before:l,...i.current()})),f=u.charCodeAt(0),s=qt(r.before.charCodeAt(r.before.length-1),f,o);s.inside&&(u=et(f)+u.slice(1));let c=u.charCodeAt(u.length-1),p=qt(r.after.charCodeAt(0),c,o);p.inside&&(u=u.slice(0,-1)+et(c));let h=i.move(o+o);return a(),e.attentionEncodeSurroundingInfo={after:p.outside,before:s.outside},l+u+h}function Cl(t,n,e){return e.options.strong||"*"}function ri(t,n,e,r){return e.safe(t.value,r)}function ii(t){let n=t.options.ruleRepetition||3;if(n<3)throw new Error("Cannot serialize rules with repetition `"+n+"` for `options.ruleRepetition`, expected `3` or more");return n}function oi(t,n,e){let r=(Ae(e)+(e.options.ruleSpaces?" ":"")).repeat(ii(e));return e.options.ruleSpaces?r.slice(0,-1):r}var Mt={blockquote:Hr,break:kn,code:Vr,definition:Wr,emphasis:xn,hardBreak:kn,heading:Gr,html:bn,image:yn,imageReference:Sn,inlineCode:Cn,link:En,linkReference:_n,list:Xr,listItem:Jr,paragraph:ti,root:ei,strong:An,text:ri,thematicBreak:oi};var ai=[Il];function Il(t,n,e,r){if(n.type==="code"&&ie(n,r)&&(t.type==="list"||t.type===n.type&&ie(t,r)))return!1;if("spread"in e&&typeof e.spread=="boolean")return t.type==="paragraph"&&(t.type===n.type||n.type==="definition"||n.type==="heading"&&Te(n,r))?void 0:e.spread?1:0}var vt=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"],li=[{character:"	",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",before:"[\\r\\n]",inConstruct:"phrasing"},{character:"	",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"\r",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:`
`,inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde","codeFencedMetaGraveAccent","codeFencedMetaTilde","destinationLiteral","headingAtx"]},{character:" ",after:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",before:"[\\r\\n]",inConstruct:"phrasing"},{character:" ",inConstruct:["codeFencedLangGraveAccent","codeFencedLangTilde"]},{character:"!",after:"\\[",inConstruct:"phrasing",notInConstruct:vt},{character:'"',inConstruct:"titleQuote"},{atBreak:!0,character:"#"},{character:"#",inConstruct:"headingAtx",after:`(?:[\r
]|$)`},{character:"&",after:"[#A-Za-z]",inConstruct:"phrasing"},{character:"'",inConstruct:"titleApostrophe"},{character:"(",inConstruct:"destinationRaw"},{before:"\\]",character:"(",inConstruct:"phrasing",notInConstruct:vt},{atBreak:!0,before:"\\d+",character:")"},{character:")",inConstruct:"destinationRaw"},{atBreak:!0,character:"*",after:`(?:[ 	\r
*])`},{character:"*",inConstruct:"phrasing",notInConstruct:vt},{atBreak:!0,character:"+",after:`(?:[ 	\r
])`},{atBreak:!0,character:"-",after:`(?:[ 	\r
-])`},{atBreak:!0,before:"\\d+",character:".",after:`(?:[ 	\r
]|$)`},{atBreak:!0,character:"<",after:"[!/?A-Za-z]"},{character:"<",after:"[!/?A-Za-z]",inConstruct:"phrasing",notInConstruct:vt},{character:"<",inConstruct:"destinationLiteral"},{atBreak:!0,character:"="},{atBreak:!0,character:">"},{character:">",inConstruct:"destinationLiteral"},{atBreak:!0,character:"["},{character:"[",inConstruct:"phrasing",notInConstruct:vt},{character:"[",inConstruct:["label","reference"]},{character:"\\",after:"[\\r\\n]",inConstruct:"phrasing"},{character:"]",inConstruct:["label","reference"]},{atBreak:!0,character:"_"},{character:"_",inConstruct:"phrasing",notInConstruct:vt},{atBreak:!0,character:"`"},{character:"`",inConstruct:["codeFencedLangGraveAccent","codeFencedMetaGraveAccent"]},{character:"`",inConstruct:"phrasing",notInConstruct:vt},{atBreak:!0,character:"~"}];function ui(t){return t.label||!t.identifier?t.label||"":Se(t.identifier)}function si(t){if(!t._compiled){let n=(t.atBreak?"[\\r\\n][\\t ]*":"")+(t.before?"(?:"+t.before+")":"");t._compiled=new RegExp((n?"("+n+")":"")+(/[|\\{}()[\]^$+*?.-]/.test(t.character)?"\\":"")+t.character+(t.after?"(?:"+t.after+")":""),"g")}return t._compiled}function ci(t,n,e){let r=n.indexStack,o=t.children||[],a=[],i=-1,l=e.before,u;r.push(-1);let f=n.createTracker(e);for(;++i<o.length;){let s=o[i],c;if(r[r.length-1]=i,i+1<o.length){let g=n.handle.handlers[o[i+1].type];g&&g.peek&&(g=g.peek),c=g?g(o[i+1],t,n,{before:"",after:"",...f.current()}).charAt(0):""}else c=e.after;a.length>0&&(l==="\r"||l===`
`)&&s.type==="html"&&(a[a.length-1]=a[a.length-1].replace(/(\r?\n|\r)$/," "),l=" ",f=n.createTracker(e),f.move(a.join("")));let p=n.handle(s,t,n,{...f.current(),after:c,before:l});u&&u===p.slice(0,1)&&(p=et(u.charCodeAt(0))+p.slice(1));let h=n.attentionEncodeSurroundingInfo;n.attentionEncodeSurroundingInfo=void 0,u=void 0,h&&(a.length>0&&h.before&&l===a[a.length-1].slice(-1)&&(a[a.length-1]=a[a.length-1].slice(0,-1)+et(l.charCodeAt(0))),h.after&&(u=c)),f.move(p),a.push(p),l=p.slice(-1)}return r.pop(),a.join("")}function fi(t,n,e){let r=n.indexStack,o=t.children||[],a=n.createTracker(e),i=[],l=-1;for(r.push(-1);++l<o.length;){let u=o[l];r[r.length-1]=l,i.push(a.move(n.handle(u,t,n,{before:`
`,after:`
`,...a.current()}))),u.type!=="list"&&(n.bulletLastUsed=void 0),l<o.length-1&&i.push(a.move(El(u,o[l+1],t,n)))}return r.pop(),i.join("")}function El(t,n,e,r){let o=r.join.length;for(;o--;){let a=r.join[o](t,n,e,r);if(a===!0||a===1)break;if(typeof a=="number")return`
`.repeat(1+a);if(a===!1)return`

<!---->

`}return`

`}var _l=/\r?\n|\r/g;function hi(t,n){let e=[],r=0,o=0,a;for(;a=_l.exec(t);)i(t.slice(r,a.index)),e.push(a[0]),r=a.index+a[0].length,o++;return i(t.slice(r)),e.join("");function i(l){e.push(n(l,o,!l))}}function mi(t,n,e){let r=(e.before||"")+(n||"")+(e.after||""),o=[],a=[],i={},l=-1;for(;++l<t.unsafe.length;){let s=t.unsafe[l];if(!_e(t.stack,s))continue;let c=t.compilePattern(s),p;for(;p=c.exec(r);){let h="before"in s||!!s.atBreak,g="after"in s,x=p.index+(h?p[1].length:0);o.includes(x)?(i[x].before&&!h&&(i[x].before=!1),i[x].after&&!g&&(i[x].after=!1)):(o.push(x),i[x]={before:h,after:g})}}o.sort(Tl);let u=e.before?e.before.length:0,f=r.length-(e.after?e.after.length:0);for(l=-1;++l<o.length;){let s=o[l];s<u||s>=f||s+1<f&&o[l+1]===s+1&&i[s].after&&!i[s+1].before&&!i[s+1].after||o[l-1]===s-1&&i[s].before&&!i[s-1].before&&!i[s-1].after||(u!==s&&a.push(pi(r.slice(u,s),"\\")),u=s,/[!-/:-@[-`{-~]/.test(r.charAt(s))&&(!e.encode||!e.encode.includes(r.charAt(s)))?a.push("\\"):(a.push(et(r.charCodeAt(s))),u++))}return a.push(pi(r.slice(u,f),e.after)),a.join("")}function Tl(t,n){return t-n}function pi(t,n){let e=/\\(?=[!-/:-@[-`{-~])/g,r=[],o=[],a=t+n,i=-1,l=0,u;for(;u=e.exec(a);)r.push(u.index);for(;++i<r.length;)l!==r[i]&&o.push(t.slice(l,r[i])),o.push("\\"),l=r[i];return o.push(t.slice(l)),o.join("")}function di(t){let n=t||{},e=n.now||{},r=n.lineShift||0,o=e.line||1,a=e.column||1;return{move:u,current:i,shift:l};function i(){return{now:{line:o,column:a},lineShift:r}}function l(f){r+=f}function u(f){let s=f||"",c=s.split(/\r?\n|\r/g),p=c[c.length-1];return o+=c.length-1,a=c.length===1?a+p.length:1+p.length+r,s}}function Fn(t,n){let e=n||{},r={associationId:ui,containerPhrasing:zl,containerFlow:Pl,createTracker:di,compilePattern:si,enter:a,handlers:{...Mt},handle:void 0,indentLines:hi,indexStack:[],join:[...ai],options:{},safe:Ml,stack:[],unsafe:[...li]};gn(r,e),r.options.tightDefinitions&&r.join.push(Ll),r.handle=jr("type",{invalid:Al,unknown:Fl,handlers:r.handlers});let o=r.handle(t,void 0,r,{before:`
`,after:`
`,now:{line:1,column:1},lineShift:0});return o&&o.charCodeAt(o.length-1)!==10&&o.charCodeAt(o.length-1)!==13&&(o+=`
`),o;function a(i){return r.stack.push(i),l;function l(){r.stack.pop()}}}function Al(t){throw new Error("Cannot handle value `"+t+"`, expected node")}function Fl(t){let n=t;throw new Error("Cannot handle unknown node `"+n.type+"`")}function Ll(t,n){if(t.type==="definition"&&t.type===n.type)return 0}function zl(t,n){return ci(t,this,n)}function Pl(t,n){return fi(t,this,n)}function Ml(t,n){return mi(this,t,n)}function zn(){return{enter:{table:vl,tableData:gi,tableHeader:gi,tableRow:Bl},exit:{codeText:Rl,table:Dl,tableData:Ln,tableHeader:Ln,tableRow:Ln}}}function vl(t){let n=t._align;this.enter({type:"table",align:n.map(function(e){return e==="none"?null:e}),children:[],position:void 0},t),this.data.inTable=!0}function Dl(t){this.exit(t),this.data.inTable=void 0}function Bl(t){this.enter({type:"tableRow",children:[],position:void 0},t)}function Ln(t){this.exit(t)}function gi(t){this.enter({type:"tableCell",children:[],position:void 0},t)}function Rl(t){let n=this.resume();this.data.inTable&&(n=n.replace(/\\([\\|])/g,Ol));let e=this.stack[this.stack.length-1];e.type,e.value=n,this.exit(t)}function Ol(t,n){return n==="|"?n:t}function Pn(t){let n=t||{},{tableCellPadding:e,tablePipeAlign:r,stringLength:o}=n,a=e?" ":"|";return{handlers:{inlineCode:p,table:i,tableCell:u,tableRow:l},join:[jl],unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}]};function i(h,g,x,I){let k=s(h,x,I),S=k[0];if(S){let w=h.align?h.align.length:0,E=-1;if(!w)for(;++E<k.length;)k[E].length>w&&(w=k[E].length);for(;S.length<w;)S.push("")}return f(k,h.align)}function l(h,g,x,I){let k=c(h,x,I),S=f([k]);return S.slice(0,S.indexOf(`
`))}function u(h,g,x,I){let k=x.enter("tableCell"),S=x.enter("phrasing"),w=x.containerPhrasing(h,{...I,before:a,after:a});return S(),k(),w}function f(h,g){return Rr(h,{align:g,alignDelimiters:r,fillRows:!1,padding:e,stringLength:o})}function s(h,g,x){let{children:I}=h,k=-1,S=[],w=g.enter("table");for(;++k<I.length;)S[k]=c(I[k],g,x);return w(),S}function c(h,g,x){let{children:I}=h,k=-1,S=[],w=g.enter("tableRow");for(;++k<I.length;)S[k]=u(I[k],h,g,x);return w(),S}function p(h,g,x){let I=Mt.inlineCode(h,g,x);if(!x.stack.includes("tableCell"))return I;let k=[],S=0,w=I.indexOf("|");for(;w!==-1;){let E=w;for(;E>S&&I.charCodeAt(E-1)===92;)E--;k.push(I.slice(S,w)),(w-E)%2===0&&k.push("\\"),S=w,w=I.indexOf("|",w+1)}return k.push(I.slice(S)),k.join("")}}function jl(t,n,e,r){if(t.type==="table"&&e.type==="listItem"&&e.spread===!1&&(n.type==="definition"||n.type==="heading"&&Nl(n,r)||n.type==="paragraph"||n.type==="table"))return 1}function Nl(t,n){let e=!1;return oe(t,function(r){if(r.type==="break"||"value"in r&&/\r?\n|\r/.test(r.value))return e=!0,st}),!!((!t.depth||t.depth<3)&&dt(t)&&(n.options.setext||e))}function Mn(){return{exit:{taskListCheckValueChecked:ki,taskListCheckValueUnchecked:ki,paragraph:Hl}}}function vn(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:$l}}}function ki(t){let n=this.stack[this.stack.length-2];n.type,n.checked=t.type==="taskListCheckValueChecked"}function Hl(t){let n=this.stack[this.stack.length-2];if(n&&n.type==="listItem"&&typeof n.checked=="boolean"){let e=this.stack[this.stack.length-1];e.type;let r=e.children[0];if(r&&r.type==="text"){let o=n.children,a=-1,i;for(;++a<o.length;){let l=o[a];if(l.type==="paragraph"){i=l;break}}i===e&&(r.value=r.value.slice(1),r.value.length===0?e.children.shift():e.position&&r.position&&typeof r.position.start.offset=="number"&&(r.position.start.column++,r.position.start.offset++,e.position.start=Object.assign({},r.position.start)))}}this.exit(t)}function $l(t,n,e,r){let o=t.children[0],a=typeof t.checked=="boolean"&&o&&o.type==="paragraph",i="["+(t.checked?"x":" ")+"] ",l=e.createTracker(r);a&&l.move(i);let u=Mt.listItem(t,n,e,{...r,...l.current()});return a&&(u=u.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,f)),u;function f(s){return s+i}}function Dn(){return[sn(),fn(),pn(),zn(),Mn()]}function Bn(t){return{extensions:[cn(),hn(t),mn(),Pn(t),vn()]}}var ql={tokenize:Gl,partial:!0},xi={tokenize:Yl,partial:!0},wi={tokenize:Zl,partial:!0},bi={tokenize:Xl,partial:!0},Ul={tokenize:Kl,partial:!0},yi={name:"wwwAutolink",tokenize:Wl,previous:Ci},Si={name:"protocolAutolink",tokenize:Ql,previous:Ii},xt={name:"emailAutolink",tokenize:Vl,previous:Ei},ct={};function On(){return{text:ct}}var Dt=48;for(;Dt<123;)ct[Dt]=xt,Dt++,Dt===58?Dt=65:Dt===91&&(Dt=97);ct[43]=xt;ct[45]=xt;ct[46]=xt;ct[95]=xt;ct[72]=[xt,Si];ct[104]=[xt,Si];ct[87]=[xt,yi];ct[119]=[xt,yi];function Vl(t,n,e){let r=this,o,a;return i;function i(c){return!Rn(c)||!Ei.call(r,r.previous)||jn(r.events)?e(c):(t.enter("literalAutolink"),t.enter("literalAutolinkEmail"),l(c))}function l(c){return Rn(c)?(t.consume(c),l):c===64?(t.consume(c),u):e(c)}function u(c){return c===46?t.check(Ul,s,f)(c):c===45||c===95||Q(c)?(a=!0,t.consume(c),u):s(c)}function f(c){return t.consume(c),o=!0,u}function s(c){return a&&o&&W(r.previous)?(t.exit("literalAutolinkEmail"),t.exit("literalAutolink"),n(c)):e(c)}}function Wl(t,n,e){let r=this;return o;function o(i){return i!==87&&i!==119||!Ci.call(r,r.previous)||jn(r.events)?e(i):(t.enter("literalAutolink"),t.enter("literalAutolinkWww"),t.check(ql,t.attempt(xi,t.attempt(wi,a),e),e)(i))}function a(i){return t.exit("literalAutolinkWww"),t.exit("literalAutolink"),n(i)}}function Ql(t,n,e){let r=this,o="",a=!1;return i;function i(c){return(c===72||c===104)&&Ii.call(r,r.previous)&&!jn(r.events)?(t.enter("literalAutolink"),t.enter("literalAutolinkHttp"),o+=String.fromCodePoint(c),t.consume(c),l):e(c)}function l(c){if(W(c)&&o.length<5)return o+=String.fromCodePoint(c),t.consume(c),l;if(c===58){let p=o.toLowerCase();if(p==="http"||p==="https")return t.consume(c),u}return e(c)}function u(c){return c===47?(t.consume(c),a?f:(a=!0,u)):e(c)}function f(c){return c===null||Tt(c)||O(c)||lt(c)||At(c)?e(c):t.attempt(xi,t.attempt(wi,s),e)(c)}function s(c){return t.exit("literalAutolinkHttp"),t.exit("literalAutolink"),n(c)}}function Gl(t,n,e){let r=0;return o;function o(i){return(i===87||i===119)&&r<3?(r++,t.consume(i),o):i===46&&r===3?(t.consume(i),a):e(i)}function a(i){return i===null?e(i):n(i)}}function Yl(t,n,e){let r,o,a;return i;function i(f){return f===46||f===95?t.check(bi,u,l)(f):f===null||O(f)||lt(f)||f!==45&&At(f)?u(f):(a=!0,t.consume(f),i)}function l(f){return f===95?r=!0:(o=r,r=void 0),t.consume(f),i}function u(f){return o||r||!a?e(f):n(f)}}function Zl(t,n){let e=0,r=0;return o;function o(i){return i===40?(e++,t.consume(i),o):i===41&&r<e?a(i):i===33||i===34||i===38||i===39||i===41||i===42||i===44||i===46||i===58||i===59||i===60||i===63||i===93||i===95||i===126?t.check(bi,n,a)(i):i===null||O(i)||lt(i)?n(i):(t.consume(i),o)}function a(i){return i===41&&r++,t.consume(i),o}}function Xl(t,n,e){return r;function r(l){return l===33||l===34||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===63||l===95||l===126?(t.consume(l),r):l===38?(t.consume(l),a):l===93?(t.consume(l),o):l===60||l===null||O(l)||lt(l)?n(l):e(l)}function o(l){return l===null||l===40||l===91||O(l)||lt(l)?n(l):r(l)}function a(l){return W(l)?i(l):e(l)}function i(l){return l===59?(t.consume(l),r):W(l)?(t.consume(l),i):e(l)}}function Kl(t,n,e){return r;function r(a){return t.consume(a),o}function o(a){return Q(a)?e(a):n(a)}}function Ci(t){return t===null||t===40||t===42||t===95||t===91||t===93||t===126||O(t)}function Ii(t){return!W(t)}function Ei(t){return!(t===47||Rn(t))}function Rn(t){return t===43||t===45||t===46||t===95||Q(t)}function jn(t){let n=t.length,e=!1;for(;n--;){let r=t[n][1];if((r.type==="labelLink"||r.type==="labelImage")&&!r._balanced){e=!0;break}if(r._gfmAutolinkLiteralWalkedInto){e=!1;break}}return t.length>0&&!e&&(t[t.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),e}var Jl={tokenize:au,partial:!0};function Nn(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:ru,continuation:{tokenize:iu},exit:ou}},text:{91:{name:"gfmFootnoteCall",tokenize:nu},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:tu,resolveTo:eu}}}}function tu(t,n,e){let r=this,o=r.events.length,a=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),i;for(;o--;){let u=r.events[o][1];if(u.type==="labelImage"){i=u;break}if(u.type==="gfmFootnoteCall"||u.type==="labelLink"||u.type==="label"||u.type==="image"||u.type==="link")break}return l;function l(u){if(!i||!i._balanced)return e(u);let f=Z(r.sliceSerialize({start:i.end,end:r.now()}));return f.codePointAt(0)!==94||!a.includes(f.slice(1))?e(u):(t.enter("gfmFootnoteCallLabelMarker"),t.consume(u),t.exit("gfmFootnoteCallLabelMarker"),n(u))}}function eu(t,n){let e=t.length,r;for(;e--;)if(t[e][1].type==="labelImage"&&t[e][0]==="enter"){r=t[e][1];break}t[e+1][1].type="data",t[e+3][1].type="gfmFootnoteCallLabelMarker";let o={type:"gfmFootnoteCall",start:Object.assign({},t[e+3][1].start),end:Object.assign({},t[t.length-1][1].end)},a={type:"gfmFootnoteCallMarker",start:Object.assign({},t[e+3][1].end),end:Object.assign({},t[e+3][1].end)};a.end.column++,a.end.offset++,a.end._bufferIndex++;let i={type:"gfmFootnoteCallString",start:Object.assign({},a.end),end:Object.assign({},t[t.length-1][1].start)},l={type:"chunkString",contentType:"string",start:Object.assign({},i.start),end:Object.assign({},i.end)},u=[t[e+1],t[e+2],["enter",o,n],t[e+3],t[e+4],["enter",a,n],["exit",a,n],["enter",i,n],["enter",l,n],["exit",l,n],["exit",i,n],t[t.length-2],t[t.length-1],["exit",o,n]];return t.splice(e,t.length-e+1,...u),t}function nu(t,n,e){let r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a=0,i;return l;function l(c){return t.enter("gfmFootnoteCall"),t.enter("gfmFootnoteCallLabelMarker"),t.consume(c),t.exit("gfmFootnoteCallLabelMarker"),u}function u(c){return c!==94?e(c):(t.enter("gfmFootnoteCallMarker"),t.consume(c),t.exit("gfmFootnoteCallMarker"),t.enter("gfmFootnoteCallString"),t.enter("chunkString").contentType="string",f)}function f(c){if(a>999||c===93&&!i||c===null||c===91||O(c))return e(c);if(c===93){t.exit("chunkString");let p=t.exit("gfmFootnoteCallString");return o.includes(Z(r.sliceSerialize(p)))?(t.enter("gfmFootnoteCallLabelMarker"),t.consume(c),t.exit("gfmFootnoteCallLabelMarker"),t.exit("gfmFootnoteCall"),n):e(c)}return O(c)||(i=!0),a++,t.consume(c),c===92?s:f}function s(c){return c===91||c===92||c===93?(t.consume(c),a++,f):f(c)}}function ru(t,n,e){let r=this,o=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a,i=0,l;return u;function u(g){return t.enter("gfmFootnoteDefinition")._container=!0,t.enter("gfmFootnoteDefinitionLabel"),t.enter("gfmFootnoteDefinitionLabelMarker"),t.consume(g),t.exit("gfmFootnoteDefinitionLabelMarker"),f}function f(g){return g===94?(t.enter("gfmFootnoteDefinitionMarker"),t.consume(g),t.exit("gfmFootnoteDefinitionMarker"),t.enter("gfmFootnoteDefinitionLabelString"),t.enter("chunkString").contentType="string",s):e(g)}function s(g){if(i>999||g===93&&!l||g===null||g===91||O(g))return e(g);if(g===93){t.exit("chunkString");let x=t.exit("gfmFootnoteDefinitionLabelString");return a=Z(r.sliceSerialize(x)),t.enter("gfmFootnoteDefinitionLabelMarker"),t.consume(g),t.exit("gfmFootnoteDefinitionLabelMarker"),t.exit("gfmFootnoteDefinitionLabel"),p}return O(g)||(l=!0),i++,t.consume(g),g===92?c:s}function c(g){return g===91||g===92||g===93?(t.consume(g),i++,s):s(g)}function p(g){return g===58?(t.enter("definitionMarker"),t.consume(g),t.exit("definitionMarker"),o.includes(a)||o.push(a),P(t,h,"gfmFootnoteDefinitionWhitespace")):e(g)}function h(g){return n(g)}}function iu(t,n,e){return t.check(ut,n,t.attempt(Jl,n,e))}function ou(t){t.exit("gfmFootnoteDefinition")}function au(t,n,e){let r=this;return P(t,o,"gfmFootnoteDefinitionIndent",5);function o(a){let i=r.events[r.events.length-1];return i&&i[1].type==="gfmFootnoteDefinitionIndent"&&i[2].sliceSerialize(i[1],!0).length===4?n(a):e(a)}}function Hn(t){let e=(t||{}).singleTilde,r={name:"strikethrough",tokenize:a,resolveAll:o};return e==null&&(e=!0),{text:{126:r},insideSpan:{null:[r]},attentionMarkers:{null:[126]}};function o(i,l){let u=-1;for(;++u<i.length;)if(i[u][0]==="enter"&&i[u][1].type==="strikethroughSequenceTemporary"&&i[u][1]._close){let f=u;for(;f--;)if(i[f][0]==="exit"&&i[f][1].type==="strikethroughSequenceTemporary"&&i[f][1]._open&&i[u][1].end.offset-i[u][1].start.offset===i[f][1].end.offset-i[f][1].start.offset){i[u][1].type="strikethroughSequence",i[f][1].type="strikethroughSequence";let s={type:"strikethrough",start:Object.assign({},i[f][1].start),end:Object.assign({},i[u][1].end)},c={type:"strikethroughText",start:Object.assign({},i[f][1].end),end:Object.assign({},i[u][1].start)},p=[["enter",s,l],["enter",i[f][1],l],["exit",i[f][1],l],["enter",c,l]],h=l.parser.constructs.insideSpan.null;h&&G(p,p.length,0,yt(h,i.slice(f+1,u),l)),G(p,p.length,0,[["exit",c,l],["enter",i[u][1],l],["exit",i[u][1],l],["exit",s,l]]),G(i,f-1,u-f+3,p),u=f+p.length-2;break}}for(u=-1;++u<i.length;)i[u][1].type==="strikethroughSequenceTemporary"&&(i[u][1].type="data");return i}function a(i,l,u){let f=this.previous,s=this.events,c=0;return p;function p(g){return f===126&&s[s.length-1][1].type!=="characterEscape"?u(g):(i.enter("strikethroughSequenceTemporary"),h(g))}function h(g){let x=kt(f);if(g===126)return c>1?u(g):(i.consume(g),c++,h);if(c<2&&!e)return u(g);let I=i.exit("strikethroughSequenceTemporary"),k=kt(g);return I._open=!k||k===2&&!!x,I._close=!x||x===2&&!!k,l(g)}}}var Fe=class{constructor(){this.map=[],this.index=new Map}add(n,e,r){lu(this,n,e,r)}consume(n){if(this.map.sort(function(a,i){return a[0]-i[0]}),this.map.length===0)return;let e=this.map.length,r=[];for(;e>0;)e-=1,r.push(n.slice(this.map[e][0]+this.map[e][1]),this.map[e][2]),n.length=this.map[e][0];r.push(n.slice()),n.length=0;let o=r.pop();for(;o;){for(let a of o)n.push(a);o=r.pop()}this.map.length=0,this.index.clear()}};function lu(t,n,e,r){if(e===0&&r.length===0)return;let o=t.index.get(n);if(o){o[1]+=e,o[2].push(...r);return}let a=[n,e,r];t.map.push(a),t.index.set(n,a)}function _i(t,n){let e=!1,r=[];for(;n<t.length;){let o=t[n];if(e){if(o[0]==="enter")o[1].type==="tableContent"&&r.push(t[n+1][1].type==="tableDelimiterMarker"?"left":"none");else if(o[1].type==="tableContent"){if(t[n-1][1].type==="tableDelimiterMarker"){let a=r.length-1;r[a]=r[a]==="left"?"center":"right"}}else if(o[1].type==="tableDelimiterRow")break}else o[0]==="enter"&&o[1].type==="tableDelimiterRow"&&(e=!0);n+=1}return r}function $n(){return{flow:{null:{name:"table",tokenize:uu,resolveAll:su}}}}function uu(t,n,e){let r=this,o=0,a=0,i;return l;function l(y){let D=r.events.length-1;for(;D>-1;){let{type:j}=r.events[D][1];if(j==="lineEnding"||j==="linePrefix")D--;else break}let N=D>-1?r.events[D][1].type:null,L=N==="tableHead"||N==="tableRow"?b:u;return L===b&&r.parser.lazy[r.now().line]?e(y):L(y)}function u(y){return t.enter("tableHead"),t.enter("tableRow"),f(y)}function f(y){return y===124||(i=!0,a+=1),s(y)}function s(y){return y===null?e(y):T(y)?a>1?(a=0,r.interrupt=!0,t.exit("tableRow"),t.enter("lineEnding"),t.consume(y),t.exit("lineEnding"),h):e(y):z(y)?P(t,s,"whitespace")(y):(a+=1,i&&(i=!1,o+=1),y===124?(t.enter("tableCellDivider"),t.consume(y),t.exit("tableCellDivider"),i=!0,s):(t.enter("data"),c(y)))}function c(y){return y===null||y===124||O(y)?(t.exit("data"),s(y)):(t.consume(y),y===92?p:c)}function p(y){return y===92||y===124?(t.consume(y),c):c(y)}function h(y){return r.interrupt=!1,r.parser.lazy[r.now().line]?e(y):(t.enter("tableDelimiterRow"),i=!1,z(y)?P(t,g,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(y):g(y))}function g(y){return y===45||y===58?I(y):y===124?(i=!0,t.enter("tableCellDivider"),t.consume(y),t.exit("tableCellDivider"),x):A(y)}function x(y){return z(y)?P(t,I,"whitespace")(y):I(y)}function I(y){return y===58?(a+=1,i=!0,t.enter("tableDelimiterMarker"),t.consume(y),t.exit("tableDelimiterMarker"),k):y===45?(a+=1,k(y)):y===null||T(y)?E(y):A(y)}function k(y){return y===45?(t.enter("tableDelimiterFiller"),S(y)):A(y)}function S(y){return y===45?(t.consume(y),S):y===58?(i=!0,t.exit("tableDelimiterFiller"),t.enter("tableDelimiterMarker"),t.consume(y),t.exit("tableDelimiterMarker"),w):(t.exit("tableDelimiterFiller"),w(y))}function w(y){return z(y)?P(t,E,"whitespace")(y):E(y)}function E(y){return y===124?g(y):y===null||T(y)?!i||o!==a?A(y):(t.exit("tableDelimiterRow"),t.exit("tableHead"),n(y)):A(y)}function A(y){return e(y)}function b(y){return t.enter("tableRow"),F(y)}function F(y){return y===124?(t.enter("tableCellDivider"),t.consume(y),t.exit("tableCellDivider"),F):y===null||T(y)?(t.exit("tableRow"),n(y)):z(y)?P(t,F,"whitespace")(y):(t.enter("data"),M(y))}function M(y){return y===null||y===124||O(y)?(t.exit("data"),F(y)):(t.consume(y),y===92?R:M)}function R(y){return y===92||y===124?(t.consume(y),M):M(y)}}function su(t,n){let e=-1,r=!0,o=0,a=[0,0,0,0],i=[0,0,0,0],l=!1,u=0,f,s,c,p=new Fe;for(;++e<t.length;){let h=t[e],g=h[1];h[0]==="enter"?g.type==="tableHead"?(l=!1,u!==0&&(Ti(p,n,u,f,s),s=void 0,u=0),f={type:"table",start:Object.assign({},g.start),end:Object.assign({},g.end)},p.add(e,0,[["enter",f,n]])):g.type==="tableRow"||g.type==="tableDelimiterRow"?(r=!0,c=void 0,a=[0,0,0,0],i=[0,e+1,0,0],l&&(l=!1,s={type:"tableBody",start:Object.assign({},g.start),end:Object.assign({},g.end)},p.add(e,0,[["enter",s,n]])),o=g.type==="tableDelimiterRow"?2:s?3:1):o&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")?(r=!1,i[2]===0&&(a[1]!==0&&(i[0]=i[1],c=Le(p,n,a,o,void 0,c),a=[0,0,0,0]),i[2]=e)):g.type==="tableCellDivider"&&(r?r=!1:(a[1]!==0&&(i[0]=i[1],c=Le(p,n,a,o,void 0,c)),a=i,i=[a[1],e,0,0])):g.type==="tableHead"?(l=!0,u=e):g.type==="tableRow"||g.type==="tableDelimiterRow"?(u=e,a[1]!==0?(i[0]=i[1],c=Le(p,n,a,o,e,c)):i[1]!==0&&(c=Le(p,n,i,o,e,c)),o=0):o&&(g.type==="data"||g.type==="tableDelimiterMarker"||g.type==="tableDelimiterFiller")&&(i[3]=e)}for(u!==0&&Ti(p,n,u,f,s),p.consume(n.events),e=-1;++e<n.events.length;){let h=n.events[e];h[0]==="enter"&&h[1].type==="table"&&(h[1]._align=_i(n.events,e))}return t}function Le(t,n,e,r,o,a){let i=r===1?"tableHeader":r===2?"tableDelimiter":"tableData",l="tableContent";e[0]!==0&&(a.end=Object.assign({},Vt(n.events,e[0])),t.add(e[0],0,[["exit",a,n]]));let u=Vt(n.events,e[1]);if(a={type:i,start:Object.assign({},u),end:Object.assign({},u)},t.add(e[1],0,[["enter",a,n]]),e[2]!==0){let f=Vt(n.events,e[2]),s=Vt(n.events,e[3]),c={type:l,start:Object.assign({},f),end:Object.assign({},s)};if(t.add(e[2],0,[["enter",c,n]]),r!==2){let p=n.events[e[2]],h=n.events[e[3]];if(p[1].end=Object.assign({},h[1].end),p[1].type="chunkText",p[1].contentType="text",e[3]>e[2]+1){let g=e[2]+1,x=e[3]-e[2]-1;t.add(g,x,[])}}t.add(e[3]+1,0,[["exit",c,n]])}return o!==void 0&&(a.end=Object.assign({},Vt(n.events,o)),t.add(o,0,[["exit",a,n]]),a=void 0),a}function Ti(t,n,e,r,o){let a=[],i=Vt(n.events,e);o&&(o.end=Object.assign({},i),a.push(["exit",o,n])),r.end=Object.assign({},i),a.push(["exit",r,n]),t.add(e+1,0,a)}function Vt(t,n){let e=t[n],r=e[0]==="enter"?"start":"end";return e[1][r]}var cu={name:"tasklistCheck",tokenize:fu};function qn(){return{text:{91:cu}}}function fu(t,n,e){let r=this;return o;function o(u){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?e(u):(t.enter("taskListCheck"),t.enter("taskListCheckMarker"),t.consume(u),t.exit("taskListCheckMarker"),a)}function a(u){return O(u)?(t.enter("taskListCheckValueUnchecked"),t.consume(u),t.exit("taskListCheckValueUnchecked"),i):u===88||u===120?(t.enter("taskListCheckValueChecked"),t.consume(u),t.exit("taskListCheckValueChecked"),i):e(u)}function i(u){return u===93?(t.enter("taskListCheckMarker"),t.consume(u),t.exit("taskListCheckMarker"),t.exit("taskListCheck"),l):e(u)}function l(u){return T(u)?n(u):z(u)?t.check({tokenize:hu},n,e)(u):e(u)}}function hu(t,n,e){return P(t,r,"whitespace");function r(o){return o===null?e(o):n(o)}}function Ai(t){return ce([On(),Nn(),Hn(t),$n(),qn()])}var zi={extensions:[Ai()],mdastExtensions:[Dn()]},pu=/\.(?:png|jpe?g|gif|webp|bmp|svg|avif|heic|tiff?)$/i,Fi={summary:"\u6458\u8981",tldr:"\u6458\u8981",todo:"\u5F85\u529E",check:"\u5B8C\u6210",done:"\u5B8C\u6210",help:"\u95EE\u9898",faq:"\u95EE\u9898",attention:"\u6CE8\u610F",failure:"\u5931\u8D25",fail:"\u5931\u8D25",missing:"\u5931\u8D25",error:"\u5371\u9669",bug:"\u7F3A\u9677",cite:"\u5F15\u7528",note:"\u8BF4\u660E",info:"\u4FE1\u606F",tip:"\u63D0\u793A",hint:"\u63D0\u793A",important:"\u91CD\u8981",warning:"\u6CE8\u610F",caution:"\u6CE8\u610F",danger:"\u5371\u9669",example:"\u793A\u4F8B",quote:"\u5F15\u7528",abstract:"\u6458\u8981",question:"\u95EE\u9898",success:"\u5B8C\u6210"},Wt=t=>({type:"text",value:t});function Un(t,n){n(t);for(let e of t.children??[])Un(e,n)}function mu(t){if(!t.includes("%%"))return t;let n=[];Un(Ce(t,zi),i=>{(i.type==="code"||i.type==="inlineCode")&&n.push([i.position.start.offset,i.position.end.offset])});let e=[],r=0,o=t.indexOf("%%"),a=0;for(;o!==-1;){for(;n[a]?.[1]<=o;)a++;if(n[a]?.[0]<=o){o=t.indexOf("%%",n[a][1]);continue}let i=t.indexOf("%%",o+2);if(i===-1)throw new Error("\u7B14\u8BB0\u4E2D\u6709\u672A\u95ED\u5408\u7684 Obsidian \u6CE8\u91CA\uFF08%%\uFF09\u3002\u8BF7\u95ED\u5408\u6CE8\u91CA\u540E\u518D\u53D1\u5E03\u3002");e.push(t.slice(r,o)),r=i+2,o=t.indexOf("%%",r)}return e.push(t.slice(r)),e.join("")}function Li(t){if(!/^https?:\/\//i.test(t))return!1;try{let n=new URL(t);return!n.username&&!n.password}catch{return!1}}function Pi(t,n){let e=mu(t),r=Ce(e,zi),o=r.children[0];o?.type==="heading"&&o.depth===1&&o.children.every(x=>x.type==="text")&&o.children.map(x=>x.value).join("").trim()===n&&r.children.shift();let a=new Map;Un(r,x=>{x.type==="definition"&&!a.has(x.identifier)&&a.set(x.identifier,x)});let i=[],l=[],u=new Set,f=0;function s(x,I){let k=`https://feishu-publisher.invalid/image/${i.length}.png`;return i.push({...x,placeholder:k}),{type:"image",url:k,alt:I||""}}function c(x,I){if(Li(x))return s({url:x},I);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(x))throw new Error("\u56FE\u7247\u5730\u5740\u987B\u6307\u5411\u5F53\u524D\u4ED3\u5E93\u5185\u7684\u6587\u4EF6\uFF0C\u6216\u4F7F\u7528 HTTP/HTTPS \u94FE\u63A5\u3002");return s({path:x},I)}function p(x){let{value:I,position:k}=x;if(!k||!I.includes("[["))return[x];let S=e.slice(k.start.offset,k.end.offset),w=[],E=0,A=0;for(let b of I.matchAll(/(!?)\[\[([^\[\]\n]+)\]\]/g)){let F=S.indexOf(b[0],A);if(F===-1)continue;A=F+b[0].length;let M=F;for(;M>0&&S[M-1]==="\\";)M--;if((F-M)%2)continue;let[R,y]=b[2].split("|"),D=R.split("#")[0].trim();if(b.index>E&&w.push(Wt(I.slice(E,b.index))),b[1]&&pu.test(D)){let N=/^\d+(?:x\d+)?$/i.test(y??"")?"":y;w.push(c(D,N||D.split("/").at(-1)))}else u.add("\u4ED3\u5E93\u5185\u94FE\u63A5\u548C\u7B14\u8BB0\u5D4C\u5165\u5DF2\u8F6C\u6362\u4E3A\u6587\u672C\u3002"),w.push(Wt(y?.trim()||R.trim()));E=b.index+b[0].length}return E<I.length&&w.push(Wt(I.slice(E))),w}function h(x,I=!1){switch(x.type){case"definition":return[];case"html":return u.add("\u5185\u5D4C HTML \u5DF2\u7701\u7565\u3002"),[];case"image":return[c(x.url,x.alt)];case"imageReference":return[c(a.get(x.identifier).url,x.alt)];case"code":{if(x.lang?.toLowerCase()!=="mermaid")return[x];let k=++f;return[{type:"paragraph",children:[s({mermaid:x.value,number:k},`Mermaid \u56FE ${k}`)]}]}case"text":return I?[x]:p(x);case"blockquote":{let k=x.children[0],S=k?.children?.[0],w=S?.type==="text"&&/^\[!([\w-]+)\]([+-])?[ \t]*/.exec(S.value);if(!w)break;let E=w[1].toLowerCase(),A="feishu-callout-"+crypto.randomUUID(),b=A+"-end";l.push({start:A,end:b,kind:E}),w[2]&&u.add("\u6298\u53E0 Callout \u5728\u98DE\u4E66\u4E2D\u5C55\u5F00\u663E\u793A\u3002"),S.value=S.value.slice(w[0].length);let F=[],M=[],R=!1;for(let D of k.children){if(R){M.push(D);continue}if(D.type==="break"){R=!0;continue}let N=D.type==="text"?D.value.indexOf(`
`):-1;N>=0?(F.push({...D,value:D.value.slice(0,N)}),M.push({...D,value:D.value.slice(N+1)}),R=!0):F.push(D)}F.some(D=>D.type!=="text"||D.value.trim())||F.splice(0,F.length,Wt(Object.hasOwn(Fi,E)?Fi[E]:E));let y=[{type:"paragraph",children:[{type:"strong",children:F}]},...M.length?[{type:"paragraph",children:M}]:[],...x.children.slice(1)].flatMap(D=>h(D,I));return[{type:"paragraph",children:[Wt(A)]},...y,{type:"paragraph",children:[Wt(b)]}]}case"linkReference":x={...x,type:"link",url:a.get(x.identifier).url};break}return x.children&&(x.children=x.children.flatMap(k=>h(k,I||x.type==="link"))),x.type==="link"&&!Li(x.url)?(u.add("\u4ED3\u5E93\u5185\u94FE\u63A5\u548C\u7B14\u8BB0\u5D4C\u5165\u5DF2\u8F6C\u6362\u4E3A\u6587\u672C\u3002"),x.children):[x]}h(r);let g=Fn(r,{extensions:[Bn()],fences:!0}).trim();if(!g)throw new Error("\u8FD9\u7BC7\u7B14\u8BB0\u6CA1\u6709\u53EF\u53D1\u5E03\u7684\u6B63\u6587\u3002");return{markdown:g,assets:i,callouts:l,warnings:[...u]}}var Mi=require("node:buffer"),vi=require("node:dns"),Di=require("node:http"),Bi=require("node:https"),Qt=require("node:net"),Vn=require("node:url"),ae=20*1024*1024,du=new Set([301,302,303,307,308]),ze=new Qt.BlockList;for(let[t,n]of[["0.0.0.0",8],["10.0.0.0",8],["100.64.0.0",10],["127.0.0.0",8],["169.254.0.0",16],["172.16.0.0",12],["192.0.0.0",24],["192.0.2.0",24],["192.88.99.0",24],["192.168.0.0",16],["198.18.0.0",15],["198.51.100.0",24],["203.0.113.0",24],["224.0.0.0",3]])ze.addSubnet(t,n,"ipv4");for(let[t,n]of[["2001::",23],["2001:db8::",32],["2002::",16],["3fff::",20]])ze.addSubnet(t,n,"ipv6");var Ri=new Qt.BlockList;Ri.addSubnet("2000::",3,"ipv6");var nt=class extends Error{};function Oi(t){switch((0,Qt.isIP)(t)){case 4:return!ze.check(t,"ipv4");case 6:return Ri.check(t,"ipv6")&&!ze.check(t,"ipv6");default:return!1}}function gu(t,n,e){(0,vi.lookup)(t,{...n,all:!0},(r,o)=>{if(r)return e(r);let a=o.filter(({address:i})=>Oi(i));return a.length?n.all?e(null,a):e(null,a[0].address,a[0].family):e(new nt("\u56FE\u7247\u5730\u5740\u987B\u6307\u5411\u516C\u7F51\u3002"))})}function ku(t){if(!["https:","http:"].includes(t.protocol)||t.username||t.password)throw new nt("\u56FE\u7247\u94FE\u63A5\u987B\u4F7F\u7528 HTTP \u6216 HTTPS\uFF0C\u4E14\u4E0D\u80FD\u5305\u542B\u767B\u5F55\u51ED\u636E\u3002");let n=t.hostname.replace(/^\[|\]$/g,"");if((0,Qt.isIP)(n)&&!Oi(n))throw new nt("\u56FE\u7247\u5730\u5740\u987B\u6307\u5411\u516C\u7F51\u3002")}function xu(t,n){let e=t.protocol==="https:"?Bi.get:Di.get;return new Promise((r,o)=>{e(t,{lookup:gu,signal:n,agent:!1,headers:{Accept:"image/*","Accept-Encoding":"identity"}},r).once("error",o)})}function wu(t){if(t.subarray(0,8).toString("hex")==="89504e470d0a1a0a")return["png","image/png"];if(t.subarray(0,3).toString("hex")==="ffd8ff")return["jpg","image/jpeg"];if(["GIF87a","GIF89a"].includes(t.toString("ascii",0,6)))return["gif","image/gif"];if(t.toString("ascii",0,4)==="RIFF"&&t.toString("ascii",8,12)==="WEBP")return["webp","image/webp"];if(t.length>=14&&t.toString("ascii",0,2)==="BM")return["bmp","image/bmp"];throw new nt("\u7F51\u5740\u672A\u8FD4\u56DE\u53D7\u652F\u6301\u7684\u56FE\u7247\u3002\u652F\u6301 PNG\u3001JPEG\u3001GIF\u3001WebP \u548C BMP\u3002")}async function bu(t){if(Number(t.headers["content-length"])>ae)throw t.destroy(),new nt("\u56FE\u7247\u8D85\u8FC7 20 MB\u3002");let n=0,e=[];for await(let i of t){if(n+=i.length,n>ae)throw new nt("\u56FE\u7247\u8D85\u8FC7 20 MB\u3002");e.push(i)}let r=Mi.Buffer.concat(e,n),[o,a]=wu(r);return{data:r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength),name:`web-image.${o}`,mime:a}}async function ji(t,n=xu){let e=AbortSignal.timeout(25e3);try{let r=new Vn.URL(t);for(let o=0;o<=5;o++){ku(r);let a=await n(r,e),{statusCode:i,headers:l}=a;if(i===200)return await bu(a);if(a.destroy(),!du.has(i)||!l.location)throw new nt(`\u56FE\u7247\u7F51\u7AD9\u8FD4\u56DE HTTP ${i}\u3002\u8BF7\u786E\u8BA4\u56FE\u7247\u94FE\u63A5\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u3002`);let u=new Vn.URL(l.location,r);if(r.protocol==="https:"&&u.protocol==="http:")throw new nt("\u56FE\u7247\u94FE\u63A5\u8DF3\u8F6C\u5230\u4E86\u672A\u52A0\u5BC6\u7684 HTTP \u5730\u5740\u3002");r=u}throw new nt("\u56FE\u7247\u94FE\u63A5\u8DF3\u8F6C\u6B21\u6570\u8FC7\u591A\u3002")}catch(r){throw r instanceof nt?r:new nt("\u4E0B\u8F7D\u8FDE\u63A5\u5931\u8D25\u6216\u8D85\u65F6\u3002\u8BF7\u786E\u8BA4\u56FE\u7247\u94FE\u63A5\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u3002",{cause:r})}}var Wn={appId:"",secretName:"",workspace:"",collaborator:"",publicReadingByDefault:!1},yu=new Map([["png","image/png"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["gif","image/gif"],["webp","image/webp"],["bmp","image/bmp"]]),le=class extends $.Modal{constructor(n,{title:e,url:r,message:o,warnings:a=[],platform:i="\u98DE\u4E66"}){super(n),this.result={title:e,url:r,message:o,warnings:a,platform:i}}onOpen(){let{title:n,url:e,message:r,warnings:o,platform:a}=this.result;if(this.setTitle(n),this.contentEl.createEl("p",{text:r}),o.length){let i=this.contentEl.createEl("ul");for(let l of o)i.createEl("li",{text:l})}this.contentEl.createEl("a",{text:`\u6253\u5F00${a}\u6587\u6863`,href:e,attr:{target:"_blank",rel:"noopener noreferrer"}}),new $.Setting(this.contentEl).addButton(i=>i.setButtonText("\u590D\u5236\u94FE\u63A5").onClick(async()=>{try{await navigator.clipboard.writeText(e),new $.Notice("\u5DF2\u590D\u5236\u6587\u6863\u94FE\u63A5\u3002")}catch{new $.Notice("\u590D\u5236\u5931\u8D25\uFF0C\u53EF\u53F3\u952E\u70B9\u51FB\u6587\u6863\u94FE\u63A5\u5E76\u590D\u5236\u3002")}}))}onClose(){this.contentEl.empty()}},Qn=class extends $.PluginSettingTab{constructor(n){super(n.app,n),this.publisher=n}display(){let{containerEl:n,publisher:e}=this;n.empty(),n.createEl("p",{text:"\u53D1\u5E03\u4F7F\u7528\u98DE\u4E66\u4F01\u4E1A\u81EA\u5EFA\u5E94\u7528\u521B\u5EFA\u6587\u6863\uFF0C\u5E76\u5C06\u914D\u7F6E\u7684\u98DE\u4E66\u8D26\u53F7\u8BBE\u4E3A\u53EF\u7BA1\u7406\u534F\u4F5C\u8005\u3002"});for(let[r,o,a,i]of[["appId","App ID","\u98DE\u4E66\u81EA\u5EFA\u5E94\u7528\u7684 App ID\u3002","cli_\u2026"],["workspace","\u98DE\u4E66\u5DE5\u4F5C\u533A","\u586B\u5199\u5DE5\u4F5C\u533A\u57DF\u540D\uFF0C\u6216\u7C98\u8D34\u8BE5\u5DE5\u4F5C\u533A\u5185\u4EFB\u610F\u98DE\u4E66\u6587\u6863\u7684\u94FE\u63A5\u3002","example.feishu.cn"],["collaborator","\u98DE\u4E66\u534F\u4F5C\u8005","\u586B\u5199\u4F60\u7684\u98DE\u4E66\u4F01\u4E1A\u90AE\u7BB1\uFF0C\u6216\u5F53\u524D\u5E94\u7528\u4E0B\u7684 Open ID\u3002\u6BCF\u6B21\u53D1\u5E03\u4F1A\u5411\u8FD9\u4E2A\u8D26\u53F7\u6388\u4E88\u53EF\u7BA1\u7406\u6743\u9650\u3002","name@example.com \u6216 ou_\u2026"]])new $.Setting(n).setName(o).setDesc(a).addText(l=>l.setPlaceholder(i).setValue(e.settings[r]).onChange(u=>e.saveSetting(r,u.trim())));new $.Setting(n).setName("App Secret").setDesc("\u5728 Obsidian \u5BC6\u94A5\u5E93\u4E2D\u521B\u5EFA\u6216\u9009\u62E9\u4FDD\u5B58\u4E86 App Secret \u7684\u5BC6\u94A5\u3002").addComponent(r=>new $.SecretComponent(this.app,r).setValue(e.settings.secretName).onChange(o=>e.saveSetting("secretName",o??""))),new $.Setting(n).setName("\u53D1\u5E03\u540E\u9ED8\u8BA4\u5F00\u542F\u4E92\u8054\u7F51\u53EA\u8BFB").setDesc("\u5F00\u542F\u540E\uFF0C\u65B0\u53D1\u5E03\u7684\u6587\u6863\u5141\u8BB8\u4EFB\u4F55\u83B7\u5F97\u94FE\u63A5\u7684\u4EBA\u9605\u8BFB\u3002\u9700\u8981\u81EA\u5EFA\u5E94\u7528\u5177\u5907\u66F4\u65B0\u6587\u6863\u6743\u9650\u7684\u6743\u9650\u3002").addToggle(r=>r.setValue(e.settings.publicReadingByDefault).onChange(o=>e.saveSetting("publicReadingByDefault",o))),new $.Setting(n).setName("\u6D4B\u8BD5\u8FDE\u63A5").setDesc("\u68C0\u67E5\u5E94\u7528\u51ED\u8BC1\u548C Markdown \u8F6C\u6362\u6743\u9650\u3002").addButton(r=>r.setButtonText("\u6D4B\u8BD5").onClick(async()=>{r.setDisabled(!0);try{let{client:o}=e.connection();await o.authenticate(),await o.convert("# Feishu Publisher"),new $.Notice("\u98DE\u4E66\u8FDE\u63A5\u4E0E Markdown \u8F6C\u6362\u6D4B\u8BD5\u901A\u8FC7\u3002")}catch(o){new $.Notice(o.message,12e3)}finally{r.setDisabled(!1)}}))}},Pe=class extends $.Plugin{settings={...Wn};saving=Promise.resolve();publishing=!1;async onload(){let n=await this.loadData();for(let e of Object.keys(Wn))typeof n?.[e]==typeof Wn[e]&&(this.settings[e]=n[e]);this.addSettingTab(new Qn(this)),this.addCommand({id:"publish-active-note",name:"\u53D1\u5E03\u5F53\u524D\u7B14\u8BB0\u5230\u98DE\u4E66\uFF08\u7EDF\u4E00\u94FE\u63A5\u4E0E\u547D\u540D\u7248\u672C\uFF09",checkCallback:e=>{let r=this.app.workspace.getActiveFile();return r?.extension!=="md"?!1:(e||this.publish(r),!0)}}),this.addCommand({id:"publish-active-note-as-new",name:"\u5C06\u5F53\u524D\u7B14\u8BB0\u53D1\u5E03\u4E3A\u65B0\u7684\u98DE\u4E66\u6587\u6863",checkCallback:e=>{let r=this.app.workspace.getActiveFile();return r?.extension!=="md"?!1:(e||this.publish(r,!0),!0)}}),this.addCommand({id:"share-active-note-publicly",name:"\u5C06\u5F53\u524D\u7B14\u8BB0\u5173\u8054\u7684\u98DE\u4E66\u6587\u6863\u8BBE\u4E3A\u4E92\u8054\u7F51\u53EF\u9605\u8BFB",checkCallback:e=>{let r=this.app.workspace.getActiveFile();return r?.extension!=="md"?!1:(e||this.sharePublicly(r),!0)}})}async sharePublicly(n){try{let e=this.app.metadataCache.getFileCache(n)?.frontmatter?.feishu_url;if(typeof e!="string"||!e.trim())throw new Error("\u5F53\u524D\u7B14\u8BB0\u7F3A\u5C11 feishu_url\u3002\u8BF7\u5C06\u5DF2\u6709\u98DE\u4E66\u6587\u6863\u7684\u539F\u94FE\u63A5\u586B\u5165\u8BE5\u5C5E\u6027\u3002");let{client:r,origin:o}=this.connection(),a=await r.enablePublicReading(e.trim(),o);new le(this.app,{title:"\u5DF2\u5F00\u542F\u4E92\u8054\u7F51\u53EA\u8BFB\u5206\u4EAB",message:"\u83B7\u5F97\u94FE\u63A5\u7684\u4EBA\u53EF\u9605\u8BFB\u3002\u53EF\u7528\u6D4F\u89C8\u5668\u65E0\u75D5\u7A97\u53E3\u9A8C\u8BC1\u8BBF\u5BA2\u8BBF\u95EE\u3002",url:a}).open()}catch(e){new $.Notice(e.message,15e3)}}saveSetting(n,e){this.settings[n]=e;let r={...this.settings};return this.saving=this.saving.then(()=>this.saveData(r)).catch(()=>{new $.Notice("\u65E0\u6CD5\u4FDD\u5B58\u98DE\u4E66\u63D2\u4EF6\u8BBE\u7F6E\u3002")}),this.saving}connection(){let{appId:n,secretName:e,workspace:r,collaborator:o}=this.settings;if(!/^cli_[\w-]+$/.test(n))throw new Error("\u8BF7\u5728 Feishu Publisher \u8BBE\u7F6E\u4E2D\u586B\u5199\u6709\u6548\u7684 App ID\u3002");let a=e&&this.app.secretStorage.getSecret(e)?.trim();if(!a)throw new Error("\u8BF7\u5728 Feishu Publisher \u8BBE\u7F6E\u4E2D\u9009\u62E9 App Secret\u3002");let i=nr(r);return{client:new se($.requestUrl,{appId:n,appSecret:a}),origin:i,collaborator:rr(o)}}async loadAssets(n,e){let r=new Map,o=new Map,a=[];for(let i of e){if(i.url){if(!o.has(i.url))try{o.set(i.url,await ji(i.url))}catch(h){throw new Error(`\u7F51\u7EDC\u56FE\u7247\uFF08${new URL(i.url).hostname}\uFF09\u4E0B\u8F7D\u5931\u8D25\u3002${h.message}`)}a.push({...o.get(i.url),placeholder:i.placeholder});continue}if("mermaid"in i){a.push(i);continue}let l=i.path.split("#")[0],u=l;try{u=decodeURIComponent(l)}catch{}let{metadataCache:f,vault:s}=this.app,c=f.getFirstLinkpathDest(u,n.path)??(u!==l?f.getFirstLinkpathDest(l,n.path):null);if(!(c instanceof $.TFile)||s.getFileByPath(c.path)!==c)throw new Error(`\u627E\u4E0D\u5230\u4ED3\u5E93\u5185\u7684\u56FE\u7247\u300C${i.path}\u300D\u3002`);let p=yu.get(c.extension.toLowerCase());if(!p)throw new Error(`\u56FE\u7247\u300C${c.name}\u300D\u683C\u5F0F\u6682\u4E0D\u652F\u6301\uFF0C\u8BF7\u6539\u7528 PNG\u3001JPEG\u3001GIF\u3001WebP \u6216 BMP\u3002`);if(!r.has(c.path)){if(!c.stat.size||c.stat.size>ae)throw new Error(`\u56FE\u7247\u300C${c.name}\u300D\u4E3A\u7A7A\u6216\u8D85\u8FC7 20 MB\u3002`);let h=await s.readBinary(c);if(!h.byteLength||h.byteLength>ae)throw new Error(`\u56FE\u7247\u300C${c.name}\u300D\u4E3A\u7A7A\u6216\u8D85\u8FC7 20 MB\u3002`);r.set(c.path,h)}a.push({...i,name:c.name,mime:p,data:r.get(c.path)})}return a}async publish(n,e=!1){if(this.publishing){new $.Notice("\u5DF2\u6709\u4E00\u7BC7\u7B14\u8BB0\u6B63\u5728\u53D1\u5E03\u3002");return}this.publishing=!0;let r=new $.Notice("\u6B63\u5728\u51C6\u5907\u5E76\u53D1\u5E03\u5230\u98DE\u4E66\u2026",0),o;try{let{publicReadingByDefault:a}=this.settings,{client:i,origin:l,collaborator:u}=this.connection(),f=this.app.workspace.getActiveViewOfType($.MarkdownView),s=f?.file===n&&f.getMode()==="source"?f.editor.getValue():await this.app.vault.read(n),{exists:c,contentStart:p,frontmatter:h}=(0,$.getFrontMatterInfo)(s),g=c?(0,$.parseYaml)(h)??{}:{};if(typeof g!="object"||Array.isArray(g))throw new Error("\u7B14\u8BB0\u5C5E\u6027\u683C\u5F0F\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5 YAML\u3002");o=ir(g,l,e);let x=n.basename.trim(),I=Pi(c?s.slice(p):s,x),k=await this.loadAssets(n,I.assets),S=g.feishu_pending_snapshot;if(S){if(!o.url||typeof S.name!="string"||S.url!==o.url)throw new Error("\u5B58\u5728\u5F85\u786E\u8BA4\u7684\u547D\u540D\u7248\u672C\uFF0C\u8BF7\u5148\u6838\u5BF9 feishu_pending_snapshot \u4E0E\u539F\u6587\u6863\u94FE\u63A5\u3002");await i.ensureNamedVersion(o.url,l,S.name,S)}o.url&&await i.listVersions(o.url,l);let w=await i[o.action==="update"?"update":"publish"]({...I,assets:k,title:x,origin:l,collaborator:u,url:o.url}),E;try{E=await i.ensureNamedVersion(w,l,o.version)}catch(b){throw b.url||(b.url=w),b}let A=o.action==="update"?"\u5DF2\u66F4\u65B0\u539F\u6587\u6863\uFF0C\u4E3B\u94FE\u63A5\u4E0D\u53D8\u3002":`\u5DF2\u521B\u5EFA\u6587\u6863\uFF0C\u5E76\u5411 ${u.member_id} \u6388\u4E88\u53EF\u7BA1\u7406\u6743\u9650\u3002`;if(A+=E.created?`\u5DF2\u4FDD\u5B58\u98DE\u4E66\u547D\u540D\u7248\u672C\u300C${o.version}\u300D\u3002`:`\u5DF2\u4FDD\u7559\u547D\u540D\u7248\u672C\u300C${o.version}\u300D\u3002`,a&&o.action==="create")try{await i.enablePublicReading(w,l),A+="\u5DF2\u5F00\u542F\u4E92\u8054\u7F51\u53EA\u8BFB\u5206\u4EAB\u3002"}catch(b){I.warnings.push(`\u672A\u80FD\u786E\u8BA4\u81EA\u52A8\u5F00\u542F\u4E92\u8054\u7F51\u53EA\u8BFB\u5206\u4EAB\u3002${b.message}`)}try{await this.app.fileManager.processFrontMatter(n,b=>{Oe(b,o,w)})}catch{I.warnings.push("\u98DE\u4E66\u6587\u6863\u5DF2\u53D1\u5E03\uFF0C\u4F46\u7248\u672C\u4E0E\u94FE\u63A5\u672A\u80FD\u5199\u56DE\u539F\u7B14\u8BB0\u3002\u8BF7\u4FDD\u5B58\u672C\u6B21\u94FE\u63A5\u53CA\u7248\u672C\uFF0C\u907F\u514D\u4E0B\u6B21\u91CD\u590D\u521B\u5EFA\u3002")}new le(this.app,{title:"\u5DF2\u53D1\u5E03\u5230\u98DE\u4E66",message:A,url:w,warnings:I.warnings}).open()}catch(a){if(a.url){try{await this.app.fileManager.processFrontMatter(n,i=>{Oe(i,o,a.url,!1),a.snapshot&&(i.feishu_pending_snapshot=a.snapshot)})}catch{}new le(this.app,{title:"\u98DE\u4E66\u53D1\u5E03\u672A\u5B8C\u6210",url:a.url,message:a.message}).open()}else new $.Notice(a.message,15e3)}finally{r.hide(),this.publishing=!1}}};
/*
# Third-party notices

The bundled Markdown implementation uses the following packages and licenses.

## @types/debug 4.1.13

```text
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

```

## @types/mdast 4.0.4

```text
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

```

## @types/ms 2.1.0

```text
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

```

## @types/unist 3.0.3

```text
    MIT License

    Copyright (c) Microsoft Corporation.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

```

## ccount 2.0.1

```text
(The MIT License)

Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## character-entities 2.0.2

```text
(The MIT License)

Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## debug 4.4.3

```text
(The MIT License)

Copyright (c) 2014-2017 TJ Holowaychuk <tj@vision-media.ca>
Copyright (c) 2018-2021 Josh Junon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the 'Software'), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


```

## decode-named-character-reference 1.3.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## dequal 2.0.3

```text
The MIT License (MIT)

Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```

## devlop 1.1.0

```text
(The MIT License)

Copyright (c) 2023 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## escape-string-regexp 5.0.0

```text
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## longest-streak 3.1.0

```text
(The MIT License)

Copyright (c) 2015 Titus Wormer <mailto:tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## markdown-table 3.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-find-and-replace 3.0.4

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-from-markdown 2.0.3

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm 3.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm-autolink-literal 2.0.1

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm-footnote 2.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm-strikethrough 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm-table 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-gfm-task-list-item 2.0.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-phrasing 4.1.0

```text
(The MIT License)

Copyright (c) 2017 Titus Wormer <tituswormer@gmail.com>
Copyright (c) 2017 Victor Felder <victor@draft.li>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-to-markdown 2.1.2

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## mdast-util-to-string 4.0.0

```text
(The MIT License)

Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark 4.0.3

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-core-commonmark 2.0.4

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm 3.0.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-autolink-literal 2.1.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-footnote 2.1.0

```text
(The MIT License)

Copyright (c) 2021 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-strikethrough 2.1.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-table 2.1.2

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-tagfilter 2.0.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-extension-gfm-task-list-item 2.1.0

```text
(The MIT License)

Copyright (c) 2020 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-factory-destination 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-factory-label 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-factory-space 2.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-factory-title 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-factory-whitespace 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-character 2.1.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-chunked 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-classify-character 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-combine-extensions 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-decode-numeric-character-reference 2.0.2

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-decode-string 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-edit-map 1.0.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-encode 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-html-tag-name 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-normalize-identifier 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-resolve-all 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-sanitize-uri 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-subtokenize 2.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-symbol 2.0.1

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## micromark-util-types 2.0.3

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## ms 2.1.3

```text
The MIT License (MIT)

Copyright (c) 2020 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## unist-util-is 6.0.1

```text
(The MIT license)

Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## unist-util-stringify-position 4.0.0

```text
(The MIT License)

Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## unist-util-visit 5.2.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## unist-util-visit-parents 6.1.0

```text
(The MIT License)

Copyright (c) Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

## zwitch 2.0.4

```text
(The MIT License)

Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```

*/
