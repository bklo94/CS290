/**
 * Created by Brandon Lo on 7/15/2017.
 */

//closures are functions with preserved data
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        //need to make i in the scope of the function(). You can pass i through a function in order to put it within the scope using an IIFE Pattern.
        //http://speakingjs.com/es5/ch01.html#_the_iife_pattern_introducing_a_new_scope
        (function (i){
            var item = 'item' + list[i];
            result.push( function() {alert(item + ' ' + list[i])} );
        })(i);
    }
    return result;
}


function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
//runs the testList in order to display the current list when you click ok with the alert window
testList();
