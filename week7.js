function updateTime() {
  var timeHolder =
  document.querySelector("#time")

  var date = new Date()

  timeHolder.innerHTML =
  date.getSeconds()

  if (date.getSeconds() == 10)
    timeHolder.style.color = "purple"
} else if (date.getSeconds() < 30) {
    // turn the text red
    timeHolder.style.color = "turquoise"
    console.log("less than 30")
} else {
    // turn the text blue
    timeHolder.style.color = "goldenrod"
    console.log("more than 30")
}



setInterval(updateTime, 1000)
