(this.webpackJsonpbenchmarks=this.webpackJsonpbenchmarks||[]).push([[0],{193:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n.n(c),a=n(69),o=n.n(a),s=(n(78),n(45)),i=n(2),b=(n(79),n(28)),j=n(73),d=n(1);function l(t){return console.log(t),t.data?(t.data&&(e={labels:t.data.map((function(t){return t.lang})),datasets:[{label:"# of Votes",data:t.data.map((function(t){return t.compiling["time elapsed"]})),backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]}),Object(d.jsxs)("div",{children:["Chart component",Object(d.jsx)(j.a,{data:e,width:100,height:50})]})):Object(d.jsx)("div",{});var e}function h(){var t=Object(c.useState)(null),e=Object(b.a)(t,2),n=e[0],r=e[1];return Object(c.useEffect)((function(){n||fetch("".concat("/benchmarks","/results/stats.json")).then((function(t){return t.json()})).then((function(t){r(t.matmul)})).catch((function(t){console.log(t," error")}))})),Object(d.jsxs)("div",{children:["home page",Object(d.jsx)(l,{data:n})]})}var u=function(){return Object(d.jsx)("div",{children:Object(d.jsxs)(s.a,{children:[Object(d.jsx)("header",{children:Object(d.jsx)("div",{children:Object(d.jsx)("nav",{children:Object(d.jsx)("ul",{children:Object(d.jsx)("li",{children:Object(d.jsx)(s.b,{to:"/",children:"Home"})})})})})}),Object(d.jsx)(i.c,{children:Object(d.jsx)(i.a,{path:"/",children:Object(d.jsx)(h,{})})})]})})},g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),c(t),r(t),a(t),o(t)}))};o.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(u,{})}),document.getElementById("root")),g()},78:function(t,e,n){},79:function(t,e,n){}},[[193,1,2]]]);
//# sourceMappingURL=main.3fdcebe4.chunk.js.map