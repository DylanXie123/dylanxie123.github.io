(this["webpackJsonpgithub-pages"]=this["webpackJsonpgithub-pages"]||[]).push([[8],{141:function(t,e){},147:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(167);function i(t,e){if(t){if("string"===typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},167:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},170:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(147);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,i=!1,o=void 0;try{for(var c,a=t[Symbol.iterator]();!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(u){i=!0,o=u}finally{try{r||null==a.return||a.return()}finally{if(i)throw o}}return n}}(t,e)||Object(r.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},224:function(t,e){},225:function(t,e){},233:function(t,e){},234:function(t,e){},244:function(t,e){},262:function(t,e){},263:function(t,e){},287:function(t,e){},289:function(t,e){},290:function(t,e){},293:function(t,e){},294:function(t,e){},299:function(t,e){},300:function(t,e){},308:function(t,e){},314:function(t,e){},317:function(t,e){},324:function(t,e){},645:function(t,e,n){"use strict";n.r(e);var r,i=n(0),o=n.n(i),c=n(172),a=n(136),u=n(149),s=n(173),l=(n(174),n(115)),b=n(215),f=n.n(b);!function(t){t.Text="Text",t.Image="Image",t.URL="URL",t.File="File"}(r||(r={}));var d,p,j,h,x,O,g=n(207),v=n.n(g),y=(d=function(){function t(){var e=this;Object(a.a)(this,t),Object(c.a)(this,"models",p,this),Object(c.a)(this,"loading",j,this),this.liveQuery=void 0,this.decrypt=function(t){var e=localStorage.getItem("private key");if(e&&0!==e.length&&t&&0!==t.length)return v.a.AES.decrypt(t,e).toString(v.a.enc.Utf8);throw Error("decrypt ".concat(t," failed"))},this.subscribe=function(){var t=new f.a.Query("AirBox");t.find().then((function(t){return e.replace(t.map((function(t){return e.db2model(t)})))})),t.subscribe().then((function(t){e.liveQuery=t,t.on("create",(function(t){if(void 0!==t){var n=e.db2model(t);e.insert(n)}})),t.on("delete",(function(t){void 0!==t&&e.remove(t.get("objectId"))}))}))},this.unSubscribe=function(){var t;null===(t=e.liveQuery)||void 0===t||t.unsubscribe()},Object(c.a)(this,"replace",h,this),Object(c.a)(this,"insert",x,this),Object(c.a)(this,"remove",O,this),this.create=function(t){Object(l.b)((function(){return e.loading=!0}));var n=new(f.a.Object.extend("AirBox"));return n.set("content",t.content),n.set("boxType",r[t.boxType]),n.save()},this.delete=function(t){Object(l.b)((function(){return e.loading=!0})),f.a.Object.createWithoutData("AirBox",t).destroy()},Object(l.f)(this),void 0!==f.a.applicationId&&void 0!==f.a.applicationKey||f.a.init({appId:this.decrypt("U2FsdGVkX1/TPOIGHT3r8heNdFSYA9nLjeeJzAvv3Q82Byx/wewZ/oYF/gZcC8EyqQxF/kk4z/BmI+cRx1qRGA=="),appKey:this.decrypt("U2FsdGVkX18pD2lOaF7FhfP2LSOUccz4Re24wFh4cCEwmHBewmtcdLmw9H6ztRXm")}),this.subscribe()}return Object(u.a)(t,[{key:"db2model",value:function(t){return{id:t.get("objectId"),content:t.get("content"),boxType:r[t.get("content")]}}},{key:"boxes",get:function(){return this.models}},{key:"isLoading",get:function(){return this.loading}}]),t}(),p=Object(s.a)(d.prototype,"models",[l.g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),j=Object(s.a)(d.prototype,"loading",[l.g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),h=Object(s.a)(d.prototype,"replace",[l.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var t=this;return function(e){t.models=e,t.loading=!1}}}),x=Object(s.a)(d.prototype,"insert",[l.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var t=this;return function(e){t.models.push(e),t.loading=!1}}}),O=Object(s.a)(d.prototype,"remove",[l.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var t=this;return function(e){var n=t.models.findIndex((function(t){return t.id===e}));n>-1&&t.models.splice(n,1),t.loading=!1}}}),Object(s.a)(d.prototype,"boxes",[l.c],Object.getOwnPropertyDescriptor(d.prototype,"boxes"),d.prototype),Object(s.a)(d.prototype,"isLoading",[l.c],Object.getOwnPropertyDescriptor(d.prototype,"isLoading"),d.prototype),d),m=new y,w=o.a.createContext(m),S=n(148),A=n(2),k=function(t){var e=Array.from(t.matchAll(/https?:\/\/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_.~#?&//=]*/g));if(0===e.length)return Object(A.jsx)("span",{children:t});for(var n=[],r=0;r<e.length;r++){var i=e[r],o=t.slice(i.index,i.index+i[0].length);if(0===r&&i.index>0&&n.push(Object(A.jsx)("span",{children:t.slice(0,i.index)},"textSpan-begin")),r===e.length-1){var c=t.slice(i.index+o.length,t.length);n.push(Object(A.jsx)("a",{href:o,target:"_blank",rel:"noreferrer",children:o},"a-".concat(r)),Object(A.jsx)("span",{children:c},"textSpan-".concat(r)));break}var a=e[r+1],u=t.slice(i.index+o.length,a.index);n.push(Object(A.jsx)("a",{href:o,target:"_blank",rel:"noreferrer",children:o},"a-".concat(r)),Object(A.jsx)("span",{children:u},"textSpan-".concat(r)))}return n},I=function(t){var e=Object(i.useContext)(w);return Object(A.jsxs)("div",{style:{flex:"1 200px",boxSizing:"border-box",maxWidth:"100%",border:"1px solid",overflowWrap:"break-word"},children:[k(t.box.content),Object(A.jsx)("button",{onClick:function(){e.delete(t.box.id)},children:"Delete"}),Object(A.jsx)("button",{onClick:function(){navigator.clipboard.writeText(t.box.content)},children:"Copy"})]})},z=n(170),C=function(){var t=Object(i.useContext)(w),e=Object(i.useState)(""),n=Object(z.a)(e,2),o=n[0],c=n[1];return Object(A.jsx)("div",{style:{border:"1px solid"},children:Object(A.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t.create({content:o,boxType:r.Text})},children:[Object(A.jsx)("input",{type:"text",value:o,onChange:function(t){c(t.target.value)}}),Object(A.jsx)("input",{type:"submit"})]})})},F=Object(S.a)((function(){var t=Object(i.useContext)(w).boxes.map((function(t){return Object(A.jsx)(I,{box:t},t.id)}));return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)("div",{style:{display:"flex",flexWrap:"wrap",padding:"10px"},children:t}),Object(A.jsx)(C,{})]})})),T=n(4),U=function(){var t=Object(i.useState)(""),e=Object(z.a)(t,2),n=e[0],r=e[1],o=Object(T.f)();return Object(A.jsx)("div",{children:Object(A.jsxs)("form",{onSubmit:function(t){t.preventDefault(),localStorage.setItem("private key",n),o.push("/airbox")},children:[Object(A.jsx)("input",{type:"password",placeholder:"Enter password",autoComplete:"current-password",required:!0,value:n,onChange:function(t){return r(t.target.value)}}),Object(A.jsx)("input",{type:"submit"})]})})},D=Object(S.a)((function(){return Object(i.useContext)(w).isLoading?Object(A.jsx)("p",{children:"Updating..."}):null}));function L(){var t=new y;return Object(i.useEffect)((function(){return function(){t.unSubscribe()}})),Object(A.jsxs)(w.Provider,{value:t,children:[Object(A.jsx)(D,{}),Object(A.jsx)(F,{})]})}e.default=function(){return function(){var t=localStorage.getItem("private key");if(t&&0!==t.length){return"Hello, React&App"===v.a.AES.decrypt("U2FsdGVkX188/AO4D/R1RFTPjxyveU/Y+6jmDIbN4fYatwhuTXYU0yBUO5DwXVzx",t).toString(v.a.enc.Utf8)}return!1}()?Object(A.jsx)(L,{}):Object(A.jsx)(U,{})}}}]);
//# sourceMappingURL=8.6188d6fe.chunk.js.map