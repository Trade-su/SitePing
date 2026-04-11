var R,xe,Ue;function Xe(n,e){if(Ue=new Date,n.nodeType!==Node.ELEMENT_NODE)throw new Error("Can't generate CSS selector for non-element node type.");if(n.tagName.toLowerCase()==="html")return"html";let t={root:document.body,idName:i=>!0,className:i=>!0,tagName:i=>!0,attr:(i,o)=>!1,seedMinLength:1,optimizedMinLength:2,threshold:1e3,maxNumberOfTries:1e4,timeoutMs:void 0};R={...t,...e},xe=Jt(R.root,t);let s=U(n,"all",()=>U(n,"two",()=>U(n,"one",()=>U(n,"none"))));if(s){let i=Ge(Qe(s,n));return i.length>0&&(s=i[0]),V(s)}else throw new Error("Selector was not found.")}function Jt(n,e){return n.nodeType===Node.DOCUMENT_NODE?n:n===e.root?n.ownerDocument:n}function U(n,e,t){let s=null,i=[],o=n,r=0;for(;o;){let a=new Date().getTime()-Ue.getTime();if(R.timeoutMs!==void 0&&a>R.timeoutMs)throw new Error(`Timeout: Can't find a unique selector after ${a}ms`);let l=W(Zt(o))||W(...es(o))||W(...ts(o))||W(ss(o))||[qe()],d=ns(o);if(e=="all")d&&(l=l.concat(l.filter(ve).map(h=>X(h,d))));else if(e=="two")l=l.slice(0,1),d&&(l=l.concat(l.filter(ve).map(h=>X(h,d))));else if(e=="one"){let[h]=l=l.slice(0,1);d&&ve(h)&&(l=[X(h,d)])}else e=="none"&&(l=[qe()],d&&(l=[X(l[0],d)]));for(let h of l)h.level=r;if(i.push(l),i.length>=R.seedMinLength&&(s=Ke(i,t),s))break;o=o.parentElement,r++}return s||(s=Ke(i,t)),!s&&t?t():s}function Ke(n,e){let t=Ge(Ve(n));if(t.length>R.threshold)return e?e():null;for(let s of t)if(We(s))return s;return null}function V(n){let e=n[0],t=e.name;for(let s=1;s<n.length;s++){let i=n[s].level||0;e.level===i-1?t=`${n[s].name} > ${t}`:t=`${n[s].name} ${t}`,e=n[s]}return t}function Ye(n){return n.map(e=>e.penalty).reduce((e,t)=>e+t,0)}function We(n){let e=V(n);switch(xe.querySelectorAll(e).length){case 0:throw new Error(`Can't select any node with this selector: ${e}`);case 1:return!0;default:return!1}}function Zt(n){let e=n.getAttribute("id");return e&&R.idName(e)?{name:"#"+CSS.escape(e),penalty:0}:null}function es(n){return Array.from(n.attributes).filter(t=>R.attr(t.name,t.value)).map(t=>({name:`[${CSS.escape(t.name)}="${CSS.escape(t.value)}"]`,penalty:.5}))}function ts(n){return Array.from(n.classList).filter(R.className).map(t=>({name:"."+CSS.escape(t),penalty:1}))}function ss(n){let e=n.tagName.toLowerCase();return R.tagName(e)?{name:e,penalty:2}:null}function qe(){return{name:"*",penalty:3}}function ns(n){let e=n.parentNode;if(!e)return null;let t=e.firstChild;if(!t)return null;let s=0;for(;t&&(t.nodeType===Node.ELEMENT_NODE&&s++,t!==n);)t=t.nextSibling;return s}function X(n,e){return{name:n.name+`:nth-child(${e})`,penalty:n.penalty+1}}function ve(n){return n.name!=="html"&&!n.name.startsWith("#")}function W(...n){let e=n.filter(is);return e.length>0?e:null}function is(n){return n!=null}function*Ve(n,e=[]){if(n.length>0)for(let t of n[0])yield*Ve(n.slice(1,n.length),e.concat(t));else yield e}function Ge(n){return[...n].sort((e,t)=>Ye(e)-Ye(t))}function*Qe(n,e,t={counter:0,visited:new Map}){if(n.length>2&&n.length>R.optimizedMinLength)for(let s=1;s<n.length-1;s++){if(t.counter>R.maxNumberOfTries)return;t.counter+=1;let i=[...n];i.splice(s,1);let o=V(i);if(t.visited.has(o))return;We(i)&&os(i,e)&&(yield i,t.visited.set(o,!0),yield*Qe(i,e,t))}}function os(n,e){return xe.querySelector(V(n))===e}var rs=["role","aria-label","type","name","href","src","data-testid","data-id"];function as(n){let e=5381;for(let t=0;t<n.length;t++)e=(e<<5)+e+n.charCodeAt(t)|0;return(e>>>0).toString(36)}function ye(n){let e=n.children.length,t=0,s=n.parentElement;if(s)for(let r of s.children){if(r===n)break;r.tagName===n.tagName&&t++}let i=[];for(let r of rs){let a=n.getAttribute(r);a&&i.push(`${r}=${a}`)}let o=i.length>0?as(i.join(",")):"0";return`${e}:${t}:${o}`}function Je(n,e){let t=e.split(":");if(t.length!==3)return 0;let[s,i,o]=t,r=Number(s),a=Number(i);if(Number.isNaN(r)||Number.isNaN(a))return 0;let l=ye(n),[d,h,b]=l.split(":"),g=0,f=Math.abs(Number(d)-r);f===0?g+=.2:f<=2?g+=.1:f<=5&&(g+=.03);let x=Math.abs(Number(h)-a);return x===0?g+=.4:x===1?g+=.2:x<=3&&(g+=.08),b===o&&(g+=.4),g}function D(n,e){let t=e==="before"?"previousElementSibling":"nextElementSibling",s=n[t],i=3;for(;s&&i>0;){let o=s.textContent?.trim();if(o)return e==="before"?o.slice(-32):o.slice(0,32);s=s[t],i--}return""}function G(n){let e=n.previousElementSibling?.textContent?.trim().slice(0,40)??"",t=n.nextElementSibling?.textContent?.trim().slice(0,40)??"";return[e,t].filter(Boolean).join(" | ")}function Ze(n){if(n.id){let s=n.id.includes("'")?`concat('${n.id.replace(/'/g,`',"'",'`)}')`:`'${n.id}'`;return`//${n.localName}[@id=${s}]`}let e=[],t=n;for(;t&&t!==document.body&&e.length<6;){let s=t.localName,i=t.parentElement;if(t.id){let r=t.id.includes("'")?`concat('${t.id.replace(/'/g,`',"'",'`)}')`:`'${t.id}'`;return e.unshift(`/${s}[@id=${r}]`),"/"+e.join("")}let o=1;if(i)for(let r of i.children){if(r===t)break;r.localName===s&&o++}e.unshift(`/${s}[${o}]`),t=i}return"/html/body"+e.join("")}function ke(n){let e=Xe(n,{className:d=>!/^(css|sc|emotion|styled)-/.test(d)&&!/^[a-z]{1,3}[A-Za-z0-9]{4,8}$/.test(d),attr:d=>["data-testid","data-id","role","aria-label"].includes(d),idName:d=>!d.startsWith("radix-")&&!/^:r[0-9]+:$/.test(d),seedMinLength:3,optimizedMinLength:2}),t=Ze(n),i=(n.textContent?.trim()??"").slice(0,120),o=D(n,"before"),r=D(n,"after"),a=ye(n),l=G(n);return{cssSelector:e,xpath:t,textSnippet:i,textPrefix:o,textSuffix:r,fingerprint:a,neighborText:l,elementTag:n.tagName,elementId:n.id||void 0}}function et(n,e=document.documentElement){let t=n.x+n.width/2,s=n.y+n.height/2,i=document.elementFromPoint(t,s);if(!i||i===e)return document.body;let o=i,r=i;for(;r&&r!==document.body;){let a=r.getBoundingClientRect();if(a.left<=n.x&&a.top<=n.y&&a.right>=n.x+n.width&&a.bottom>=n.y+n.height){o=r;break}r=r.parentElement}return o}function tt(n,e){return e.width<=0||e.height<=0?{xPct:0,yPct:0,wPct:1,hPct:1}:{xPct:(n.x-e.x)/e.width,yPct:(n.y-e.y)/e.height,wPct:n.width/e.width,hPct:n.height/e.height}}function v(n){let s=document.createRange().createContextualFragment(n).firstElementChild;if(!s||s.nodeName.toLowerCase()!=="svg")throw new Error("[siteping] Invalid SVG string");for(let i of[...s.attributes])i.name.startsWith("on")&&s.removeAttribute(i.name);for(let i of s.querySelectorAll("*"))for(let o of[...i.attributes])o.name.startsWith("on")&&i.removeAttribute(o.name);return s}function p(n,e){let t=document.createElement(n);if(e)for(let[s,i]of Object.entries(e))s==="class"?t.className=i:s==="style"?t.style.cssText=i:t.setAttribute(s,i);return t}function c(n,e){n.textContent=e}function Q(n,e="en"){let t=Date.now()-new Date(n).getTime(),s=Math.floor(t/1e3);if(s<60)return new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(0,"second");let i=new Intl.RelativeTimeFormat(e,{numeric:"always",style:"narrow"}),o=Math.floor(s/60);if(o<60)return i.format(-o,"minute");let r=Math.floor(o/60);if(r<24)return i.format(-r,"hour");let a=Math.floor(r/24);return a<7?i.format(-a,"day"):new Date(n).toLocaleDateString(e)}var we='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',st='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',nt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>',Ce='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Ee='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',J='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',it='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',ot='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',rt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',at='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',lt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 9h2"/><path d="M3 9h2"/><path d="M19 13h2"/><path d="M3 13h2"/><path d="M19 17h2"/><path d="M3 17h2"/><path d="M10 2h4"/></svg>',pt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',dt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Te='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';var ht="#0066ff",ls=/^#[0-9a-fA-F]{6}$/,ct=/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/,ps=/^#[0-9a-fA-F]{8}$/;function ds(n){if(ls.test(n))return n;let e=ct.test(n)?n.match(ct):null;return e?`#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}`:ps.test(n)?n.slice(0,7):(console.warn(`[siteping] Invalid accentColor "${n}" \u2014 only hex colors (#RGB, #RRGGBB, #RRGGBBAA) are supported. Using default.`),ht)}function cs(n,e){let t=Math.max(0,Math.round(parseInt(n.slice(1,3),16)*(1-e))),s=Math.max(0,Math.round(parseInt(n.slice(3,5),16)*(1-e))),i=Math.max(0,Math.round(parseInt(n.slice(5,7),16)*(1-e)));return`#${t.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}`}function hs(){return typeof window>"u"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches}function us(n){return n==="dark"||n==="auto"&&hs()?"dark":"light"}function ut(n=ht,e){let t=ds(n),s=cs(t,.15);return us(e)==="dark"?{accent:t,accentLight:t+"22",accentDark:s,accentGlow:t+"44",accentGradient:`linear-gradient(135deg, ${t}, ${s})`,bg:"#0f172a",bgHover:"#1e293b",text:"#f1f5f9",textSecondary:"#94a3b8",textTertiary:"#64748b",border:"#334155",shadow:"rgba(0, 0, 0, 0.3)",glassBg:"rgba(15, 23, 42, 0.78)",glassBgHeavy:"rgba(15, 23, 42, 0.88)",glassBorder:"rgba(51, 65, 85, 0.5)",glassBorderSubtle:"rgba(51, 65, 85, 0.3)",typeQuestion:"#60a5fa",typeChange:"#fbbf24",typeBug:"#f87171",typeOther:"#94a3b8",typeQuestionBg:"rgba(59, 130, 246, 0.15)",typeChangeBg:"rgba(245, 158, 11, 0.15)",typeBugBg:"rgba(239, 68, 68, 0.15)",typeOtherBg:"rgba(100, 116, 139, 0.15)"}:{accent:t,accentLight:t+"14",accentDark:s,accentGlow:t+"33",accentGradient:`linear-gradient(135deg, ${t}, ${s})`,bg:"#ffffff",bgHover:"#f8f9fb",text:"#0f172a",textSecondary:"#475569",textTertiary:"#64748b",border:"#e2e8f0",shadow:"rgba(0, 0, 0, 0.06)",glassBg:"rgba(255, 255, 255, 0.72)",glassBgHeavy:"rgba(255, 255, 255, 0.85)",glassBorder:"rgba(255, 255, 255, 0.35)",glassBorderSubtle:"rgba(255, 255, 255, 0.18)",typeQuestion:"#3b82f6",typeChange:"#b45309",typeBug:"#ef4444",typeOther:"#64748b",typeQuestionBg:"#eff6ff",typeChangeBg:"#fffbeb",typeBugBg:"#fef2f2",typeOtherBg:"#f8fafc"}}function B(n,e){switch(n){case"question":return e.typeQuestion;case"change":return e.typeChange;case"bug":return e.typeBug;default:return e.typeOther}}function N(n,e){switch(n){case"question":return e.typeQuestionBg;case"change":return e.typeChangeBg;case"bug":return e.typeBugBg;default:return e.typeOtherBg}}function bt(n){return`
    --sp-accent: ${n.accent};
    --sp-accent-light: ${n.accentLight};
    --sp-accent-dark: ${n.accentDark};
    --sp-accent-glow: ${n.accentGlow};
    --sp-accent-gradient: ${n.accentGradient};
    --sp-bg: ${n.bg};
    --sp-bg-hover: ${n.bgHover};
    --sp-text: ${n.text};
    --sp-text-secondary: ${n.textSecondary};
    --sp-text-tertiary: ${n.textTertiary};
    --sp-border: ${n.border};
    --sp-shadow: ${n.shadow};
    --sp-glass-bg: ${n.glassBg};
    --sp-glass-bg-heavy: ${n.glassBgHeavy};
    --sp-glass-border: ${n.glassBorder};
    --sp-glass-border-subtle: ${n.glassBorderSubtle};
    --sp-type-question: ${n.typeQuestion};
    --sp-type-change: ${n.typeChange};
    --sp-type-bug: ${n.typeBug};
    --sp-type-other: ${n.typeOther};
    --sp-type-question-bg: ${n.typeQuestionBg};
    --sp-type-change-bg: ${n.typeChangeBg};
    --sp-type-bug-bg: ${n.typeBugBg};
    --sp-type-other-bg: ${n.typeOtherBg};
    --sp-radius: 12px;
    --sp-radius-lg: 16px;
    --sp-radius-xl: 20px;
    --sp-radius-full: 9999px;
    --sp-blur: 20px;
    --sp-blur-heavy: 32px;
    --sp-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
    --sp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
    --sp-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.04);
    --sp-shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);
    --sp-font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  `}var Z=class{constructor(e,t){this.colors=e;this.t=t;this.root=p("div",{style:`
        position:fixed;
        z-index:${2147483647};
        width:300px;
        padding:16px;
        border-radius:16px;
        background:${this.colors.glassBg};
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        border:1px solid ${this.colors.glassBorder};
        box-shadow:0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        opacity:0;
        transform:translateY(8px) scale(0.98);
        transition:opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display:none;
        -webkit-font-smoothing:antialiased;
      `}),this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label",this.t("popup.ariaLabel"));let s=[{type:"question",label:this.t("type.question"),icon:rt},{type:"change",label:this.t("type.change"),icon:at},{type:"bug",label:this.t("type.bug"),icon:lt},{type:"other",label:this.t("type.other"),icon:pt}],i=p("div",{style:"display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;"});for(let h of s){let b=document.createElement("button");b.style.cssText=`
        height:44px;
        border-radius:9999px;border:1px solid ${this.colors.border};
        background:${this.colors.glassBg};cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:5px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:13px;font-weight:500;color:${this.colors.textTertiary};
        transition:all 0.2s ease;
        padding:0 12px;
      `;let g=v(h.icon);g.setAttribute("style","width:13px;height:13px;flex-shrink:0;"),b.appendChild(g);let f=document.createElement("span");c(f,h.label),b.appendChild(f),b.dataset.type=h.type,b.setAttribute("aria-pressed","false"),b.addEventListener("click",()=>{this.selectType(h.type,i)}),b.addEventListener("mouseenter",()=>{if(b.dataset.type!==this.selectedType){let x=N(b.dataset.type??"",this.colors);b.style.background=x,b.style.borderColor=B(b.dataset.type??"",this.colors)+"40"}}),b.addEventListener("mouseleave",()=>{b.dataset.type!==this.selectedType&&(b.style.background=this.colors.glassBg,b.style.borderColor=this.colors.border)}),i.appendChild(b)}this.textarea=document.createElement("textarea"),this.textarea.style.cssText=`
      width:100%;min-height:72px;max-height:152px;
      padding:10px 12px;border-radius:12px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBgHeavy};
      color:${this.colors.text};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;line-height:1.5;resize:vertical;
      outline:none;transition:all 0.2s ease;
      box-sizing:border-box;
    `,this.textarea.placeholder=this.t("popup.placeholder"),this.textarea.maxLength=5e3,this.textarea.setAttribute("aria-label",this.t("popup.textareaAria"));let o=p("div",{style:`
        font-size:11px;color:${this.colors.textTertiary};
        text-align:right;margin-top:4px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        letter-spacing:0.01em;
      `}),r=navigator.userAgentData,a=r?r.platform==="macOS":navigator.platform?.includes("Mac")??/Macintosh|Mac OS X/i.test(navigator.userAgent);c(o,a?this.t("popup.submitHintMac"):this.t("popup.submitHintOther")),this.textarea.addEventListener("focus",()=>{this.textarea.style.borderColor=this.colors.accent,this.textarea.style.boxShadow=`0 0 0 3px ${this.colors.accent}14`,this.textarea.style.background=this.colors.bg}),this.textarea.addEventListener("blur",()=>{this.textarea.style.borderColor=this.colors.border,this.textarea.style.boxShadow="none",this.textarea.style.background=this.colors.glassBgHeavy}),this.textarea.addEventListener("input",()=>{this.updateSubmitState()}),this.textarea.addEventListener("keydown",h=>{h.key==="Enter"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),this.submit()),h.key==="Escape"&&this.cancel()});let l=p("div",{style:"display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"}),d=document.createElement("button");d.style.cssText=`
      height:34px;padding:0 16px;border-radius:9999px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBg};
      color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;
      transition:all 0.2s ease;
    `,c(d,this.t("popup.cancel")),d.addEventListener("click",()=>this.cancel()),d.addEventListener("mouseenter",()=>{d.style.borderColor=this.colors.accent,d.style.color=this.colors.accent}),d.addEventListener("mouseleave",()=>{d.style.borderColor=this.colors.border,d.style.color=this.colors.textTertiary}),this.submitBtn=document.createElement("button"),this.submitBtn.style.cssText=`
      height:34px;padding:0 18px;border-radius:9999px;
      border:none;background:${this.colors.accentGradient};
      color:#fff;font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:600;cursor:pointer;
      opacity:0.35;pointer-events:none;
      transition:all 0.2s ease;
      box-shadow:0 2px 8px ${this.colors.accentGlow};
    `,c(this.submitBtn,this.t("popup.submit")),this.submitBtn.addEventListener("click",()=>this.submit()),l.appendChild(d),l.appendChild(this.submitBtn),this.root.appendChild(i),this.root.appendChild(this.textarea),this.root.appendChild(o),this.root.appendChild(l),document.body.appendChild(this.root)}colors;t;root;selectedType=null;textarea;submitBtn;resolve=null;previouslyFocused=null;onKeydownTrap=null;show(e){return new Promise(t=>{this.resolve=t,this.selectedType=null,this.textarea.value="",this.updateSubmitState(),this.resetTypeButtons(),this.previouslyFocused=document.activeElement;let s=e.bottom+8,i=e.left;s+220>window.innerHeight&&(s=e.top-220-8),i+300>window.innerWidth&&(i=e.right-300),i=Math.max(8,i),s=Math.max(8,s),this.root.style.top=`${s}px`,this.root.style.left=`${i}px`,this.root.style.display="block",this.onKeydownTrap=r=>{if(r.key==="Tab"){let a=Array.from(this.root.querySelectorAll('button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])'));if(a.length===0)return;let l=a[0],d=a[a.length-1];if(!l||!d)return;r.shiftKey?(document.activeElement===l||!this.root.contains(document.activeElement))&&(r.preventDefault(),d.focus()):(document.activeElement===d||!this.root.contains(document.activeElement))&&(r.preventDefault(),l.focus())}},this.root.addEventListener("keydown",this.onKeydownTrap);let o=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=o?"none":"",requestAnimationFrame(()=>{this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)",this.textarea.focus()})})}selectType(e,t){this.selectedType=e;let s=t.querySelectorAll("button");for(let i of s){let o=i.dataset.type===e,r=B(i.dataset.type??"",this.colors),a=N(i.dataset.type??"",this.colors);i.style.background=o?a:this.colors.glassBg,i.style.borderColor=o?r+"60":this.colors.border,i.style.color=o?r:this.colors.textTertiary,i.style.fontWeight=o?"600":"500",i.setAttribute("aria-pressed",String(o))}this.updateSubmitState()}resetTypeButtons(){let e=this.root.querySelectorAll("button[data-type]");for(let t of e)t.setAttribute("aria-pressed","false"),t.style.background=this.colors.glassBg,t.style.borderColor=this.colors.border,t.style.color=this.colors.textTertiary,t.style.fontWeight="500"}updateSubmitState(){let e=this.selectedType!==null&&this.textarea.value.trim().length>0;this.submitBtn.disabled=!e,this.submitBtn.style.opacity=e?"1":"0.35",this.submitBtn.style.pointerEvents=e?"auto":"none"}submit(){!this.selectedType||!this.textarea.value.trim()||(this.resolve?.({type:this.selectedType,message:this.textarea.value.trim()}),this.resolve=null,this.hideElement())}cancel(){this.resolve?.(null),this.resolve=null,this.hideElement()}hideElement(){this.onKeydownTrap&&(this.root.removeEventListener("keydown",this.onKeydownTrap),this.onKeydownTrap=null),this.root.style.opacity="0",this.root.style.transform="translateY(8px) scale(0.98)",this.previouslyFocused?.focus(),this.previouslyFocused=null,setTimeout(()=>{this.root.style.display="none"},250)}destroy(){this.root.remove()}};var ee=class{constructor(e,t,s){this.colors=e;this.bus=t;this.t=s;this.popup=new Z(e,s),this.bus.on("annotation:start",()=>this.activate())}colors;bus;t;overlay=null;toolbar=null;drawingRect=null;startX=0;startY=0;isDrawing=!1;isActive=!1;popup;savedOverflow="";preActiveFocusElement=null;rafId=null;pendingMoveEvent=null;activate(){if(this.isActive)return;this.isActive=!0,this.preActiveFocusElement=document.activeElement,this.savedOverflow=document.body.style.overflow,document.body.style.overflow="hidden",this.overlay=p("div",{style:`
        position:fixed;inset:0;
        z-index:${2147483646};
        background:rgba(15, 23, 42, 0.04);
        cursor:crosshair;
      `}),this.overlay.setAttribute("aria-hidden","true"),this.toolbar=p("div",{style:`
        position:fixed;bottom:0;left:0;right:0;
        z-index:${2147483647};
        height:52px;
        background:${this.colors.glassBg};
        backdrop-filter:blur(24px);
        -webkit-backdrop-filter:blur(24px);
        border-top:1px solid ${this.colors.glassBorder};
        display:flex;align-items:center;justify-content:center;gap:16px;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:14px;color:${this.colors.text};
        box-shadow:0 -4px 16px ${this.colors.shadow};
        -webkit-font-smoothing:antialiased;
      `});let e=p("span",{style:`
        width:8px;height:8px;border-radius:50%;
        background:${this.colors.accent};
        box-shadow:0 0 8px ${this.colors.accentGlow};
        animation:pulse 1.5s ease-in-out infinite;
      `}),t=document.createElement("style");t.textContent=["@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}","@media(prefers-reduced-motion:reduce){@keyframes pulse{from,to{opacity:1}}}"].join(""),this.toolbar.appendChild(t);let s=p("span",{style:"font-weight:500;letter-spacing:-0.01em;"});c(s,this.t("annotator.instruction"));let i=document.createElement("button");i.style.cssText=`
      height:34px;padding:0 18px;border-radius:9999px;
      border:1px solid ${this.colors.border};
      background:${this.colors.glassBg};
      color:${this.colors.textTertiary};font-family:"Inter",system-ui,-apple-system,sans-serif;
      font-size:13px;font-weight:500;cursor:pointer;
      transition:all 0.2s ease;
    `,c(i,this.t("annotator.cancel")),i.addEventListener("click",()=>this.deactivate()),i.addEventListener("mouseenter",()=>{i.style.borderColor=this.colors.typeBug,i.style.color=this.colors.typeBug,i.style.background=this.colors.typeBugBg}),i.addEventListener("mouseleave",()=>{i.style.borderColor=this.colors.border,i.style.color=this.colors.textTertiary,i.style.background=this.colors.glassBg}),this.toolbar.appendChild(e),this.toolbar.appendChild(s),this.toolbar.appendChild(i),this.overlay.addEventListener("mousedown",this.onMouseDown),this.overlay.addEventListener("mousemove",this.onMouseMove),this.overlay.addEventListener("mouseup",this.onMouseUp),this.overlay.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.overlay.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.overlay.addEventListener("touchend",this.onTouchEnd),this.overlay.addEventListener("keydown",this.onOverlayKeyDown),this.overlay.setAttribute("tabindex","0"),document.addEventListener("keydown",this.onKeyDown),document.body.appendChild(this.overlay),document.body.appendChild(this.toolbar)}deactivate(){this.isActive&&(this.isActive=!1,this.isDrawing=!1,this.preActiveFocusElement=null,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.pendingMoveEvent=null,document.body.style.overflow=this.savedOverflow,document.removeEventListener("keydown",this.onKeyDown),this.overlay?.remove(),this.toolbar?.remove(),this.drawingRect?.remove(),this.overlay=null,this.toolbar=null,this.drawingRect=null,this.bus.emit("annotation:end"))}onKeyDown=e=>{e.key==="Escape"&&this.deactivate()};onOverlayKeyDown=async e=>{if(e.key!=="Enter")return;e.preventDefault();let t=this.preActiveFocusElement;if(!t||!(t instanceof HTMLElement))return;let s=t.getBoundingClientRect();if(s.width<=0||s.height<=0)return;let i=new DOMRect(s.x,s.y,s.width,s.height),o=await this.popup.show(i);if(!o)return;let a={anchor:ke(t),rect:{xPct:0,yPct:0,wPct:1,hPct:1},scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio};this.deactivate(),this.bus.emit("annotation:complete",{annotation:a,type:o.type,message:o.message})};onMouseDown=e=>{this.startDrawing(e.clientX,e.clientY)};onTouchStart=e=>{e.preventDefault();let t=e.touches[0];t&&this.startDrawing(t.clientX,t.clientY)};startDrawing(e,t){this.isDrawing=!0,this.startX=e,this.startY=t,this.drawingRect?.remove(),this.drawingRect=p("div",{style:`
        position:fixed;
        border:2px solid ${this.colors.accent};
        background:${this.colors.accent}12;
        pointer-events:none;
        border-radius:8px;
        box-shadow:0 0 16px ${this.colors.accentGlow};
        transition:box-shadow 0.15s ease;
      `}),this.overlay?.appendChild(this.drawingRect)}onMouseMove=e=>{this.scheduleRectUpdate(e)};onTouchMove=e=>{e.preventDefault(),e.touches[0]&&this.scheduleRectUpdate(e.touches[0])};scheduleRectUpdate(e){!this.isDrawing||!this.drawingRect||(this.pendingMoveEvent=e,this.rafId===null&&(this.rafId=requestAnimationFrame(()=>{this.rafId=null;let t=this.pendingMoveEvent;if(!t||!this.drawingRect)return;let s=Math.min(t.clientX,this.startX),i=Math.min(t.clientY,this.startY),o=Math.abs(t.clientX-this.startX),r=Math.abs(t.clientY-this.startY);this.drawingRect.style.left=`${s}px`,this.drawingRect.style.top=`${i}px`,this.drawingRect.style.width=`${o}px`,this.drawingRect.style.height=`${r}px`})))}onTouchEnd=async e=>{let t=e.changedTouches[0];t&&await this.finishDrawing(t.clientX,t.clientY)};onMouseUp=async e=>{await this.finishDrawing(e.clientX,e.clientY)};finishDrawing=async(e,t)=>{if(!this.isDrawing||!this.drawingRect)return;this.isDrawing=!1;let s=Math.min(e,this.startX),i=Math.min(t,this.startY),o=Math.abs(e-this.startX),r=Math.abs(t-this.startY);if(o<10||r<10){this.drawingRect.remove(),this.drawingRect=null;return}let a=new DOMRect(s,i,o,r),l=await this.popup.show(a);if(!l){this.drawingRect?.remove(),this.drawingRect=null;return}let d=this.buildAnnotation(a);this.drawingRect?.remove(),this.drawingRect=null,this.deactivate(),this.bus.emit("annotation:complete",{annotation:d,type:l.type,message:l.message})};buildAnnotation(e){this.overlay&&(this.overlay.style.pointerEvents="none");let t=et(e);this.overlay&&(this.overlay.style.pointerEvents="auto");let s=ke(t),i=t.getBoundingClientRect(),o=tt(e,i);return{anchor:s,rect:o,scrollX:window.scrollX,scrollY:window.scrollY,viewportW:window.innerWidth,viewportH:window.innerHeight,devicePixelRatio:window.devicePixelRatio}}destroy(){this.deactivate(),this.popup.destroy()}};var z="siteping_retry_queue";async function j(n,e,t=3){for(let s=0;s<=t;s++){let i=new AbortController,o=setTimeout(()=>i.abort(),1e4);try{let l=await fetch(n,{...e,signal:i.signal});if(clearTimeout(o),l.ok||l.status>=400&&l.status<500||s===t)return l}catch(l){if(clearTimeout(o),s===t)throw l}let r=1e3*2**s,a=Math.random()*1e3-500;await new Promise(l=>setTimeout(l,r+a))}throw new Error("Max retries exceeded")}var bs="siteping_retry_queue";async function gt(n){return typeof navigator<"u"&&navigator.locks?navigator.locks.request(bs,()=>n()):n()}function gs(n,e){gt(()=>{try{let t=localStorage.getItem(z),s=t?JSON.parse(t):[],i=Array.isArray(s)?s:[];i.length>=20&&i.shift(),i.push({endpoint:n,payload:e}),localStorage.setItem(z,JSON.stringify(i))}catch{}})}async function mt(n){await gt(async()=>{try{let e=localStorage.getItem(z);if(!e)return;let t=JSON.parse(e),s=Array.isArray(t)?t:[],i=s.filter(a=>a.endpoint===n);if(i.length===0)return;let o=[];for(let a of i)try{(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.payload)})).ok||o.push(a)}catch{o.push(a)}let r=s.filter(a=>a.endpoint!==n).concat(o);r.length>0?localStorage.setItem(z,JSON.stringify(r)):localStorage.removeItem(z)}catch{}})}var te=class{constructor(e,t){this.endpoint=e;this.projectName=t}endpoint;projectName;async sendFeedback(e){try{let t=await j(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok){let s=await t.text().catch(()=>"Unknown error");throw new Error(`Failed to send feedback: ${t.status} ${s}`)}return await t.json()}catch(t){throw gs(this.endpoint,e),t}}async getFeedbacks(e,t){let s=new URLSearchParams({projectName:e});t?.page&&s.set("page",String(t.page)),t?.limit&&s.set("limit",String(t.limit)),t?.type&&s.set("type",t.type),t?.status&&s.set("status",t.status),t?.search&&s.set("search",t.search);let i=await j(`${this.endpoint}?${s.toString()}`,{method:"GET",cache:"no-store"});if(!i.ok)throw new Error(`Failed to fetch feedbacks: ${i.status}`);return await i.json()}async resolveFeedback(e,t){let s=await j(this.endpoint,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,projectName:this.projectName,status:t?"resolved":"open"})});if(!s.ok)throw new Error(`Failed to update feedback: ${s.status}`);return await s.json()}async deleteFeedback(e){let t=await j(this.endpoint,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,projectName:this.projectName})});if(!t.ok)throw new Error(`Failed to delete feedback: ${t.status}`)}async deleteAllFeedbacks(e){let t=await j(this.endpoint,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectName:e,deleteAll:!0})});if(!t.ok)throw new Error(`Failed to delete all feedbacks: ${t.status}`)}};var K=class{listeners=new Map;on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set);let s=this.listeners.get(e);return s.add(t),()=>{s.delete(t)}}off(e,t){let s=this.listeners.get(e);s&&s.delete(t)}emit(e,...t){let s=this.listeners.get(e);if(s)for(let i of s)try{i(...t)}catch(o){console.error(`[siteping] Error in event listener for "${String(e)}":`,o)}}removeAll(){this.listeners.clear()}};var ms=54,se=class{constructor(e,t,s,i){this.bus=s;this.t=i;let o=t.position??"bottom-right",r=o==="bottom-right";this.items=[{id:"chat",icon:st,label:i("fab.messages")},{id:"annotate",icon:nt,label:i("fab.annotate")},{id:"toggle-annotations",icon:Ce,iconAlt:Ee,label:i("fab.annotations")}],this.fab=document.createElement("button"),this.fab.className=`sp-fab sp-fab--${o} sp-anim-fab-in`,this.fab.style.position="fixed",this.fab.appendChild(v(we)),this.fab.setAttribute("aria-label",i("fab.aria")),this.fab.setAttribute("aria-expanded","false"),this.fab.addEventListener("click",()=>this.toggle()),this.radialContainer=document.createElement("div"),this.radialContainer.className=`sp-radial sp-radial--${o}`,this.radialContainer.setAttribute("role","menu");for(let d=0;d<this.items.length;d++){let h=this.items[d];if(!h)continue;let b=document.createElement("button");b.className="sp-radial-item",b.style.setProperty("--sp-i",String(d)),b.appendChild(v(h.icon)),b.setAttribute("role","menuitem"),b.setAttribute("aria-label",h.label),b.dataset.itemId=h.id,b.addEventListener("click",f=>{f.stopPropagation(),this.handleItemClick(h.id)});let g=document.createElement("span");g.className="sp-radial-label",g.textContent=h.label,g.style.cssText=r?"position:absolute; right:54px; top:50%; transform:translateY(-50%); white-space:nowrap;":"position:absolute; left:54px; top:50%; transform:translateY(-50%); white-space:nowrap;",b.appendChild(g),this.radialContainer.appendChild(b)}this.root=document.createElement("div"),this.root.appendChild(this.radialContainer),this.root.appendChild(this.fab),e.appendChild(this.root);let a=e.host;this.onDocumentClick=d=>{this.isOpen&&!d.composedPath().includes(a)&&this.close()},document.addEventListener("click",this.onDocumentClick);let l=d=>{d.key==="Escape"&&this.isOpen&&(d.stopPropagation(),this.close())};this.fab.addEventListener("keydown",l),this.radialContainer.addEventListener("keydown",l),this.radialContainer.addEventListener("keydown",d=>{let h=Array.from(this.radialContainer.querySelectorAll(".sp-radial-item"));if(h.length===0||!this.isOpen)return;let b=e.activeElement??document.activeElement,g=h.indexOf(b);switch(d.key){case"ArrowUp":{d.preventDefault();let f=g<=0?h.length-1:g-1;h[f]?.focus();break}case"ArrowDown":{d.preventDefault();let f=g>=h.length-1?0:g+1;h[f]?.focus();break}case"Home":{d.preventDefault(),h[0]?.focus();break}case"End":{d.preventDefault(),h[h.length-1]?.focus();break}}})}bus;t;root;fab;radialContainer;badgeEl=null;isOpen=!1;annotationsVisible=!0;items;onDocumentClick;updateBadge(e){if(e<=0){this.badgeEl?.remove(),this.badgeEl=null;return}this.badgeEl||(this.badgeEl=document.createElement("span"),this.badgeEl.className="sp-fab-badge",this.badgeEl.setAttribute("role","status"),this.badgeEl.setAttribute("aria-live","polite"),this.fab.appendChild(this.badgeEl));let t=e>99?"99+":String(e);c(this.badgeEl,t),this.badgeEl.setAttribute("aria-label",this.t("fab.badge").replace("{count}",String(e)))}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.setFabIcon(J),this.fab.setAttribute("aria-expanded","true"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach((t,s)=>{let i=-(16+ms*(s+1));t.style.transform=`translate(0px, ${i}px) scale(1)`,t.classList.add("sp-radial-item--open")}),requestAnimationFrame(()=>{this.radialContainer.querySelector(".sp-radial-item")?.focus()})}close(){this.isOpen=!1,this.setFabIcon(we),this.fab.setAttribute("aria-expanded","false"),this.radialContainer.querySelectorAll(".sp-radial-item").forEach(t=>{t.style.transform="translate(0, 0) scale(0.8)",t.classList.remove("sp-radial-item--open")}),this.fab.focus()}setFabIcon(e){let t=this.badgeEl;this.fab.replaceChildren(v(e)),t&&this.fab.appendChild(t)}handleItemClick(e){switch(this.close(),e){case"chat":this.bus.emit("panel:toggle",!0);break;case"annotate":this.bus.emit("annotation:start");break;case"toggle-annotations":{this.annotationsVisible=!this.annotationsVisible,this.bus.emit("annotations:toggle",this.annotationsVisible);let t=this.radialContainer.querySelector('[data-item-id="toggle-annotations"]');t&&t.replaceChildren(v(this.annotationsVisible?Ce:Ee));break}}}destroy(){document.removeEventListener("click",this.onDocumentClick),this.root.remove()}};var ft={"panel.title":"Feedbacks","panel.ariaLabel":"Siteping feedback panel","panel.feedbackList":"Feedback list","panel.loading":"Loading feedbacks","panel.close":"Close panel","panel.deleteAll":"Delete all","panel.deleteAllConfirmTitle":"Delete all","panel.deleteAllConfirmMessage":"Delete all feedbacks for this project? This action cannot be undone.","panel.search":"Search...","panel.searchAria":"Search feedbacks","panel.filterAll":"All","panel.loadError":"Failed to load","panel.retry":"Retry","panel.empty":"No feedback yet","panel.showMore":"Show more","panel.showLess":"Show less","panel.resolve":"Resolve","panel.reopen":"Reopen","panel.delete":"Delete","panel.cancel":"Cancel","panel.confirmDelete":"Delete","panel.loadMore":"Load more ({remaining} remaining)","panel.statusAll":"All","panel.statusOpen":"Open","panel.statusResolved":"Resolved","type.question":"Question","type.change":"Change","type.bug":"Bug","type.other":"Other","fab.aria":"Siteping \u2014 Feedback menu","fab.messages":"Messages","fab.annotate":"Annotate","fab.annotations":"Annotations","annotator.instruction":"Draw a rectangle on the area to comment","annotator.cancel":"Cancel","popup.ariaLabel":"Feedback form","popup.placeholder":"Describe your feedback...","popup.textareaAria":"Feedback message","popup.submitHintMac":"\u2318+Enter to send","popup.submitHintOther":"Ctrl+Enter to send","popup.cancel":"Cancel","popup.submit":"Send","identity.title":"Identify yourself","identity.nameLabel":"Name","identity.namePlaceholder":"Your name","identity.emailLabel":"Email","identity.emailPlaceholder":"your@email.com","identity.cancel":"Cancel","identity.submit":"Continue","marker.approximate":"Approximate position (confidence: {confidence}%)","marker.aria":"Feedback #{number}: {type} \u2014 {message}","fab.badge":"{count} unresolved feedbacks","feedback.sent.confirmation":"Feedback sent successfully","feedback.error.message":"Failed to send feedback","feedback.deleted.confirmation":"Feedback deleted","badge.count":"{count} unresolved feedbacks"};var vt={"panel.title":"Feedbacks","panel.ariaLabel":"Panneau de feedback Siteping","panel.feedbackList":"Liste des feedbacks","panel.loading":"Chargement des feedbacks","panel.close":"Fermer le panneau","panel.deleteAll":"Tout supprimer","panel.deleteAllConfirmTitle":"Tout supprimer","panel.deleteAllConfirmMessage":"Supprimer tous les feedbacks de ce projet ? Cette action est irr\xE9versible.","panel.search":"Rechercher...","panel.searchAria":"Rechercher dans les feedbacks","panel.filterAll":"Tous","panel.loadError":"Erreur de chargement","panel.retry":"R\xE9essayer","panel.empty":"Aucun feedback pour le moment","panel.showMore":"Voir plus","panel.showLess":"Voir moins","panel.resolve":"R\xE9soudre","panel.reopen":"Rouvrir","panel.delete":"Supprimer","panel.cancel":"Annuler","panel.confirmDelete":"Supprimer","panel.loadMore":"Voir plus ({remaining} restants)","panel.statusAll":"Tous","panel.statusOpen":"Ouvert","panel.statusResolved":"R\xE9solu","type.question":"Question","type.change":"Changement","type.bug":"Bug","type.other":"Autre","fab.aria":"Siteping \u2014 Menu feedback","fab.messages":"Messages","fab.annotate":"Annoter","fab.annotations":"Annotations","annotator.instruction":"Tracez un rectangle sur la zone \xE0 commenter","annotator.cancel":"Annuler","popup.ariaLabel":"Formulaire de feedback","popup.placeholder":"D\xE9crivez votre retour...","popup.textareaAria":"Message de feedback","popup.submitHintMac":"\u2318+Entr\xE9e pour envoyer","popup.submitHintOther":"Ctrl+Entr\xE9e pour envoyer","popup.cancel":"Annuler","popup.submit":"Envoyer","identity.title":"Identifiez-vous","identity.nameLabel":"Nom","identity.namePlaceholder":"Votre nom","identity.emailLabel":"Email","identity.emailPlaceholder":"votre@email.com","identity.cancel":"Annuler","identity.submit":"Continuer","marker.approximate":"Position approximative (confiance : {confidence}%)","marker.aria":"Feedback n\xB0{number} : {type} \u2014 {message}","fab.badge":"{count} feedbacks non r\xE9solus","feedback.sent.confirmation":"Feedback envoy\xE9 avec succ\xE8s","feedback.error.message":"\xC9chec de l'envoi du feedback","feedback.deleted.confirmation":"Feedback supprim\xE9","badge.count":"{count} feedbacks non r\xE9solus"};var xt={"panel.title":"\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C","panel.ariaLabel":"\u041F\u0430\u043D\u0435\u043B\u044C \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438 Siteping","panel.feedbackList":"\u0421\u043F\u0438\u0441\u043E\u043A \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.loading":"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.close":"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u043D\u0435\u043B\u044C","panel.deleteAll":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmTitle":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0451","panel.deleteAllConfirmMessage":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u044D\u0442\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430? \u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.","panel.search":"\u041F\u043E\u0438\u0441\u043A...","panel.searchAria":"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043E\u0442\u0437\u044B\u0432\u0430\u043C","panel.filterAll":"\u0412\u0441\u0435","panel.loadError":"\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438","panel.retry":"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C","panel.empty":"\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u043E\u0432","panel.showMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435","panel.showLess":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435","panel.resolve":"\u0420\u0435\u0448\u0435\u043D\u043E","panel.reopen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E","panel.delete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","panel.confirmDelete":"\u0423\u0434\u0430\u043B\u0438\u0442\u044C","panel.loadMore":"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451 ({remaining} \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C)","panel.statusAll":"\u0412\u0441\u0435","panel.statusOpen":"\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435","panel.statusResolved":"\u0420\u0435\u0448\u0451\u043D\u043D\u044B\u0435","type.question":"\u0412\u043E\u043F\u0440\u043E\u0441","type.change":"\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435","type.bug":"\u0411\u0430\u0433","type.other":"\u0414\u0440\u0443\u0433\u043E\u0435","fab.aria":"Siteping \u2014 \u041C\u0435\u043D\u044E \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","fab.messages":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F","fab.annotate":"\u0410\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044F","fab.annotations":"\u0410\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u0438","annotator.instruction":"\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u043E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u043B\u044F \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F","annotator.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.ariaLabel":"\u0424\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438","popup.placeholder":"\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435...","popup.textareaAria":"\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435","popup.submitHintMac":"\u2318+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.submitHintOther":"Ctrl+Enter \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","popup.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","popup.submit":"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C","identity.title":"\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u044C\u0442\u0435\u0441\u044C","identity.nameLabel":"\u0418\u043C\u044F","identity.namePlaceholder":"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F","identity.emailLabel":"Email","identity.emailPlaceholder":"\u0432\u0430\u0448@email.com","identity.cancel":"\u041E\u0442\u043C\u0435\u043D\u0430","identity.submit":"\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C","marker.approximate":"\u041F\u0440\u0438\u0431\u043B\u0438\u0437\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u0437\u0438\u0446\u0438\u044F (\u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C: {confidence}%)","marker.aria":"\u041E\u0442\u0437\u044B\u0432 #{number}: {type} \u2014 {message}","fab.badge":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}","feedback.sent.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D","feedback.error.message":"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432","feedback.deleted.confirmation":"\u041E\u0442\u0437\u044B\u0432 \u0443\u0434\u0430\u043B\u0451\u043D","badge.count":"\u041D\u0435\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043E\u0442\u0437\u044B\u0432\u043E\u0432: {count}"};var Se={fr:vt,en:ft,ru:xt};function ne(n){let e=(n.split("-")[0]??n).toLowerCase();Se[e]||console.warn(`[siteping] Unknown locale "${n}", falling back to "en"`);let t=Se[e]??Se.en??{};return s=>t[s]??s}function O(n,e){switch(n){case"question":return e("type.question");case"change":return e("type.change");case"bug":return e("type.bug");case"other":return e("type.other");default:return n}}var yt="siteping_identity";function kt(){try{let n=localStorage.getItem(yt);if(!n)return null;let e=JSON.parse(n);if(typeof e=="object"&&e!==null&&"name"in e&&typeof e.name=="string"&&"email"in e&&typeof e.email=="string"){let t=e;if(t.name&&t.email)return t}return null}catch{return null}}function wt(n){try{localStorage.setItem(yt,JSON.stringify(n))}catch{}}function fs(n,e){if(n===e)return 0;if(n.length===0)return e.length;if(e.length===0)return n.length;if(n.length>e.length){let r=n;n=e,e=r}let t=n.length,s=e.length,i=new Array(t+1);for(let r=0;r<=t;r++)i[r]=r;let o=new Array(t+1);for(let r=1;r<=s;r++){o[0]=r;for(let l=1;l<=t;l++){let d=i[l-1]??0;o[l]=n[l-1]===e[r-1]?d:1+Math.min(d,i[l]??0,o[l-1]??0)}let a=i;i=o,o=a}return i[t]??0}function $(n,e){if(n===e)return 1;let t=Math.max(n.length,e.length);return t===0?1:1-fs(n,e)/t}function Ae(n,e,t=.6){if(!e||!n)return 0;if(n.includes(e))return 1;let s=e.length;if(s>n.length){let a=$(n,e);return a>=t?a:0}let i=0,o=n.length>500?n.slice(0,500):n,r=o.length-s;for(let a=0;a<=r;a++){let l=o.slice(a,a+s),d=$(l,e);if(d>i&&(i=d),i>=.95)break}return i>=t?i:0}var vs=300,xs=.3;function Le(n,e){if(!e.textSnippet)return!0;let t=(n.textContent?.trim()??"").slice(0,500);return Ae(t,e.textSnippet,.5)>xs}function ys(n){if(n.elementId){let e=document.getElementById(n.elementId);if(e&&e.tagName===n.elementTag&&Le(e,n))return{element:e,confidence:1,strategy:"id"}}try{let e=document.querySelector(n.cssSelector);if(e&&e.tagName===n.elementTag&&Le(e,n))return{element:e,confidence:.95,strategy:"css"}}catch{}try{let t=document.evaluate(n.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(t instanceof Element&&t.tagName===n.elementTag&&Le(t,n))return{element:t,confidence:.9,strategy:"xpath"}}catch{}return ks(n)}function ks(n){let e=n.elementTag.toLowerCase(),t=document.querySelectorAll(e);if(t.length===0)return null;let s=null,i=0,o=Math.min(t.length,vs);for(let r=0;r<o;r++){let a=t[r];if(!a)continue;let l=ws(a,n);if(l>i&&(i=l,s=a,i>=.85))break}return!s||i<.4?null:{element:s,confidence:Math.min(i,.85),strategy:"scan"}}function ws(n,e){let t=0,s=0,i=(n.textContent?.trim()??"").slice(0,500);if(e.textSnippet&&(s+=40,t+=Ae(i,e.textSnippet,.5)*40),e.fingerprint&&(s+=20,t+=Je(n,e.fingerprint)*20),e.textPrefix||e.textSuffix){s+=20;let o=0,r=0;if(e.textPrefix){let a=D(n,"before");o+=a?$(a,e.textPrefix):0,r++}if(e.textSuffix){let a=D(n,"after");o+=a?$(a,e.textSuffix):0,r++}r>0&&(t+=o/r*20)}if(e.neighborText){s+=20;let o=G(n);t+=o?$(o,e.neighborText)*20:0}return s>0?t/s:0}function ie(n,e){let t=ys(n);if(!t)return null;let s=t.element.getBoundingClientRect(),i=new DOMRect(s.x+e.xPct*s.width,s.y+e.yPct*s.height,e.wPct*s.width,e.hPct*s.height);return{element:t.element,rect:i,confidence:t.confidence,strategy:t.strategy}}function Me(n){return{cssSelector:n.cssSelector,xpath:n.xpath,textSnippet:n.textSnippet,elementTag:n.elementTag,elementId:n.elementId??void 0,textPrefix:n.textPrefix,textSuffix:n.textSuffix,fingerprint:n.fingerprint,neighborText:n.neighborText}}function oe(n){return{xPct:n.xPct,yPct:n.yPct,wPct:n.wPct,hPct:n.hPct}}var Ct=13;function Et(n){return{top:n.top+window.scrollY-Ct,left:n.right+window.scrollX-Ct}}function Y(n,e){let t=n.entries[e],s=n.elementIndices[e];if(!(!t||s===void 0))return t.elements[s]}var Tt=300,St=200,Cs=.7,Es=28,At=32,re=class{constructor(e,t,s,i){this.colors=e;this.tooltip=t;this.bus=s;this.t=i;this.container=p("div",{style:`position:absolute;top:0;left:0;pointer-events:none;z-index:${2147483646};`}),this.container.id="siteping-markers",document.body.appendChild(this.container),this.bus.on("annotations:toggle",o=>{this.container.style.display=o?"block":"none"}),this.resizeHandler=()=>this.scheduleReposition(),window.addEventListener("resize",this.resizeHandler,{passive:!0}),this.scrollHandler=()=>this.scheduleReposition(),window.addEventListener("scroll",this.scrollHandler,{passive:!0,capture:!0}),this.mutationObserver=new MutationObserver(o=>{if(o.length>20){this.scheduleReposition();return}let r=!1;for(let a of o)if(!(this.container.contains(a.target)||this.tooltip.contains(a.target))){r=!0;break}r&&this.scheduleReposition()}),this.mutationObserver.observe(document.body,{childList:!0,subtree:!0,attributes:!1,characterData:!1}),this.onDocumentClickForClusters=o=>{this.container.contains(o.target)||this.collapseAllClusters()},document.addEventListener("click",this.onDocumentClickForClusters)}colors;tooltip;bus;t;container;entries=[];highlightElements=[];pinnedFeedback=null;onDocumentClick=null;repositionTimer=null;mutationObserver=null;scrollHandler=null;resizeHandler=null;anchorCache=new Map;clusters=[];onDocumentClickForClusters=null;get count(){return this.entries.length}scheduleReposition(){this.repositionTimer||("requestIdleCallback"in window?this.repositionTimer=window.requestIdleCallback(()=>{this.repositionTimer=null,this.repositionAll()},{timeout:St+100}):this.repositionTimer=+setTimeout(()=>{this.repositionTimer=null,this.repositionAll()},St))}repositionAll(){let e=new Set;for(let t of this.entries)for(let s=0;s<t.feedback.annotations.length;s++){let i=t.elements[s];if(!i)continue;let o=t.feedback.annotations[s];if(!o)continue;let r=`${t.feedback.id}:${s}`;e.add(r);let l=this.anchorCache.get(r)?.deref(),d;if(l?.isConnected){let b=l.getBoundingClientRect(),g=oe(o);d={element:l,rect:new DOMRect(b.left+g.xPct*b.width,b.top+g.yPct*b.height,g.wPct*b.width,g.hPct*b.height),confidence:1,strategy:"css"}}else d=ie(Me(o),oe(o)),d?.element&&this.anchorCache.set(r,new WeakRef(d.element));if(!d){i.style.display="none";continue}let h=Et(d.rect);t.baseTop=h.top,t.baseLeft=h.left,i.style.display="flex",this.applyConfidenceStyle(i,d.confidence,t.feedback)}for(let t of this.anchorCache.keys())e.has(t)||this.anchorCache.delete(t);this.applyClusterPositions()}applyClusterPositions(){for(let e of this.clusters)e.expanded?this.applyFanPositions(e):this.applyStackPositions(e)}render(e){this.clear(),e.forEach((t,s)=>{let i=this.buildEntry(t,s+1);this.entries.push(i)}),this.buildClusters()}addFeedback(e,t){let s=this.buildEntry(e,t);for(let i of s.elements)i.style.animation="sp-marker-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both";this.entries.push(s),this.buildClusters()}buildEntry(e,t){let s={feedback:e,elements:[],baseTop:0,baseLeft:0};for(let i of e.annotations){let o=ie(Me(i),oe(i));if(!o)continue;let r=Et(o.rect);s.baseTop=r.top,s.baseLeft=r.left;let a=this.createMarker(t,e,r);this.applyConfidenceStyle(a,o.confidence,e),this.container.appendChild(a),s.elements.push(a)}return s}buildClusters(){for(let s of this.container.querySelectorAll(".sp-cluster-badge"))s.remove();let e=[];for(let s of this.entries)for(let i=0;i<s.elements.length;i++)e.push({entry:s,elIdx:i});let t=new Set;this.clusters=[];for(let s=0;s<e.length;s++){if(t.has(s))continue;let i=e[s];if(!i)continue;let o={entries:[i.entry],elementIndices:[i.elIdx],expanded:!1};t.add(s);for(let r=s+1;r<e.length;r++){if(t.has(r))continue;let a=i.entry,l=e[r];if(!l)continue;let d=l.entry;Math.sqrt((a.baseLeft-d.baseLeft)**2+(a.baseTop-d.baseTop)**2)<Es&&(o.entries.push(d),o.elementIndices.push(l.elIdx),t.add(r))}this.clusters.push(o)}for(let s of this.clusters)s.entries.length<=1||(this.applyStackPositions(s),this.addClusterBadge(s))}applyStackPositions(e){let t=e.entries[0];if(!t)return;let{baseTop:s,baseLeft:i}=t,o=e.entries.length<=1;for(let r=0;r<e.entries.length;r++){let a=Y(e,r);a&&(a.style.top=`${s+(o?0:r*3)}px`,a.style.left=`${i+(o?0:r*3)}px`,a.style.zIndex=String(r+1))}}applyFanPositions(e){let t=e.entries[0];if(!t)return;let{baseTop:s,baseLeft:i}=t,o=e.entries.length,r=(o-1)*At,a=i-r/2;for(let l=0;l<o;l++){let d=Y(e,l);d&&(d.style.top=`${s}px`,d.style.left=`${a+l*At}px`,d.style.zIndex=String(10+l))}}addClusterBadge(e){let t=Y(e,e.entries.length-1);if(!t)return;let s=p("div",{class:"sp-cluster-badge",style:`
        position:absolute;top:-6px;right:-6px;
        min-width:16px;height:16px;padding:0 4px;
        border-radius:9999px;
        background:${this.colors.accent};color:#fff;
        font-size:10px;font-weight:700;
        display:flex;align-items:center;justify-content:center;
        border:1.5px solid #fff;
        pointer-events:none;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        line-height:1;
      `});c(s,String(e.entries.length)),t.appendChild(s)}setBadgesVisible(e,t){for(let s=0;s<e.entries.length;s++){let i=Y(e,s)?.querySelector(".sp-cluster-badge");i&&(i.style.display=t?"flex":"none")}}findCluster(e){for(let t of this.clusters)if(!(t.entries.length<=1)){for(let s=0;s<t.entries.length;s++)if(Y(t,s)===e)return t}return null}handleClusterClick(e,t){let s=this.findCluster(e);return s?s.expanded?!1:(t.stopPropagation(),this.collapseAllClusters(),s.expanded=!0,this.applyFanPositions(s),this.setBadgesVisible(s,!1),!0):!1}collapseCluster(e){e.expanded&&(e.expanded=!1,this.applyStackPositions(e),this.setBadgesVisible(e,!0))}collapseAllClusters(){for(let e of this.clusters)this.collapseCluster(e)}applyConfidenceStyle(e,t,s){let i=s.status==="resolved";t<Cs&&!i?(e.style.borderStyle="dashed",e.style.opacity="0.7",e.title=this.t("marker.approximate").replace("{confidence}",String(Math.round(t*100)))):(e.style.borderStyle="solid",e.style.opacity="1",e.title="")}createMarker(e,t,s){let i=B(t.type,this.colors),o=t.status==="resolved",r=p("div",{style:`
        position:absolute;
        top:${s.top}px;
        left:${s.left}px;
        width:26px;height:26px;
        border-radius:50%;
        background:${o?"rgba(241,245,249,0.9)":"rgba(255,255,255,0.92)"};
        border:2px solid ${o?"#cbd5e1":i};
        display:flex;align-items:center;justify-content:center;
        font-family:"Inter",system-ui,-apple-system,sans-serif;
        font-size:11px;font-weight:700;
        color:${o?"#94a3b8":i};
        cursor:pointer;pointer-events:auto;
        box-shadow:${o?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${i}25, 0 2px 6px rgba(0,0,0,0.06)`};
        transition:top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.15s ease, box-shadow 0.15s ease;
        user-select:none;
        -webkit-font-smoothing:antialiased;
      `});r.dataset.feedbackId=t.id,r.setAttribute("tabindex","0"),r.setAttribute("role","button");let a=t.message.length>60?`${t.message.slice(0,60)}...`:t.message,l=this.t("marker.aria").replace("{number}",String(e)).replace("{type}",O(t.type,this.t)).replace("{message}",a);r.setAttribute("aria-label",l),r.setAttribute("aria-describedby",this.tooltip.tooltipId),c(r,o?"\u2713":String(e)),r.addEventListener("mouseenter",()=>{r.style.transform="scale(1.2)",r.style.boxShadow=o?"0 4px 16px rgba(0,0,0,0.1)":`0 4px 20px ${i}35, 0 4px 12px rgba(0,0,0,0.08)`,this.tooltip.show(t,r.getBoundingClientRect()),this.pinnedFeedback||this.showHighlight(t)}),r.addEventListener("mouseleave",()=>{r.style.transform="scale(1)",r.style.boxShadow=o?"0 2px 8px rgba(0,0,0,0.06)":`0 2px 12px ${i}25, 0 2px 6px rgba(0,0,0,0.06)`,this.tooltip.scheduleHide(),this.pinnedFeedback||this.clearHighlight()});let d=h=>{h instanceof MouseEvent&&this.handleClusterClick(r,h)||(this.pinHighlight(t),this.bus.emit("panel:toggle",!0),r.dispatchEvent(new CustomEvent("sp-marker-click",{detail:{feedbackId:t.id},bubbles:!0})))};return r.addEventListener("click",h=>d(h)),r.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),d(h))}),r}highlight(e){for(let t of this.entries)if(t.feedback.id===e)for(let s of t.elements)s.style.animation="sp-pulse-ring 0.7s ease-out",s.addEventListener("animationend",()=>{s.style.animation=""},{once:!0})}showHighlight(e){this.removeHighlightElements();for(let t of e.annotations){let s=ie(Me(t),oe(t));if(!s)continue;let i=B(e.type,this.colors),o=s.rect,r=p("div",{style:`
          position:absolute;
          top:${o.top+window.scrollY}px;
          left:${o.left+window.scrollX}px;
          width:${o.width}px;height:${o.height}px;
          border:2px solid ${i};
          background:${i}0c;
          border-radius:8px;
          pointer-events:none;z-index:-1;
          opacity:0;
          box-shadow:0 0 16px ${i}20;
          transition:opacity ${Tt}ms ease;
        `});this.container.appendChild(r),this.highlightElements.push(r),r.offsetHeight,r.style.opacity="1"}}pinHighlight(e){this.unpinHighlight(),this.showHighlight(e),this.pinnedFeedback=e,this.onDocumentClick=t=>{this.container.contains(t.target)||this.unpinHighlight()},document.addEventListener("click",this.onDocumentClick,{capture:!0})}unpinHighlight(){this.onDocumentClick&&(document.removeEventListener("click",this.onDocumentClick,{capture:!0}),this.onDocumentClick=null),this.pinnedFeedback=null,this.clearHighlight()}clearHighlight(){for(let e of this.highlightElements)e.style.opacity="0",setTimeout(()=>e.remove(),Tt);this.highlightElements=[]}removeHighlightElements(){for(let e of this.highlightElements)e.remove();this.highlightElements=[]}clear(){this.unpinHighlight(),this.container.replaceChildren(),this.entries=[],this.clusters=[],this.anchorCache.clear()}destroy(){this.unpinHighlight(),this.repositionTimer&&("cancelIdleCallback"in window&&window.cancelIdleCallback(this.repositionTimer),clearTimeout(this.repositionTimer)),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.scrollHandler&&window.removeEventListener("scroll",this.scrollHandler,{capture:!0}),this.onDocumentClickForClusters&&document.removeEventListener("click",this.onDocumentClickForClusters),this.mutationObserver?.disconnect(),this.container.remove()}};var Ts='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',Ss='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',As='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/></svg>',Be={"export.label":"Export","export.csv":"Export CSV","export.json":"Export JSON"},Bt={"export.label":"Exporter","export.csv":"Exporter CSV","export.json":"Exporter JSON"},Ft=`
  /* ============================
     Export Button & Menu
     ============================ */

  .sp-export-btn {
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-export-btn svg {
    width: 13px;
    height: 13px;
  }

  .sp-export-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-export-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-export-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 180px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-lg);
    z-index: 10;
    opacity: 0;
    transform: translateY(-4px) scale(0.97);
    transition: opacity 0.15s ease, transform 0.15s ease;
    pointer-events: none;
  }

  .sp-export-menu--open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .sp-export-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
  }

  .sp-export-option:hover,
  .sp-export-option:focus-visible {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-export-option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .sp-export-option-icon svg {
    width: 16px;
    height: 16px;
  }

  .sp-export-option-label {
    flex: 1;
  }

  @media (forced-colors: active) {
    .sp-export-btn,
    .sp-export-option,
    .sp-export-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-export-btn:focus-visible,
    .sp-export-option:focus-visible {
      outline: 3px solid Highlight !important;
    }
  }
`,Lt=["id","type","status","message","url","authorName","authorEmail","createdAt","resolvedAt","viewport"];function Ls(n){return n.includes('"')||n.includes(",")||n.includes(`
`)||n.includes("\r")?`"${n.replace(/"/g,'""')}"`:n}function Ms(n){let e=Lt.join(","),t=n.map(s=>Lt.map(i=>{let o=s[i];return Ls(o==null?"":String(o))}).join(","));return[e,...t].join(`
`)}function Bs(n){return JSON.stringify(n,null,2)}function Mt(n,e,t){let s=new Blob([n],{type:t}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=e,o.style.display="none",document.body.appendChild(o),o.click(),requestAnimationFrame(()=>{URL.revokeObjectURL(i),o.remove()})}var ae=class{constructor(e,t){this.getFeedbacks=t;this.element=p("div",{style:"position: relative; display: inline-flex;"});let s=document.createElement("button");s.className="sp-export-btn",s.setAttribute("aria-haspopup","true"),s.setAttribute("aria-expanded","false"),s.appendChild(v(Ts));let i=document.createElement("span");c(i,Be["export.label"]),s.appendChild(i),s.addEventListener("click",a=>{a.stopPropagation(),this.toggle()}),this.menu=p("div",{class:"sp-export-menu"}),this.menu.setAttribute("role","menu");let o=this.createOption(Ss,Be["export.csv"],()=>{this.exportAs("csv")}),r=this.createOption(As,Be["export.json"],()=>{this.exportAs("json")});this.menu.appendChild(o),this.menu.appendChild(r),this.element.appendChild(s),this.element.appendChild(this.menu),this.onDocumentClick=a=>{this.isOpen&&!this.element.contains(a.target)&&this.close()},document.addEventListener("click",this.onDocumentClick,!0)}getFeedbacks;element;menu;isOpen=!1;onDocumentClick;setLabels(e){let t=this.element.querySelector(".sp-export-btn");if(t){let i=t.querySelector("span");i&&c(i,e["export.label"])}let s=this.menu.querySelectorAll(".sp-export-option-label");s[0]&&c(s[0],e["export.csv"]),s[1]&&c(s[1],e["export.json"])}createOption(e,t,s){let i=document.createElement("button");i.className="sp-export-option",i.setAttribute("role","menuitem");let o=p("span",{class:"sp-export-option-icon"});o.appendChild(v(e));let r=p("span",{class:"sp-export-option-label"});return c(r,t),i.appendChild(o),i.appendChild(r),i.addEventListener("click",a=>{a.stopPropagation(),s(),this.close()}),i}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.menu.classList.add("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","true")}close(){this.isOpen=!1,this.menu.classList.remove("sp-export-menu--open"),this.element.querySelector(".sp-export-btn")?.setAttribute("aria-expanded","false")}exportAs(e){let t=this.getFeedbacks();if(t.length===0)return;let s=t[0]?.projectName??"feedbacks",i=new Date().toISOString().slice(0,10),o=s.replace(/[^a-zA-Z0-9_-]/g,"_");if(e==="csv"){let r=Ms(t);Mt(r,`feedbacks-${o}-${i}.csv`,"text/csv;charset=utf-8")}else{let r=Bs(t);Mt(r,`feedbacks-${o}-${i}.json`,"application/json;charset=utf-8")}}destroy(){document.removeEventListener("click",this.onDocumentClick,!0),this.element.remove()}};var le='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" stroke="currentColor" stroke-width="2"/></svg>',Rt='<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="1" width="16" height="16" rx="4" fill="url(#sp-cb-grad)" stroke="none"/><polyline points="5 9 8 12 13 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sp-cb-grad" x1="0" y1="0" x2="18" y2="18" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="var(--sp-accent)"/><stop offset="100%" stop-color="var(--sp-accent-dark)"/></linearGradient></defs></svg>',Fe={"bulk.selectAll":"Select all","bulk.selected":"{count} selected","bulk.resolve":"Resolve","bulk.delete":"Delete","bulk.deselect":"Deselect"},Re={"bulk.selectAll":"Tout s\xE9lectionner","bulk.selected":"{count} s\xE9lectionn\xE9(s)","bulk.resolve":"R\xE9soudre","bulk.delete":"Supprimer","bulk.deselect":"D\xE9s\xE9lectionner"},It=`
  /* ============================
     Bulk Checkbox
     ============================ */

  .sp-bulk-checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 4px;
    color: var(--sp-border);
    opacity: 0;
    transition: opacity 0.15s ease, color 0.15s ease, transform 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .sp-bulk-checkbox svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .sp-bulk-checkbox:hover {
    color: var(--sp-accent);
    transform: scale(1.1);
  }

  .sp-bulk-checkbox--checked {
    color: var(--sp-accent);
    opacity: 1 !important;
    filter: drop-shadow(0 0 4px var(--sp-accent-glow));
  }

  /* Show checkboxes when hovering a card */
  .sp-card:hover .sp-bulk-checkbox {
    opacity: 1;
  }

  /* When any card has selection, show ALL checkboxes */
  .sp-list--has-selection .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Card Selected State
     ============================ */

  .sp-card--selected {
    border-left: 3px solid var(--sp-accent) !important;
    background: var(--sp-accent-light) !important;
  }

  .sp-card--selected:hover {
    background: var(--sp-accent-light) !important;
  }

  /* ============================
     Select All Bar
     ============================ */

  .sp-bulk-select-all {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    margin-bottom: 4px;
    border-radius: var(--sp-radius);
    background: transparent;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.2s ease;
    user-select: none;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    color: var(--sp-text-secondary);
  }

  .sp-bulk-select-all:hover {
    background: var(--sp-bg-hover);
  }

  /* Show select-all on list hover or when selections exist */
  .sp-list:hover .sp-bulk-select-all,
  .sp-list--has-selection .sp-bulk-select-all {
    opacity: 1;
  }

  .sp-bulk-select-all .sp-bulk-checkbox {
    opacity: 1;
  }

  /* ============================
     Floating Action Bar
     ============================ */

  @keyframes sp-bulk-bar-in {
    from {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes sp-bulk-bar-out {
    from {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateY(100%) scale(0.95);
      opacity: 0;
    }
  }

  .sp-bulk-bar {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    z-index: 10;
    pointer-events: none;
    opacity: 0;
    transform: translateY(100%) scale(0.95);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 0.25s ease;
    font-family: var(--sp-font);
  }

  .sp-bulk-bar--visible {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .sp-bulk-bar-count {
    font-size: 13px;
    font-weight: 600;
    color: var(--sp-text);
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .sp-bulk-bar-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-bulk-btn-resolve,
  .sp-bulk-btn-delete {
    padding: 7px 14px;
    border-radius: var(--sp-radius-full);
    border: 1.5px solid transparent;
    background: transparent;
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .sp-bulk-btn-resolve {
    color: #22c55e;
    border-color: #22c55e;
  }

  .sp-bulk-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.1);
    box-shadow: 0 0 12px rgba(34, 197, 94, 0.15);
  }

  .sp-bulk-btn-resolve:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-delete {
    color: #ef4444;
    border-color: #ef4444;
  }

  .sp-bulk-btn-delete:hover {
    background: rgba(239, 68, 68, 0.1);
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
  }

  .sp-bulk-btn-delete:active {
    transform: scale(0.96);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-resolve:disabled,
  .sp-bulk-btn-delete:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .sp-bulk-btn-deselect {
    width: 28px;
    height: 28px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-bulk-btn-deselect:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
    border-color: var(--sp-text-tertiary);
  }

  .sp-bulk-btn-deselect:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-bulk-btn-deselect svg {
    width: 12px;
    height: 12px;
  }

  /* Spinner inside bulk bar buttons */
  .sp-bulk-btn-resolve .sp-spinner,
  .sp-bulk-btn-delete .sp-spinner {
    width: 14px;
    height: 14px;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-bulk-checkbox,
    .sp-bulk-btn-resolve,
    .sp-bulk-btn-delete,
    .sp-bulk-btn-deselect,
    .sp-bulk-bar {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-bulk-checkbox--checked {
      background: Highlight !important;
      color: HighlightText !important;
    }

    .sp-card--selected {
      border-left: 4px solid Highlight !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-bulk-bar {
      transition-duration: 0.01ms !important;
    }

    .sp-bulk-checkbox {
      transition-duration: 0.01ms !important;
    }
  }
`,pe=class{constructor(e,t,s){this.callbacks=t;this.i18n=s==="fr"?Re:Fe,this.barElement=p("div",{class:"sp-bulk-bar"}),this.barElement.setAttribute("role","toolbar"),this.barElement.setAttribute("aria-label","Bulk actions"),this.countLabel=p("span",{class:"sp-bulk-bar-count"}),c(this.countLabel,this.i18n["bulk.selected"].replace("{count}","0"));let i=p("div",{class:"sp-bulk-bar-actions"});this.resolveBtn=document.createElement("button"),this.resolveBtn.className="sp-bulk-btn-resolve",this.resolveBtn.type="button",this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.className="sp-bulk-btn-delete",this.deleteBtn.type="button",this.deleteBtn.addEventListener("click",()=>this.handleDelete());let o=document.createElement("button");o.className="sp-bulk-btn-deselect",o.type="button",o.setAttribute("aria-label",this.i18n["bulk.deselect"]),o.appendChild(v('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')),o.addEventListener("click",()=>this.deselectAll()),i.appendChild(this.resolveBtn),i.appendChild(this.deleteBtn),i.appendChild(o),this.barElement.appendChild(this.countLabel),this.barElement.appendChild(i),this.updateButtonLabels()}callbacks;barElement;selected=new Set;checkboxMap=new Map;countLabel;resolveBtn;deleteBtn;selectAllCheckbox=null;listContainer=null;isProcessing=!1;i18n;createCheckbox(e){let t=p("div",{class:"sp-bulk-checkbox"});return t.setAttribute("role","checkbox"),t.setAttribute("aria-checked","false"),t.setAttribute("tabindex","0"),t.setAttribute("aria-label",`Select feedback ${e}`),t.appendChild(v(le)),t.addEventListener("click",s=>{s.stopPropagation(),this.toggle(e)}),t.addEventListener("keydown",s=>{(s.key===" "||s.key==="Enter")&&(s.preventDefault(),s.stopPropagation(),this.toggle(e))}),this.checkboxMap.set(e,t),t}createSelectAllBar(e,t){let s=p("div",{class:"sp-bulk-select-all"}),i=p("div",{class:"sp-bulk-checkbox"});i.appendChild(v(le)),this.selectAllCheckbox=i;let o=p("span");return c(o,t),s.appendChild(i),s.appendChild(o),s.addEventListener("click",()=>{this.selected.size===e.length&&e.length>0?this.deselectAll():this.selectAll(e)}),s}setListContainer(e){this.listContainer=e}toggle(e){this.isProcessing||(this.selected.has(e)?this.selected.delete(e):this.selected.add(e),this.updateCheckbox(e),this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass(),this.updateCardSelectedState(e))}selectAll(e){if(!this.isProcessing){for(let t of e)this.selected.add(t),this.updateCheckbox(t),this.updateCardSelectedState(t);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass()}}deselectAll(){let e=[...this.selected];this.selected.clear();for(let t of e)this.updateCheckbox(t),this.updateCardSelectedState(t);this.updateBar(),this.updateSelectAllCheckbox(),this.updateListSelectionClass()}get selectedIds(){return[...this.selected]}get count(){return this.selected.size}get hasSelection(){return this.selected.size>0}reset(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.isProcessing=!1,this.updateBar(),this.updateListSelectionClass()}destroy(){this.selected.clear(),this.checkboxMap.clear(),this.selectAllCheckbox=null,this.listContainer=null,this.barElement.remove()}updateBar(){let e=this.selected.size,t=e>0;this.barElement.classList.toggle("sp-bulk-bar--visible",t),c(this.countLabel,this.i18n["bulk.selected"].replace("{count}",String(e))),this.updateButtonLabels()}updateButtonLabels(){let e=this.selected.size;this.resolveBtn.replaceChildren();let t=document.createElement("span");c(t,e>0?`${this.i18n["bulk.resolve"]} ${e}`:this.i18n["bulk.resolve"]),this.resolveBtn.appendChild(t),this.deleteBtn.replaceChildren();let s=document.createElement("span");c(s,e>0?`${this.i18n["bulk.delete"]} ${e}`:this.i18n["bulk.delete"]),this.deleteBtn.appendChild(s)}updateCheckbox(e){let t=this.checkboxMap.get(e);if(!t)return;let s=this.selected.has(e);t.classList.toggle("sp-bulk-checkbox--checked",s),t.setAttribute("aria-checked",String(s)),t.replaceChildren(),t.appendChild(v(s?Rt:le))}updateSelectAllCheckbox(){if(!this.selectAllCheckbox)return;let e=this.selected.size>0&&this.selected.size===this.checkboxMap.size;this.selectAllCheckbox.classList.toggle("sp-bulk-checkbox--checked",e),this.selectAllCheckbox.setAttribute("aria-checked",String(e)),this.selectAllCheckbox.replaceChildren(),this.selectAllCheckbox.appendChild(v(e?Rt:le))}updateListSelectionClass(){this.listContainer&&this.listContainer.classList.toggle("sp-list--has-selection",this.selected.size>0)}updateCardSelectedState(e){if(!this.listContainer)return;let t=CSS.escape(e),s=this.listContainer.querySelector(`[data-feedback-id="${t}"]`);s&&s.classList.toggle("sp-card--selected",this.selected.has(e))}setButtonLoading(e){let t=Array.from(e.childNodes).map(s=>s.cloneNode(!0));return e.disabled=!0,e.replaceChildren(p("div",{class:"sp-spinner sp-spinner--sm"})),()=>{e.replaceChildren(...t),e.disabled=!1}}async handleResolve(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=!0;let e=[...this.selected],t=this.setButtonLoading(this.resolveBtn);this.deleteBtn.disabled=!0;try{await this.callbacks.onResolve(e),this.reset()}catch{t(),this.deleteBtn.disabled=!1}finally{this.isProcessing=!1}}async handleDelete(){if(this.isProcessing||this.selected.size===0)return;this.isProcessing=!0;let e=[...this.selected],t=this.setButtonLoading(this.deleteBtn);this.resolveBtn.disabled=!0;try{await this.callbacks.onDelete(e),this.reset()}catch{t(),this.resolveBtn.disabled=!1}finally{this.isProcessing=!1}}};var Fs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',Ie='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',Rs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',Is='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',Ps='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',Ns='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',Pe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',Pt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',Nt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',Hs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',Os='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',Ds={"detail.back":"Back","detail.title":"Feedback #{number}","detail.status":"Status","detail.message":"Message","detail.metadata":"Details","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Author","detail.date":"Created","detail.viewport":"Viewport","detail.browser":"Browser","detail.resolvedAt":"Resolved at","detail.goToAnnotation":"Go to annotation","detail.element":"Element","detail.selector":"Selector","detail.position":"Position","detail.resolve":"Resolve","detail.reopen":"Reopen","detail.delete":"Delete"},Ne={"detail.back":"Retour","detail.title":"Feedback n\xB0{number}","detail.status":"Statut","detail.message":"Message","detail.metadata":"D\xE9tails","detail.annotation":"Annotation","detail.page":"Page","detail.author":"Auteur","detail.date":"Cr\xE9\xE9 le","detail.viewport":"Viewport","detail.browser":"Navigateur","detail.resolvedAt":"R\xE9solu le","detail.goToAnnotation":"Aller \xE0 l'annotation","detail.element":"\xC9l\xE9ment","detail.selector":"S\xE9lecteur","detail.position":"Position","detail.resolve":"R\xE9soudre","detail.reopen":"Rouvrir","detail.delete":"Supprimer"},Dt=`
  /* ============================
     Detail View \u2014 Panel-in-Panel
     ============================ */

  .sp-detail {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    background: var(--sp-glass-bg);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    z-index: 20;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
    overflow: hidden;
  }

  .sp-detail--visible {
    transform: translateX(0);
  }

  /* ---- Header ---- */

  .sp-detail-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    flex-shrink: 0;
    min-height: 64px;
  }

  .sp-detail-back {
    width: 40px;
    height: 40px;
    border-radius: var(--sp-radius);
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sp-text-tertiary);
    transition: all 0.2s ease;
    flex-shrink: 0;
    padding: 0;
  }

  .sp-detail-back:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-detail-back:active {
    transform: scale(0.92);
    transition-duration: 0.1s;
  }

  .sp-detail-back svg {
    width: 18px;
    height: 18px;
  }

  .sp-detail-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    letter-spacing: -0.02em;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-header .sp-badge {
    flex-shrink: 0;
  }

  /* ---- Content ---- */

  .sp-detail-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0;
  }

  .sp-detail-content::-webkit-scrollbar {
    width: 6px;
  }

  .sp-detail-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .sp-detail-content::-webkit-scrollbar-thumb {
    background: var(--sp-border);
    border-radius: var(--sp-radius-full);
  }

  .sp-detail-content::-webkit-scrollbar-thumb:hover {
    background: var(--sp-text-tertiary);
  }

  /* ---- Section ---- */

  .sp-detail-section {
    padding: 20px 24px;
    border-bottom: 1px solid var(--sp-border);
    opacity: 0;
    transform: translateY(8px);
    animation: sp-detail-section-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes sp-detail-section-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .sp-detail-section:last-child {
    border-bottom: none;
  }

  .sp-detail-section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-detail-section-title svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }

  /* ---- Status + Actions Section ---- */

  .sp-detail-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .sp-detail-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    border-radius: var(--sp-radius-full);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .sp-detail-status-pill--open {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .sp-detail-status-pill--resolved {
    background: rgba(156, 163, 175, 0.1);
    color: #9ca3af;
    border: 1px solid rgba(156, 163, 175, 0.2);
  }

  .sp-detail-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-detail-actions {
    display: flex;
    gap: 8px;
  }

  .sp-detail-actions button {
    flex: 1;
    height: 40px;
    padding: 0 16px;
    border-radius: var(--sp-radius);
    font-family: var(--sp-font);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s ease;
  }

  .sp-detail-actions button svg {
    width: 15px;
    height: 15px;
  }

  .sp-detail-btn-resolve {
    border: 1.5px solid #22c55e;
    background: rgba(34, 197, 94, 0.06);
    color: #22c55e;
  }

  .sp-detail-btn-resolve:hover {
    background: rgba(34, 197, 94, 0.14);
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-resolve:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-reopen {
    border: 1.5px solid var(--sp-accent);
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  .sp-detail-btn-reopen:hover {
    background: rgba(var(--sp-accent), 0.14);
    box-shadow: 0 0 16px var(--sp-accent-glow);
    transform: translateY(-1px);
  }

  .sp-detail-btn-reopen:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-btn-delete {
    border: 1.5px solid #ef4444;
    background: rgba(239, 68, 68, 0.06);
    color: #ef4444;
  }

  .sp-detail-btn-delete:hover {
    background: rgba(239, 68, 68, 0.14);
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.12);
    transform: translateY(-1px);
  }

  .sp-detail-btn-delete:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  .sp-detail-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
    box-shadow: none;
  }

  /* ---- Message Section ---- */

  .sp-detail-message {
    font-size: 14px;
    line-height: 1.65;
    color: var(--sp-text);
    padding: 14px 16px;
    border-left: 3px solid var(--sp-accent);
    border-radius: 0 var(--sp-radius) var(--sp-radius) 0;
    background: var(--sp-glass-bg-heavy);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* ---- Metadata Section ---- */

  .sp-detail-meta {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sp-detail-meta-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .sp-detail-meta-row svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 1px;
  }

  .sp-detail-meta-content {
    flex: 1;
    min-width: 0;
  }

  .sp-detail-meta-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 4px;
  }

  .sp-detail-meta-value {
    font-size: 13px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-meta-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 12px;
    background: var(--sp-glass-bg-heavy);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-meta-value--secondary {
    color: var(--sp-text-secondary);
    font-size: 12px;
  }

  /* ---- Annotation Section ---- */

  .sp-detail-annotation {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sp-detail-annotation-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border-subtle);
  }

  .sp-detail-annotation-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .sp-detail-annotation-row svg {
    width: 13px;
    height: 13px;
    color: var(--sp-text-tertiary);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .sp-detail-annotation-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1;
    margin-bottom: 3px;
  }

  .sp-detail-annotation-value {
    font-size: 12px;
    line-height: 1.4;
    color: var(--sp-text);
    word-break: break-all;
  }

  .sp-detail-annotation-value--mono {
    font-family: "SF Mono", "Cascadia Code", "Fira Code", "Consolas", monospace;
    font-size: 11px;
    background: var(--sp-bg-hover);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-detail-btn-goto {
    width: 100%;
    height: 44px;
    padding: 0 20px;
    border-radius: var(--sp-radius);
    border: none;
    background: var(--sp-accent-gradient);
    color: #fff;
    font-family: var(--sp-font);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.25s ease;
    box-shadow: 0 2px 12px var(--sp-accent-glow);
  }

  .sp-detail-btn-goto svg {
    width: 16px;
    height: 16px;
  }

  .sp-detail-btn-goto:hover {
    box-shadow: 0 4px 20px var(--sp-accent-glow);
    transform: translateY(-2px);
  }

  .sp-detail-btn-goto:active {
    transform: translateY(0) scale(0.98);
    transition-duration: 0.1s;
  }

  /* ---- Forced Colors / High Contrast ---- */

  @media (forced-colors: active) {
    .sp-detail {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }

    .sp-detail-back,
    .sp-detail-btn-goto,
    .sp-detail-btn-resolve,
    .sp-detail-btn-reopen,
    .sp-detail-btn-delete {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-back:focus-visible,
    .sp-detail-btn-goto:focus-visible,
    .sp-detail-btn-resolve:focus-visible,
    .sp-detail-btn-reopen:focus-visible,
    .sp-detail-btn-delete:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-detail-status-pill {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-detail-message {
      border-left: 3px solid ButtonText !important;
    }
  }

  /* ---- Reduced Motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-detail {
      transition-duration: 0.01ms !important;
    }

    .sp-detail-section {
      animation-duration: 0.01ms !important;
    }
  }
`;function $s(n){if(/Edg\//i.test(n)){let e=n.match(/Edg\/([\d.]+)/);return e?`Edge ${e[1]}`:"Edge"}if(/OPR\//i.test(n)||/Opera/i.test(n)){let e=n.match(/OPR\/([\d.]+)/);return e?`Opera ${e[1]}`:"Opera"}if(/Firefox\//i.test(n)){let e=n.match(/Firefox\/([\d.]+)/);return e?`Firefox ${e[1]}`:"Firefox"}if(/Chrome\//i.test(n)&&!/Chromium/i.test(n)){let e=n.match(/Chrome\/([\d.]+)/);return e?`Chrome ${e[1]}`:"Chrome"}if(/Safari\//i.test(n)&&!/Chrome/i.test(n)){let e=n.match(/Version\/([\d.]+)/);return e?`Safari ${e[1]}`:"Safari"}return"Unknown"}function Ht(n,e){try{return new Date(n).toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return n}}function _s(n){try{return new URL(n).pathname}catch{return n}}function Ot(n,e){return n.length<=e?n:n.slice(0,e-1)+"\u2026"}var de=class{constructor(e,t,s){this.colors=e;this.callbacks=t;this.i18n=s.startsWith("fr")?Ne:Ds,this.element=p("div",{class:"sp-detail"}),this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-label","Feedback detail"),this.element.setAttribute("aria-hidden","true");let i=p("div",{class:"sp-detail-header"}),o=document.createElement("button");o.type="button",o.className="sp-detail-back",o.setAttribute("aria-label",this.i18n["detail.back"]),o.appendChild(v(Fs)),o.addEventListener("click",()=>{this.hide(),this.callbacks.onBack()}),this.element.appendChild(i),i.appendChild(o),this.content=p("div",{class:"sp-detail-content"}),this.element.appendChild(this.content)}colors;callbacks;element;_isVisible=!1;currentFeedback=null;content;i18n;resolveBtn=null;deleteBtn=null;isProcessing=!1;show(e,t){this.currentFeedback=e,this.isProcessing=!1;let s=this.element.querySelector(".sp-detail-header");if(!s)return;let i=s.querySelector(".sp-detail-back");if(!i)return;s.replaceChildren(i);let o=p("span",{class:"sp-detail-title"});c(o,this.i18n["detail.title"].replace("{number}",String(t))),s.appendChild(o);let r=p("span",{class:"sp-badge"});r.style.background=N(e.type,this.colors),r.style.color=B(e.type,this.colors),c(r,e.type),s.appendChild(r),this.content.replaceChildren();let a=0,l=this.buildSection(a++);this.buildStatusActions(l,e),this.content.appendChild(l);let d=this.buildSection(a++),h=p("div",{class:"sp-detail-section-title"});c(h,this.i18n["detail.message"]),d.appendChild(h);let b=p("div",{class:"sp-detail-message"});b.style.borderLeftColor=B(e.type,this.colors),c(b,e.message),d.appendChild(b),this.content.appendChild(d);let g=this.buildSection(a++),f=p("div",{class:"sp-detail-section-title"});if(c(f,this.i18n["detail.metadata"]),g.appendChild(f),this.buildMetadata(g,e),this.content.appendChild(g),e.annotations.length>0){let x=this.buildSection(a++),k=p("div",{class:"sp-detail-section-title"});k.appendChild(v(Ie));let C=p("span");c(C,this.i18n["detail.annotation"]),k.appendChild(C),x.appendChild(k),this.buildAnnotation(x,e),this.content.appendChild(x)}this._isVisible=!0,this.element.setAttribute("aria-hidden","false"),this.element.offsetHeight,this.element.classList.add("sp-detail--visible"),requestAnimationFrame(()=>{i.focus()})}hide(){this._isVisible&&(this._isVisible=!1,this.element.classList.remove("sp-detail--visible"),this.element.setAttribute("aria-hidden","true"),this.currentFeedback=null,this.resolveBtn=null,this.deleteBtn=null)}get isVisible(){return this._isVisible}destroy(){this.hide(),this.element.remove()}buildSection(e){let t=p("div",{class:"sp-detail-section"});return t.style.animationDelay=`${e*40}ms`,t}buildStatusActions(e,t){let s=t.status==="resolved",i=p("div",{class:"sp-detail-section-title"});c(i,this.i18n["detail.status"]),e.appendChild(i);let o=p("div",{class:"sp-detail-status"}),r=p("span",{class:`sp-detail-status-pill ${s?"sp-detail-status-pill--resolved":"sp-detail-status-pill--open"}`}),a=p("span",{class:"sp-detail-status-dot"});a.style.background=s?"#9ca3af":"#22c55e",r.appendChild(a);let l=p("span");c(l,s?this.i18n["detail.reopen"]:this.i18n["detail.resolve"]),c(l,s?"Resolved":"Open"),r.appendChild(l),o.appendChild(r),e.appendChild(o);let d=p("div",{class:"sp-detail-actions"});if(this.resolveBtn=document.createElement("button"),this.resolveBtn.type="button",s){this.resolveBtn.className="sp-detail-btn-reopen",this.resolveBtn.appendChild(v(Pt));let b=document.createElement("span");c(b,this.i18n["detail.reopen"]),this.resolveBtn.appendChild(b)}else{this.resolveBtn.className="sp-detail-btn-resolve",this.resolveBtn.appendChild(v(Pe));let b=document.createElement("span");c(b,this.i18n["detail.resolve"]),this.resolveBtn.appendChild(b)}this.resolveBtn.addEventListener("click",()=>this.handleResolve()),this.deleteBtn=document.createElement("button"),this.deleteBtn.type="button",this.deleteBtn.className="sp-detail-btn-delete",this.deleteBtn.appendChild(v(Nt));let h=document.createElement("span");c(h,this.i18n["detail.delete"]),this.deleteBtn.appendChild(h),this.deleteBtn.addEventListener("click",()=>this.handleDelete()),d.appendChild(this.resolveBtn),d.appendChild(this.deleteBtn),e.appendChild(d)}buildMetadata(e,t){let s=p("div",{class:"sp-detail-meta"});if(this.addMetaRow(s,Rs,this.i18n["detail.page"],()=>{let i=p("div",{class:"sp-detail-meta-value"}),o=_s(t.url);return c(i,Ot(o,60)),i.title=t.url,i}),this.addMetaRow(s,Is,this.i18n["detail.author"],()=>{let i=p("div",{class:"sp-detail-meta-value"}),o=t.authorName||"Anonymous",r=t.authorEmail;return c(i,r?`${o} (${r})`:o),i}),this.addMetaRow(s,Ps,this.i18n["detail.date"],()=>{let i=p("div",{class:"sp-detail-meta-value"});return c(i,Ht(t.createdAt,this.i18n===Ne?"fr":"en")),i}),this.addMetaRow(s,Ns,this.i18n["detail.viewport"],()=>{let i=p("div",{class:"sp-detail-meta-value sp-detail-meta-value--mono"});return c(i,t.viewport||"Unknown"),i}),this.addMetaRow(s,'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',this.i18n["detail.browser"],()=>{let i=p("div",{class:"sp-detail-meta-value"});return c(i,$s(t.userAgent)),i}),t.resolvedAt){let i=t.resolvedAt;this.addMetaRow(s,Pe,this.i18n["detail.resolvedAt"],()=>{let o=p("div",{class:"sp-detail-meta-value sp-detail-meta-value--secondary"});return c(o,Ht(i,this.i18n===Ne?"fr":"en")),o})}e.appendChild(s)}addMetaRow(e,t,s,i){let o=p("div",{class:"sp-detail-meta-row"});o.appendChild(v(t));let r=p("div",{class:"sp-detail-meta-content"}),a=p("div",{class:"sp-detail-meta-label"});c(a,s),r.appendChild(a),r.appendChild(i()),o.appendChild(r),e.appendChild(o)}buildAnnotation(e,t){let s=t.annotations[0];if(!s)return;let i=p("div",{class:"sp-detail-annotation"}),o=p("div",{class:"sp-detail-annotation-info"});this.addAnnotationRow(o,Hs,this.i18n["detail.element"],()=>{let l=p("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"}),d=s.elementId?`<${s.elementTag}#${s.elementId}>`:`<${s.elementTag}>`;return c(l,d),l}),this.addAnnotationRow(o,Os,this.i18n["detail.selector"],()=>{let l=p("span",{class:"sp-detail-annotation-value sp-detail-annotation-value--mono"});return c(l,Ot(s.cssSelector,60)),l.title=s.cssSelector,l}),this.addAnnotationRow(o,Ie,this.i18n["detail.position"],()=>{let l=p("span",{class:"sp-detail-annotation-value"});return c(l,`${s.xPct.toFixed(1)}%, ${s.yPct.toFixed(1)}%`+(s.wPct>0||s.hPct>0?` (${s.wPct.toFixed(1)}% \xD7 ${s.hPct.toFixed(1)}%)`:"")),l}),i.appendChild(o);let r=document.createElement("button");r.type="button",r.className="sp-detail-btn-goto",r.appendChild(v(Ie));let a=document.createElement("span");c(a,this.i18n["detail.goToAnnotation"]),r.appendChild(a),r.addEventListener("click",()=>{this.currentFeedback&&this.callbacks.onGoToAnnotation(this.currentFeedback)}),i.appendChild(r),e.appendChild(i)}addAnnotationRow(e,t,s,i){let o=p("div",{class:"sp-detail-annotation-row"});o.appendChild(v(t));let r=p("div",{class:"sp-detail-meta-content"}),a=p("div",{class:"sp-detail-annotation-label"});c(a,s),r.appendChild(a),r.appendChild(i()),o.appendChild(r),e.appendChild(o)}async handleResolve(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=!0,this.resolveBtn&&this.setButtonLoading(this.resolveBtn),this.deleteBtn&&(this.deleteBtn.disabled=!0);try{await this.callbacks.onResolve(this.currentFeedback)}catch{this.isProcessing=!1,this.resolveBtn&&this.restoreResolveBtn(this.currentFeedback),this.deleteBtn&&(this.deleteBtn.disabled=!1)}}}async handleDelete(){if(!(this.isProcessing||!this.currentFeedback)){this.isProcessing=!0,this.deleteBtn&&this.setButtonLoading(this.deleteBtn),this.resolveBtn&&(this.resolveBtn.disabled=!0);try{await this.callbacks.onDelete(this.currentFeedback)}catch{this.isProcessing=!1,this.deleteBtn&&this.restoreDeleteBtn(),this.resolveBtn&&(this.resolveBtn.disabled=!1)}}}setButtonLoading(e){e.disabled=!0,e.replaceChildren(p("div",{class:"sp-spinner sp-spinner--sm"}))}restoreResolveBtn(e){if(!this.resolveBtn)return;this.resolveBtn.disabled=!1,this.resolveBtn.replaceChildren();let t=e.status==="resolved";this.resolveBtn.appendChild(v(t?Pt:Pe));let s=document.createElement("span");c(s,t?this.i18n["detail.reopen"]:this.i18n["detail.resolve"]),this.resolveBtn.appendChild(s)}restoreDeleteBtn(){if(!this.deleteBtn)return;this.deleteBtn.disabled=!1,this.deleteBtn.replaceChildren(),this.deleteBtn.appendChild(v(Nt));let e=document.createElement("span");c(e,this.i18n["detail.delete"]),this.deleteBtn.appendChild(e)}};var js='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5h10"/><path d="M11 9h7"/><path d="M11 13h4"/><path d="M3 17l3 3 3-3"/><path d="M6 18V4"/></svg>',_t='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',zs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>',Ks={"sort.newest":"Newest first","sort.oldest":"Oldest first","sort.byType":"By type","sort.openFirst":"Open first","sort.label":"Sort","group.byPage":"By page","group.feedbacks":"{count} feedbacks"},Ys={"sort.newest":"Plus r\xE9cents","sort.oldest":"Plus anciens","sort.byType":"Par type","sort.openFirst":"Ouverts d'abord","sort.label":"Trier","group.byPage":"Par page","group.feedbacks":"{count} feedbacks"},$t={question:0,change:1,bug:2,other:3};function jt(n,e){let t=[...n];switch(e){case"newest":t.sort((s,i)=>new Date(i.createdAt).getTime()-new Date(s.createdAt).getTime());break;case"oldest":t.sort((s,i)=>new Date(s.createdAt).getTime()-new Date(i.createdAt).getTime());break;case"by-type":t.sort((s,i)=>{let o=$t[s.type]??99,r=$t[i.type]??99;return o!==r?o-r:new Date(i.createdAt).getTime()-new Date(s.createdAt).getTime()});break;case"open-first":t.sort((s,i)=>{let o=s.status==="open"?0:1,r=i.status==="open"?0:1;return o!==r?o-r:new Date(i.createdAt).getTime()-new Date(s.createdAt).getTime()});break}return t}function qs(n){try{return new URL(n).pathname}catch{return n}}function Us(n,e){if(n.length<=e)return n;let t="\u2026",s=Math.floor((e-1)/2);return n.slice(0,s)+t+n.slice(-s)}function zt(n){let e=new Map;for(let s of n){let i=qs(s.url),o=e.get(i);o?o.push(s):e.set(i,[s])}return new Map([...e.entries()].sort((s,i)=>i[1].length-s[1].length))}function Kt(n,e,t){let s=p("div",{class:"sp-group-header"});s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-expanded","true"),s.style.borderBottomColor=t.border;let i=p("span",{class:"sp-group-header-chevron"});i.appendChild(v(zs)),s.appendChild(i);let o=p("span",{class:"sp-group-header-icon"});o.appendChild(v(_t)),s.appendChild(o);let r=p("span",{class:"sp-group-header-path"}),a=Us(n,40);c(r,a),n.length>40&&(r.title=n),s.appendChild(r);let l=p("span",{class:"sp-group-header-count"});l.style.background=t.accentLight,l.style.color=t.accent,c(l,String(e)),s.appendChild(l);let d=()=>{let h=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",String(!h)),s.classList.toggle("sp-group-header--collapsed",h);let b=s.nextElementSibling;b?.classList.contains("sp-group-content")&&b.classList.toggle("sp-group-content--collapsed",h)};return s.addEventListener("click",d),s.addEventListener("keydown",h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),d())}),s}var ce=class{element;_sortMode="newest";_groupByPage=!1;menuEl=null;sortBtn;groupToggle;i18n;colors;onChange;outsideClickHandler=null;constructor(e,t,s){this.colors=e,this.onChange=t,this.i18n=s==="fr"?Ys:Ks,this.element=p("div",{class:"sp-sort-controls"}),this.sortBtn=document.createElement("button"),this.sortBtn.className="sp-sort-btn",this.sortBtn.setAttribute("aria-haspopup","listbox"),this.sortBtn.setAttribute("aria-expanded","false"),this.sortBtn.setAttribute("aria-label",this.i18n["sort.label"]);let i=v(js);this.sortBtn.appendChild(i);let o=p("span",{class:"sp-sort-btn-label"});c(o,this.i18n["sort.newest"]),this.sortBtn.appendChild(o),this.sortBtn.addEventListener("click",l=>{l.stopPropagation(),this.toggleMenu()}),this.groupToggle=document.createElement("button"),this.groupToggle.className="sp-group-toggle",this.groupToggle.setAttribute("aria-pressed","false");let r=v(_t);this.groupToggle.appendChild(r);let a=p("span",{class:"sp-group-toggle-label"});c(a,this.i18n["group.byPage"]),this.groupToggle.appendChild(a),this.groupToggle.addEventListener("click",()=>{this._groupByPage=!this._groupByPage,this.groupToggle.classList.toggle("sp-group-toggle--active",this._groupByPage),this.groupToggle.setAttribute("aria-pressed",String(this._groupByPage)),this.onChange()}),this.element.appendChild(this.sortBtn),this.element.appendChild(this.groupToggle)}get sortMode(){return this._sortMode}get groupByPage(){return this._groupByPage}toggleMenu(){if(this.menuEl){this.closeMenu();return}this.openMenu()}openMenu(){this.menuEl=p("div",{class:"sp-sort-menu"}),this.menuEl.setAttribute("role","listbox"),this.menuEl.setAttribute("aria-label",this.i18n["sort.label"]),this.sortBtn.setAttribute("aria-expanded","true");let e=[{mode:"newest",label:this.i18n["sort.newest"]},{mode:"oldest",label:this.i18n["sort.oldest"]},{mode:"by-type",label:this.i18n["sort.byType"]},{mode:"open-first",label:this.i18n["sort.openFirst"]}];for(let t of e){let s=document.createElement("button");s.className=`sp-sort-option${t.mode===this._sortMode?" sp-sort-option--active":""}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",String(t.mode===this._sortMode)),t.mode===this._sortMode&&(s.style.background=this.colors.accentLight,s.style.color=this.colors.accent),c(s,t.label),s.addEventListener("click",i=>{i.stopPropagation(),this._sortMode=t.mode,this.updateSortLabel(),this.closeMenu(),this.onChange()}),this.menuEl.appendChild(s)}this.element.appendChild(this.menuEl),requestAnimationFrame(()=>{this.outsideClickHandler=t=>{this.menuEl&&!this.element.contains(t.target)&&this.closeMenu()},document.addEventListener("click",this.outsideClickHandler,!0)}),this.menuEl.addEventListener("keydown",t=>{t.key==="Escape"&&(this.closeMenu(),this.sortBtn.focus())})}closeMenu(){this.menuEl&&(this.menuEl.remove(),this.menuEl=null),this.sortBtn.setAttribute("aria-expanded","false"),this.outsideClickHandler&&(document.removeEventListener("click",this.outsideClickHandler,!0),this.outsideClickHandler=null)}updateSortLabel(){let e={newest:this.i18n["sort.newest"],oldest:this.i18n["sort.oldest"],"by-type":this.i18n["sort.byType"],"open-first":this.i18n["sort.openFirst"]},t=this.sortBtn.querySelector(".sp-sort-btn-label");t&&c(t,e[this._sortMode])}destroy(){this.closeMenu()}},Yt=`
  /* ============================
     Sort Controls Container
     ============================ */

  .sp-sort-controls {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--sp-border);
  }

  /* ============================
     Sort Dropdown Button
     ============================ */

  .sp-sort-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
    position: relative;
  }

  .sp-sort-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .sp-sort-btn:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-sort-btn[aria-expanded="true"] {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  /* ============================
     Sort Floating Menu
     ============================ */

  .sp-sort-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 170px;
    padding: 4px;
    border-radius: var(--sp-radius);
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-md);
    z-index: 10;
    animation: sp-sort-menu-in 0.15s ease-out both;
  }

  @keyframes sp-sort-menu-in {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* ============================
     Sort Menu Option
     ============================ */

  .sp-sort-option {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
  }

  .sp-sort-option:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-sort-option--active {
    font-weight: 600;
  }

  .sp-sort-option--active:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
  }

  /* ============================
     Group by Page Toggle
     ============================ */

  .sp-group-toggle {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-glass-bg-heavy);
    color: var(--sp-text-secondary);
    font-family: var(--sp-font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .sp-group-toggle svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  .sp-group-toggle:hover {
    border-color: var(--sp-accent);
    color: var(--sp-accent);
    background: var(--sp-accent-light);
  }

  .sp-group-toggle--active {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 2px 8px var(--sp-accent-glow);
  }

  .sp-group-toggle--active:hover {
    background: var(--sp-accent-gradient);
    border-color: transparent;
    color: #fff;
  }

  /* ============================
     Page Group Header
     ============================ */

  .sp-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--sp-accent-light);
    border-bottom: 1px solid var(--sp-border);
    cursor: pointer;
    user-select: none;
    position: sticky;
    top: 0;
    z-index: 2;
    transition: background 0.2s ease;
  }

  .sp-group-header:hover {
    background: var(--sp-bg-hover);
  }

  .sp-group-header:focus-visible {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
  }

  .sp-group-header-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
    transform: rotate(90deg);
  }

  .sp-group-header-chevron svg {
    width: 12px;
    height: 12px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header--collapsed .sp-group-header-chevron {
    transform: rotate(0deg);
  }

  .sp-group-header-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .sp-group-header-icon svg {
    width: 14px;
    height: 14px;
    color: var(--sp-text-tertiary);
  }

  .sp-group-header-path {
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text-secondary);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp-group-header-count {
    font-size: 11px;
    font-weight: 700;
    padding: 1px 8px;
    border-radius: var(--sp-radius-full);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  /* ============================
     Page Group Content
     ============================ */

  .sp-group-content {
    overflow: hidden;
    transition: max-height 0.25s ease, opacity 0.2s ease;
    max-height: 5000px;
    opacity: 1;
  }

  .sp-group-content--collapsed {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* ============================
     Forced Colors / High Contrast
     ============================ */

  @media (forced-colors: active) {
    .sp-sort-btn,
    .sp-group-toggle,
    .sp-sort-option,
    .sp-group-header {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
      color: ButtonText !important;
    }

    .sp-sort-btn:focus-visible,
    .sp-group-toggle:focus-visible,
    .sp-sort-option:focus-visible,
    .sp-group-header:focus-visible {
      outline: 3px solid Highlight !important;
    }

    .sp-sort-menu {
      border: 2px solid ButtonText !important;
      background: Canvas !important;
    }
  }

  /* ============================
     Reduced Motion
     ============================ */

  @media (prefers-reduced-motion: reduce) {
    .sp-sort-menu {
      animation: none;
    }
    .sp-group-header-chevron {
      transition: none;
    }
    .sp-group-content {
      transition: none;
    }
  }
`;var Xs={"stats.open":"Open","stats.resolved":"Resolved","stats.bugs":"Bugs","stats.progress":"{percent}% resolved"},Ws={"stats.open":"Ouverts","stats.resolved":"R\xE9solus","stats.bugs":"Bugs","stats.progress":"{percent}% r\xE9solus"},qt=`
  .sp-stats-bar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--sp-border);
    user-select: none;
  }

  .sp-stats-bar[hidden] {
    display: none;
  }

  .sp-stats-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sp-stats-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sp-stats-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .sp-stats-value {
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    color: var(--sp-text);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    transition: opacity 0.3s ease;
  }

  .sp-stats-label {
    font-size: 11px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sp-stats-progress {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sp-stats-progress-track {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--sp-border);
    overflow: hidden;
  }

  .sp-stats-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--sp-accent), #22c55e);
    width: 0%;
    transition: width 0.5s ease;
  }

  .sp-stats-progress-label {
    font-size: 10px;
    line-height: 1;
    color: var(--sp-text-tertiary);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    min-width: 64px;
    text-align: right;
  }
`,he=class{constructor(e,t){this.colors=e;this.i18n=t==="fr"?Ws:Xs,this.element=p("div",{class:"sp-stats-bar"}),this.element.setAttribute("aria-label","Feedback statistics"),this.element.hidden=!0;let s=p("div",{class:"sp-stats-row"}),i=p("div",{class:"sp-stats-item"}),o=p("span",{class:"sp-stats-dot"});o.style.background="#22c55e",this.valueOpen=p("span",{class:"sp-stats-value"}),c(this.valueOpen,"0");let r=p("span",{class:"sp-stats-label"});c(r,this.i18n["stats.open"]),i.appendChild(o),i.appendChild(this.valueOpen),i.appendChild(r);let a=p("div",{class:"sp-stats-item"}),l=p("span",{class:"sp-stats-dot"});l.style.background="#9ca3af",this.valueResolved=p("span",{class:"sp-stats-value"}),c(this.valueResolved,"0");let d=p("span",{class:"sp-stats-label"});c(d,this.i18n["stats.resolved"]),a.appendChild(l),a.appendChild(this.valueResolved),a.appendChild(d);let h=p("div",{class:"sp-stats-item"}),b=p("span",{class:"sp-stats-dot"});b.style.background=this.colors.typeBug,this.valueBugs=p("span",{class:"sp-stats-value"}),c(this.valueBugs,"0");let g=p("span",{class:"sp-stats-label"});c(g,this.i18n["stats.bugs"]),h.appendChild(b),h.appendChild(this.valueBugs),h.appendChild(g),s.appendChild(i),s.appendChild(a),s.appendChild(h);let f=p("div",{class:"sp-stats-progress"}),x=p("div",{class:"sp-stats-progress-track"});this.progressFill=p("div",{class:"sp-stats-progress-fill"}),x.appendChild(this.progressFill),this.progressLabel=p("span",{class:"sp-stats-progress-label"}),c(this.progressLabel,""),f.appendChild(x),f.appendChild(this.progressLabel),this.element.appendChild(s),this.element.appendChild(f)}colors;element;valueOpen;valueResolved;valueBugs;progressFill;progressLabel;i18n;update(e,t){if(t===0){this.element.hidden=!0;return}this.element.hidden=!1;let s=0,i=0,o=0;for(let d of e)d.status==="open"&&s++,d.status==="resolved"&&i++,d.type==="bug"&&o++;c(this.valueOpen,String(s)),c(this.valueResolved,String(i)),c(this.valueBugs,String(o));let r=e.length,a=r>0?Math.round(i/r*100):0;requestAnimationFrame(()=>{this.progressFill.style.width=`${a}%`});let l=this.i18n["stats.progress"].replace("{percent}",String(a));c(this.progressLabel,l)}};var Vs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 12h.01"/><path d="M18 12h.01"/><path d="M8 16h8"/></svg>',He={"shortcuts.title":"Keyboard shortcuts","shortcuts.navigate":"Navigate feedbacks","shortcuts.resolve":"Resolve / Reopen","shortcuts.delete":"Delete","shortcuts.search":"Focus search","shortcuts.select":"Toggle selection","shortcuts.help":"Show shortcuts","shortcuts.close":"Close","shortcuts.hint":"Keyboard shortcuts"},Ut={"shortcuts.title":"Raccourcis clavier","shortcuts.navigate":"Naviguer les feedbacks","shortcuts.resolve":"R\xE9soudre / Rouvrir","shortcuts.delete":"Supprimer","shortcuts.search":"Rechercher","shortcuts.select":"S\xE9lectionner","shortcuts.help":"Raccourcis","shortcuts.close":"Fermer","shortcuts.hint":"Raccourcis clavier"};function Oe(n){let e=n.querySelectorAll(".sp-card");for(let t=0;t<e.length;t++)if(e[t]?.classList.contains("sp-card--focused"))return t;return-1}function Xt(n,e){let t=n.querySelectorAll(".sp-card");if(t.length===0)return;for(let o of t)o.classList.remove("sp-card--focused");let s=Math.max(0,Math.min(e,t.length-1)),i=t[s];i&&(i.classList.add("sp-card--focused"),i.scrollIntoView({block:"nearest",behavior:"smooth"}),i.focus({preventScroll:!0}))}var Gs=[{keys:["J","K"],label:"shortcuts.navigate"},{keys:["R"],label:"shortcuts.resolve"},{keys:["D"],label:"shortcuts.delete"},{keys:["F","/"],label:"shortcuts.search"},{keys:["X"],label:"shortcuts.select"},{keys:["?"],label:"shortcuts.help"},{keys:["Esc"],label:"shortcuts.close"}],Wt=`
  /* ---- Help overlay backdrop ---- */

  .sp-shortcuts-overlay {
    position: fixed;
    inset: 0;
    background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
    backdrop-filter: blur(var(--sp-blur));
    -webkit-backdrop-filter: blur(var(--sp-blur));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .sp-shortcuts-overlay--visible {
    opacity: 1;
    pointer-events: auto;
  }

  /* ---- Glassmorphism card ---- */

  .sp-shortcuts-card {
    width: 380px;
    max-width: calc(100vw - 32px);
    padding: 24px 28px 20px;
    border-radius: 20px;
    background: var(--sp-glass-bg-heavy);
    backdrop-filter: blur(var(--sp-blur-heavy));
    -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-xl);
    font-family: var(--sp-font);
    position: relative;
    transform: scale(0.92) translateY(8px);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .sp-shortcuts-overlay--visible .sp-shortcuts-card {
    transform: scale(1) translateY(0);
  }

  /* ---- Title row ---- */

  .sp-shortcuts-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    color: var(--sp-text);
    margin-bottom: 18px;
  }

  .sp-shortcuts-title svg {
    width: 18px;
    height: 18px;
    color: var(--sp-text-secondary);
    flex-shrink: 0;
  }

  /* ---- Close button ---- */

  .sp-shortcuts-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--sp-text-tertiary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .sp-shortcuts-close:hover {
    background: var(--sp-bg-hover);
    color: var(--sp-text);
  }

  .sp-shortcuts-close svg {
    width: 14px;
    height: 14px;
  }

  /* ---- Two-column grid ---- */

  .sp-shortcuts-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sp-shortcuts-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .sp-shortcuts-keys {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 80px;
    justify-content: flex-end;
  }

  .sp-shortcuts-separator {
    font-size: 11px;
    color: var(--sp-text-tertiary);
    user-select: none;
  }

  /* ---- Key badge (<kbd> styling) ---- */

  .sp-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 26px;
    padding: 0 7px;
    border-radius: 6px;
    background: var(--sp-bg-hover);
    border: 1px solid var(--sp-border);
    box-shadow:
      inset 0 -1px 0 rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.04);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 600;
    color: var(--sp-text);
    text-align: center;
    line-height: 1;
    user-select: none;
  }

  /* ---- Description text ---- */

  .sp-shortcuts-desc {
    font-size: 13px;
    color: var(--sp-text-secondary);
    line-height: 1.3;
  }

  /* ---- Hint button (bottom-right of panel) ---- */

  .sp-shortcuts-hint {
    width: 24px;
    height: 24px;
    border-radius: var(--sp-radius-full);
    border: 1px solid var(--sp-border);
    background: var(--sp-bg-hover);
    color: var(--sp-text-tertiary);
    font-family: ui-monospace, "SF Mono", "Cascadia Code", "Segoe UI Mono", Menlo, monospace;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    position: absolute;
    bottom: 12px;
    right: 12px;
  }

  .sp-shortcuts-hint:hover {
    background: var(--sp-accent-light);
    color: var(--sp-accent);
    border-color: var(--sp-accent);
  }

  .sp-shortcuts-hint::after {
    content: attr(aria-label);
    position: absolute;
    bottom: calc(100% + 6px);
    right: 0;
    padding: 4px 8px;
    border-radius: 6px;
    background: var(--sp-glass-bg-heavy);
    border: 1px solid var(--sp-glass-border);
    box-shadow: var(--sp-shadow-sm);
    font-family: var(--sp-font);
    font-size: 11px;
    font-weight: 500;
    color: var(--sp-text-secondary);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease;
  }

  .sp-shortcuts-hint:hover::after {
    opacity: 1;
    transform: translateY(0);
  }

  /* ---- Card focus highlight (navigation) ---- */

  .sp-card--focused {
    outline: 2px solid var(--sp-accent);
    outline-offset: -2px;
    border-radius: inherit;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    .sp-shortcuts-overlay,
    .sp-shortcuts-card,
    .sp-shortcuts-close,
    .sp-shortcuts-hint,
    .sp-shortcuts-hint::after {
      transition-duration: 0.01ms !important;
    }
  }
`,Qs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',ue=class{constructor(e,t,s=He){this.i18n=s;this.keyMap=new Map([["j",()=>t.onNavigate("down")],["k",()=>t.onNavigate("up")],["r",()=>t.onResolve()],["d",()=>t.onDelete()],["f",()=>t.onFocusSearch()],["/",()=>t.onFocusSearch()],["x",()=>t.onToggleSelect()],["?",()=>this.toggleHelp()]]),this.helpOverlay=this.buildOverlay(),this.hintButton=this.buildHintButton(),this.boundHandler=i=>this.handleKeydown(i)}i18n;helpOverlay;hintButton;keyMap;boundHandler;shadowRoot=null;enabled=!1;helpVisible=!1;destroyed=!1;enable(e){if(this.destroyed||this.enabled)return;e&&(this.shadowRoot=e),(this.shadowRoot??document).addEventListener("keydown",this.boundHandler),this.enabled=!0}disable(){if(!this.enabled)return;(this.shadowRoot??document).removeEventListener("keydown",this.boundHandler),this.enabled=!1,this.helpVisible&&this.hideHelp()}toggleHelp(){this.helpVisible?this.hideHelp():this.showHelp()}destroy(){this.destroyed||(this.disable(),this.helpOverlay.remove(),this.hintButton.remove(),this.destroyed=!0)}handleKeydown(e){if(e.key==="Escape"){this.helpVisible&&(e.preventDefault(),e.stopPropagation(),this.hideHelp());return}if(this.helpVisible)return;let t=e.composedPath()[0];if(t){let i=t.tagName?.toLowerCase();if(i==="input"||i==="textarea"||i==="select"||t.isContentEditable)return}if(e.ctrlKey||e.altKey||e.metaKey)return;let s=this.keyMap.get(e.key);s&&(e.preventDefault(),e.stopPropagation(),s())}showHelp(){this.helpVisible=!0,this.helpOverlay.classList.add("sp-shortcuts-overlay--visible"),this.helpOverlay.querySelector(".sp-shortcuts-close")?.focus()}hideHelp(){this.helpVisible=!1,this.helpOverlay.classList.remove("sp-shortcuts-overlay--visible")}buildOverlay(){let e=p("div",{class:"sp-shortcuts-overlay"});e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label",this.i18n["shortcuts.title"]),e.addEventListener("click",a=>{a.target===e&&this.hideHelp()});let t=p("div",{class:"sp-shortcuts-card"}),s=p("div",{class:"sp-shortcuts-title"});s.appendChild(v(Vs));let i=p("span");c(i,this.i18n["shortcuts.title"]),s.appendChild(i),t.appendChild(s);let o=document.createElement("button");o.className="sp-shortcuts-close",o.setAttribute("aria-label",this.i18n["shortcuts.close"]),o.appendChild(v(Qs)),o.addEventListener("click",()=>this.hideHelp()),t.appendChild(o);let r=p("div",{class:"sp-shortcuts-grid"});for(let a of Gs){let l=p("div",{class:"sp-shortcuts-row"}),d=p("div",{class:"sp-shortcuts-keys"});a.keys.forEach((b,g)=>{if(g>0){let x=p("span",{class:"sp-shortcuts-separator"});c(x,"/"),d.appendChild(x)}let f=p("span",{class:"sp-kbd"});c(f,b),d.appendChild(f)});let h=p("span",{class:"sp-shortcuts-desc"});c(h,this.i18n[a.label]),l.appendChild(d),l.appendChild(h),r.appendChild(l)}return t.appendChild(r),e.appendChild(t),e}buildHintButton(){let e=document.createElement("button");return e.className="sp-shortcuts-hint",e.setAttribute("aria-label",this.i18n["shortcuts.hint"]),c(e,"?"),e.addEventListener("click",t=>{t.stopPropagation(),this.toggleHelp()}),e}};var be=class{constructor(e,t,s,i,o,r,a,l){this.colors=t;this.bus=s;this.client=i;this.projectName=o;this.markers=r;this.t=a;this.locale=l;this.shadowRoot=e,this.bulkI18n=l==="fr"?Re:Fe,this.root=p("div",{class:"sp-panel"}),this.root.setAttribute("role","complementary"),this.root.setAttribute("aria-label",this.t("panel.ariaLabel")),this.root.setAttribute("aria-hidden","true");let d=p("div",{class:"sp-panel-header"}),h=p("span",{class:"sp-panel-title"});c(h,this.t("panel.title")),this.closeBtn=document.createElement("button"),this.closeBtn.className="sp-panel-close",this.closeBtn.setAttribute("aria-label",this.t("panel.close")),this.closeBtn.appendChild(v(J)),this.closeBtn.addEventListener("click",()=>this.close()),this.deleteAllBtn=document.createElement("button"),this.deleteAllBtn.className="sp-btn-delete-all",this.deleteAllBtn.setAttribute("aria-label",this.t("panel.deleteAll")),this.deleteAllBtn.appendChild(v(Te));let b=document.createElement("span");c(b,` ${this.t("panel.deleteAll")}`),this.deleteAllBtn.appendChild(b),this.deleteAllBtn.addEventListener("click",()=>this.confirmDeleteAll()),this.exportBtn=new ae(t,()=>this.feedbacks),l==="fr"&&this.exportBtn.setLabels(Bt);let g=p("div",{class:"sp-panel-header-right"});g.appendChild(this.exportBtn.element),g.appendChild(this.deleteAllBtn),g.appendChild(this.closeBtn),d.appendChild(h),d.appendChild(g),this.stats=new he(t,l);let f=p("div",{class:"sp-filters"}),x=p("div",{class:"sp-search-wrap"}),k=v(it);k.setAttribute("class","sp-search-icon"),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.className="sp-search",this.searchInput.placeholder=this.t("panel.search"),this.searchInput.setAttribute("aria-label",this.t("panel.searchAria")),this.searchInput.addEventListener("input",()=>{this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>this.loadFeedbacks().catch(()=>{}),200)}),x.appendChild(k),x.appendChild(this.searchInput);let C=p("div",{class:"sp-chips"}),w=[{value:"all",label:this.t("panel.filterAll")},{value:"question",label:this.t("type.question")},{value:"change",label:this.t("type.change")},{value:"bug",label:this.t("type.bug")},{value:"other",label:this.t("type.other")}];for(let u of w){let m=document.createElement("button");m.className=`sp-chip ${u.value==="all"?"sp-chip--active":""}`,u.value!=="all"&&(m.style.borderColor=B(u.value,this.colors)),c(m,u.label),m.dataset.filter=u.value,m.setAttribute("aria-pressed",u.value==="all"?"true":"false"),m.addEventListener("click",()=>this.toggleFilter(u.value,C)),C.appendChild(m)}let M=p("div",{class:"sp-chips"}),I=[{value:"all",label:this.t("panel.statusAll")},{value:"open",label:this.t("panel.statusOpen"),color:"#22c55e"},{value:"resolved",label:this.t("panel.statusResolved"),color:"#9ca3af"}];for(let u of I){let m=document.createElement("button");m.className=`sp-chip ${u.value==="all"?"sp-chip--active":""}`,u.color&&(m.style.borderColor=u.color),c(m,u.label),m.dataset.statusFilter=u.value,m.setAttribute("aria-pressed",u.value==="all"?"true":"false"),m.addEventListener("click",()=>this.toggleStatusFilter(u.value,M)),M.appendChild(m)}this.sortControls=new ce(t,()=>this.renderList(),l),f.appendChild(x),f.appendChild(C),f.appendChild(M),f.appendChild(this.sortControls.element),this.listContainer=p("div",{class:"sp-list"}),this.listContainer.setAttribute("role","list"),this.listContainer.setAttribute("aria-label",this.t("panel.feedbackList")),this.bulk=new pe(t,{onResolve:u=>this.bulkResolve(u),onDelete:u=>this.bulkDelete(u)},l),this.bulk.setListContainer(this.listContainer),this.detail=new de(t,{onBack:()=>this.detail.hide(),onResolve:async u=>{let m=u.status!=="resolved";await this.client.resolveFeedback(u.id,m),await this.loadFeedbacks(),this.detail.hide()},onDelete:async u=>{await this.client.deleteFeedback(u.id),this.bus.emit("feedback:deleted",u.id),await this.loadFeedbacks(),this.detail.hide()},onGoToAnnotation:u=>{if(u.annotations.length>0){let m=u.annotations[0];if(!m)return;window.scrollTo({left:m.scrollX,top:m.scrollY,behavior:"smooth"}),this.markers.pinHighlight(u)}}},l);let S=l==="fr"?Ut:He;this.shortcuts=new ue(t,{onNavigate:u=>{let m=Oe(this.listContainer);Xt(this.listContainer,u==="down"?m+1:m-1)},onResolve:()=>{let u=this.getFocusedFeedback();if(u&&!this.pendingMutations.has(u.id)){let y=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(u.id)}"]`)?.querySelector('[data-action="resolve"]');y&&this.toggleResolve(u,y).catch(()=>{})}},onDelete:()=>{let u=this.getFocusedFeedback();if(u&&!this.pendingMutations.has(u.id)){let y=this.listContainer.querySelector(`[data-feedback-id="${CSS.escape(u.id)}"]`)?.querySelector('[data-action="delete"]');y&&this.deleteFeedback(u,y).catch(()=>{})}},onFocusSearch:()=>this.searchInput.focus(),onToggleSelect:()=>{let u=this.getFocusedFeedback();u&&this.bulk.toggle(u.id)}},S),this.root.appendChild(d),this.root.appendChild(this.stats.element),this.root.appendChild(f),this.root.appendChild(this.listContainer),this.root.appendChild(this.bulk.barElement),this.root.appendChild(this.detail.element),this.root.appendChild(this.shortcuts.helpOverlay),this.root.appendChild(this.shortcuts.hintButton),e.appendChild(this.root),this.onListClick=u=>{let m=u.target;if(m.closest(".sp-bulk-checkbox"))return;let y=m.closest("[data-action]");if(y){u.stopPropagation();let E=y.closest(".sp-card");if(!E)return;let A=E.dataset.feedbackId,L=this.feedbacks.find(P=>P.id===A);if(!L)return;let _=y.dataset.action;if(_==="expand"){let P=E.querySelector(".sp-card-message");if(!P)return;let F=P.classList.toggle("sp-card-message--expanded");c(y,F?this.t("panel.showLess"):this.t("panel.showMore")),y.setAttribute("aria-expanded",String(F))}else if(_==="resolve"){if(this.pendingMutations.has(L.id))return;let P=y;this.toggleResolve(L,P).catch(()=>{})}else if(_==="delete"){if(this.pendingMutations.has(L.id))return;let P=y;this.deleteFeedback(L,P).catch(()=>{})}return}let T=m.closest(".sp-card");if(T){let E=T.dataset.feedbackId,A=this.feedbacks.find(L=>L.id===E);if(A){let L=this.feedbacks.indexOf(A)+1;this.detail.show(A,L)}}},this.listContainer.addEventListener("click",this.onListClick),this.onListKeydown=u=>{let m=u;if(m.key!=="Enter"&&m.key!==" ")return;let y=m.target,T=y.closest(".sp-card");if(!T||y!==T)return;m.preventDefault();let E=T.dataset.feedbackId,A=this.feedbacks.find(L=>L.id===E);if(A){let L=this.feedbacks.indexOf(A)+1;this.detail.show(A,L)}},this.listContainer.addEventListener("keydown",this.onListKeydown),this.onListMouseover=u=>{let y=u.target.closest(".sp-card");if(!y)return;let T=y.dataset.feedbackId;T&&this.markers.highlight(T)},this.listContainer.addEventListener("mouseover",this.onListMouseover),this.onListMouseout=u=>{let m=u.relatedTarget;m&&this.listContainer.contains(m)||this.markers.highlight("")},this.listContainer.addEventListener("mouseout",this.onListMouseout),this.bus.on("panel:toggle",u=>{u?this.open():this.close()}),e.addEventListener("keydown",u=>{let m=u;if(m.key==="Escape"&&this.isOpen){if(this.detail.isVisible){this.detail.hide();return}this.close();return}if(m.key==="Tab"&&this.isOpen){let y=this.root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(y.length===0)return;let T=y[0],E=y[y.length-1];if(!T||!E)return;let A=e.activeElement;m.shiftKey&&A===T?(m.preventDefault(),E.focus()):!m.shiftKey&&A===E&&(m.preventDefault(),T.focus())}}),this.onMarkerClick=(u=>{this.scrollToFeedback(u.detail.feedbackId)}),document.addEventListener("sp-marker-click",this.onMarkerClick)}colors;bus;client;projectName;markers;t;locale;root;listContainer;searchInput;closeBtn;deleteAllBtn;activeFilters=new Set(["all"]);activeStatusFilter="all";feedbacks=[];currentPage=1;totalFeedbacks=0;isLoadingMore=!1;isOpen=!1;searchTimeout=null;loadController=null;pendingMutations=new Set;stats;sortControls;bulk;exportBtn;shortcuts;detail;shadowRoot;bulkI18n;onMarkerClick;onListClick;onListKeydown;onListMouseover;onListMouseout;async open(){this.isOpen||(this.isOpen=!0,this.root.classList.add("sp-panel--open"),this.root.setAttribute("aria-hidden","false"),this.bus.emit("open"),this.shortcuts.enable(this.shadowRoot),await this.loadFeedbacks(),requestAnimationFrame(()=>{this.searchInput?this.searchInput.focus():this.closeBtn.focus()}))}close(){if(!this.isOpen)return;this.isOpen=!1,this.root.classList.remove("sp-panel--open"),this.root.setAttribute("aria-hidden","true"),this.bus.emit("close"),this.shortcuts.disable(),this.detail.hide(),this.root.getRootNode().querySelector(".sp-fab")?.focus()}showLoading(){this.listContainer.replaceChildren();let e=p("div",{class:"sp-loading"});e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-label",this.t("panel.loading"));let t=p("div",{class:"sp-spinner"});e.appendChild(t),this.listContainer.appendChild(e)}showError(){this.listContainer.replaceChildren();let e=p("div",{class:"sp-empty"});e.setAttribute("role","status"),e.setAttribute("aria-live","polite");let t=p("div",{class:"sp-empty-text"});c(t,this.t("panel.loadError"));let s=document.createElement("button");s.className="sp-btn-ghost",s.style.marginTop="8px",c(s,this.t("panel.retry")),s.addEventListener("click",()=>this.loadFeedbacks().catch(()=>{})),e.appendChild(t),e.appendChild(s),this.listContainer.appendChild(e)}async loadFeedbacks(){this.loadController?.abort(),this.loadController=new AbortController;let{signal:e}=this.loadController;this.currentPage=1;let t=this.searchInput.value.trim()||void 0,s=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],i=this.activeStatusFilter==="all"?void 0:this.activeStatusFilter,o={page:1,limit:20};s&&(o.type=s),i&&(o.status=i),t&&(o.search=t);let r=this.feedbacks.length>0;r||this.showLoading();try{let{feedbacks:a,total:l}=await this.client.getFeedbacks(this.projectName,o);if(e.aborted)return;this.feedbacks=a,this.totalFeedbacks=l,this.stats.update(a,l),this.bulk.reset(),this.renderList(),this.markers.render(a)}catch(a){if(e.aborted)return;r||this.showError(),this.bus.emit("feedback:error",a instanceof Error?a:new Error(String(a)))}}async loadMoreFeedbacks(){if(this.isLoadingMore)return;this.isLoadingMore=!0;let e=this.loadController,t=this.currentPage+1,s=this.searchInput.value.trim()||void 0,i=this.activeFilters.has("all")?void 0:Array.from(this.activeFilters)[0],o=this.activeStatusFilter==="all"?void 0:this.activeStatusFilter,r={page:t,limit:20};i&&(r.type=i),o&&(r.status=o),s&&(r.search=s);let a=this.listContainer.querySelector(".sp-btn-load-more"),l;a&&(l=this.setButtonLoading(a));try{let{feedbacks:d,total:h}=await this.client.getFeedbacks(this.projectName,r);if(e!==this.loadController)return;this.currentPage=t,this.totalFeedbacks=h,this.feedbacks=[...this.feedbacks,...d],this.stats.update(this.feedbacks,h),this.renderList(),this.markers.render(this.feedbacks)}catch(d){l&&l(),this.bus.emit("feedback:error",d instanceof Error?d:new Error(String(d)))}finally{this.isLoadingMore=!1}}renderList(){if(this.listContainer.replaceChildren(),this.feedbacks.length===0){let o=p("div",{class:"sp-empty"});o.setAttribute("role","status"),o.setAttribute("aria-live","polite");let r=p("div",{class:"sp-empty-text"});c(r,this.t("panel.empty")),o.appendChild(r),this.listContainer.appendChild(o);return}let e=jt(this.feedbacks,this.sortControls.sortMode),t=e.map(o=>o.id),s=this.bulk.createSelectAllBar(t,this.bulkI18n["bulk.selectAll"]);if(this.listContainer.appendChild(s),this.sortControls.groupByPage){let o=zt(e),r=0;for(let[a,l]of o){let d=Kt(a,l.length,this.colors);this.listContainer.appendChild(d);let h=p("div",{class:"sp-group-content"});for(let b of l){let g=this.createCard(b,r+1);g.style.setProperty("--sp-card-i",String(r)),h.appendChild(g),r++}this.listContainer.appendChild(h)}}else e.forEach((o,r)=>{let a=this.createCard(o,r+1);a.style.setProperty("--sp-card-i",String(r)),this.listContainer.appendChild(a)});let i=this.totalFeedbacks-this.feedbacks.length;if(i>0){let o=p("div",{class:"sp-load-more-wrap"}),r=document.createElement("button");r.className="sp-btn-ghost sp-btn-load-more",c(r,this.t("panel.loadMore").replace("{remaining}",String(i))),r.addEventListener("click",()=>this.loadMoreFeedbacks().catch(()=>{})),o.appendChild(r),this.listContainer.appendChild(o)}}createCard(e,t){let s=e.status==="resolved",i=B(e.type,this.colors),o=p("div",{class:`sp-card ${s?"sp-card--resolved":""}`});o.setAttribute("role","listitem"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label",`Feedback #${t}: ${O(e.type,this.t)} \u2014 ${e.message.slice(0,80)}`),o.dataset.feedbackId=e.id;let r=p("div",{class:"sp-card-bar"});r.style.background=s?"#9ca3af":i;let a=p("div",{class:"sp-card-body"}),l=p("div",{class:"sp-card-header"}),d=this.bulk.createCheckbox(e.id);l.appendChild(d);let h=p("span",{class:"sp-card-number"});c(h,`#${t}`);let b=p("span",{class:"sp-badge"}),g=N(e.type,this.colors);b.style.background=g,b.style.color=i,c(b,O(e.type,this.t));let f=p("span",{class:"sp-card-date"});c(f,Q(e.createdAt,this.locale)),l.appendChild(h),l.appendChild(b),l.appendChild(f);let x=p("div",{class:"sp-card-message"});c(x,e.message);let k=document.createElement("button");k.className="sp-card-expand",k.dataset.action="expand",c(k,this.t("panel.showMore")),k.style.display="none",k.setAttribute("aria-expanded","false"),requestAnimationFrame(()=>{x.scrollHeight>x.clientHeight&&(k.style.display="block")});let C=p("div",{class:"sp-card-footer"}),w=document.createElement("button");if(w.className="sp-btn-resolve",w.dataset.action="resolve",s){w.appendChild(v(dt));let S=document.createElement("span");c(S,` ${this.t("panel.reopen")}`),w.appendChild(S)}else{w.appendChild(v(ot));let S=document.createElement("span");c(S,` ${this.t("panel.resolve")}`),w.appendChild(S)}let M=document.createElement("button");M.className="sp-btn-delete",M.dataset.action="delete",M.appendChild(v(Te));let I=document.createElement("span");return c(I,` ${this.t("panel.delete")}`),M.appendChild(I),C.appendChild(w),C.appendChild(M),a.appendChild(l),a.appendChild(x),a.appendChild(k),a.appendChild(C),o.appendChild(r),o.appendChild(a),o}async bulkResolve(e){try{await Promise.all(e.map(t=>this.client.resolveFeedback(t,!0))),await this.loadFeedbacks()}catch(t){throw this.bus.emit("feedback:error",t instanceof Error?t:new Error(String(t))),t}}async bulkDelete(e){try{await Promise.all(e.map(t=>this.client.deleteFeedback(t)));for(let t of e)this.bus.emit("feedback:deleted",t);await this.loadFeedbacks()}catch(t){throw this.bus.emit("feedback:error",t instanceof Error?t:new Error(String(t))),t}}async confirmDeleteAll(){if(await this.showConfirmDialog(this.t("panel.deleteAllConfirmTitle"),this.t("panel.deleteAllConfirmMessage"))){this.deleteAllBtn.disabled=!0;try{await this.client.deleteAllFeedbacks(this.projectName),this.bus.emit("feedback:all-deleted"),await this.loadFeedbacks()}catch(t){this.bus.emit("feedback:error",t instanceof Error?t:new Error(String(t)))}finally{this.deleteAllBtn.disabled=!1}}}showConfirmDialog(e,t){return new Promise(s=>{let i=p("div",{class:"sp-confirm-backdrop"}),o=`sp-confirm-title-${Date.now()}`,r=`sp-confirm-msg-${Date.now()}`,a=p("div",{class:"sp-confirm-dialog"});a.setAttribute("role","alertdialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-labelledby",o),a.setAttribute("aria-describedby",r);let l=p("div",{class:"sp-confirm-title"});l.id=o,c(l,e);let d=p("div",{class:"sp-confirm-message"});d.id=r,c(d,t);let h=p("div",{class:"sp-confirm-actions"}),b=document.createElement("button");b.type="button",b.className="sp-btn-ghost",c(b,this.t("panel.cancel"));let g=document.createElement("button");g.type="button",g.className="sp-btn-danger",c(g,this.t("panel.confirmDelete"));let f=!1,x=C=>{f||(f=!0,i.removeEventListener("keydown",k),i.style.opacity="0",a.style.transform="translateY(8px) scale(0.97)",setTimeout(()=>{i.remove(),s(C)},200))},k=C=>{let w=C;if(w.key==="Escape"){x(!1);return}w.key==="Tab"&&(w.preventDefault(),i.getRootNode().activeElement===b?g.focus():b.focus())};i.addEventListener("keydown",k),b.addEventListener("click",()=>x(!1)),g.addEventListener("click",()=>x(!0)),i.addEventListener("click",C=>{C.target===i&&x(!1)}),h.appendChild(b),h.appendChild(g),a.appendChild(l),a.appendChild(d),a.appendChild(h),i.appendChild(a),this.root.getRootNode()instanceof ShadowRoot?this.root.getRootNode().appendChild(i):this.root.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",a.style.transform="translateY(0) scale(1)",b.focus()})})}setButtonLoading(e){let t=Array.from(e.childNodes).map(s=>s.cloneNode(!0));return e.disabled=!0,e.replaceChildren(p("div",{class:"sp-spinner sp-spinner--sm"})),()=>{e.replaceChildren(...t),e.disabled=!1}}async deleteFeedback(e,t){this.pendingMutations.add(e.id);let s=this.setButtonLoading(t);try{await this.client.deleteFeedback(e.id),this.bus.emit("feedback:deleted",e.id),await this.loadFeedbacks()}catch(i){s(),this.bus.emit("feedback:error",i instanceof Error?i:new Error(String(i)))}finally{this.pendingMutations.delete(e.id)}}async toggleResolve(e,t){this.pendingMutations.add(e.id);let s=this.setButtonLoading(t);try{let i=e.status!=="resolved";await this.client.resolveFeedback(e.id,i),await this.loadFeedbacks()}catch(i){s(),this.bus.emit("feedback:error",i instanceof Error?i:new Error(String(i)))}finally{this.pendingMutations.delete(e.id)}}toggleFilter(e,t){this.activeFilters.clear(),this.activeFilters.add(e);let s=t.querySelectorAll(".sp-chip");for(let i of s){let o=this.activeFilters.has(i.dataset.filter??"");i.classList.toggle("sp-chip--active",o),i.setAttribute("aria-pressed",String(o))}this.loadFeedbacks().catch(()=>{})}toggleStatusFilter(e,t){this.activeStatusFilter=e;let s=t.querySelectorAll(".sp-chip");for(let i of s){let o=i.dataset.statusFilter===e;i.classList.toggle("sp-chip--active",o),i.setAttribute("aria-pressed",String(o))}this.loadFeedbacks().catch(()=>{})}getFocusedFeedback(){let e=Oe(this.listContainer);if(e<0)return;let t=this.listContainer.querySelectorAll(".sp-card")[e];if(t)return this.feedbacks.find(s=>s.id===t.dataset.feedbackId)}scrollToFeedback(e){let t=CSS.escape(e),s=this.listContainer.querySelector(`[data-feedback-id="${t}"]`);s&&(s.scrollIntoView({behavior:"smooth",block:"center"}),s.classList.add("sp-anim-flash"),s.addEventListener("animationend",()=>{s.classList.remove("sp-anim-flash")},{once:!0}))}async refresh(){this.isOpen&&await this.loadFeedbacks()}destroy(){this.loadController?.abort(),this.searchTimeout&&clearTimeout(this.searchTimeout),this.listContainer.removeEventListener("click",this.onListClick),this.listContainer.removeEventListener("keydown",this.onListKeydown),this.listContainer.removeEventListener("mouseover",this.onListMouseover),this.listContainer.removeEventListener("mouseout",this.onListMouseout),document.removeEventListener("sp-marker-click",this.onMarkerClick),this.sortControls.destroy(),this.bulk.destroy(),this.exportBtn.destroy(),this.shortcuts.destroy(),this.detail.destroy(),this.root.remove()}};function De(n){return{cssSelector:n.anchor.cssSelector,xpath:n.anchor.xpath,textSnippet:n.anchor.textSnippet,elementTag:n.anchor.elementTag,elementId:n.anchor.elementId,textPrefix:n.anchor.textPrefix,textSuffix:n.anchor.textSuffix,fingerprint:n.anchor.fingerprint,neighborText:n.anchor.neighborText,xPct:n.rect.xPct,yPct:n.rect.yPct,wPct:n.rect.wPct,hPct:n.rect.hPct,scrollX:n.scrollX,scrollY:n.scrollY,viewportW:n.viewportW,viewportH:n.viewportH,devicePixelRatio:n.devicePixelRatio}}var ge=class{constructor(e,t){this.store=e;this.projectName=t}store;projectName;async sendFeedback(e){let t=await this.store.createFeedback({projectName:e.projectName,type:e.type,message:e.message,status:"open",url:e.url,viewport:e.viewport,userAgent:e.userAgent,authorName:e.authorName,authorEmail:e.authorEmail,clientId:e.clientId,annotations:e.annotations.map(De)});return $e(t)}async getFeedbacks(e,t){let{feedbacks:s,total:i}=await this.store.getFeedbacks({projectName:e,page:t?.page,limit:t?.limit,type:t?.type,status:t?.status,search:t?.search});return{feedbacks:s.map($e),total:i}}async resolveFeedback(e,t){let s=await this.store.updateFeedback(e,{status:t?"resolved":"open",resolvedAt:t?new Date:null});return $e(s)}async deleteFeedback(e){await this.store.deleteFeedback(e)}async deleteAllFeedbacks(e){await this.store.deleteAllFeedbacks(e)}};function $e(n){return{id:n.id,projectName:n.projectName,type:n.type,message:n.message,status:n.status,url:n.url,viewport:n.viewport,userAgent:n.userAgent,authorName:n.authorName,authorEmail:n.authorEmail,resolvedAt:n.resolvedAt?.toISOString()??null,createdAt:n.createdAt.toISOString(),updatedAt:n.updatedAt.toISOString(),annotations:n.annotations.map(Js)}}function Js(n){return{id:n.id,feedbackId:n.feedbackId,cssSelector:n.cssSelector,xpath:n.xpath,textSnippet:n.textSnippet,elementTag:n.elementTag,elementId:n.elementId,textPrefix:n.textPrefix,textSuffix:n.textSuffix,fingerprint:n.fingerprint,neighborText:n.neighborText,xPct:n.xPct,yPct:n.yPct,wPct:n.wPct,hPct:n.hPct,scrollX:n.scrollX,scrollY:n.scrollY,viewportW:n.viewportW,viewportH:n.viewportH,devicePixelRatio:n.devicePixelRatio,createdAt:n.createdAt.toISOString()}}var Zs="linear(0, 0.006, 0.025, 0.06, 0.11, 0.17, 0.25, 0.34, 0.45, 0.56, 0.67, 0.78, 0.88, 0.95, 1.01, 1.04, 1.05, 1.04, 1.02, 1, 0.99, 1)",_e="cubic-bezier(0.16, 1, 0.3, 1)",je="cubic-bezier(0.34, 1.56, 0.64, 1)",en="cubic-bezier(0.25, 1, 0.5, 1)",Gt=`
  /* ---- Keyframes ---- */

  @keyframes sp-fab-in {
    from {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes sp-fab-glow {
    0%, 100% { box-shadow: 0 4px 20px var(--sp-accent-glow), 0 2px 8px rgba(0, 0, 0, 0.08); }
    50% { box-shadow: 0 4px 28px var(--sp-accent-glow), 0 2px 12px rgba(0, 0, 0, 0.1); }
  }

  @keyframes sp-marker-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.2);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes sp-pulse-ring {
    0% {
      box-shadow: 0 0 0 0 var(--sp-accent-glow);
    }
    70% {
      box-shadow: 0 0 0 8px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  @keyframes sp-flash-bg {
    0% { background-color: var(--sp-accent-light); }
    100% { background-color: transparent; }
  }

  @keyframes sp-slide-up {
    from {
      transform: translateY(8px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes sp-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes sp-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* ---- Animation classes ---- */

  .sp-anim-fab-in {
    animation: sp-fab-in 0.5s ${Zs} both;
  }

  .sp-anim-marker-in {
    animation: sp-marker-in 0.35s ${je} both;
  }

  .sp-anim-pulse {
    animation: sp-pulse-ring 0.7s ease-out;
  }

  .sp-anim-flash {
    animation: sp-flash-bg 0.5s ${en};
  }

  .sp-anim-slide-up {
    animation: sp-slide-up 0.3s ${_e} both;
  }

  .sp-anim-fade-in {
    animation: sp-fade-in 0.2s ease-out both;
  }

  /* ---- Transition utilities ---- */

  .sp-panel {
    transform: translateX(110%);
    transition: transform 0.4s ${_e};
  }

  .sp-panel.sp-panel--open {
    transform: translateX(0);
  }

  .sp-radial-item {
    opacity: 0;
    pointer-events: none;
    transform: translate(0, 0) scale(0.8);
    transition:
      transform 0.35s ${je},
      opacity 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .sp-radial-item.sp-radial-item--open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Stagger delay via CSS custom property --sp-i */
  .sp-radial-item {
    transition-delay: calc(var(--sp-i, 0) * 50ms);
  }

  /* ---- Card stagger animation ---- */

  @keyframes sp-card-in {
    from {
      transform: translateY(12px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .sp-card {
    animation: sp-card-in 0.35s ${_e} both;
    animation-delay: calc(var(--sp-card-i, 0) * 40ms);
  }

  /* ---- Loading spinner ---- */

  @keyframes sp-spin {
    to { transform: rotate(360deg); }
  }

  .sp-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--sp-border);
    border-top-color: var(--sp-accent);
    border-radius: 50%;
    animation: sp-spin 0.6s linear infinite;
  }

  /* ---- Badge bounce ---- */

  @keyframes sp-badge-in {
    0% { transform: scale(0); }
    60% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .sp-fab-badge {
    animation: sp-badge-in 0.4s ${je} both;
  }

  /* ---- Reduced motion ---- */

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

`;function ze(n){return`
    :host {
      all: initial;
      position: fixed;
      z-index: ${2147483647};
      font-family: var(--sp-font);
      font-size: 14px;
      line-height: 1.5;
      color: var(--sp-text);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      ${bt(n)}

      /* Identity modal \u2014 theme-aware backdrop + panel */
      --sp-identity-bg: ${n.glassBgHeavy};
      --sp-identity-overlay: ${n.bg==="#ffffff"?"rgba(15, 23, 42, 0.2)":"rgba(0, 0, 0, 0.4)"};
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ============================
       Focus visible (accessibility)
       ============================ */

    :focus-visible {
      outline: 2px solid var(--sp-accent);
      outline-offset: 2px;
    }

    /* ============================
       FAB (Floating Action Button)
       ============================ */

    .sp-fab {
      position: fixed;
      width: 52px;
      height: 52px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-accent-gradient);
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow:
        0 4px 20px var(--sp-accent-glow),
        0 2px 8px rgba(0, 0, 0, 0.08);
      transition:
        transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
        box-shadow 0.3s ease;
      outline: none;
    }

    .sp-fab:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    .sp-fab:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow:
        0 8px 28px var(--sp-accent-glow),
        0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .sp-fab:active {
      transform: translateY(0) scale(0.95);
      transition-duration: 0.1s;
    }

    .sp-fab--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-fab--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-fab svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* ---- FAB Badge ---- */

    .sp-fab-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: var(--sp-radius-full);
      background: #ef4444;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
      pointer-events: none;
      font-family: var(--sp-font);
      line-height: 1;
    }

    /* ============================
       Radial Menu
       ============================ */

    .sp-radial {
      position: fixed;
      pointer-events: none;
      width: 52px;
      height: 52px;
    }

    .sp-radial--bottom-right {
      bottom: 24px;
      right: 24px;
    }

    .sp-radial--bottom-left {
      bottom: 24px;
      left: 24px;
    }

    .sp-radial-item {
      position: absolute;
      left: 4px;
      bottom: 4px;
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius-full);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      color: var(--sp-text);
      border: 1px solid var(--sp-glass-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--sp-shadow-md);
      font-size: 12px;
      font-weight: 600;
    }

    .sp-radial-item:hover,
    .sp-radial-item:focus-visible {
      background: rgba(255, 255, 255, 0.95);
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      box-shadow:
        var(--sp-shadow-md),
        0 0 0 3px var(--sp-accent-light);
      outline: none;
    }

    .sp-radial-item svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      stroke: currentColor;
      fill: none;
    }

    .sp-radial-label {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-text);
      pointer-events: none;
      opacity: 0;
      padding: 4px 12px;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-sm);
      transform: translateX(4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .sp-radial-item:hover .sp-radial-label,
    .sp-radial-item:focus-visible .sp-radial-label {
      opacity: 1;
      transform: translateX(0);
    }

    /* ============================
       Panel (Side drawer)
       ============================ */

    .sp-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      max-width: 100vw;
      height: 100vh;
      height: 100dvh;
      background: var(--sp-glass-bg);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border-left: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    @media (max-width: 480px) {
      .sp-panel {
        width: 100vw;
        border-left: none;
      }
    }

    .sp-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
    }

    .sp-panel-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-panel-close {
      width: 44px;
      height: 44px;
      border-radius: var(--sp-radius);
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sp-text-tertiary);
      transition: all 0.2s ease;
    }

    .sp-panel-close:hover {
      background: var(--sp-bg-hover);
      color: var(--sp-text);
    }

    .sp-panel-close svg {
      width: 16px;
      height: 16px;
    }

    /* ============================
       Filters & Search
       ============================ */

    .sp-filters {
      padding: 16px 24px;
      border-bottom: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .sp-search-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    .sp-search {
      width: 100%;
      height: 40px;
      padding: 0 12px 0 38px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 13px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-search::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-search:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: #fff;
    }

    .sp-search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--sp-text-tertiary);
      width: 16px;
      height: 16px;
      transition: color 0.2s ease;
    }

    .sp-search:focus ~ .sp-search-icon,
    .sp-search-wrap:focus-within .sp-search-icon {
      color: var(--sp-accent);
    }

    .sp-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }

    .sp-chips:last-child {
      margin-bottom: 0;
    }

    .sp-chip {
      padding: 5px 14px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    .sp-chip:hover {
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      background: var(--sp-accent-light);
    }

    .sp-chip--active {
      background: var(--sp-accent-gradient);
      border-color: transparent;
      color: #fff;
      box-shadow: 0 2px 8px var(--sp-accent-glow);
    }

    .sp-chip--active:hover {
      background: var(--sp-accent-gradient);
      border-color: transparent;
      color: #fff;
    }

    /* ============================
       Feedback Cards
       ============================ */

    .sp-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 12px;
    }

    .sp-list::-webkit-scrollbar {
      width: 6px;
    }

    .sp-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .sp-list::-webkit-scrollbar-thumb {
      background: var(--sp-border);
      border-radius: var(--sp-radius-full);
    }

    .sp-list::-webkit-scrollbar-thumb:hover {
      background: var(--sp-text-tertiary);
    }

    .sp-card {
      display: flex;
      padding: 14px 16px;
      margin-bottom: 6px;
      cursor: pointer;
      border-radius: var(--sp-radius);
      background: var(--sp-glass-bg-heavy);
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xs);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .sp-card:hover {
      background: #fff;
      border-color: var(--sp-border);
      box-shadow: var(--sp-shadow-md);
      transform: translateY(-2px);
    }

    .sp-card:active {
      transform: translateY(0) scale(0.99);
      transition-duration: 0.1s;
    }

    .sp-card-bar {
      width: 3px;
      border-radius: var(--sp-radius-full);
      margin-right: 14px;
      flex-shrink: 0;
    }

    .sp-card-body {
      flex: 1;
      min-width: 0;
    }

    .sp-card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .sp-card-number {
      font-size: 12px;
      font-weight: 700;
      color: var(--sp-text-tertiary);
      font-variant-numeric: tabular-nums;
    }

    .sp-badge {
      padding: 2px 10px;
      border-radius: var(--sp-radius-full);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .sp-card-date {
      font-size: 11px;
      color: var(--sp-text-tertiary);
      margin-left: auto;
    }

    .sp-card-message {
      font-size: 13px;
      line-height: 1.5;
      color: var(--sp-text);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sp-card-message--expanded {
      -webkit-line-clamp: unset;
    }

    .sp-card-expand {
      font-size: 12px;
      font-weight: 500;
      color: var(--sp-accent);
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px 0;
      font-family: var(--sp-font);
      transition: opacity 0.15s ease;
    }

    .sp-card-expand:hover {
      opacity: 0.8;
    }

    .sp-card-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      margin-top: 10px;
    }

    .sp-btn-resolve,
    .sp-btn-delete {
      padding: 8px 14px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-resolve svg,
    .sp-btn-delete svg {
      width: 14px;
      height: 14px;
    }

    .sp-btn-resolve:hover {
      border-color: #22c55e;
      color: #22c55e;
      background: rgba(34, 197, 94, 0.06);
    }

    .sp-btn-delete:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-resolve:disabled,
    .sp-btn-delete:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .sp-spinner--sm {
      width: 14px;
      height: 14px;
    }

    /* ---- Delete All (header) ---- */

    .sp-panel-header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .sp-btn-delete-all {
      padding: 5px 12px;
      border-radius: var(--sp-radius-full);
      border: 1px solid var(--sp-border);
      background: transparent;
      color: var(--sp-text-tertiary);
      font-family: var(--sp-font);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
    }

    .sp-btn-delete-all svg {
      width: 13px;
      height: 13px;
    }

    .sp-btn-delete-all:hover {
      border-color: #ef4444;
      color: #ef4444;
      background: rgba(239, 68, 68, 0.06);
    }

    .sp-btn-delete-all:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ---- Confirm Dialog ---- */

    .sp-confirm-backdrop {
      position: fixed;
      inset: 0;
      background: var(--sp-backdrop, rgba(15, 23, 42, 0.2));
      backdrop-filter: blur(var(--sp-blur));
      -webkit-backdrop-filter: blur(var(--sp-blur));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${2147483647};
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sp-confirm-dialog {
      width: 340px;
      padding: 28px;
      border-radius: 20px;
      background: var(--sp-glass-bg-heavy);
      backdrop-filter: blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter: blur(var(--sp-blur-heavy));
      border: 1px solid var(--sp-glass-border);
      box-shadow: var(--sp-shadow-xl);
      font-family: var(--sp-font);
      transform: translateY(8px) scale(0.97);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sp-confirm-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .sp-confirm-message {
      font-size: 14px;
      color: var(--sp-text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .sp-confirm-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .sp-btn-danger {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: #ef4444;
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
    }

    .sp-btn-danger:hover {
      background: #dc2626;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
      transform: translateY(-1px);
    }

    .sp-btn-danger:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-card--resolved {
      opacity: 0.5;
    }

    .sp-card--resolved .sp-card-message {
      text-decoration: line-through;
      text-decoration-color: var(--sp-text-tertiary);
    }

    /* ============================
       Loading State
       ============================ */

    .sp-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
    }

    /* ============================
       Identity Form
       ============================ */

    .sp-identity-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--sp-text);
      letter-spacing: -0.02em;
    }

    .sp-input {
      width: 100%;
      height: 42px;
      padding: 0 14px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text);
      font-family: var(--sp-font);
      font-size: 14px;
      outline: none;
      transition: all 0.2s ease;
    }

    .sp-input::placeholder {
      color: var(--sp-text-tertiary);
    }

    .sp-input:focus {
      border-color: var(--sp-accent);
      box-shadow: 0 0 0 3px var(--sp-accent-light);
      background: #fff;
    }

    .sp-input-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--sp-text-secondary);
      margin-bottom: 6px;
      display: block;
    }

    /* ============================
       Buttons
       ============================ */

    .sp-btn-primary {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: none;
      background: var(--sp-accent-gradient);
      color: #fff;
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px var(--sp-accent-glow);
    }

    .sp-btn-primary:hover {
      box-shadow: 0 4px 16px var(--sp-accent-glow);
      transform: translateY(-1px);
    }

    .sp-btn-primary:active {
      transform: translateY(0) scale(0.98);
      transition-duration: 0.1s;
    }

    .sp-btn-primary:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .sp-btn-ghost {
      height: 40px;
      padding: 0 22px;
      border-radius: var(--sp-radius);
      border: 1px solid var(--sp-border);
      background: var(--sp-glass-bg-heavy);
      color: var(--sp-text-secondary);
      font-family: var(--sp-font);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .sp-btn-ghost:hover {
      border-color: var(--sp-accent);
      color: var(--sp-accent);
      background: var(--sp-accent-light);
    }

    /* ============================
       Empty State
       ============================ */

    .sp-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 56px 24px;
      color: var(--sp-text-tertiary);
      text-align: center;
      gap: 8px;
      animation: sp-fade-in 0.3s ease-out both;
    }

    .sp-empty-text {
      font-size: 14px;
      font-weight: 500;
    }

    /* ============================
       Load More
       ============================ */

    .sp-load-more-wrap {
      display: flex;
      justify-content: center;
      padding: 12px 0 4px;
    }

    .sp-btn-load-more {
      width: 100%;
    }

    /* ============================
       Forced Colors / High Contrast
       ============================ */

    @media (forced-colors: active) {
      .sp-fab,
      .sp-radial-item,
      .sp-chip,
      .sp-card,
      .sp-panel-close,
      .sp-search,
      .sp-btn-resolve,
      .sp-btn-delete,
      .sp-btn-delete-all,
      .sp-btn-primary,
      .sp-btn-ghost,
      .sp-btn-danger,
      .sp-card-expand,
      .sp-input,
      .sp-confirm-dialog {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-fab:focus-visible,
      .sp-radial-item:focus-visible,
      .sp-chip:focus-visible,
      .sp-panel-close:focus-visible,
      .sp-btn-resolve:focus-visible,
      .sp-btn-delete:focus-visible,
      .sp-btn-delete-all:focus-visible,
      .sp-btn-primary:focus-visible,
      .sp-btn-ghost:focus-visible,
      .sp-btn-danger:focus-visible,
      .sp-card-expand:focus-visible,
      .sp-input:focus-visible,
      .sp-search:focus-visible {
        outline: 3px solid Highlight !important;
      }

      .sp-panel {
        border: 2px solid ButtonText !important;
      }

      .sp-fab-badge {
        border: 2px solid ButtonText !important;
        background: Canvas !important;
        color: ButtonText !important;
      }

      .sp-card-bar {
        background: ButtonText !important;
      }
    }

    ${Gt}
    ${qt}
    ${Yt}
    ${It}
    ${Ft}
    ${Wt}
    ${Dt}
  `}var tn=120,sn=80,me=class{constructor(e,t="en"){this.colors=e;this.locale=t;this.root=p("div",{style:`
        position: fixed;
        z-index: ${2147483647};
        max-width: 280px;
        padding: 12px 14px;
        border-radius: 14px;
        background: ${this.colors.glassBgHeavy};
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid ${this.colors.glassBorder};
        box-shadow: 0 8px 32px ${this.colors.shadow}, 0 2px 8px ${this.colors.shadow};
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        pointer-events: auto;
        opacity: 0;
        transform: translateY(6px) scale(0.97);
        transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        visibility: hidden;
        -webkit-font-smoothing: antialiased;
      `}),this.root.setAttribute("role","tooltip"),this.root.id=this.tooltipId,this.arrow=p("div",{style:`
        position: absolute;
        width: 12px;
        height: 12px;
        background: ${this.colors.glassBgHeavy};
        border: 1px solid ${this.colors.glassBorder};
        transform: rotate(45deg);
        pointer-events: none;
      `}),this.root.appendChild(this.arrow),this.root.addEventListener("mouseenter",()=>this.cancelHide()),this.root.addEventListener("mouseleave",()=>this.scheduleHide()),document.body.appendChild(this.root)}colors;locale;root;arrow;showTimer=null;hideTimer=null;currentFeedbackId=null;tooltipId="sp-tooltip";show(e,t){this.currentFeedbackId!==e.id&&(this.cancelHide(),this.cancelShow(),this.showTimer=setTimeout(()=>{this.currentFeedbackId=e.id,this.render(e),this.position(t);let s=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;this.root.style.transition=s?"none":"",this.root.style.visibility="visible",this.root.style.opacity="1",this.root.style.transform="translateY(0) scale(1)"},tn))}scheduleHide(){this.cancelHide(),this.hideTimer=setTimeout(()=>this.hide(),sn)}hide(){this.cancelShow(),this.currentFeedbackId=null,this.root.style.opacity="0",this.root.style.transform="translateY(6px) scale(0.97)",setTimeout(()=>{this.currentFeedbackId||(this.root.style.visibility="hidden")},200)}cancelShow(){this.showTimer&&(clearTimeout(this.showTimer),this.showTimer=null)}cancelHide(){this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null)}render(e){let t=Array.from(this.root.children);for(let b of t)b!==this.arrow&&b.remove();let s=B(e.type,this.colors),i=N(e.type,this.colors),o=ne(this.locale),r=O(e.type,o),a=p("div",{style:"display:flex;align-items:center;gap:8px;margin-bottom:8px;"}),l=p("span",{style:`
        padding:3px 10px;border-radius:9999px;
        font-size:11px;font-weight:600;
        color:${s};background:${i};
        letter-spacing:0.02em;
      `});c(l,r);let d=p("span",{style:`font-size:11px;color:${this.colors.textSecondary};margin-left:auto;`});c(d,Q(e.createdAt,this.locale)),a.appendChild(l),a.appendChild(d);let h=p("div",{style:`font-size:13px;line-height:1.55;color:${this.colors.text};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;`});c(h,e.message),this.root.insertBefore(a,this.arrow),this.root.insertBefore(h,this.arrow)}position(e){let t=this.root.getBoundingClientRect(),s=10,i=e.top-t.height-s,o=e.left+e.width/2-t.width/2,r=!0;i<8&&(i=e.bottom+s,r=!1),o=Math.max(8,Math.min(o,window.innerWidth-t.width-8)),this.root.style.top=`${i}px`,this.root.style.left=`${o}px`;let a=Math.max(16,Math.min(e.left+e.width/2-o-6,t.width-22));r?this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-right:1px solid ${this.colors.glassBorder};
        border-bottom:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        bottom:-6px;
        left:${a}px;
      `:this.arrow.style.cssText=`
        position:absolute;
        width:12px;height:12px;
        background:${this.colors.glassBgHeavy};
        border-left:1px solid ${this.colors.glassBorder};
        border-top:1px solid ${this.colors.glassBorder};
        transform:rotate(45deg);
        pointer-events:none;
        top:-6px;
        left:${a}px;
      `}contains(e){return this.root.contains(e)}destroy(){this.cancelShow(),this.cancelHide(),this.root.remove()}};var q=null;function fe(){let n=()=>{};return{destroy:n,open:n,close:n,refresh:n,on:()=>n,off:n}}function Qt(n){let e=n.debug?(...u)=>console.debug("[siteping]",...u):()=>{};if(q)return e("initSiteping() called more than once \u2014 returning existing instance"),q;if(!n.forceShow)try{if(typeof process<"u"){let u="production";return console.info("[siteping] Widget not loaded: production mode detected. Use forceShow: true to override."),n.onSkip?.(u),fe()}}catch{}if(window.innerWidth<768){let u="mobile";return console.info(`[siteping] Widget not loaded: viewport width < ${768}px (mobile not supported).`),n.onSkip?.(u),fe()}if(!n.store&&(!n.endpoint||typeof n.endpoint!="string"))return console.error("[siteping] Missing 'endpoint' or 'store' in config. Provide an endpoint like '/api/siteping' or a SitepingStore instance."),fe();if(!n.projectName||typeof n.projectName!="string")return console.error("[siteping] Missing or invalid 'projectName' in config. Expected a non-empty string."),fe();let t=n.locale??"en",s=ne(t);e("Initializing widget",{projectName:n.projectName,theme:n.theme??"light",locale:t});let i=ut(n.accentColor,n.theme),o=new K,r=new K,a=n.store?new ge(n.store,n.projectName):new te(n.endpoint,n.projectName);n.onOpen&&o.on("open",n.onOpen),n.onClose&&o.on("close",n.onClose),n.onFeedbackSent&&o.on("feedback:sent",n.onFeedbackSent),n.onError&&o.on("feedback:error",n.onError),n.onAnnotationStart&&o.on("annotation:start",n.onAnnotationStart),n.onAnnotationEnd&&o.on("annotation:end",n.onAnnotationEnd),o.on("feedback:sent",u=>r.emit("feedback:sent",u)),o.on("feedback:deleted",u=>r.emit("feedback:deleted",u)),o.on("open",()=>r.emit("panel:open")),o.on("close",()=>r.emit("panel:close")),o.on("open",()=>e("Panel opened")),o.on("close",()=>e("Panel closed")),o.on("feedback:sent",u=>e("Feedback sent",u.id)),o.on("feedback:error",u=>e("Feedback failed",u.message)),o.on("annotation:start",()=>e("Annotation started")),o.on("annotation:end",()=>e("Annotation ended"));let l=document.createElement("siteping-widget");l.style.cssText=`position:fixed;z-index:${2147483647};`;let d=!1;try{typeof process<"u"&&process.env?.["NODE_ENV"]==="test"&&(d=!0)}catch{}let h=d?"open":"closed",b=l.attachShadow({mode:h});if("adoptedStyleSheets"in ShadowRoot.prototype){let u=new CSSStyleSheet;u.replaceSync(ze(i)),b.adoptedStyleSheets=[u]}else{let u=document.createElement("style");u.textContent=ze(i),b.appendChild(u)}document.body.appendChild(l);let f=document.createElement("div");f.setAttribute("role","status"),f.setAttribute("aria-live","polite"),f.setAttribute("aria-atomic","true"),f.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;",document.body.appendChild(f);let x=new me(i,t),k=new re(i,x,o,s),C=new se(b,n,o,s),w=new be(b,i,o,a,n.projectName,k,s,t),M=new ee(i,o,s),I=!1,S=o.on("annotation:complete",async u=>{if(!I){I=!0;try{let{annotation:m,type:y,message:T}=u,E=kt();if(!E){if(E=await on(b,s),!E)return;wt(E)}let A=new URL(window.location.href);for(let F of[...A.searchParams.keys()])/token|key|secret|auth|session|password|code/i.test(F)&&A.searchParams.delete(F);let L=A.toString(),_=(()=>{try{return crypto.randomUUID()}catch{return`${Date.now()}-${Math.random().toString(36).slice(2)}`}})(),P={projectName:n.projectName,type:y,message:T,url:L,viewport:`${window.innerWidth}x${window.innerHeight}`,userAgent:navigator.userAgent,authorName:E.name,authorEmail:E.email,annotations:[m],clientId:_};try{let F=await a.sendFeedback(P);o.emit("feedback:sent",F),k.addFeedback(F,k.count+1),f.textContent=s("feedback.sent.confirmation"),await w.refresh()}catch(F){o.emit("feedback:error",F instanceof Error?F:new Error(String(F))),f.textContent=s("feedback.error.message")}}finally{I=!1}}});return a.getFeedbacks(n.projectName,{limit:20}).then(({feedbacks:u})=>{k.render(u)}).catch(u=>{e("Failed to load initial markers:",u)}),n.endpoint&&mt(n.endpoint).then(()=>e("Retry queue flushed")).catch(()=>{}),q={destroy:()=>{e("Destroying widget"),S(),C.destroy(),w.destroy(),M.destroy(),k.destroy(),x.destroy(),o.removeAll(),r.removeAll(),f.remove(),l.remove(),q=null},open:()=>{w.open()},close:()=>{w.close()},refresh:()=>{w.refresh()},on:(u,m)=>r.on(u,m),off:(u,m)=>{r.off(u,m)}},q}function on(n,e){return new Promise(t=>{let s=n.activeElement??document.activeElement,i=document.createElement("div");i.style.cssText=`
      position:fixed;inset:0;
      background:var(--sp-identity-overlay);
      backdrop-filter:blur(8px);
      -webkit-backdrop-filter:blur(8px);
      display:flex;align-items:center;justify-content:center;
      z-index:${2147483647};
      opacity:0;transition:opacity 0.25s ease;
    `;let o=document.createElement("div");o.style.cssText=`
      width:340px;padding:28px;border-radius:var(--sp-radius-xl);
      background:var(--sp-identity-bg);
      backdrop-filter:blur(var(--sp-blur-heavy));
      -webkit-backdrop-filter:blur(var(--sp-blur-heavy));
      border:1px solid var(--sp-glass-border);
      box-shadow:0 16px 48px var(--sp-shadow), 0 8px 16px var(--sp-shadow);
      font-family:var(--sp-font, "Inter",system-ui,-apple-system,sans-serif);
      color:var(--sp-text);
      transform:translateY(12px) scale(0.97);
      transition:transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      -webkit-font-smoothing:antialiased;
    `;let r=`sp-identity-title-${Date.now()}`;o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-labelledby",r);let a=document.createElement("div");a.className="sp-identity-title",a.id=r,a.textContent=e("identity.title"),a.style.marginBottom="20px";let l=`sp-identity-name-${Date.now()}`,d=`sp-identity-email-${Date.now()}`,h=document.createElement("label");h.className="sp-input-label",h.textContent=e("identity.nameLabel"),h.setAttribute("for",l);let b=document.createElement("input");b.className="sp-input",b.id=l,b.type="text",b.placeholder=e("identity.namePlaceholder"),b.style.marginBottom="14px";let g=document.createElement("label");g.className="sp-input-label",g.textContent=e("identity.emailLabel"),g.setAttribute("for",d);let f=document.createElement("input");f.className="sp-input",f.id=d,f.type="email",f.placeholder=e("identity.emailPlaceholder");let x=document.createElement("div");x.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;";let k=S=>{i.removeEventListener("keydown",I),i.style.opacity="0",o.style.transform="translateY(12px) scale(0.97)",setTimeout(()=>{i.remove(),s?.focus(),t(S)},250)},C=document.createElement("button");C.className="sp-btn-ghost",C.textContent=e("identity.cancel"),C.addEventListener("click",()=>k(null));let w=document.createElement("button");w.className="sp-btn-primary",w.textContent=e("identity.submit"),w.addEventListener("click",()=>{let S=b.value.trim(),u=f.value.trim();if(!S||!u)return;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u)){f.style.borderColor="var(--sp-type-bug, #ef4444)";return}k({name:S,email:u})});let M='input, button, [tabindex]:not([tabindex="-1"])',I=S=>{let u=S;if(u.key==="Escape"){k(null);return}if(u.key==="Tab"){let m=Array.from(o.querySelectorAll(M));if(m.length===0)return;let y=m[0],T=m[m.length-1];if(!y||!T)return;let E=n.activeElement;u.shiftKey?(E===y||!o.contains(E))&&(u.preventDefault(),T.focus()):(E===T||!o.contains(E))&&(u.preventDefault(),y.focus())}};i.addEventListener("keydown",I),i.addEventListener("click",S=>{S.target===i&&k(null)}),x.appendChild(C),x.appendChild(w),o.appendChild(a),o.appendChild(h),o.appendChild(b),o.appendChild(g),o.appendChild(f),o.appendChild(x),i.appendChild(o),n.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",o.style.transform="translateY(0) scale(1)",b.focus()})})}function io(n){return Qt(n)}export{io as initSiteping};
//# sourceMappingURL=index.js.map