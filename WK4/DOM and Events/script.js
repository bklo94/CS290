//Brandon Lo
//CS290
//script.js

//global variables
var buttons = ["UP", "DOWN", "LEFT", "RIGHT", "MARK CELL"];
var cell = document.getElementById("1, 1");
var y = 1
var x = 1

//makes the table and fills the cell with the coordinates
function makeTable(){
  var rows = 4
  var col = 4

  //create table with border, and set document body to body make it easier
  var body = document.body;
  var currentTable = document.createElement("table");
  //creates a slightly thicker border for the header
  currentTable.setAttribute("border", "1");

  //create the headers and rows
  var header = document.createElement("thead");
  var currentRow = document.createElement("tr");

  //create the header with the numbers ex. Header 1
  for(var i = 1; i <= rows; i++){
    var nth = document.createElement("th");
    nth.innerHTML = "Header " + (i);
    currentRow.appendChild(nth);
  }
  header.appendChild(currentRow);
  currentTable.appendChild(header);

  var currentBody = document.createElement("tbody")
  //fills each cell with the column, row
  for (var a = 0; a < (rows - 1); a++){
    //creates the row
    var currentRow = document.createElement("tr");
    for(var b = 0; b < col; b++){
      //creates the cell
      var currentCell = document.createElement("td");
      var key = (b+1) + ", " + (a+1);
      currentCell.innerHTML = (b+1) + ", " + (a+1);
      currentCell.id = key

      currentRow.appendChild(currentCell);
    }
    currentBody.appendChild(currentRow);
  }
  currentTable.appendChild(currentBody);
  body.appendChild(currentTable);
}

//button that allows the thicker cell to move around
function moveButton(input){
  var currentID = x + ", " + y;
  //sets the current cell
  var currentCell = document.getElementById(currentID);
  currentCell.style.border = "thin solid black";

  //edge case test to make sure it stays in the table
  switch (input){
    case "UP":
       if (y !== 1)
          y--;
       break;
    case "DOWN":
       if (y !== 3)
          y++;
       break;
    case "LEFT":
       if (x !== 1)
          x--;
       break;
    case "RIGHT":
       if (x !== 4)
          x++;
       break;
  }
  //marks the current cell
  var currentID = x + ", " + y;
  selected(currentID);
}

//marks a cell yellow
function markCell() {
  var currentCell = document.getElementById(x + ", " + y);
  currentCell.style.background = "yellow";
}


//function to make the buttons
function makeButtons(){
  for (var i = 0; i < buttons.length; i++){
    var but = document.createElement("button");
    but.textContent = buttons[i];
    but.id = buttons[i];
    document.getElementsByTagName("body")[0].appendChild(but);
  }
  //assigns the event to each button
  document.getElementById(buttons[0]).addEventListener("click", function(){moveButton(buttons[0])});
  document.getElementById(buttons[1]).addEventListener("click", function(){moveButton(buttons[1])});
  document.getElementById(buttons[2]).addEventListener("click", function(){moveButton(buttons[2])});
  document.getElementById(buttons[3]).addEventListener("click", function(){moveButton(buttons[3])});
  document.getElementById(buttons[4]).addEventListener("click", function(){markCell(buttons[4])});
}

//makes the border thicker for the current selected cell
function selected(num){
  document.getElementById(num).style.border = "thick solid black";
}


//calls the functions to make the tables
makeTable();
makeButtons();
//sets the default starting position
selected("1, 1");
