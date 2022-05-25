
const codeInput = document.querySelector("#codeInput");
const submitBtn = document.querySelector("#submitBtn");
const clearBtn = document.querySelector("#clearBtn");
const outputDiv = document.querySelector("#outputDiv");

// const varDeclare = /^var\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s+=\s+([0-9]+|(\"[0-9a-zA-Z_$]+\"|\'[0-9a-zA-Z_$]+\'));?$/
// const constDeclare = /^const\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s+=\s+([0-9]+|(\"[0-9a-zA-Z_$]+\"|\'[0-9a-zA-Z_$]+\'));?$/
// const letDeclare = /^let\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s+=\s+([0-9]+|(\"[0-9a-zA-Z_$]+\"|\'[0-9a-zA-Z_$]+\'));?$/
// const varValue = /^([0-9]+|(\"[0-9a-zA-Z_$]+\"|\'[0-9a-zA-Z_$]+\'));?$/
// const varName = /^[a-zA-Z_$]+[a-zA-Z0-9_$]*$/

// const forLetIntegerUp = /^for\(\s*let\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*<=?\s*-?[0-9]+;\s*\1\s*(\+\+|\+=\s*-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+)\s*\)$/
// const forVarIntegerUp = /^for\(\s*var\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*<=?\s*-?[0-9]+;\s*\1\s*(\+\+|\+=\s*-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+)\s*\)$/

const getNameAndValue = inputStr => {
    //function expects inputStr to be trimmed
    if(inputStr.search(initializeVariable) === -1) {
        return [null]
    }
    let firstSpaceIndex = inputStr.indexOf(' ');
    let reducedStr = inputStr.substring(firstSpaceIndex);
    let equalsIndex = reducedStr.indexOf('=');
    let varNameStartIndex = reducedStr.search(varName);
    let variableName = reducedStr.substring(varNameStartIndex,equalsIndex).trim();
    const hasSemicolon = reducedStr.charAt(reducedStr.length - 1) === ';';
    const variableValue = hasSemicolon ? reducedStr.substring(equalsIndex + 1,reducedStr.length - 1).trim() : reducedStr.substring(equalsIndex + 1);
    if(isNaN(parseInt(variableValue))) {
        return [variableName,variableValue];
    } else {
        return [variableName,parseInt(variableValue)];
    }
}

function checkAndDisplay() {
    console.log(forLetIntegerUp.test(codeInput.value));
    let inputCode = codeInput.value.trim();
    console.log(inputCode);
    console.log(inputCode.split('\n'));
    let vIndex;
    let variableName, strippedName, spaceIndex;
    let message;
    //convert input to regular expression
    const codeLines = inputCode.split('\n').map(line => line.trim());
    //Abstract statements from codelines
    let codeStatements = codeLines.map(line => {
        let splitLine = line.split(';').map(stmnt => stmnt.trim());
        if(splitLine[splitLine.length - 1] === "") {
            splitLine = splitLine.slice(0,splitLine.length - 1);
        }
        return splitLine.length === 1 ? line : splitLine;
    });
    console.log(`codeStatements: ${JSON.stringify(codeStatements)}`);
    codeStatements = codeStatements.flat();
    console.log(`codeLines: ${JSON.stringify(codeLines)}`);
    console.log(`codeStatements: ${JSON.stringify(codeStatements)}`);

    for(let i = 0; i < codeStatements.length; i++) {
        let nextDiv = document.createElement('div');
        let nameAndValue = getNameAndValue(codeStatements[i]);
        if(nameAndValue[0] === null) {
            nextDiv.innerHTML = `<span class='text-danger'>${codeStatements[i]}</span> is not a properly formatted variable declaration and initialization.`;
        } else {
            nextDiv.innerHTML = `The value of <span class='text-success'>${nameAndValue[0]}</span> is <span class='text-success'>${nameAndValue[1]}</span>.`;
        }
        outputDiv.append(nextDiv);
    }
    
    // if(varDeclare.test(inputCode)) {
    //     //strip spaces
    //     spaceIndex = inputCode.indexOf(' ');
    //     // console.log(spaceIndex);
    //     strippedName = inputCode.substring(spaceIndex).trim();
    //     // console.log(strippedName);
    //     spaceIndex = strippedName.indexOf(' ');
    //     variableName = strippedName.substring(0,spaceIndex);
    //     message = `The name of the variable is ${variableName}`;
    // } else if(constDeclare.test(inputCode)) {
    //     //strip spaces
    //     spaceIndex = inputCode.indexOf(' ');
    //     // console.log(spaceIndex);
    //     strippedName = inputCode.substring(spaceIndex).trim();
    //     // console.log(strippedName);
    //     spaceIndex = strippedName.indexOf(' ');
    //     variableName = strippedName.substring(0,spaceIndex);
    //     message = `The name of the variable is ${variableName}`;
    // } else if(letDeclare.test(inputCode)) {
    //     //strip spaces
    //     spaceIndex = inputCode.indexOf(' ');
    //     // console.log(spaceIndex);
    //     strippedName = inputCode.substring(spaceIndex).trim();
    //     // console.log(strippedName);
    //     spaceIndex = strippedName.indexOf(' ');
    //     variableName = strippedName.substring(0,spaceIndex);
    //     message = `The name of the variable is ${variableName}`;
    // } else {
    //     message = `Couldn't understand what you input.`;
    // }
    // const nextDiv = document.createElement("div");
    // nextDiv.textContent = message;
    // outputDiv.appendChild(nextDiv);
    // codeInput.value = '';
}

submitBtn.addEventListener('click', checkAndDisplay);
clearBtn.addEventListener('click', () => {outputDiv.innerHTML = ""});