!function(t){
function n(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function e(){
for(var t=0;t<P.length;t++)P[t][0](P[t][1]);
P=[],w=!1;
}
function o(t,n){
P.push([t,n]),w||(w=!0,g(e,0));
}
function r(t,n){
function e(t){
c(n,t);
}
function o(t){
a(n,t);
}
try{
t(e,o);
}catch(r){
o(r);
}
}
function i(t){
var n=t.owner,e=n.state_,o=n.data_,r=t[e],i=t.then;
if("function"==typeof r){
e=_;
try{
o=r(o);
}catch(u){
a(i,u);
}
}
f(i,o)||(e===_&&c(i,o),e===b&&a(i,o));
}
function f(t,n){
var e;
try{
if(t===n)throw new TypeError("A promises callback cannot return that same promise.");
if(n&&("function"==typeof n||"object"==typeof n)){
var o=n.then;
if("function"==typeof o)return o.call(n,function(o){
e||(e=!0,n!==o?c(t,o):u(t,o));
},function(n){
e||(e=!0,a(t,n));
}),!0;
}
}catch(r){
return e||a(t,r),!0;
}
return!1;
}
function c(t,n){
t!==n&&f(t,n)||u(t,n);
}
function u(t,n){
t.state_===m&&(t.state_=v,t.data_=n,o(h,t));
}
function a(t,n){
t.state_===m&&(t.state_=v,t.data_=n,o(l,t));
}
function s(t){
var n=t.then_;
t.then_=void 0;
for(var e=0;e<n.length;e++)i(n[e]);
}
function h(t){
t.state_=_,s(t);
}
function l(t){
t.state_=b,s(t);
}
function p(t){
if("function"!=typeof t)throw new TypeError("Promise constructor takes a function argument");
if(this instanceof p==!1)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
this.then_=[],r(t,this);
}
var d=t.Promise,y=d&&"resolve"in d&&"reject"in d&&"all"in d&&"race"in d&&function(){
var t;
return new d(function(n){
t=n;
}),"function"==typeof t;
}();
"undefined"!=typeof exports&&exports?(exports.Promise=y?d:p,exports.Polyfill=p):"function"==typeof define&&define.amd?define("biz_common/promise.js",[],function(){
"use strict";
return y?d:p;
}):y||(t.Promise=p);
var w,m="pending",v="sealed",_="fulfilled",b="rejected",j=function(){},g="undefined"!=typeof setImmediate?setImmediate:setTimeout,P=[];
p.prototype={
constructor:p,
state_:m,
then_:null,
data_:void 0,
then:function(t,n){
var e={
owner:this,
then:new this.constructor(j),
fulfilled:t,
rejected:n
};
return this.state_===_||this.state_===b?o(i,e):this.then_.push(e),e.then;
},
"catch":function(t){
return this.then(null,t);
}
},p.all=function(t){
var e=this;
if(!n(t))throw new TypeError("You must pass an array to Promise.all().");
return new e(function(n,e){
function o(t){
return f++,function(e){
i[t]=e,--f||n(i);
};
}
for(var r,i=[],f=0,c=0;c<t.length;c++)r=t[c],r&&"function"==typeof r.then?r.then(o(c),e):i[c]=r;
f||n(i);
});
},p.race=function(t){
var e=this;
if(!n(t))throw new TypeError("You must pass an array to Promise.race().");
return new e(function(n,e){
for(var o,r=0;r<t.length;r++)o=t[r],o&&"function"==typeof o.then?o.then(n,e):n(o);
});
},p.resolve=function(t){
var n=this;
return t&&"object"==typeof t&&t.constructor===n?t:new n(function(n){
n(t);
});
},p.reject=function(t){
var n=this;
return new n(function(n,e){
e(t);
});
};
}("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);