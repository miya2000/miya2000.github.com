(function(){
var ie=!!window.ActiveXObject;
var gec=/Gecko\//i.test(navigator.userAgent);
var saf=/KHTML/i.test(navigator.userAgent);
function EQ(){
this.queue=[];
}
EQ.prototype={
push:function(f){
if(!f)return;
this.queue.push(f);
},
remove:function(f){
if(!f)return;
var q=this.queue;
for(var i=0;i<q.length;i++){
if(q[i]==f){
q.splice(i,1);
return;
}
}
},
process:function(e){
var q=this.queue;
for (var i=0;i<q.length;i++){
if(q[i].call)q[i].call(e.currentTarget,e);
else q[i](e);
}
}
};
var added=false;
var events=[];
events.search=function(e,t){
var a=this;
for (var i=0;i<a.length;i++){
var v=a[i];
if(v.e==e&&v.t==t){
return v;
}
}
return null;
};
function su(){
var event;
while(event=events.pop()){
if(event.e.detachEvent){
event.e.detachEvent('on'+event.t,event.f);
}
else{
event.e['on'+event.t]=null;
}
}
}
var _p=function(){this.returnValue=false;},_s=function(){this.cancelBubble=true;}
function add(type,func){
if(ie&&type=='keypress')type='keydown';
var element=this;
var event=events.search(element,type);
if(!event){
var eq=new EQ();
var wrapFunc=function(e){
if(!('preventDefault'in e))e.preventDefault=_p;
if(!('stopPropagation'in e))e.stopPropagation=_s;
if(!('target'in e)) e.target=e.srcElement;
if(!('relatedTarget'in e))e.relatedTarget=e.fromElement;
if(!('currentTarget'in e))e.currentTarget=element;
var d=document;
if(!('pageX'in e))e.pageX=(d.body.scrollLeft||d.documentElement.scrollLeft)+e.clientX;
if(!('pageY'in e))e.pageY=(d.body.scrollTop||d.documentElement.scrollTop)+e.clientY;
if(!('detail'in e)&&e.wheelDelta)e.detail=-(e.wheelDelta/120)*3;
eq.process(e);
};
if(element.attachEvent){
element.attachEvent('on'+type,wrapFunc);
}
else if('on'+type in element){
var f=element['on'+type];
element['on'+type]=function(){if(f){f()};wrapFunc();};
}
event={'e':element,'t':type,'f':wrapFunc,'q':eq};
events.push(event);
}
event.q.push(func);
if(!added){
added=true;
if(element.attachEvent){
window.attachEvent('onunload',su);
}else{
var f=window.onunload;
window.onunload=function(){if(f){f()};su();};
}
}
}
function remove(type,func){
var element=this;
var event=events.search(element,type);
if(!event)return;
event.q.remove(func);
}
function eq(ele){
if(!ele)return ele;
if(ele.addEventListener){
if(gec&&!ele.addEventListener.replaced){
var ga=ele.addEventListener;
ele.addEventListener=function(a,b,c){
if(a=='mousewheel'){a='DOMMouseScroll';}
ga.call(this,a,b,c);
};
ele.addEventListener.replaced=true;
var gr=ele.removeEventListener;
ele.removeEventListener=function(a,b,c){
if(a=='mousewheel'){a='DOMMouseScroll';}
gr.call(this,a,b,c);
};
ele.removeEventListener.replaced=true;
}
if(saf&&!ele.addEventListener.replaced){
var sa=ele.addEventListener;
ele.addEventListener=function(a,b,c){
if(a=='mousewheel'){add.call(this,a,b);}
else{sa.call(this,a,b,c);}
};
ele.addEventListener.replaced=true;
var sr=ele.removeEventListener;
ele.removeEventListener=function(a,b,c){
if(a=='mousewheel'){remove.call(this,a,b);}
else{sr.call(this,a,b,c);}
};
ele.removeEventListener.replaced=true;
}
}
else{
ele.addEventListener=add;
ele.removeEventListener=remove;
}
return ele;
}
function ful(){
if(window.addEventListener&&((!gec&&!saf)))return;
eq(window);
eq(document);
var d=document;
var nc=d.createElement;
if(nc.apply){
d.createElement=function(){
return eq(nc.apply(this,arguments));};
} else{
d.createElement=function(id){
return eq(nc(id));};
}
var ni=d.getElementById;
if(ni.apply){
d.getElementById=function(){
return eq(ni.apply(this,arguments));};
}else{
d.getElementById=function(id){
return eq(ni(id));};
}
var nn=d.getElementsByName;
if(nn.apply){
d.getElementsByName=function(){
var eles=nn.apply(this,arguments);
for(var i=0;i<eles.length;i++){eq(eles[i]);}
return eles;
};
}else{
d.getElementsByName=function(name){
var eles=nn(name);
for(var i=0;i<eles.length;i++){eq(eles[i]);}
return eles;
};
}
var nt=d.getElementsByTagName;
if(nt.apply){
d.getElementsByTagName=function(){
var eles=nt.apply(this,arguments);
for(var i=0;i<eles.length;i++){eq(eles[i]);}
return eles;
};
}else{
d.getElementsByTagName=function(name){
var eles=nt(name);
for(var i=0;i<eles.length;i++){eq(eles[i]);}
return eles;
};
}
window.addEventListener('load',function(){d.getElementsByTagName('*')},false);
}
ful()
})()