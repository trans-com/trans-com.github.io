/*************************************************\
| LAYERS MANIPULATION FUNCTIONS SET. V 2.25       |
| For Internet Explorer 4.*,5.*, Netscape 4.*,6.* |
| Copyright by Kruglov S.A. (www.kruglov.ru) 2001 |
\*************************************************/

/***  See for description and latest version:  ***\
\***  http://www.kruglov.ru/klayers/           ***/

// document and window functions:

var KLayers=false
var isDOM
var isNC4
var isNC
var isIE
var isNC6
var pageLeft
var pageTop
var imagePreloaderCount
var imagePreloaderArray
var imageRef
var styleSwitch
var layerPostfix
var layerRef
  
function getWindowLeft(){
  return top.screenX
}

function getWindowTop(){
  return top.screenY
}

function getWindowWidth(w){
  if(!w) w=window
  if(isIE) return w.document.body.clientWidth
  if(isNC) return w.innerWidth
}

function getWindowHeight(w){
  if(!w) w=window
  if(isIE) return document.body.clientHeight
  if(isNC) return innerHeight
}

function moveWindow(x,y){
  top.screenX=x
  top.screenY=y
}

function setWindowWidth(x){
  if(isIE) top.document.body.clientWidth=x
  if(isNC) top.innerWidth=x
}

function setWindowHeight(y){
  if(isIE) top.document.body.clientHeight=y
  if(isNC) top.innerHeight=y
}

function setWindowSize(x,y){
  setWindowWidth(x)
  setWindowHeight(y)
}

function getScrollX(w){
  if(!w) w=window
  if(isIE) return w.document.body.scrollLeft
  if(isNC) return w.pageXOffset
}

function getScrollY(w){
  if(!w) w=window
  if(isIE) return w.document.body.scrollTop
  if(isNC) return w.pageYOffset
}

function getDocumentWidth(w){
  if(!w) w=window
  return w.document.width
}

function getDocumentHeight(w){
  if(!w) w=window
  return w.document.height
}

var LAYER=0
var IMAGE=1

function findObject(where, what, type){
  var i,j,l,s
  var len=eval(where+".length")
  for(j=0;j<len;j++){
    s=where+"["+j+"].document.layers"
    if(type==LAYER){
      l=s+"[\""+what+"\"]"
    }
    if(type==IMAGE){
      i=where+"["+j+"].document.images"
      l=i+"[\""+what+"\"]"
    }
    if(eval(l)) return l
    l=findObject(s,what,type)
    if(l!="false") return l
  }
  return "false"
}

function getLayerPath(name,parent){
  var l=((parent && isNC4)?(parent+"."):(""))+layerRef+name+layerPostfix
  if(eval(l))return l
  if(!isNC4){
    return "false"
  }else{
    return findObject("document.layers",name,LAYER)
  }
}

function getImagePath(name,parent){
  var l=((parent && isNC4)?(parent+"."):(""))+imageRef+name+layerPostfix
  if(eval(l))return l
  if(!isNC4){
    return "false"
  }else{
    return findObject("document.layers",name,IMAGE)
  }
}

// class "KLayer":

KLP=KLayer.prototype

KLP.isExist=KL_exists
KLP.getLeft=KL_left
KLP.getTop=KL_top
KLP.getWidth=KL_width
KLP.getHeight=KL_height
KLP.getZIndex=KL_zIndex
KLP.moveX=KL_moveX
KLP.moveY=KL_moveY
KLP.move=KL_move
KLP.moveZ=KL_moveZ
KLP.setZIndex=KL_moveZ
KLP.setVisibility=KL_setVisibility
KLP.show=KL_show
KLP.hide=KL_hide
KLP.isVisible=KL_visible
KLP.setBgColor=KL_setBgColor
KLP.clip=KL_clip
KLP.scroll=KL_scroll
KLP.scrollByOffset=KL_scrollByOffset
KLP.scrollByPercentage=KL_scrollByPercentage
KLP.write=KL_write
KLP.add=KL_add

function KLayer(name,parent){
  this.path=getLayerPath(name,parent)
  this.object=eval(this.path)
  this.css=eval(this.path+styleSwitch)
  this.id=name
}

function layer(name){
  var x=new KLayer(name,false)
  return (x.path)?x:false
}

function layerFrom(name,parent){
  var x=new KLayer(name,layer(parent).path)
  return (x.path)?x:false
}

function KL_exists(){
  return (this.object)?true:false
}

function KL_left(){
  var o=this.object
  if(isIE || isNC6) return o.offsetLeft-pageLeft
  if(isNC4) return o.pageX-pageLeft
}

function KL_top(){
  var o=this.object
  if(isIE || isNC6) return o.offsetTop-pageTop
  if(isNC4) return o.pageY-pageTop
}

function KL_width(){
  var o=this.object
  if(isIE || isNC6) return o.offsetWidth
  if(isNC4) return o.document.width
}

function KL_height(){
  var o=this.object
  if(isIE || isNC6) return o.offsetHeight
  if(isNC4) return o.document.height
}

function KL_zIndex(){
  return this.css.zIndex
}

function KL_moveX(x){
  this.css.left=x+pageLeft
}

function KL_moveY(y){
  this.css.top=y+pageTop
}

function KL_move(x,y){
  this.moveX(x)
  this.moveY(y)
}

function KL_moveZ(z){
  this.css.zIndex=z
}

function KL_setVisibility(v){
  this.css.visibility=(v)?(isNC4?"show":"visible"):(isNC4?"hide":"hidden")
}

function KL_show(){
  this.setVisibility(true)
}

function KL_hide(){
  this.setVisibility(false)
}

function KL_visible(){
  return (this.css.visibility.toLowerCase().indexOf("h")==0)?false:true
}

function KL_setBgColor(color){
  if(isIE || isNC6){
  	this.css.backgroundColor=color
  }
  if(isNC4){
  	this.css.bgColor=color
  }
}

function KL_clip(top, right, bottom, left){
  if(isIE||isNC6){
    this.css.clip="rect("+top+"px "+right+"px "+bottom+"px "+left+"px)"
  }
  if(isNC4){
    this.css.clip.top=top
    this.css.clip.right=right
    this.css.clip.bottom=bottom
    this.css.clip.left=left
  }
}

function KL_scroll(windowLeft,windowTop,windowWidth,windowHeight,scrollX,scrollY){
  if(scrollX<0)scrollX=0
  if(scrollY<0)scrollY=0
  if(scrollX>this.getWidth()-windowWidth) scrollY=this.getWidth()-windowWidth
  if(scrollY>this.getHeight()-windowHeight) scrollY=this.getHeight()-windowHeight
  var top=0
  var right=windowWidth
  var bottom=windowHeight
  var left=0
  left=left+scrollX
  right=right+scrollX
  top=top+scrollY
  bottom=bottom+scrollY
  this.move(windowLeft-scrollX,windowTop-scrollY)
  this.clip(top,right,bottom,left)
}

function KL_scrollByOffset(windowLeft,windowTop,windowWidth,windowHeight,scrollX,scrollY){
  var X=-parseInt(this.css.left)+windowLeft+scrollX
  var Y=-parseInt(this.css.top)+windowTop+scrollY
  this.scroll(windowLeft,windowTop,windowWidth,windowHeight,X,Y)
}

function KL_scrollByPercentage(windowLeft,windowTop,windowWidth,windowHeight,scrollX,scrollY){
  var X=(this.getWidth()-windowWidth)*scrollX/100
  var Y=(this.getHeight()-windowHeight)*scrollY/100
  this.scroll(windowLeft,windowTop,windowWidth,windowHeight,X,Y)
}

function KL_write(str){
  var o=this.object
  if(isIE || isNC6){
    o.innerHTML=str
  }else
  if(isNC4){
    var a=o.document
    a.open()
    a.write(str)
    a.close()
  }
}

function KL_add(str){
  var o=this.object
  if(isIE || isNC6){
    o.innerHTML+=str
  }else
  if(isNC4){
    var area=o.document
    a.write(str)
  }
}

// class "KImage"

KIP=KImage.prototype

KIP.isExist=KI_exists
KIP.getSrc=KI_src
KIP.setSrc=KI_setSrc

function KImage(name){
  this.path=getImagePath(name)
  this.object=eval(this.path)
}

function image(name){
  var x=new KImage(name,false)
  return (x.path)?x:false
}

function imageFrom(name,layerName){
  var x=new KImage(name,layer(layerName).path)
  return (x.path)?x:false
}

function KI_exists(){
  return (this.object)?true:false
}

function KI_src(){
  return this.object.src
}

function KI_setSrc(file){
  this.object.src=file
}

function preloadImage(imageFile){
  imagePreloaderArray[imagePreloaderCount]=new Image()
  imagePreloaderArray[imagePreloaderCount++].src=imageFile
}

// init:

function initKLayers(){
  isDOM=(document.getElementById)?true:false
  isNC4=(document.layers)?true:false
  isIE=(document.all)?true:false
  isNC6=isDOM && !isIE
  isNC=isNC4 || isNC6
    
  if(!isDOM && !isNC4 && !isNC6 && !isIE){
    KLayers=false
    return KLayers
  }

  pageLeft=0
  pageTop=0
  imagePreloaderCount=0
  imagePreloaderArray=new Array()

  imageRef="document.images[\""
  styleSwitch=".style"
  layerPostfix="\"]"

  if(isNC4){
    layerRef="document.layers[\""
    styleSwitch=""
  }

  if(isIE){
    layerRef="document.all[\""
  }

  if(isNC6){
    layerRef="document.getElementById(\""
    imageRef=layerRef
    layerPostfix="\")"
  }
  KLayers=true
  return KLayers
}

initKLayers()
