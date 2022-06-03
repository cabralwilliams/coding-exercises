//For the purposes of simplicity, this is going to assume only two parents, only full siblings, etc.
class BasicPerson {
    constructor() {
        this.name = "None";
        this.parents = [];
        this.siblings = [];
        this.children = [];
        this.spouse = null;
    }

    removeRelative() {
        //This needs to remove a relative from a specific array above

    }

    addParent() {
        //This needs to add a parent to the parents array only if the parents array does not already have two people in it

    }

    addSiblingOrChild() {
        //Add sibling or child to this person
        
    }

    listRelativesOfType(relativeType) {
        switch(relativeType) {
            default:
                break;
        }
    }
}

module.exports = BasicPerson;