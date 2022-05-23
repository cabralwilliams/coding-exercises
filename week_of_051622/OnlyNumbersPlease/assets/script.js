//Retrieve numericObject from localStorage if it exists
const numericObject = JSON.parse(localStorage.getItem("numericObject")) || [];

//Grab elements from html page
const showMeObjects = document.querySelector("#showMeObjects");
const unaltered = document.querySelector("#unaltered");
const only_numbers = document.querySelector("#only_numbers");
const saveBtn = document.querySelector("#saveBtn");
const showBtn = document.querySelector("#showBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const storageId = document.querySelector("#storageId");

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
    "crossover",
    "heman",
    "shera",
    "transformer",
    "gobot",
    "robotech",
    "inhumanoid",
    "voltron",
    "ducktale",
    "jem",
    "gijoe",
    "carebear",
    "superfriend",
    "blackhole",
    "neutronstar",
    "whitedwarf",
    "browndwarf",
    "nova",
    "supernova",
    "eventhorizon",
    "redgiant"
];

const objectValues = [
    null,
    0,
    1,
    2,
    3,
    "The",
    "time",
    "has",
    "come",
    null,
    4,
    5,
    6,
    7,
    "the",
    "walrus",
    "said",
    "to",
    "talk",
    "of",
    "many",
    "things",
    null,
    8,
    9,
    10,
    11,
    "of",
    "shoes",
    "and",
    "ships",
    "and",
    "sealing-wax",
    null,
    12,
    13,
    14,
    15,
    "of",
    "cabbages",
    "and",
    "kings",
    null,
    16,
    17,
    18,
    19,
    "of",
    "why",
    "the",
    "sea",
    "is",
    "boiling",
    "hot",
    null,
    20,
    21,
    22,
    23,
    "and",
    "whether",
    "pigs",
    "have",
    "wings",
    null,
    24,
    25,
    26,
    27
];

//Randomly assign properties and values to startingObject
while(Object.keys(startingObject).length < 20) {
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

//TODO: create function alterObject that takes in an object and eliminates any property that is not a number
function alterObject(inputObject) {
    
}

//TODO: create functions that will store objects whose properties are numbers in localStorage, will retrieve and show those objects, and will clear the item from localStorage
