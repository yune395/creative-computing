var car = document.getElementById("car")
var coin = document.getElementById("coin");
var counter = document.getElementById("time");
var coinDisplay = document.getElementById("coinDisplay");
var coinSound = document.getElementById("coinSound");
var borderSound = document.getElementById("borderSound");
var gameOverSound = document.getElementById("gameOverSound");
var overBox = document.getElementById("overBox");
var coin2 = document.getElementById("coin2");

var LEFT = 37;
var RIGHT = 39;
var UP = 38;
var DOWN = 40;

var x, y;
var coin_x, coin_y;
var speed, forward, angle;
var msg, distance;
var coinCollected, seconds, gameOver;

//resetting the game (initalize), just before you start the game. //
resetgame();
function resetgame() {
  console.log("resetgame")
  x = 250;
  y = 250;
  coin_x = 300;
  coin_y = 300;
  speed = 10;
  forward = 0;
  angle = -90;
  msg = "";
  distance;
  coinCollected = 0;
  seconds = 20;
  gameOver = 1;
  //gameover is 1, the game didnt start yet
  overBox.style.display = "none";
  coin.style.display = "none";
  counter.innerHTML = "Remaining Time: " + (seconds < 10 ? "0" : "") + String(seconds);
  //coinDisplay.innerHTML = "Coins Collected: " + coinCollected;
  car.style.transform = "rotate("+angle+"deg)";
  car.style.left = x + 'px';
  car.style.top = y + 'px';
  disableScrolling();
//coin score display
  while (coinDisplay.childNodes.length > 1) {
    coinDisplay.removeChild(coinDisplay.lastChild);
  }
}

//CAR MOVEMENT
function moveCar(evt) {
  if (gameOver == 1) {
    return;
  }
  //angle -= 5 will set the angle to -95, subtract 5 and set to new value
  switch (evt.keyCode) {
    case LEFT:
      angle -= 5;
      break;
    //starts at -95, adding 5, clockwise: -85
    case RIGHT:
      angle += 5;
      break;
    case UP:
      forward = 1;
      break;
    case DOWN:
      forward = -1;
      break;
    }
//POSITION OF LOCATION OF CAR
//keep adding to current position of car location and that's where you place the car
  x += Math.round((speed * forward) * Math.cos(Math.PI/180 * angle));
  y += Math.round((speed * forward) * Math.sin(Math.PI/180 * angle));
//statement for keeping car inside the border
//-= for putting the car BACK. resetting it back to position inside
//BOUNDARY
  if (x < -10 || x > 490) {
      x -= Math.round((speed * forward) * Math.cos(Math.PI/180 * angle));
      borderSound.play();
    }
  if (y < 10 || y > 520) {
      y -= Math.round((speed * forward) * Math.sin(Math.PI/180 * angle));
      borderSound.play();
    }
//DISTANCE OF CAR TO COIN
  distance = Math.pow(Math.abs(coin_x - x - 50), 2) + Math.pow(Math.abs(coin_y - y - 25), 2);
  msg = evt.keyCode + " translate(" + x + "px," + y + "px)" + " rotate("+angle+"deg) distance=" + distance;
  console.log(msg);
  //car.style.transform = "translate(" + x + "px," + y + "px)";
//changing position of the car
  car.style.transform = "rotate("+angle+"deg)";
  car.style.left = x + 'px';
  car.style.top = y + 'px';
  //COIN COLLECTION
  if (Math.pow(Math.abs(coin_x - x - 50), 2) + Math.pow(Math.abs(coin_y - y - 25), 2) < 1000) {
    coinSound.play();
//play the coin sound
//++ increment by 1, score goes up by 1
    coinCollected++;
    //appendchild is creating new coin in the box
    //you are cloning the coin, when it is true and places coin in new position.
    coinDisplay.appendChild(coin2.cloneNode(true));
    //coinDisplay.innerHTML = "Coins Collected: " + coinCollected;
    placeCoin();
  }
}


document.addEventListener("keydown", moveCar)

// Place the coin somewhere on the canvas randomly
//while the location is <1000px then new location
//want the coin location to be more than 100px away. then place the coin in that location.
function placeCoin() {
    while (Math.pow(Math.abs(coin_x - x - 50), 2) + Math.pow(Math.abs(coin_y - y - 25), 2) < 10000) {
      coin_x = 50 + (Math.random() * 500);
      coin_y = 50 + (Math.random() * 500);
    }
    console.log("coin_x=" + coin_x + " coin_y=" + coin_y)
    coin.style.left = coin_x + 'px';
    coin.style.top = coin_y + 'px';
    coin.style.display = "";
    console.log("Coin placed")
}

//click the button, countdown starts.
//if game over is 0, which means game is in the middle of the game, then press it again, reinitialize reset game and return and restarts to new game.
function countdown() {
    if (gameOver == 0) {
      console.log("In the middle of game");
      resetgame();
      placeCoin();
      gameOver = 0;
      return;
    }
    resetgame();
    placeCoin();
    gameOver = 0;
    //tick is countdown seconds. Remaining time.
    function tick() {
        counter.innerHTML = "Remaining Time: " + (seconds < 10 ? "0" : "") + String(seconds);
//if seconds is greater than 0, then set the tick to 1000 milliseconds = 1 second, keep counting down.
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
//if game is over, and seconds is at 0
//now display the overBox. and alert game over when seconds is at 0.
        } else {
          gameOver = 1;
          console.log("countdown: overBox.style.display=" + overBox.style.display);
          overBox.style.display = "";
          overBox.innerHTML = "Game Over";
          gameOverSound.play();
          //alert("Game over");
        }
        seconds--;
    }
    tick();
}

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling() {
    window.onscroll=function(){};
}
