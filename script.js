const numbers = {
  "one": "jeden",
  "two": "dwa",
  "three": "trzy",
  "four": "cztery",
  "five": "pięć",
  "six": "sześć",
  "seven": "siedem",
  "eight": "osiem",
  "nine": "dziewięć",
  "ten": "dziesięć",
};

const nouns = {
  "dog": "pies",
  "cat": "kot",
  "bird": "ptak",
  "fish": "ryba",
  "person": "osoba",
  "car": "auto",
  "house": "dom",
};

const verbs = {
  "run": "biegać",
  "fly": "latać",
  "swim": "pływać",
  "stand": "stawać",
  "sit": "siędzić",
  "eat": "jeść",
};

const questions = {
  "Jeden pies je i dwie koty siedzą":"One dog is eating and two cats are sitting",
  "One dog": "Jeden pies",
  "Kot biega":  "The cat is running",
  "Ptak lata" : "The bird is flying",
  "Three cats":  "Trzy koty",
  "Ryba pływa": "The fish is swimming",
  "Osoba biega":  "The person is running",
  "Nine cars":  "Dziewięć aut",
  "Jeden ptak lata":  "One bird is flying",
  "Four houses": "Cztery domy" ,
    }

let score = 0;


$(document).ready(() => {
  $(".submit").on("click", function (event) {
    const questionKeys = Object.keys(questions);
    event.preventDefault();
    console.log("pressed");
    let i = 10;
    $(".answer").each(function(){
      i--;
      let answer = $(this).val();
      if(answer.toLowerCase().trim() === questions[questionKeys[i]].toLowerCase().trim()){
        $(this).removeClass("incorrect");
        $(this).addClass("correct");
        score++;
      }else{
        $(this).addClass("incorrect");
        $(this).removeClass("correct");
      }
    });
    alert(`You scored ${score}/${questionKeys.length}`);
    score = 0;
  });

  $(".panel").on("click", function () {
    const panelName = $(this).attr("id");
    localStorage.setItem("selection", panelName);
    window.location.href = "flashcard.html";
  });

  if (window.location.href.includes("flashcard.html")) {
    let dict = "";
    const panelName = localStorage.getItem("selection");

    switch (panelName) {
      case "numbersPanel":
        dict = numbers;
        break;
      case "nounsPanel":
        dict = nouns;
        break;
      case "verbsPanel":
        dict = verbs;
        break;
      default:
        window.location.href = "test.html";
    }

    for (let eng in dict) {
      $(".mainCards").append(`
        <div class="flashContainer">
          <div class="flashcard">
            <div class="front">${eng}</div>
            <div class="back">${dict[eng]}</div>
          </div>
        </div>
      `);
    }
  }

  if (window.location.href.includes("test.html")) {
    let i = 10;
    for (let question in questions) {
      $("form").prepend(`
        <div class='question'>${i--}) ${question}</div>
        <input type="text" class="answer">
      `);
    }
    $("form").prepend("<h1>Translate These Into The Opposite Language</h1><p>Assume the sentences are in the present continuous tense and use the definite article \"the\" for each noun</p><hr>")
  }
});
