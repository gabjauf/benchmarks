(this.webpackJsonpbenchmarks=this.webpackJsonpbenchmarks||[]).push([[0],{193:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(69),o=n.n(a),i=(n(78),n(45)),b=n(2),s=(n(79),n(28)),d=n(73),j=n(1);function l(e){return console.log(e),e.data?(e.data&&(t={labels:e.data.map((function(e){return e.date})),datasets:[{label:"# of Votes",data:e.data.map((function(e){return e.compiling["time elapsed"]})),backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]}),Object(j.jsxs)("div",{children:["Chart component",Object(j.jsx)(d.a,{data:t,width:100,height:50})]})):Object(j.jsx)("div",{});var t}function h(){var e=Object(c.useState)(null),t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(c.useEffect)((function(){n||fetch("benchmarks/results/hello_world/nix-hello-zig.json").then((function(e){return e.json()})).then((function(e){r(e.data)})).catch((function(e){console.log(e," error")}))})),Object(j.jsxs)("div",{children:["home page",Object(j.jsx)(l,{data:n})]})}var u=function(){return Object(j.jsx)("div",{children:Object(j.jsxs)(i.a,{children:[Object(j.jsx)("header",{children:Object(j.jsx)("div",{children:Object(j.jsx)("nav",{children:Object(j.jsx)("ul",{children:Object(j.jsx)("li",{children:Object(j.jsx)(i.b,{to:"/",children:"Home"})})})})})}),Object(j.jsx)(b.c,{children:Object(j.jsx)(b.a,{path:"/",children:Object(j.jsx)(h,{})})})]})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(u,{})}),document.getElementById("root")),g()},78:function(e,t,n){},79:function(e,t,n){}},[[193,1,2]]]);
//# sourceMappingURL=main.6fcb0c63.chunk.js.map