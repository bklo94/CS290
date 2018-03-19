/**
 * Created by Brandon Lo on 7/5/2017.
 */
console.log("Lets make sure JavaScript is working.");
var name = "Brandon"; //Replace this with your first name
console.log("The unicode characters of your name are:")
for (var i = 0; i < name.length; i++){
    console.log(name.charCodeAt(i));
}
console.log("Copy and paste these values for activity credit.")
/*
//this should work
console.log(cubed(3));

//this should not work function is assigned to a variable and called before it is declared
console.log(square(12));

var square = function(x) {
    return x * x;
};

function cubed(x) {
    return x * x * x;
};
*/

// Your code here.
//copied input from eloquent Java
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

function deepEqual(obj1, obj2){
    //checks if they are objects using typeof and are not empty else they check if they are the same
    if(typeof(obj1) == "object" && obj1 != null && typeof(obj2) == "object" && obj2 != null){
        var count1 = 0, count2 = 0;
        //for loops iterates through each object and increase their count
        for (var prop in obj1)
            count1++;
        for (var prop in obj2)
            count2++;
        //if the number of items are the same then iterate through the object and check if their property is the same
        if (count1 == count2){
            for (var prop in obj1){
                if(!obj2.hasOwnProperty(prop) || !deepEqual(obj1[prop], obj2[prop])){
                    return false;
                }
            }
        }
        else
            return false;
    }
    //compares the two by identity
    else
        return obj1 === obj2;
    //default is return true
    return true;
}



