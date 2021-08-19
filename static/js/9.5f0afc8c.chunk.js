(this["webpackJsonpgithub-pages"]=this["webpackJsonpgithub-pages"]||[]).push([[9],{646:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return Q}));var r,c,o,i,a=n(0),s=n.n(a),u=n(172),l=n(136),d=n(149),p=n(173),j=(n(174),n(115)),f=n(125),h=n.n(f),b=n(606),x=n.n(b);n(331),function(t){t[t.Eval=0]="Eval",t[t.Var=1]="Var",t[t.Defint=2]="Defint",t[t.Limit=3]="Limit",t[t.Matrix=4]="Matrix"}(i||(i={}));var O=(r=function(){function t(){Object(l.a)(this,t),Object(u.a)(this,"latex",c,this),this.parser=new x.a,Object(u.a)(this,"update",o,this),Object(j.f)(this)}return Object(d.a)(t,[{key:"expression",get:function(){try{return this.parser.parseLatex(this.latex).toNerdamer()}catch(t){return}}},{key:"eval",get:function(){try{return this.expression.evaluate().text()}catch(t){return}}},{key:"text",get:function(){try{var t,e=null===(t=this.expression)||void 0===t?void 0:t.toTeX();return v.forEach((function(t,n){var r;return e=null===(r=e)||void 0===r?void 0:r.replace(n,t)})),e}catch(n){return}}},{key:"mode",get:function(){try{return this.latex.search("int")>=0?i.Defint:this.latex.search("limit")>=0?i.Limit:this.latex.search("matrix")>=0?i.Matrix:this.latex.search("x")>=0?i.Var:i.Eval}catch(t){return i.Eval}}},{key:"solve",get:function(){try{return this.expression.solveFor("x").toTeX()}catch(t){return}}},{key:"integrate",get:function(){try{return h.a.integrate(this.expression,"x").toTeX()}catch(t){return}}},{key:"diff",get:function(){try{return h.a.diff(this.expression,"x").toTeX()}catch(t){return}}}]),t}(),c=Object(p.a)(r.prototype,"latex",[j.g],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),o=Object(p.a)(r.prototype,"update",[j.b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var t=this;return function(e){t.latex=e}}}),Object(p.a)(r.prototype,"expression",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"expression"),r.prototype),Object(p.a)(r.prototype,"eval",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"eval"),r.prototype),Object(p.a)(r.prototype,"text",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"text"),r.prototype),Object(p.a)(r.prototype,"mode",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"mode"),r.prototype),Object(p.a)(r.prototype,"solve",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"solve"),r.prototype),Object(p.a)(r.prototype,"integrate",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"integrate"),r.prototype),Object(p.a)(r.prototype,"diff",[j.c],Object.getOwnPropertyDescriptor(r.prototype,"diff"),r.prototype),r),v=new Map([[RegExp("\\\\cdot","g"),"\\times"]]),y=new O,m=s.a.createContext(y),g=function t(){var e=this;Object(l.a)(this,t),this.mfController=void 0,this.setController=function(t){e.mfController=t,e.focus()},this.add=function(t){return e.mfController.insert(t,{focus:!0,format:"latex"})},this.backspace=function(){e.mfController.executeCommand("deleteBackward"),e.focus()},this.clear=function(){e.mfController.executeCommand("deleteAll"),e.focus()},this.move=function(t){"forward"===t?e.mfController.executeCommand("moveToNextChar"):e.mfController.executeCommand("moveToPreviousChar")},this.focus=function(){e.mfController&&e.mfController.focus&&e.mfController.focus()}},C=new g,k=s.a.createContext(C),w=n(335),D=n(643),P=n(640),T=n(642),E=n(211),L=n(2);function M(){return Object(L.jsxs)("div",{style:{position:"fixed",bottom:0,width:"100%",zIndex:-1},children:[Object(L.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, ".concat(64,"px)"),justifyContent:"center"},children:V().map((function(t,e){return Object(L.jsx)("div",{children:Object(L.jsx)(X,{children:t.children,onclick:t.onclick},e)},e)}))}),Object(L.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, ".concat(64,"px)"),justifyContent:"center"},children:z().map((function(t,e){return Object(L.jsx)("div",{children:Object(L.jsx)(X,{children:t.children,onclick:t.onclick},e)},e)}))})]})}function V(){var t=Object(a.useContext)(k),e=["\\sin","\\cos","\\tan","\\log"].map((function(e){return{children:e,onclick:function(){t.add(e+"(#?)"),t.move("backword")}}}));e.push({children:"\\sqrt{#?}",onclick:function(){return t.add("\\sqrt{#?}")}});var n=["(",")","e^{#?}","{#?}^2"].map((function(e){return{children:e,onclick:function(){return t.add(e)}}}));return n.push({children:"\\sin^{-1}",onclick:function(){t.add("\\arcsin(#?)"),t.move("backword")}}),[].concat(Object(w.a)(e),Object(w.a)(n))}function z(){var t=Object(a.useContext)(k),e=["7","8","9"].map((function(e){return{children:e,onclick:function(){return t.add(e)}}}));e.push({children:Object(L.jsx)(P.a,{}),onclick:function(){return t.clear()}}),e.push({children:Object(L.jsx)(T.a,{}),onclick:function(){return t.backspace()}});var n=["4","5","6","+","-"].map((function(e){return{children:e,onclick:function(){return t.add(e)}}})),r=["1","2","3"].map((function(e){return{children:e,onclick:function(){return t.add(e)}}}));r.push({children:"\\times",onclick:function(){return t.add("*")}}),r.push({children:"\\div",onclick:function(){return t.add("/")}});var c=["0",".","\\pi","e"].map((function(e){return{children:e,onclick:function(){return t.add(e)}}}));return c.push({children:"=",onclick:function(){return t.add("/")}}),[].concat(Object(w.a)(e),Object(w.a)(n),Object(w.a)(r),Object(w.a)(c))}function X(t){return Object(L.jsx)(D.a,{variant:"outlined",color:"primary",onClick:t.onclick,style:{textTransform:"lowercase",height:36,width:64},children:"string"===typeof t.children?Object(L.jsx)(E.a,{value:t.children,readOnly:!0}):t.children})}var F=n(46),N=n.n(F),q=n(47),A=n.n(q),J=N()((function(){return A()({mathviewbox:{outline:"5px solid white",fontSize:24,margin:5,padding:5,border:"2px dashed black",backgroundColor:"white"}})}));function B(){var t=Object(a.useContext)(m),e=Object(a.useContext)(k),n=J();return Object(L.jsx)(E.a,{className:n.mathviewbox,virtualKeyboardMode:"off",onContentDidChange:function(e){return t.update(e.getValue("latex-expanded"))},ref:function(t){t&&e.setController(t)}})}var I=n(148),K=Object(I.a)((function(){var t=Object(a.useContext)(m);switch(t.mode){case i.Eval:return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)("p",{children:t.latex}),Object(L.jsx)(R,{})]});case i.Var:return Object(L.jsxs)(L.Fragment,{children:[Object(L.jsx)("p",{children:t.latex}),Object(L.jsx)(S,{})]});default:return Object(L.jsx)(R,{})}})),R=Object(I.a)((function(){var t=Object(a.useContext)(m),e=t.eval,n=t.text;return void 0===e?Object(L.jsx)("div",{}):e===n?Object(L.jsx)(G,{content:"=".concat(e)}):Object(L.jsxs)("div",{children:[Object(L.jsx)(G,{content:"=".concat(t.eval)}),Object(L.jsx)(G,{content:"=".concat(t.text)})]})})),S=Object(I.a)((function(){var t=Object(a.useContext)(m);return void 0===t.integrate?Object(L.jsx)("div",{}):Object(L.jsxs)("div",{children:[Object(L.jsx)(G,{content:"=".concat(t.integrate)}),Object(L.jsx)(G,{content:"=".concat(t.diff)})]})}));function G(t){var e=Object(a.useContext)(k);return Object(L.jsxs)("div",{style:{display:"flex"},children:[Object(L.jsx)(E.a,{value:t.content,readOnly:!0,style:{outline:0}}),Object(L.jsx)(D.a,{hidden:t.hideAdd,style:{height:"50%",marginLeft:"20pt"},color:"primary",variant:"contained",onClick:function(){e.clear(),e.add(t.content.substr(1))},children:"+"})]})}var H=K;function Q(){var t=new g,e=new O;return Object(L.jsxs)(k.Provider,{value:t,children:[Object(L.jsxs)(m.Provider,{value:e,children:[Object(L.jsx)(B,{}),Object(L.jsx)(H,{})]}),Object(L.jsx)(M,{})]})}}}]);
//# sourceMappingURL=9.5f0afc8c.chunk.js.map