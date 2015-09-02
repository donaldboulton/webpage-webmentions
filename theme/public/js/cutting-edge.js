!function(){"use strict";var a="webmention-",b=function(a,b){for(var c=0,d=a.length;d>c;c++)b.call(void 0,a[c])},c=function(a){return Object.keys(a).map(function(b){return[].concat(a[b]).map(function(a){return encodeURIComponent(b)+"="+encodeURIComponent(a)}).join("&")}).join("&")},d=function(a){var c={};return b(a.split("&"),function(a){a=a.split("=");var b=decodeURIComponent(a[0]),d=a[1]?decodeURIComponent(a[1]):!0;c[b]=c[b]?[].concat(c[b],d):d}),c},e=function(a,b,d){var e=new XMLHttpRequest;b&&(a=a+"?"+c(b)),e.open("GET",a),e.onload=function(){return 200!==e.status?d(new Error("Received status code "+e.status)):void d(void 0,JSON.parse(e.responseText))},e.send()},f=function(a){return Math.floor(a)},g=function(a,b){a.appendChild(b)},h=function(a){return a.parentNode},i=function(b,c){return-1!==b.className.indexOf(a+c)},j=function(b,c){if(c=a+c,""!==b.className){if(new RegExp("(^|\\s)"+c+"($|\\s)").test(b.className))return;b.className+=" "}b.className+=c},k=function(a,b,c,d){var e=document.createElement(b);return d?a.replaceChild(e,d):a&&g(a,e),c&&j(e,c),e},l={like:"liked",repost:"reposted"},m=function(a,b){g(a,document.createTextNode(b))},n=function(){j(this,"error")},o=function(a,b){var c;b&&(c=k(a,"img"),c.onerror=n,c.src=b)},p=function(a,b){var c,d,e=new DocumentFragment;for(c=0,d=b.length;d>c;c++)0!==c&&m(e,c===d-1?" and ":", "),g(e,b[c]);g(a,e)},q=function(a,b,c){return c?void a.setAttribute("data-"+b,c):a.getAttribute("data-"+b)},r=function(a,c,d){b(a.querySelectorAll(c),d)},s=function(b,c,d){r(b,"."+a+c,d)},t=function(a){a="string"==typeof a?parseInt(a,10):a;var b=new Date(a),c=((new Date).getTime()-b.getTime())/1e3,d=f(c/86400);return isNaN(d)?"":0>d?b.toLocaleString():0===d&&(60>c&&"just now"||120>c&&"1 minute ago"||3600>c&&f(c/60)+" minutes ago"||7200>c&&"1 hour ago"||86400>c&&f(c/3600)+" hours ago")||1===d&&"Yesterday"||7>d&&d+" days ago"||365>d&&Math.ceil(d/7)+" weeks ago"||Math.ceil(d/365)+" years ago"},u=/^(https?:\/\/[^\/]+)\/api\/mentions\?/,v=function(a,b,c){var d,e,f,g,h,i,j,n,r,s;if(b.author=b.author||{},l[b.type]&&(b.author.name=b.author.name||"Someone",b.name=null,b.summary=l[b.type]+(b.interactionTarget?" this":" something")),d=k(a,"div","mention",c),e=k(k(d,"div","author"),b.author.url?"a":"span"),b.author.url&&(e.href=b.author.url),o(e,b.author.photo),m(e,b.author.name||"Unknown"),b.name&&m(k(d,"div","name"),b.name),b.summary&&m(k(d,"div","summary"),b.summary),f=k(d,"div","footer"),g=k(f,"a","published"),q(g,"published",b.published),m(g,t(b.published)),g.href=b.url,!q(a,"nocontext")){for(h=[],i=[],r=0,s=b.targets.length;s>r;r++)j=b.targets[r],n=k(!1,"a","target"),m(n,j),n.href=j,(-1===b.interactions.indexOf(j)?i:h).push(n);h.length&&(m(f," in response to "),p(f,h),i.length&&m(f," and ")),i.length&&(m(f," mentioning "),p(f,i))}},w=function(b,c){var d=b.querySelector("."+a+"facepile");return d||c===!1||(d=k(!1,"ul","facepile"),0===b.childNodes.length?g(b,d):b.insertBefore(d,b.childNodes[0])),d},x=function(a,b,c){var d,e,f,g,h=w(a);b.author=b.author||{},f=b.author.url&&"like"===b.type?b.author.url:b.url,g=b.author.name||"Someone",g+=" "+l[b.type]+" this "+t(b.published),d=k(k(h,"li","interaction-"+b.type,c),f?"a":"span","interaction-presentation"),q(d,"url",b.url),d.title=g,d.href=f,e=k(d,"span"),o(e,b.author.photo),m(e,g)},y=function(b,c){var d,e=c.replace('"',"%22"),f=b.querySelector("."+a+'published[href="'+e+'"]');if(f||(d=w(b,!1),d&&(f=d.querySelector("."+a+'interaction-presentation[data-url="'+e+'"]'))),f)for(;(f=h(f))&&!i(h(f),"container")&&!i(h(f),"facepile"););return f},z=function(a,b){if(EventSource){var d=q(a,"baseUrl"),e=q(a,"nofacepile");b=c(b);var g=function(c){c=c||0;var i=new EventSource(d+"/api/mentions/live?"+b);i.onerror=function(){2===i.readyState&&setTimeout(g.bind(void 0,Math.min(5,c+1)),500+f(1e3*Math.pow(1.5,c)*Math.random()))},i.addEventListener("mention",function(b){var c,d;try{c=JSON.parse(b.data)}catch(f){}c&&(d=y(a,c.url)),c&&c.targets.length?(s(a,"published",function(a){a.childNodes[0].nodeValue=t(q(a,"published"))}),e||!l[c.type]?v(a,c,d):x(a,c,d)):c&&c.removedTargets.length&&d&&h(d).removeChild(d)})};g()}},A=function(a,c){var d=k(!1,"div","container");return b(Object.keys(c),function(a){q(d,a,c[a])}),b(a,function(a){(a.interactionTarget&&l[a.type]&&!c.nofacepile?x:v)(d,a)}),d},B=function(a,c){var f=a.href,g=u.exec(f);if(!g)return c(new Error("Invalid URL"));var h=g[1],i=d(f.slice(f.indexOf("?")+1));delete i.format;var j={};!i.nocontext&&(i.site||i.path||i.url&&Array.isArray(i.url))||(j.nocontext=!0),b(Object.keys(i),function(a){-1===["site","url","path","example"].indexOf(a)&&(j[a]=i[a])}),j.baseUrl=h,e(h+"/api/mentions",i,function(a,b){if(a)return c(a);var d=A(b,j);c(void 0,d),z(d,i)})},C=function(b){r(b||document,".u-responses",function(b){b.className+=" "+a+"loading",B(b,function(c,d){c?b.className=b.className.replace(a+"loading",a+"error"):h(b).replaceChild(d,b)})})},D={loadMentions:B,findNewInjectionPoints:C};window.VPWebMentionEndpoint=D,C()}();