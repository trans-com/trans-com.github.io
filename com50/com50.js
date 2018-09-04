if(document.images){
    imag = new Array()
    imag[0] = "about_off.jpg"
    imag[1] = "about_on.jpg"
    imag[2] = "info_off.jpg"
    imag[3] = "info_on.jpg"
    imag[4] = "require_off.jpg"
    imag[5] = "require_on.jpg"
    imag[6] = "access_off.jpg"
    imag[7] = "access_on.jpg"
    imag[8] = "contact_off.jpg"
    imag[9] = "contact_on.jpg"
}
im = new Array()
for (var i = 0; i < imag.length; i++){
	im[i] = new Image()
	im[i].src = imag[i]
}
	
function swtch(num,imgname){
	imgname.src = im[num].src
}

function pad(number,length) {
  var str = '' + number;
  while (str.length < length)
     str = '0' + str;
  return str;
}

function openpic(filename) {
   winpic=open(filename,'pic',
                    'scrollbars=no,resizable=no,toolbar=no,menubar=no,directories=no,width=660');
}

function replaceBody(source) {
  var http = false;
  if(navigator.appName == "Microsoft Internet Explorer") {
    http = new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    http = new XMLHttpRequest();
  }
  http.open("GET", source);
  http.onreadystatechange=function() {
    if(http.readyState == 4) {
      var body = document.getElementById('body');
      body.innerHTML = http.responseText;
   }
  }
  http.send(null);
}