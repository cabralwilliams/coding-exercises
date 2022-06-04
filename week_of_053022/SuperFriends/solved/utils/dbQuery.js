
const getHeroById = (heroArray, heroId) => {
    let heroFound = false;
    let index = -1;
    do {
        index++;
        if(heroArray[index].heroId === heroId) {
            heroFound = true;
            break;
        }
    } while(index < heroArray.length);
    return heroFound ? heroArray[index] : null;
};

const findByIdAndUpdate = (heroArray, heroId, updatedHero) => {
    let heroFound = false;
    let index = -1;
    do {
        index++;
        if(heroArray[index].heroId === heroId) {
            heroFound = true;
            break;
        }
    } while(index < heroArray.length);
    if(heroFound) {
        heroArray[index] = updatedHero;
    }
    const message = heroFound ? "Hero updated in database" : "Could not find hero with that id";
    return { heroArray, message };
};

const findByIdAndDelete = (heroArray, heroId) => {
    let heroFound = false;
    let index = -1;
    do {
        index++;
        if(heroArray[index].heroId === heroId) {
            heroFound = true;
            break;
        }
    } while(index < heroArray.length);
    let newHeroArray;
    if(heroFound) {
        newHeroArray = heroArray.filter((hero, i) => i !== index);
    } else {
        newHeroArray = heroArray;
    }
    const message = heroFound ? "The hero has been dismissed!" : "Couldn't find that hero to dismiss.";
    return { heroes: newHeroArray, message, success: heroFound };
}

module.exports = {
    getHeroById,
    findByIdAndUpdate,
    findByIdAndDelete
}