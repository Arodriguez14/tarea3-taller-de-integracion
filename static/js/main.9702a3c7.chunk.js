(this["webpackJsonptarea3-taller-de-integracion"]=this["webpackJsonptarea3-taller-de-integracion"]||[]).push([[0],{35:function(e,t,n){},42:function(e,t,n){},75:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(36),s=n.n(r),i=(n(42),n(8)),o=n(37),u=n(15),j=Object(u.io)("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"}),l=(n(35),n(0)),b=function(e){var t=e.nombre,n=Object(c.useState)(""),a=Object(i.a)(n,2),r=a[0],s=a[1],b=Object(c.useState)([]),d=Object(i.a)(b,2),O=d[0],h=d[1];Object(c.useEffect)((function(){return function(){var e=Object(u.io)("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{path:"/flights"});console.log("set UP"),e.on("CHAT",(function(e){O.push(e),s(e),h(O)}))}(),function(){j.disconnect()}}),[]);var f=Object(c.useRef)(null);Object(c.useEffect)((function(){f.current.scrollIntoView({behavior:"smooth"})}));return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"chat",children:[O.map((function(e,t){return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{children:[e.name,":"]}),Object(l.jsx)("div",{children:e.message})]},t)})),Object(l.jsx)("div",{ref:f})]}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),j.emit("CHAT",{name:t,message:r,date:"09/05/2021"}),s(""),h([].concat(Object(o.a)(O),[r]))},children:[Object(l.jsx)("label",{htmlFor:"",children:"Escriba su mensaje"}),Object(l.jsx)("textarea",{name:"",id:"",cols:"30",rows:"10",value:r,onChange:function(e){return s(e.target.value)}}),Object(l.jsx)("button",{children:"Enviar"})]})]})};var d=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!1),s=Object(i.a)(r,2),o=s[0],u=s[1];return Object(l.jsxs)("div",{className:"App",children:[!o&&Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),""!==n&&u(!0)},children:[Object(l.jsx)("label",{htmlFor:"",children:"Introduzca su nombre"}),Object(l.jsx)("input",{value:n,onChange:function(e){return a(e.target.value)}}),Object(l.jsx)("button",{children:"Ir al chat"})]}),o&&Object(l.jsx)(b,{nombre:n})]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,76)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))};s.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root")),O()}},[[75,1,2]]]);
//# sourceMappingURL=main.9702a3c7.chunk.js.map