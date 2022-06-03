const NamedPerson = require('../NamedPerson');

describe('NamedPerson class', () => {

    it('Properly creates an instance of the class', () => {
        const np = new NamedPerson('Cabral');

        expect(np.name).toBe('Cabral');
        expect(np.spouse).toBe(null);
    });

    it('The class inherits methods from parent class', () => {
        const gail = new NamedPerson('Gail');
        const cabral = new NamedPerson('Cabral');
        const gregory = new NamedPerson('Gregory');
        const joyce = new NamedPerson('Joyce');
        const patricia = new NamedPerson('Patricia');

        const addGail = cabral.addParent(gail);
        const addGreg = cabral.addParent(gregory);
        const addJoyce = cabral.addParent(joyce);
        const gailAddJoyce = gail.addSiblingOrChild(gail.siblings,joyce);
        const gailAddPatricia = gail.addSiblingOrChild(gail.siblings,patricia);
        const joyceAddPatricia = joyce.addSiblingOrChild(joyce.siblings,patricia);

        expect(addGail).toBe('Gail added as a parent of Cabral!');
        expect(addGreg).toBe('Gregory added as a parent of Cabral!');
        expect(addJoyce).toBe('Cannot add a third parent');
        expect(cabral.parents.length).toBe(2);
        expect(gail.children.length).toBe(1);
        expect(gregory.children.length).toBe(1);
        expect(gailAddJoyce).toBe(`Joyce has been added as Gail's sibling!`);
        expect(patricia.listRelativesOfType('siblings')).toBe("Patricia's siblings: Gail, Joyce");
    });
});