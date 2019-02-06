var prev_hr = -1
color =
["#000000","#000d33","#001a66","#002699","#0033cc","#0040ff","#668cff","#99b3ff","#ccd9ff",
"#e6ecff","#ffffff","#e0ccff","#d1b3ff","#c299ff","#b380ff","#a366ff","#944dff","#8533ff",
"#751aff","#5c00e6","#330080","#290066","#1f004d","#140033"];
function updateTime() {
    var now = new Date()
    var sec = now.getSeconds()
    var min = now.getMinutes()
    var hr = now.getHours()
      var r = min * Math.PI / 30
      var x = 595 + 150 * Math.sin(r);
      var y = 295 - 150 * Math.cos(r);

const SECONDHAND = document.querySelector(".seconds");
const MINUTEHAND = document.querySelector(".minutes");

  SECONDHAND.style.transform = "scale(" + sec / 60 + "," + sec / 60 + ")";
  MINUTEHAND.style.transform = "translate(" + x + "px," + y + "px)";

  if (prev_hr == -1 || prev_hr != hr) {
    document.body.style.backgroundColor = color[hr];
  }

  prev_hr = hr;


  }




setInterval(updateTime, 1000)
