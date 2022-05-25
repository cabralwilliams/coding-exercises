const varDeclare = /^var\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s*=\s*([0-9]+|(\"[0-9a-zA-Z_$]*\"|\'[0-9a-zA-Z_$]*\'));?$/
const constDeclare = /^const\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s*=\s*([0-9]+|(\"[0-9a-zA-Z_$]*\"|\'[0-9a-zA-Z_$]*\'));?$/
const letDeclare = /^let\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s*=\s*([0-9]+|(\"[0-9a-zA-Z_$]*\"|\'[0-9a-zA-Z_$]*\'));?$/
const varValue = /s+([0-9]+|(\"[0-9a-zA-Z_$]*\"|\'[0-9a-zA-Z_$]*\'))s+/
const varName = /s+[a-zA-Z_$]+[a-zA-Z0-9_$]*s+/
const initializeVariable = /^(var|let|const)\s+[a-zA-Z_$]+[a-zA-Z0-9_$]*\s*=\s*([0-9]+|(\"[0-9a-zA-Z_$\s]*\"|\'[0-9a-zA-Z_$\s]*\'));?$/

const forLetIntegerUp = /for\s*\(\s*let\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*<=?\s*-?[0-9]+;\s*\1\s*(\+\+|\+=\s*-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+|\s*=\s*\1\s*-\s+-?[0-9]+|-=\s*-?[0-9]+|--)\s*\)/
const forVarIntegerUp = /for\s*\(\s*var\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*<=?\s*-?[0-9]+;\s*\1\s*(\+\+|\+=\s*-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+|\s*=\s*\1\s*-\s+-?[0-9]+|-=\s*-?[0-9]+|--)\s*\)/

const forLetIntegerDown = /for\s*\(\s*let\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*>=?\s*-?[0-9]+;\s*\1\s*(--|-=\s*-?[0-9]+|\s*=\s*\1\s*-\s+-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+|\+=\s*-?[0-9]+|\+\+)\s*\)/
const forVarIntegerDown = /for\s*\(\s*var\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\1\s*>=?\s*-?[0-9]+;\s*\1\s*(--|-=\s*-?[0-9]+|\s*=\s*\1\s*-\s+-?[0-9]+|\s*=\s*\1\s*\+\s*-?[0-9]+|\+=\s*-?[0-9]+|\+\+)\s*\)/

const forIntegerSigRegEx = /for\s*\(\s*(let|var)\s+([a-zA-Z_$]+[a-zA-Z0-9_$]*)\s*=\s*-?[0-9]+;\s*\2\s*(>|<)=?\s*-?[0-9]+;\s*\2((--|\+\+)|\s*(\+|-)=\s+-?[0-9]+|\s*=\s*\2\s*(\+|-)\s+-?[0-9]+)\s*\)/

const consoleLogRegEx = /console\.log\((.*)\)/
const whileCondition = /while\s*\((.+)\)/
