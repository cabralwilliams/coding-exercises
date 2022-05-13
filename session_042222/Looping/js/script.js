//Count to 10 Using for loop
for(var i = 1; i < 11; i++) {
    console.log("i = " + i);
}

//Count to 10 using while loop
var j = 1;
while(j < 11) {
    console.log("j = " + j);
    j++;
}

//Count to 10 using do...while loop
var k = 0;
do {
    k++;
    console.log("k = " + k);
} while(k < 10);

//Count to 10 using while loop and break statement
var n = 1;
while(true) {
    console.log("n = " + n);
    n++;
    if(n > 10) {
        break; //Without this break statement, this would be an infinite loop!
    }
}

//Randomize the integers from 1-30 inclusive in an array
var integers = [Math.ceil(Math.random()*30)];
do {
    var randomInt = Math.ceil(Math.random()*30);
    var count = 0;
    for(var m = 0; m < integers.length; m++) {
        if(integers[m] == randomInt) {
            count++;
            break;
        }
    }
    if(count == 0) {
        integers.push(randomInt);
    }
} while(integers.length < 30);

console.log(integers);

//Print out the names of students using 'zebra' as the index variable
var studentNames = ["Dylan", "Sarah", "Sylvester", "Eduardo", "Arlene", "Justin", "Shaun", "Monica", "Alana", "Tim", "Beau", "Sean", "Nadya", "Isaiah", "Keviana", "Samantha"];
for(var zebra = 0; zebra < studentNames.length; zebra++) {
    console.log("The student at zebra index " + zebra + " is " + studentNames[zebra] + ".");
}