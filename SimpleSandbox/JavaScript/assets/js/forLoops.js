
const codeInput = document.querySelector("#codeInput");
const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const outputDiv = document.querySelector("#outputDiv");
const assignmentP = document.querySelector("#assignmentInstructions");

let countUp = Math.random() < 0.5;
let delta = Math.ceil(Math.random()*4);
//Get a starting point of somewhere between -15 and 15
let numberMin = Math.floor(Math.random()*31) - 15;
//Max value between 10 and 40, inclusive, greater than minimum value
let numberMax = numberMin + 10 + Math.floor(Math.random()*31);

let expectedNumbers = [];
if(countUp) {
    for(let i = numberMin; i < numberMax; i += delta) {
        expectedNumbers.push(i);
    }
} else {
    for(let i = numberMax; i > numberMin; i -= delta) {
        expectedNumbers.push(i);
    }
}

//Function that takes in the arguments above and creates the instructions
function getAssignment(minVal, maxVal, deltaVal, countNumbersUp) {
    let output = `Write a for loop that will log all of the integers starting at `;
    if(countNumbersUp) {
        output += `${minVal} and going up to, but not including, ${maxVal} to the console.`;
        if(deltaVal > 1) {
            output += `  The gap between integers logged should be ${deltaVal}.`;
        }
    } else {
        output += `${maxVal} and going down to, but not including, ${minVal} to the console.`;
        if(deltaVal > 1) {
            output += `  The gap between integers logged should be ${deltaVal}.`;
        }
    }
    return output;
}

assignmentP.textContent = getAssignment(numberMin,numberMax,delta,countUp);

function retrieveCode() {
    outputDiv.innerHTML = "";
    //Check to see if new lines were used
    const trimmedInput = codeInput.value.trim();
    let inputCodeArr = codeInput.value.trim().split('\n');
    // console.log(inputCodeArr);
    let variableUsed;
    let arrIndex = 0;
    let matchesLoopSignature = false;
    let initialVal, valueLimit, valueIncrement;
    let containsEquality = false;
    let isInfiniteLoop = false;
    //Determines whether there is a plus or a minus in the increment
    let positiveStep = true;
    let stepValue; //Holds the actual step value
    //Ensures that the same variable has been used throughout
    let matchingVariables = false;
    //Matching curly braces
    let matchingCurlyBraces = true;
    //Will the code statements in the loop produce an error
    let willProduceError = false;
    //Error statement
    let errorStatement = "";
    //Checks to see if console.log statement is included
    let containsConsoleLog = trimmedInput.search(consoleLogRegEx) !== -1;
    // console.log(containsConsoleLog);
    //Checks for multiple lines of code
    if(inputCodeArr.length > 1) {
        //Gets rid of code white space
        inputCodeArr = inputCodeArr.map(str => str.trim());
        
        for(let i = 0; i < inputCodeArr.length; i++) {
            if(inputCodeArr[i].search(forIntegerSigRegEx) !== -1) {
                matchesLoopSignature = true;
                arrIndex = i;
                break;
            }
        }
        
        if(matchesLoopSignature) {
            if(!containsConsoleLog) {
                let newDiv = document.createElement('div');
                newDiv.setAttribute('id','loopOutput');
                let newHeader = document.createElement('h4');
                newHeader.className = 'text-danger';
                newHeader.textContent = "Logging Error!";
                let nextP = document.createElement('p');
                nextP.textContent = "The code that you supplied does not have a properly formatted logging statement.";
                newDiv.append(newHeader,nextP);
                outputDiv.appendChild(newDiv);
            } else {
                //Find the variable name and get the value limits
                let varNameExp = /(let|var)\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=/
                let equalsIndex = trimmedInput.search("=");
                let expressIndex = trimmedInput.search(varNameExp);
                let firstSemicolonIndex = trimmedInput.search(";");
                //Get the variable name
                variableUsed = trimmedInput.substring(expressIndex + 3,equalsIndex).trim();
                console.log(`Variable: ${variableUsed}`);
                //Find the value set, the value limit, and the value 
                // console.log(trimmedInput.substring(equalsIndex,firstSemicolonIndex).trim())
                initialVal = parseInt(trimmedInput.substring(equalsIndex + 1,firstSemicolonIndex).trim());
                console.log(`Initial Value: ${initialVal}`);

                let secondPart = trimmedInput.substring(firstSemicolonIndex + 1);
                let limitIndex = secondPart.search(/(<|>)/);
                console.log(secondPart);
                let valBeginIndex = limitIndex;
                //Check to see if it has equality
                if(secondPart.charAt(valBeginIndex + 1) === "=") {
                    valBeginIndex += 2;
                    secondPart = secondPart.substring(valBeginIndex).trim();
                    containsEquality = true;
                } else if(secondPart.charAt(valBeginIndex + 1) === " ") {
                    //check for space
                    secondPart = secondPart.substring(valBeginIndex + 1).trim();
                } else {
                    //No equality
                    secondPart = secondPart.substring(valBeginIndex + 1).trim();
                }
                console.log(secondPart);
                let nextSemiIndex = secondPart.indexOf(';');
                valueLimit = parseFloat(secondPart.substring(0,nextSemiIndex).trim());
                console.log(`Value Limit: ${valueLimit}`);
                // alert(`Variable Used: ${variableUsed}`);
                //Find the valueIncrement
                let thirdPart = secondPart.substring(secondPart.indexOf(';') + 1).trim();
                let incrementStr;
                if(countUp) {
                    if(delta === 1) {
                        incrementStr = `(${variableUsed}\+\+|${variableUsed}\s*\+=\s*1|${variableUsed}\s*=\s*${variableUsed}\s*\+\s*1)`;
                    } else {
                        incrementStr = `(${variableUsed}\s*\+=\s*${delta}|${variableUsed}\s*=\s*${variableUsed}\s*\+\s*${delta})`;
                    }
                } else {
                    if(delta === 1) {
                        incrementStr = `(${variableUsed}--|${variableUsed}\s*-=\s*1|${variableUsed}\s*=\s*${variableUsed}\s*-\s*1)`;
                    } else {
                        incrementStr = `(${variableUsed}\s*\-=\s*${delta}|${variableUsed}\s*=\s*${variableUsed}\s*-\s*${delta})`;
                    }
                }
                //Determine how user structured the loop signature to find the increment value
                //used ++
                if(thirdPart.indexOf('++') !== -1) {
                    stepValue = 1;
                } else if(thirdPart.indexOf('--') !== -1) {
                    positiveStep = false;
                    stepValue = 1;
                } else if(thirdPart.indexOf('+=') !== -1) {
                    let incEnd = thirdPart.indexOf('+=') + 2;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else if(thirdPart.indexOf("-=") !== -1) {
                    positiveStep = false;
                    let incEnd = thirdPart.indexOf('-=') + 2;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else if(thirdPart.indexOf('+') !== -1) {
                    let incEnd = thirdPart.indexOf('+') + 1;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else {
                    positiveStep = false;
                    let incEnd = thirdPart.indexOf('-') + 1;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                }
                console.log(`Positive Step?: ${positiveStep}`);
                console.log(`Step Value: ${stepValue}`);
                
                let increasing = (positiveStep && stepValue > 0) || (!positiveStep && stepValue < 0);
                if((valueLimit < initialVal && increasing) || (valueLimit > initialVal && !increasing)) {
                    isInfiniteLoop = true;
                }
                // valueIncrement = stepValue;
                if(thirdPart.indexOf('++') !== -1) {
                    valueIncrement = 1;
                    if(!countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used --
                } else if(thirdPart.indexOf('--') !== -1) {
                    valueIncrement = -1;
                    if(countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used +=
                } else if(thirdPart.indexOf('+=') !== -1) {
                    //console.log(thirdPart.substring(thirdPart.indexOf('+='),thirdPart.indexOf(')')).trim());
                    valueIncrement = parseInt(thirdPart.substring(thirdPart.indexOf('+=') + 2,thirdPart.indexOf(')')).trim());
                    if(valueIncrement <= 0 && countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used -=
                } else if(thirdPart.indexOf('-=') !== -1) {
                    //console.log(thirdPart.substring(thirdPart.indexOf('-='),thirdPart.indexOf(')')).trim())
                    valueIncrement = parseInt(thirdPart.substring(thirdPart.indexOf('-=') + 2,thirdPart.indexOf(')')).trim());
                    if(valueIncrement <= 0 && !countUp) {
                        // isInfiniteLoop = true;
                    }
                } else {
                    let signIndex = thirdPart.indexOf('+') === -1 ? thirdPart.indexOf('-') + 1 : thirdPart.indexOf('+') + 1;
                    valueIncrement = parseInt(thirdPart.substring(signIndex,thirdPart.indexOf(")")).trim());
                    if(thirdPart.charAt(signIndex - 1) === "+") {
                        if(countUp && valueIncrement <= 0) {
                            // isInfiniteLoop = true;
                        } else if(!countUp && valueIncrement >= 0) {
                            // isInfiniteLoop = true;
                        }
                    } else {
                        if(!countUp && valueIncrement <= 0) {
                            // isInfiniteLoop = true;
                        } else if(countUp && valueIncrement >= 0) {
                            // isInfiniteLoop = true;
                        }
                    }
                }
                console.log(`Increment: ${valueIncrement}`);
                console.log(`Initial Value: ${initialVal} | Expected Initial: ${countUp ? numberMin : numberMax}`);
                console.log(`Value Limit: ${valueLimit} | Expected Limit: ${countUp ? numberMax : numberMin}`);
                console.log(`Increment: ${valueIncrement} | Expected Increment: ${delta}`);
                
                //Check to see if console.log statement is properly written and whether
                //statement is enclosed in {}
                let curlyBraceRegEx = /\{[^\{\}]*\}/
                let openingCurly = trimmedInput.search(/\{/);
                let closingCurly = trimmedInput.search(/\}/);
                console.log(`Contains Opening Brace: ${trimmedInput.search(/\{/)}`);
                console.log(`Contains Closing Brace: ${trimmedInput.search(/\}/)}`);
                console.log(`Contains Curly Braces: ${trimmedInput.search(curlyBraceRegEx)}`);

                if((openingCurly === -1 && closingCurly !== -1) || (openingCurly !== -1 && closingCurly === -1)) {
                    matchingCurlyBraces = false;
                }

                //Count the number of console logs to see if user added multiple statements; then, store the variables used in the logs

                let consoleLogCount = 0;
                let properVarCount = 0;
                let varsLogged = [];
                let splitStatements;
                let finalSplitStatements;
                let trimmedStatements;
                //These two variables store where in the string the program should start looking for the console.log statements
                let logIndexStart, logIndexEnd;
                //Check to see if value being logged is the same as the prior variable used
                if(matchingCurlyBraces) {
                    //If curly braces are omitted
                    if(openingCurly === -1) {
                        //If no curly braces, start from just after closing parentheses and end at the end of the string
                        logIndexStart = trimmedInput.indexOf(")") + 1;
                        logIndexEnd = trimmedInput.length;
                    } else {
                        //Two curly braces - start and end at curly braces
                        logIndexStart = trimmedInput.indexOf("{") + 1;
                        logIndexEnd = trimmedInput.indexOf("}");
                    }
                    //Remove white space from beginning and end
                    trimmedStatements = trimmedInput.substring(logIndexStart,logIndexEnd).trim();
                    //Remove the final semicolon if one is present
                    if(trimmedStatements.charAt(trimmedStatements.length - 1) === ";") {
                        trimmedStatements = trimmedStatements.substring(0,trimmedStatements.length - 1);
                    }
                    splitStatements = trimmedStatements.split(/(\n|;)/);
                    //Remove leading and trailing whitespace from array entries
                    splitStatements = splitStatements.map(stmnt => stmnt.trim());
                    console.log(splitStatements);
                    //Remove semicolons and empty strings or newline characters
                    splitStatements = splitStatements.filter(stmnt => !(stmnt === "" || stmnt === "\n" || stmnt === "\n"));
                    //Trim and filter out everything that isn't a console.log statement
                    finalSplitStatements = splitStatements.map(stmnt => stmnt.trim()).filter(stmnt => stmnt.search(/^console\.log\((.*)\)$/) !== -1);
                    console.log(finalSplitStatements);
                    //Now, get the variables indicated by these statements - notify of error if chained together statements or undefined variable
                    for(let i = 0; i < finalSplitStatements.length; i++) {
                        let nextVar;
                        if(finalSplitStatements[i].substring(8).search(/[\.]/) !== -1) {
                            console.log(finalSplitStatements[i].substring(8));
                            willProduceError = true;
                            errorStatement += `The following statement produces an error: ${finalSplitStatements[i]}. `;
                        } else {
                            //Get the nextOccurrence between the console.log()
                            nextVar = finalSplitStatements[i].substring(12,finalSplitStatements[i].length - 1).trim();
                            //Check to see if this qualifies as valid variable
                            if(nextVar.search(/[a-zA-Z_$]+[a-zA-Z0-9_$]*/) !== -1) {
                                consoleLogCount++;
                                varsLogged.push(nextVar);
                                //Keep track of the number of times to log the variable
                                if(nextVar === variableUsed) {
                                    properVarCount++;
                                } else {
                                    willProduceError = true;
                                    errorStatement += `The variable ${nextVar} is undefined. `;
                                }
                            } else {
                                willProduceError = true;
                                errorStatement += `The following is not a valid variable name: ${nextVar}. `;
                            }
                        }
                    }
                } else {
                    willProduceError = true;
                    errorStatement += `The code that you entered has mismatched '{' and '}' included/excluded and will not run properly. `
                }

                if(isInfiniteLoop) {
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id','loopOutput');
                    let newHeader = document.createElement('h4');
                    newHeader.className = 'text-danger';
                    newHeader.textContent = "Infinite Loop!";
                    let nextP = document.createElement('p');
                    nextP.textContent = "Your code produced an infinite loop!";
                    let codeDiv = document.createElement('div');
                    codeDiv.textContent = trimmedInput;
                    newDiv.append(newHeader,nextP);
                    outputDiv.appendChild(newDiv);
                    if(!willProduceError) {
                        //If there are just instances of the properly declared variable
                        if(countUp) {
                            if(valueIncrement >= 0) {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            } else {
                                for(let i = 0; i < 10; i++) {
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            }
                        } else {
                            if(valueIncrement >= 0) {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            } else {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            }
                        }
                        const truncateDiv = document.createElement('div');
                        truncateDiv.textContent = "Terminated infinite loop";
                        setTimeout(() => {
                            document.querySelector("#loopOutput").append(truncateDiv);
                        }, 2000);
                    } else {
                        console.log(`Infinite Loop - Will Produce Error`);
                        let undefinedFound = false;
                        if(countUp) {
                            if(valueIncrement >= 0) {
                                console.log(`Showing valueIncrement1: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            } else {
                                console.log(`Showing valueIncrement2: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            if(valueIncrement >= 0) {
                                console.log(`Showing valueIncrement3: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            } else {
                                console.log(`Showing valueIncrement4: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            }
                        }
                        const truncateDiv = document.createElement('div');
                        truncateDiv.textContent = "Terminated infinite loop";
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = errorStatement;
                        setTimeout(() => {
                            if(!undefinedFound) {
                                document.querySelector("#loopOutput").appendChild(truncateDiv);
                            }
                            document.querySelector("#loopOutput").append(errorDiv);
                        }, 2000);
                    }
                    
                } else {
                    //Not inside infinite loop
                    let userOutput = [];
                    let currentVal = initialVal;
                    let undefinedFound = false;
                    //New elements for the page
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id','loopOutput');
                    let newHeader = document.createElement('h4');
                    let nextP = document.createElement('p');
                    //Create the expected output - it will log regardless
                    const expectedDiv = document.createElement('div');
                    expectedDiv.className = "col-6";
                    expectedDiv.id = "expectedDiv";
                    const expectedHeader = document.createElement('h5');
                    expectedHeader.className = "text-primary";
                    expectedHeader.textContent = "Expected Values";
                    expectedDiv.appendChild(expectedHeader);
                    for(let j = 0; j < expectedNumbers.length; j++) {
                        const eDiv = document.createElement('div');
                        eDiv.textContent = expectedNumbers[j];
                        expectedDiv.appendChild(eDiv);
                    }
                    //If no varsLogged, there was a mismatch in curly braces
                    if(varsLogged.length === 0) {
                        //Append div with expected output and no value output explaining that code couldn't run because of missing curly brace
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = errorStatement;
                        newHeader.className = "text-danger";
                        newHeader.textContent = "Mismatched { and }!";
                        nextP.textContent = "The loop that you created does not have matching { and } and thus will not run properly.";
                        newDiv.append(newHeader,nextP,expectedDiv,errorDiv);
                        outputDiv.append(newDiv);
                    } else {
                        //There was no mismatch in curly braces but need to check to see whether all instances of the variable match defined variable
                        //Fill the userOutput array
                        const increaseValues = trimmedInput.search(/</) !== -1;
                        
                        let undefinedVar = false;
                        // let undefinedVarDeclaration;
                        if(containsEquality) {
                            if(increaseValues) {
                                while(currentVal <= valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal += Math.abs(stepValue);
                                }
                            } else {
                                while(currentVal >= valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal -= Math.abs(stepValue);
                                }
                            }
                        } else {
                            if(increaseValues) {
                                while(currentVal < valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal += Math.abs(stepValue);
                                }
                            } else {
                                while(currentVal > valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal -= Math.abs(stepValue);
                                }
                            }
                        }
                        //Check to see if the lengths of the arrays are the same
                        let matchedArrays = userOutput.length === expectedNumbers.length;
                        
                        if(!matchedArrays) {
                            newHeader.className = 'text-danger';
                            newHeader.textContent = "Wrong Loop!";
                            nextP.textContent = "The values in your loop don't match the expected values.";
                        } else {
                            let matchCount = 0;
                            for(let j = 0; j < userOutput.length; j++) {
                                if(userOutput[j] === expectedNumbers[j]) {
                                    matchCount++;
                                } else {
                                    break;
                                }
                            }
                            if(matchCount === userOutput.length) {
                                newHeader.className = 'text-success';
                                newHeader.textContent = "Success!";                            
                                nextP.textContent = "Watch your code in action below!";
                            } else {
                                newHeader.className = 'text-danger';
                                newHeader.textContent = "Wrong Loop!";
                                nextP.textContent = "The values in your loop don't match the expected values.";
                                matchedArrays = false;
                            }
                        }
                        
                        newDiv.append(newHeader,nextP);
                        outputDiv.appendChild(newDiv);

                        const actualDiv = document.createElement('div');
                        actualDiv.className = "col-6";
                        actualDiv.id = "actualDiv";
                        const actualHeader = document.createElement('h5');
                        actualHeader.textContent = "Your Values";
                        if(!matchedArrays) {
                            const duoDiv = document.createElement('div');
                            duoDiv.className = "d-flex justify-content-evenly col-12";
                            actualHeader.className = "text-danger";
                            actualDiv.appendChild(actualHeader);
                            duoDiv.append(actualDiv,expectedDiv);
                            //Loop through actual and expected output to place the values on the page
                            for(let j = 0; j < userOutput.length; j++) {
                                const userDiv = document.createElement('div');
                                userDiv.textContent = userOutput[j];
                                actualDiv.appendChild(userDiv);
                            }
                            
                            setTimeout(() => {
                                outputDiv.appendChild(duoDiv);
                            }, 750);
                        } else {
                            actualHeader.className = "text-success";
                            for(let j = 0; j < userOutput.length; j++) {
                                const userDiv = document.createElement('div');
                                userDiv.textContent = userOutput[j];
                                actualDiv.appendChild(userDiv);
                            }
                            
                            setTimeout(() => {
                                outputDiv.appendChild(actualDiv);
                            }, 750);
                        }
                    }
                    
                }
            }
        } else {
            //Doesn't match loop signature
            const newDiv = document.createElement('div');
            newDiv.setAttribute('id','loopOutput');
            let newHeader = document.createElement('h4');
            newHeader.className = 'text-danger';
            newHeader.textContent = "Format Error";
            let nextP = document.createElement('p');
            nextP.textContent = "The code that you entered does not contain a properly formatted for loop declaration.";
            newDiv.append(newHeader,nextP);
            document.querySelector("#outputDiv").appendChild(newDiv);
        }
    } else {

        if(trimmedInput.search(forIntegerSigRegEx) !== -1) {
            matchesLoopSignature = true;
        }
        
        //If properly formatted
        if(matchesLoopSignature) {
            if(!containsConsoleLog) {
                let newDiv = document.createElement('div');
                newDiv.setAttribute('id','loopOutput');
                let newHeader = document.createElement('h4');
                newHeader.className = 'text-danger';
                newHeader.textContent = "Logging Error!";
                let nextP = document.createElement('p');
                nextP.textContent = "The code that you supplied does not have a properly formatted logging statement.";
                newDiv.append(newHeader,nextP);
                outputDiv.appendChild(newDiv);
            } else {
                //Find the variable name and get the value limits
                let varNameExp = /(let|var)\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=/
                let equalsIndex = trimmedInput.search("=");
                let expressIndex = trimmedInput.search(varNameExp);
                let firstSemicolonIndex = trimmedInput.search(";");
                //Get the variable name
                variableUsed = trimmedInput.substring(expressIndex + 3,equalsIndex).trim();
                console.log(`Variable: ${variableUsed}`);
                //Find the value set, the value limit, and the value 
                // console.log(trimmedInput.substring(equalsIndex,firstSemicolonIndex).trim())
                initialVal = parseInt(trimmedInput.substring(equalsIndex + 1,firstSemicolonIndex).trim());
                console.log(`Initial Value: ${initialVal}`);

                let secondPart = trimmedInput.substring(firstSemicolonIndex + 1);
                let limitIndex = secondPart.search(/(<|>)/);
                console.log(secondPart);
                let valBeginIndex = limitIndex;
                //Check to see if it has equality
                if(secondPart.charAt(valBeginIndex + 1) === "=") {
                    valBeginIndex += 2;
                    secondPart = secondPart.substring(valBeginIndex).trim();
                    containsEquality = true;
                } else if(secondPart.charAt(valBeginIndex + 1) === " ") {
                    //check for space
                    secondPart = secondPart.substring(valBeginIndex + 1).trim();
                } else {
                    //No equality
                    secondPart = secondPart.substring(valBeginIndex + 1).trim();
                }
                console.log(secondPart);
                let nextSemiIndex = secondPart.indexOf(';');
                valueLimit = parseFloat(secondPart.substring(0,nextSemiIndex).trim());
                console.log(`Value Limit: ${valueLimit}`);
                // alert(`Variable Used: ${variableUsed}`);
                //Find the valueIncrement
                let thirdPart = secondPart.substring(secondPart.indexOf(';') + 1).trim();
                let incrementStr;
                if(countUp) {
                    if(delta === 1) {
                        incrementStr = `(${variableUsed}\+\+|${variableUsed}\s*\+=\s*1|${variableUsed}\s*=\s*${variableUsed}\s*\+\s*1)`;
                    } else {
                        incrementStr = `(${variableUsed}\s*\+=\s*${delta}|${variableUsed}\s*=\s*${variableUsed}\s*\+\s*${delta})`;
                    }
                } else {
                    if(delta === 1) {
                        incrementStr = `(${variableUsed}--|${variableUsed}\s*-=\s*1|${variableUsed}\s*=\s*${variableUsed}\s*-\s*1)`;
                    } else {
                        incrementStr = `(${variableUsed}\s*\-=\s*${delta}|${variableUsed}\s*=\s*${variableUsed}\s*-\s*${delta})`;
                    }
                }
                //Determine how user structured the loop signature to find the increment value
                //used ++
                if(thirdPart.indexOf('++') !== -1) {
                    stepValue = 1;
                } else if(thirdPart.indexOf('--') !== -1) {
                    positiveStep = false;
                    stepValue = 1;
                } else if(thirdPart.indexOf('+=') !== -1) {
                    let incEnd = thirdPart.indexOf('+=') + 2;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else if(thirdPart.indexOf("-=") !== -1) {
                    positiveStep = false;
                    let incEnd = thirdPart.indexOf('-=') + 2;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else if(thirdPart.indexOf('+') !== -1) {
                    let incEnd = thirdPart.indexOf('+') + 1;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                } else {
                    positiveStep = false;
                    let incEnd = thirdPart.indexOf('-') + 1;
                    stepValue = parseInt(thirdPart.substring(incEnd,thirdPart.indexOf(')')).trim());
                }
                console.log(`Positive Step?: ${positiveStep}`);
                console.log(`Step Value: ${stepValue}`);
                
                let increasing = (positiveStep && stepValue > 0) || (!positiveStep && stepValue < 0);
                if((valueLimit < initialVal && increasing) || (valueLimit > initialVal && !increasing)) {
                    isInfiniteLoop = true;
                }
                // valueIncrement = stepValue;
                if(thirdPart.indexOf('++') !== -1) {
                    valueIncrement = 1;
                    if(!countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used --
                } else if(thirdPart.indexOf('--') !== -1) {
                    valueIncrement = -1;
                    if(countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used +=
                } else if(thirdPart.indexOf('+=') !== -1) {
                    //console.log(thirdPart.substring(thirdPart.indexOf('+='),thirdPart.indexOf(')')).trim());
                    valueIncrement = parseInt(thirdPart.substring(thirdPart.indexOf('+=') + 2,thirdPart.indexOf(')')).trim());
                    if(valueIncrement <= 0 && countUp) {
                        // isInfiniteLoop = true;
                    }
                    //used -=
                } else if(thirdPart.indexOf('-=') !== -1) {
                    //console.log(thirdPart.substring(thirdPart.indexOf('-='),thirdPart.indexOf(')')).trim())
                    valueIncrement = parseInt(thirdPart.substring(thirdPart.indexOf('-=') + 2,thirdPart.indexOf(')')).trim());
                    if(valueIncrement <= 0 && !countUp) {
                        // isInfiniteLoop = true;
                    }
                } else {
                    let signIndex = thirdPart.indexOf('+') === -1 ? thirdPart.indexOf('-') + 1 : thirdPart.indexOf('+') + 1;
                    valueIncrement = parseInt(thirdPart.substring(signIndex,thirdPart.indexOf(")")).trim());
                    if(thirdPart.charAt(signIndex - 1) === "+") {
                        if(countUp && valueIncrement <= 0) {
                            // isInfiniteLoop = true;
                        } else if(!countUp && valueIncrement >= 0) {
                            // isInfiniteLoop = true;
                        }
                    } else {
                        if(!countUp && valueIncrement <= 0) {
                            // isInfiniteLoop = true;
                        } else if(countUp && valueIncrement >= 0) {
                            // isInfiniteLoop = true;
                        }
                    }
                }
                console.log(`Increment: ${valueIncrement}`);
                console.log(`Initial Value: ${initialVal} | Expected Initial: ${countUp ? numberMin : numberMax}`);
                console.log(`Value Limit: ${valueLimit} | Expected Limit: ${countUp ? numberMax : numberMin}`);
                console.log(`Increment: ${valueIncrement} | Expected Increment: ${delta}`);
                
                //Check to see if console.log statement is properly written and whether
                //statement is enclosed in {}
                let curlyBraceRegEx = /\{[^\{\}]*\}/
                let openingCurly = trimmedInput.search(/\{/);
                let closingCurly = trimmedInput.search(/\}/);
                console.log(`Contains Opening Brace: ${trimmedInput.search(/\{/)}`);
                console.log(`Contains Closing Brace: ${trimmedInput.search(/\}/)}`);
                console.log(`Contains Curly Braces: ${trimmedInput.search(curlyBraceRegEx)}`);

                if((openingCurly === -1 && closingCurly !== -1) || (openingCurly !== -1 && closingCurly === -1)) {
                    matchingCurlyBraces = false;
                }

                //Count the number of console logs to see if user added multiple statements; then, store the variables used in the logs

                let consoleLogCount = 0;
                let properVarCount = 0;
                let varsLogged = [];
                let splitStatements;
                let finalSplitStatements;
                let trimmedStatements;
                //These two variables store where in the string the program should start looking for the console.log statements
                let logIndexStart, logIndexEnd;
                //Check to see if value being logged is the same as the prior variable used
                if(matchingCurlyBraces) {
                    //If curly braces are omitted
                    if(openingCurly === -1) {
                        //If no curly braces, start from just after closing parentheses and end at the end of the string
                        logIndexStart = trimmedInput.indexOf(")") + 1;
                        logIndexEnd = trimmedInput.length;
                    } else {
                        //Two curly braces - start and end at curly braces
                        logIndexStart = trimmedInput.indexOf("{") + 1;
                        logIndexEnd = trimmedInput.indexOf("}");
                    }
                    //Remove white space from beginning and end
                    trimmedStatements = trimmedInput.substring(logIndexStart,logIndexEnd).trim();
                    //Remove the final semicolon if one is present
                    if(trimmedStatements.charAt(trimmedStatements.length - 1) === ";") {
                        trimmedStatements = trimmedStatements.substring(0,trimmedStatements.length - 1);
                    }
                    splitStatements = trimmedStatements.split(/(\n|;)/);
                    //Remove leading and trailing whitespace from array entries
                    splitStatements = splitStatements.map(stmnt => stmnt.trim());
                    console.log(splitStatements);
                    //Remove semicolons and empty strings or newline characters
                    splitStatements = splitStatements.filter(stmnt => !(stmnt === "" || stmnt === "\n" || stmnt === "\n"));
                    //Trim and filter out everything that isn't a console.log statement
                    finalSplitStatements = splitStatements.map(stmnt => stmnt.trim()).filter(stmnt => stmnt.search(/^console\.log\((.*)\)$/) !== -1);
                    console.log(finalSplitStatements);
                    //Now, get the variables indicated by these statements - notify of error if chained together statements or undefined variable
                    for(let i = 0; i < finalSplitStatements.length; i++) {
                        let nextVar;
                        if(finalSplitStatements[i].substring(8).search(/[\.]/) !== -1) {
                            console.log(finalSplitStatements[i].substring(8));
                            willProduceError = true;
                            errorStatement += `The following statement produces an error: ${finalSplitStatements[i]}. `;
                        } else {
                            //Get the nextOccurrence between the console.log()
                            nextVar = finalSplitStatements[i].substring(12,finalSplitStatements[i].length - 1).trim();
                            //Check to see if this qualifies as valid variable
                            if(nextVar.search(/[a-zA-Z_$]+[a-zA-Z0-9_$]*/) !== -1) {
                                consoleLogCount++;
                                varsLogged.push(nextVar);
                                //Keep track of the number of times to log the variable
                                if(nextVar === variableUsed) {
                                    properVarCount++;
                                } else {
                                    willProduceError = true;
                                    errorStatement += `The variable ${nextVar} is undefined. `;
                                }
                            } else {
                                willProduceError = true;
                                errorStatement += `The following is not a valid variable name: ${nextVar}. `;
                            }
                        }
                    }
                } else {
                    willProduceError = true;
                    errorStatement += `The code that you entered has mismatched '{' and '}' included/excluded and will not run properly. `
                }

                if(isInfiniteLoop) {
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id','loopOutput');
                    let newHeader = document.createElement('h4');
                    newHeader.className = 'text-danger';
                    newHeader.textContent = "Infinite Loop!";
                    let nextP = document.createElement('p');
                    nextP.textContent = "Your code produced an infinite loop!";
                    let codeDiv = document.createElement('div');
                    codeDiv.textContent = trimmedInput;
                    newDiv.append(newHeader,nextP);
                    outputDiv.appendChild(newDiv);
                    if(!willProduceError) {
                        //If there are just instances of the properly declared variable
                        if(countUp) {
                            if(valueIncrement >= 0) {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            } else {
                                for(let i = 0; i < 10; i++) {
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            }
                        } else {
                            if(valueIncrement >= 0) {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            } else {
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                }
                            }
                        }
                        const truncateDiv = document.createElement('div');
                        truncateDiv.textContent = "Terminated infinite loop";
                        setTimeout(() => {
                            document.querySelector("#loopOutput").append(truncateDiv);
                        }, 2000);
                    } else {
                        console.log(`Infinite Loop - Will Produce Error`);
                        let undefinedFound = false;
                        if(countUp) {
                            if(valueIncrement >= 0) {
                                console.log(`Showing valueIncrement1: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            } else {
                                console.log(`Showing valueIncrement2: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            }
                        } else {
                            if(valueIncrement >= 0) {
                                console.log(`Showing valueIncrement3: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal + i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            } else {
                                console.log(`Showing valueIncrement4: ${valueIncrement}`);
                                console.log(`varsLogged: ${varsLogged}`);
                                for(let i = 0; i < 10; i++) {
                                    //Account for multiple logging statements
                                    for(let j = 0; j < varsLogged.length; j++) {
                                        const loopValueDiv2 = document.createElement('div');
                                        if(varsLogged[j] === variableUsed) {
                                            loopValueDiv2.textContent = initialVal - i*valueIncrement;
                                        } else {
                                            undefinedFound = true;
                                            loopValueDiv2.textContent = `Uncaught ReferenceError: ${varsLogged[j]} is not defined`;
                                        }
                                        document.querySelector("#loopOutput").appendChild(loopValueDiv2);
                                    }
                                    if(undefinedFound) {
                                        break;
                                    }
                                }
                            }
                        }
                        const truncateDiv = document.createElement('div');
                        truncateDiv.textContent = "Terminated infinite loop";
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = errorStatement;
                        setTimeout(() => {
                            if(!undefinedFound) {
                                document.querySelector("#loopOutput").appendChild(truncateDiv);
                            }
                            document.querySelector("#loopOutput").append(errorDiv);
                        }, 2000);
                    }
                    
                } else {
                    //Not inside infinite loop
                    let userOutput = [];
                    let currentVal = initialVal;
                    let undefinedFound = false;
                    //New elements for the page
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('id','loopOutput');
                    let newHeader = document.createElement('h4');
                    let nextP = document.createElement('p');
                    //Create the expected output - it will log regardless
                    const expectedDiv = document.createElement('div');
                    expectedDiv.className = "col-6";
                    expectedDiv.id = "expectedDiv";
                    const expectedHeader = document.createElement('h5');
                    expectedHeader.className = "text-primary";
                    expectedHeader.textContent = "Expected Values";
                    expectedDiv.appendChild(expectedHeader);
                    for(let j = 0; j < expectedNumbers.length; j++) {
                        const eDiv = document.createElement('div');
                        eDiv.textContent = expectedNumbers[j];
                        expectedDiv.appendChild(eDiv);
                    }
                    //If no varsLogged, there was a mismatch in curly braces
                    if(varsLogged.length === 0) {
                        //Append div with expected output and no value output explaining that code couldn't run because of missing curly brace
                        const errorDiv = document.createElement('div');
                        errorDiv.textContent = errorStatement;
                        newHeader.className = "text-danger";
                        newHeader.textContent = "Mismatched { and }!";
                        nextP.textContent = "The loop that you created does not have matching { and } and thus will not run properly.";
                        newDiv.append(newHeader,nextP,expectedDiv,errorDiv);
                        outputDiv.append(newDiv);
                    } else {
                        //There was no mismatch in curly braces but need to check to see whether all instances of the variable match defined variable
                        //Fill the userOutput array
                        const increaseValues = trimmedInput.search(/</) !== -1;
                        
                        let undefinedVar = false;
                        // let undefinedVarDeclaration;
                        if(containsEquality) {
                            if(increaseValues) {
                                while(currentVal <= valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal += Math.abs(stepValue);
                                }
                            } else {
                                while(currentVal >= valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal -= Math.abs(stepValue);
                                }
                            }
                        } else {
                            if(increaseValues) {
                                while(currentVal < valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal += Math.abs(stepValue);
                                }
                            } else {
                                while(currentVal > valueLimit) {
                                    for(let i = 0; i < varsLogged.length; i++) {
                                        if(variableUsed === varsLogged[i]) {
                                            userOutput.push(currentVal);
                                        } else {
                                            userOutput.push(`Uncaught ReferenceError: ${varsLogged[i]} is not defined`);
                                            undefinedVar = true;
                                            break;
                                        }
                                    }
                                    if(undefinedVar) {
                                        break;
                                    }
                                    currentVal -= Math.abs(stepValue);
                                }
                            }
                        }
                        //Check to see if the lengths of the arrays are the same
                        let matchedArrays = userOutput.length === expectedNumbers.length;
                        
                        if(!matchedArrays) {
                            newHeader.className = 'text-danger';
                            newHeader.textContent = "Wrong Loop!";
                            nextP.textContent = "The values in your loop don't match the expected values.";
                        } else {
                            let matchCount = 0;
                            for(let j = 0; j < userOutput.length; j++) {
                                if(userOutput[j] === expectedNumbers[j]) {
                                    matchCount++;
                                } else {
                                    break;
                                }
                            }
                            if(matchCount === userOutput.length) {
                                newHeader.className = 'text-success';
                                newHeader.textContent = "Success!";                            
                                nextP.textContent = "Watch your code in action below!";
                            } else {
                                newHeader.className = 'text-danger';
                                newHeader.textContent = "Wrong Loop!";
                                nextP.textContent = "The values in your loop don't match the expected values.";
                                matchedArrays = false;
                            }
                        }
                        
                        newDiv.append(newHeader,nextP);
                        outputDiv.appendChild(newDiv);

                        const actualDiv = document.createElement('div');
                        actualDiv.className = "col-6";
                        actualDiv.id = "actualDiv";
                        const actualHeader = document.createElement('h5');
                        actualHeader.textContent = "Your Values";
                        if(!matchedArrays) {
                            const duoDiv = document.createElement('div');
                            duoDiv.className = "d-flex justify-content-evenly col-12";
                            actualHeader.className = "text-danger";
                            actualDiv.appendChild(actualHeader);
                            duoDiv.append(actualDiv,expectedDiv);
                            //Loop through actual and expected output to place the values on the page
                            for(let j = 0; j < userOutput.length; j++) {
                                const userDiv = document.createElement('div');
                                userDiv.textContent = userOutput[j];
                                actualDiv.appendChild(userDiv);
                            }
                            
                            setTimeout(() => {
                                outputDiv.appendChild(duoDiv);
                            }, 750);
                        } else {
                            actualHeader.className = "text-success";
                            for(let j = 0; j < userOutput.length; j++) {
                                const userDiv = document.createElement('div');
                                userDiv.textContent = userOutput[j];
                                actualDiv.appendChild(userDiv);
                            }
                            
                            setTimeout(() => {
                                outputDiv.appendChild(actualDiv);
                            }, 750);
                        }
                    }
                    
                }
            }
        } else {
            //Doesn't match loop signature
            const newDiv = document.createElement('div');
            newDiv.setAttribute('id','loopOutput');
            let newHeader = document.createElement('h4');
            newHeader.className = 'text-danger';
            newHeader.textContent = "Format Error";
            let nextP = document.createElement('p');
            nextP.textContent = "The code that you entered does not contain a properly formatted for loop declaration.  Check to make sure that the variables, condition, and increment are properly set.";
            newDiv.append(newHeader,nextP);
            document.querySelector("#outputDiv").appendChild(newDiv);
        }
    }
}

submitBtn.addEventListener("click", retrieveCode);

//Reset the problem
clearBtn.addEventListener("click", () => {
    countUp = Math.random() < 0.5;
    delta = Math.ceil(Math.random()*4);
    numberMin = Math.floor(Math.random()*31) - 15;
    numberMax = numberMin + 10 + Math.floor(Math.random()*31);
    expectedNumbers = [];
    if(countUp) {
        for(let i = numberMin; i < numberMax; i += delta) {
            expectedNumbers.push(i);
        }
    } else {
        for(let i = numberMax; i > numberMin; i -= delta) {
            expectedNumbers.push(i);
        }
    }
    assignmentP.textContent = getAssignment(numberMin,numberMax,delta,countUp);
    outputDiv.innerHTML = "";
    codeInput.value = "";
})