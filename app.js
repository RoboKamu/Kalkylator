"use strict";

var input = document.getElementById('input'), // knapp för inmatning/utmatning
    number = document.querySelectorAll('.numbers div'), // knappar för nummer
    operator = document.querySelectorAll('.operators div'), // knappar för operatorer
    result = document.getElementById('result'), // knapp för likhetstecken
    clear = document.getElementById('clear'), // knapp för rensning
    resultDisplayed = false; // flagga för att hålla koll på vilket resultat som visas

// lägger till klickhanterare för nummerknapparna
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // sparar nuvarande inmatningssträng och dess sista tecken i variabler - används senare
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // om resultatet inte visas, lägg bara till
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            // om resultatet för närvarande visas och användaren trycker på en operator
            // behöver vi fortsätta lägga till strängen för nästa operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // om resultatet för närvarande visas och användaren trycker på ett nummer
            // behöver vi rensa inmatningssträngen och lägga till det nya inmatningen för att starta den nya operationen
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// lägger till klickhanterare för operatorknapparna
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        // sparar nuvarande inmatningssträng och dess sista tecken i variabler - används senare
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        // om det sista inmatade tecknet är en operator, ersätt den med den som just nu tryckts på
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // om den första tangenten som tryckts på är en operator, gör ingenting
            console.log("ange först ett nummer");
        } else {
            // annars lägg bara till den operator som tryckts på till inmatningen
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// vid klick på 'likhetstecken' knappen
result.addEventListener("click", function() {

    // detta är strängen som vi kommer att bearbeta, t.ex. -10+26+33-56*34/23
    var inputString = input.innerHTML;

    // skapar en array av nummer. t.ex. för ovanstående sträng blir det: numbers = ["10", "26", "33", "56", "34
    var numbers = inputString.split(/\+|\-|\×|\÷/g);

    // Skapar en array med operatorer. För strängen ovan kommer det vara: operators = ["+", "+", "-", "*", "/"]
    // Först tar vi bort alla siffror och punkter i strängen och sedan delar vi upp den i en array med operatorer.
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    /* Nu loopar vi igenom arrayen och utför en operation i taget.
     * Först division, sedan multiplikation, sedan subtraktion och till sist addition.
     * När vi går vidare ändrar vi den ursprungliga arrayen med nummer och operatorer.
     * Det slutliga elementet som återstår i arrayen kommer att vara resultatet. */

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        // Att använda parseFloat är nödvändigt, annars blir det en strängsammanslagning.
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    // Detta kommentar innebär att koden kommer att visa utdata med högst sju decimaler.
    input.innerHTML = numbers[0].toFixed(7).replace(/(\.0+|0+)$/, '');

    resultDisplayed = true; // sätter flaggan om resultatet har visats
});

// rensar inmatningen vid tryck på "clear"
clear.addEventListener("click", function() {
    input.innerHTML = "";
})
