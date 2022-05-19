//Grab elements from html page
const showMeObjects = document.querySelector("#showMeObjects");
const unaltered = document.querySelector("#unaltered");
const non_null = document.querySelector("#non_null");

const startingObject = {};

const objectProperties = [
    "longing",
    "rusted",
    "furnace",
    "daybreak",
    "seventeen",
    "benign",
    "nine",
    "homecoming",
    "one",
    "freightCar",
    "touchdown",
    "fieldGoal",
    "penaltyShot",
    "slapShot",
    "oneTimer",
    "homerun",
    "grandslam",
    "slamdunk",
    "crossover"
];

const objectValues = [
    null,
    0,
    1,
    2,
    3,
    null,
    4,
    5,
    6,
    7,
    null,
    8,
    9,
    10,
    11,
    null,
    12,
    13,
    14,
    15,
    null,
    16,
    17,
    18,
    19,
];

//Randomly assign properties and values to startingObject
while(Object.keys(startingObject).length < 10) {
    let prop = objectProperties[Math.floor(Math.random()*objectProperties.length)];
    let val = objectValues[Math.floor(Math.random()*objectValues.length)];

    startingObject[prop] = val;
}

//This function will make the output look nice and place the output in your desired dom location
function makeObjectPretty(inputObject, displayElement) {
    let obKeys = Object.keys(inputObject);
    const container = document.createElement("div");
    container.className = "d-flex flex-column";
    const opening = document.createElement("div");
    opening.textContent = "{";
    container.appendChild(opening);
    const closing = document.createElement("div");
    closing.textContent = "}";
    for(let i = 0; i < obKeys.length; i++) {
        const nextDiv = document.createElement("div");
        nextDiv.className = "px-3";
        nextDiv.textContent = `${obKeys[i]}: ${inputObject[obKeys[i]]},`;
        container.appendChild(nextDiv);
    }
    container.appendChild(closing);
    displayElement.appendChild(container);
}

//TODO create function alterObject that takes in an object and eliminates any property that is null
function alterObject(inputObject) {
    
}