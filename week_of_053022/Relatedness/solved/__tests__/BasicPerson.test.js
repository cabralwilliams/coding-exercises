const BasicPerson = require('../BasicPerson');

describe('BasicPerson class', () => {

    it('Creates the base class', () => {
        const bP = new BasicPerson();

        expect(bP.name).toBe('None');
        expect(bP.spouse).toBe(null);
        expect(bP.children.length).toBe(0);
        expect(bP.parents.length).toBe(0);
        expect(bP.siblings.length).toBe(0);
    });

    it(`The BasicPerson methods function as intended`, () => {
        const bP1 = new BasicPerson();
        const bP1parent1 = new BasicPerson();
        const bP1parent2 = new BasicPerson();

        const addParent1 = bP1.addParent(bP1parent1);
        const addParent2 = bP1.addParent(bP1parent2);

        expect(addParent1).toBe('None added as a parent of None!');
        expect(addParent2).toBe('None is already a parent!');
        expect(bP1parent1.children.length).toBe(1);
        expect(bP1parent2.children.length).toBe(0);

        const bP2 = new BasicPerson();
        const myOwnParent = bP2.addParent(bP2);

        expect(myOwnParent).toBe('A person cannot be her/his own parent!');
    });
});