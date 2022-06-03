//For the purposes of simplicity, this is going to assume only two parents, only full siblings, etc.
class BasicPerson {
    constructor() {
        this.name = "None";
        this.parents = [];
        this.siblings = [];
        this.children = [];
        this.spouse = null;
    }

    removeRelative(relativeArray,index) {
        //This needs to remove a relative from a specific array above
        if(index < 0 || index >= relativeArray.length) {
            return `Invalid selection - cannot remove a relative from that index of the array.`;
        } else {
            const toRemove = relativeArray[index];
            relativeArray = relativeArray.filter((relative, i) => i === index);
            return `${toRemove.name} has been removed from the array.  New length of the array: ${relativeArray.length}.`;
        }
    }

    addParent(parentObject) {
        if(parentObject === this) {
            return `A person cannot be her/his own parent!`;
        }
        //This needs to add a parent to the parents array only if the parents array does not already have two people in it
        if(this.parents.length === 2) {
            return `Cannot add a third parent`;
        } else if(this.parents.length === 0) {
            this.parents.push(parentObject);
            //Add this person to the parentObject.children array if not already there
            let childFound = false;
            for(let i = 0; i < parentObject.children.length; i++) {
                if(parentObject.children[i].name === this.name) {
                    childFound = true;
                    break;
                }
            }
            if(!childFound) {
                parentObject.children.push(this);
            }
            return `${parentObject.name} added as a parent of ${this.name}!`;
        } else {
            if(this.parents[0].name === parentObject.name) {
                return `${parentObject.name} is already a parent!`;
            } else {
                this.parents.push(parentObject);
                //Add this person to the parentObject.children array if not already there
                let childFound = false;
                for(let i = 0; i < parentObject.children.length; i++) {
                    if(parentObject.children[i].name === this.name) {
                        childFound = true;
                        break;
                    }
                }
                if(!childFound) {
                    parentObject.children.push(this);
                }
                return `${parentObject.name} added as a parent of ${this.name}!`;
            }
        }
    }

    addSiblingOrChild(relativeArray, relative) {
        //Add sibling or child to this person
        let alreadyAdded = false;
        if(relative === this) {
            return `A person cannot be her/his own sibling or child!`;
        } else if(relativeArray === this.children) {
            for(let i = 0; i < relativeArray.length; i++) {
                if(relativeArray[i].name === relative.name) {
                    alreadyAdded = true;
                    break;
                }
            }
            if(!alreadyAdded) {
                relativeArray.push(relative);
                //Now check to see if this is in the relative.parents
                let parentAdded = false;
                for(let i = 0; i < relative.parents.length; i++) {
                    if(relative.parents[i] === this) {
                        parentAdded = true;
                        break;
                    }
                }
                if(!parentAdded && relative.parents.length < 2) {
                    relative.parents.push(this);
                }
            }
            return `${relative.name} has been added as ${this.name}'s child!`;
        } else if(relativeArray === this.siblings) {
            for(let i = 0; i < relativeArray.length; i++) {
                if(relativeArray[i].name === relative.name) {
                    alreadyAdded = true;
                    break;
                }
            }
            if(!alreadyAdded) {
                relativeArray.push(relative);
                //Now check to see if this is in the relative.parents
                let siblingAdded = false;
                for(let i = 0; i < relative.siblings.length; i++) {
                    if(relative.siblings[i] === this) {
                        siblingAdded = true;
                        break;
                    }
                }
                if(!siblingAdded) {
                    relative.siblings.push(this);
                }
            }
            return `${relative.name} has been added as ${this.name}'s sibling!`;
        } else {
            return `Cannot make this addition!`;
        }
    }

    listRelativesOfType(relativeType) {
        let relatives, intro;
        let relArr = [];
        switch(relativeType) {
            case 'siblings':
                intro = `${this.name}'s siblings: `;
                relatives = this.siblings.map(sibling => sibling.name).join(', ');
                break;
            case 'children':
                intro = `${this.name}'s children: `;
                relatives = this.children.map(child => child.name).join(', ');
                break;
            case 'parents':
                intro = `${this.name}'s parents: `;
                relatives = this.parents.map(par => par.name).join(' and ');
                break;
            case 'cousins':
                intro = `${this.name}'s cousins: `;
                for(let i = 0; i < this.parents.length; i++) {
                    for(let j = 0; j < this.parents[i].siblings.length; j++) {
                        for(let k = 0; k < this.parents[i].siblings[j].children.length; j++) {
                            relArr.push(this.parents[i].siblings[j].children[k].name);
                        }
                    }
                }
                relatives = relArr.join(', ');
                break;
            case 'aunts':
            case 'uncles':
            case 'auntsAndUncles':
            case 'unclesAndAunts':
                intro = `${this.name}'s aunts and uncles: `;
                for(let i = 0; i < this.parents.length; i++) {
                    for(let j = 0; j < this.parents[i].siblings.length; j++) {
                        relArr.push(this.parents[i].siblings[j].name);
                    }
                }
                relatives = relArr.join(', ');
                break;
            default:
                return "Could not understand the request.";
        }
        return intro + relatives;
    }
}

module.exports = BasicPerson;