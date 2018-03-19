//Brandon Lo
//CS290 Week 3

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr( comparator, array ){
    //size set to length-1 due to 0 indexed arrays
    //implemented selection sort
    //http://freefeast.info/general-it-articles/selection-sort-pseudo-code-of-selection-sort-selection-sort-in-data-structure/
    var size = array.length;
    for(var j = 0; j < size-1; j++){
      var smallest = j;
      for(var i= j+1; i < size; i++){
        //false sorts from greatest to least. Setting to true checks from least to greatest
        if (comparator(array[smallest],array[i])== false)
          smallest = i;
      }
      //swapping the values
      var temp = array[j];
      array[j] = array[smallest];
      array[smallest] = temp;
    }
}

/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator( auto1, auto2){
    //checks the auto object's years. If auto1 > auto2 returns true. Or else it defaults to false.
    if(auto1.year > auto2.year)
      return true;
    return false;
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator( auto1, auto2){
    //set make to UPPER to make them case insensitive
    tempMake1 = auto1.make.toUpperCase();
    tempMake2 = auto2.make.toUpperCase();
    if (tempMake2 > tempMake1)
      return true;
    return false;
}

/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon,
 (types not otherwise listed). It should be case insensitive.
  If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator( auto1, auto2){
  //setting auto1 and auto2 to a temp variable to make them case insensitive
  tempType1 = auto1.type.toUpperCase();
  tempType2 = auto2.type.toUpperCase();

  //set up a dictionary since access/lookup is O(1) and it would be the easiest way to set up a key and value association to create order from
  //http://eloquentjavascript.net/1st_edition/chapter8.html
  var newDict = {
    "ROADSTER": 1,
    "PICKUP": 2,
    "SUV": 3,
    "WAGON:": 4
  };

  //checks to see if key is in the dictionary and set the value based on the key
  //create 2 variables tempPos1 and tempPos2 and use them to check the position based on the number in the dictionary
  if(newDict[tempType1] != undefined)
    var tempPos1 = newDict[tempType1]
  //if not in the dictionary, then it is set to a larger variable outside of the dictionary
  else
    var tempPos1 = 5;
  //checks the 2nd temp variable
  if(newDict[tempType2] != undefined)
    var tempPos2 = newDict[tempType2];
  else
    var tempPos2 = 5;

  //after the variables of tempType 1 and 2 are compared, then they are checked to find the position
  //lowest number would be first
  if(tempPos1 < tempPos2)
    return true;
  else if(tempPos1 > tempPos2)
    return false;
  // if they are the same model then the year is checked
  else
    return yearComparator(auto1, auto2);
}


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */

var size = automobiles.length;
console.log("***** \n");

//array is set from greatest year to least
sortArr(yearComparator, automobiles);
console.log("The cars sorted by year are: ")
for (var i = 0; i < size; i++)
  console.log( automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model + '\n');

//array is needed to be reset to check the manufacturer
sortArr(makeComparator,automobiles);
console.log("\nThe cars sorted by make are: ")
for (var i = 0; i < size; i++)
  console.log(automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model+ '\n');

//array is needed to be reset to check the model
sortArr(typeComparator,automobiles);
console.log("\nThe cars sorted by type are: ")
for (var i = 0; i < size; i++)
  console.log(automobiles[i].year + ' ' + automobiles[i].make + ' ' + automobiles[i].model + ' '  + automobiles[i].type + '\n');

console.log("***** \n");
