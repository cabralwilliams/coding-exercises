
const updateHeroForm = document.querySelector('#updateHero');
const codeNameInput = document.querySelector('#codeName');
const secretIdentityInput = document.querySelector('#secretIdentity');
const genderSelect = document.querySelector('#gender');
const deleteHeroForm = document.querySelector("#deleteHero");

const heroID = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

const updateHero = async event => {
    event.preventDefault();
    const codeName = codeNameInput.value.trim();
    const secretIdentity = secretIdentityInput.value.trim();
    const gender = genderSelect.value;
    if(!codeName || !secretIdentity) {
        alert('Code namd and secret identity must be supplied!');
        return;
    }
    const result = await fetch(`/api/friends/${heroID}`, {
        method: "PUT",
        body: JSON.stringify({ codeName, secretIdentity, gender }),
        headers: { "Content-Type": "application/json" }
    });
    if(result.ok) {
        window.location.replace('/friends');
    } else {
        alert(result.message);
    }
}

updateHeroForm.addEventListener('submit', updateHero);

const deleteHero = async event => {
    event.preventDefault();

    const result = await fetch(`/api/friends/${heroID}`, {
        method: "DELETE"
    });

    if(result.ok) {
        window.location.replace('/friends');
    } else {
        alert(result.message);
    }
};

deleteHeroForm.addEventListener('submit', deleteHero);