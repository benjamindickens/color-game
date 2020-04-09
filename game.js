$(".lol").slideUp(100);
("use strict");
// alert(
//   "Правила: Запомни последовательность цветов и повтори их. Каждый уровень показывается  только новый цвет. Повтори предыдущие и добавь новый. Удачи! :P ( P.S первые пару конов лагает звук >< )"
// );

let audio = {
  wrong: new Audio("./sounds/wrong.mp3"),
  yellow: new Audio(`./sounds/yellow.mp3`),
  red: new Audio(`./sounds/red.mp3`),
  blue: new Audio(`./sounds/blue.mp3`),
  green: new Audio(`./sounds/green.mp3`),
  white: new Audio(`./sounds/white.mp3`),
  purple: new Audio(`./sounds/purple.mp3`),
  vin: new Audio(`./sounds/vin.mp3`),
};
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow", "white", "purple"];
let gamePattern = [];
let lvl = 0;

function nextSequence() {
  if (lvl < 10) {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    lvl++;
    $("h1").html(`Level<br> ${lvl}`);

    let i = 1;
    if (gamePattern.length === 1) {
      setTimeout(() => {
        $(`#${gamePattern[0]}`).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[0]);
      }, 600);
    } else {
      $(`#${gamePattern[0]}`).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[0]);
    }
    setInterval(function () {
      $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
      i++;
      if (i === gamePattern.length) clearInterval(interval);
    }, 600);
  } else {
    $("#white").removeClass("lvl1");
    $("#purple").removeClass("lvl1");
    let randomNumber = Math.floor(Math.random() * 6);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //animation
    lvl++;
    $("h1").html(`Level<br> ${lvl}`);
    let i = 1;
    if (gamePattern.length === 1) {
      setTimeout(() => {
        $(`#${gamePattern[0]}`).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[0]);
      }, 600);
    } else {
      $(`#${gamePattern[0]}`).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[0]);
    }
    setInterval(function () {
      $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
      i++;
      if (i === gamePattern.length) clearInterval(interval);
    }, 600);
  }
  //sound
}

$(".btn").on("click", function () {
  if (gamePattern[0] !== undefined) {
    let userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    // господи я король  если количество цветов которое нажимает игрок превышает длинну запрашшиваемого  гаим патерном перестает выполняться функция проверки и добавления
    if (gamePattern.length >= userClickedPattern.length) {
      checkAnswer();
      console.log("user " + userClickedPattern); // check
      playSound(this.getAttribute("id"));
      animation(this.getAttribute("id"));
    }
  }
});

function playSound(name) {
  // let sound = new Audio(`./sounds/${name}.mp3`);
  switch (name) {
    case "red": {
      audio.red.play();
      break;
    }
    case "green": {
      audio.green.play();
      break;
    }
    case "yellow": {
      audio.yellow.play();
      break;
    }
    case "blue": {
      audio.blue.play();
      break;
    }
    case "white": {
      audio.white.play();
      break;
    }
    case "purple": {
      audio.purple.play();
      break;
    }
  }
}
function animation(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

// мое детище рожденное в поту и удовольствие!!! кто тут блять??? ракета!!!
let count = 0;

function checkAnswer() {
  if (count <= gamePattern.length) {
    if (gamePattern[count] !== userClickedPattern[count]) {
      $("h1").html("ПОТРАЧЕНО<br>!!!");
      audio.wrong.play();
      $("body").addClass("game-over");
      // $(".lol").removeClass("hide"); денсая пасхалочка
      setTimeout(function () {
        // $(".lol").addClass("hide"); денская пасхалочка
        $("body").removeClass("game-over");
      }, 100);
      gamePattern = [];
      userClickedPattern = [];
      count = 0;
      lvl = 0;
      setTimeout(() => {
        $("h1").text("Press start");
        $("button").fadeIn(100);
      }, 1500);
    } else if (count === gamePattern.length - 1) {
      // так как каунт идет с нуля а длинна с 1 нужно вычисть -1 что бы они были равны.
      // переделать в иф елсе стеитмент если уровень делиться на 5 без остатка проигрывать победную музыку и иззменять текст H1
      if (lvl % 10 === 0) {
        $("h1").html("Excellent<br> stage 2");
        let victory = new Audio("./sounds/victory.mp3");
        victory.play();
        setTimeout(function () {
          count = 0;
          userClickedPattern = [];
          nextSequence();
        }, 5700);
      } else {
        setTimeout(function () {
          $("h1").html("lvl<br> UP");
          audio.vin.play();
        }, 200);
        setTimeout(function () {
          count = 0;
          userClickedPattern = [];
          nextSequence();
        }, 1000);
      }
    } else if (gamePattern[count] === userClickedPattern[count]) {
      count++;
      console.log(count); // chheck
    }
  }
}

// if(gamePattern[0] === undefined){
//   $(document).on("keydown",function(){
// nextSequence();
//   })
// } else {
//   $(document).on("keydown", function () {
//     null;
//   })
// }
// $(document).on("keydown",function(){
//   if (gamePattern[0] === undefined) {
//     nextSequence();

//   } else {
//     null;
//   }
// }
// )

$(".start").on("click", function () {
  if (gamePattern[0] === undefined) {
    nextSequence();
    $(".lol").slideUp();
    $("button").fadeOut(100);
  } else {
    null;
  }
});

$(".guidance").on("click", function () {
  $(".lol").slideToggle();
});
