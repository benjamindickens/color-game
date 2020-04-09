"use strict";
alert(
  "Правила: Запомни последовательность цветов и повтори их. Каждый уровень показывается  только новый цвет. Повтори предыдущие и добавь новый. Удачи! :P ( P.S первые пару конов лагает звук >< )"
);
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let lvl = 0;
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  //animation
  lvl++;
  $("h1").html(`Level<br> ${lvl}`);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  //sound
  playSound(randomChosenColor);
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
  let sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
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
      $("h1").text("ПОТРАЧЕНО");
      let wrong = new Audio("./sounds/wrong.mp3");
      wrong.play();
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
      if (lvl % 5 === 0) {
        $("h1").html("Excellent");
        setTimeout(function () {
          count = 0;
          userClickedPattern = [];
          nextSequence();
        }, 3500);
      } else {
        $("h1").html("lvl UP");
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

$("button").on("click", function () {
  if (gamePattern[0] === undefined) {
    nextSequence();
    $("button").fadeOut(100);
  } else {
    null;
  }
});
