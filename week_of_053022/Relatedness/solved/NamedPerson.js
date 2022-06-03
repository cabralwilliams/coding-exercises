const BasicPerson = require('./BasicPerson');

class NamedPerson extends BasicPerson {
    constructor(nameOfPerson) {
        super();
        this.name = nameOfPerson;
    }

    introduceSelf() {
        return `Hello, my name is ${this.name}!`;
    }
}

module.exports = NamedPerson;