
const addHeroForm = document.querySelector('#addHero');
const codeNameInput = document.querySelector('#codeName');
const secretIdentityInput = document.querySelector('#secretIdentity');
const genderSelect = document.querySelector('#gender');

const addHero = async event => {
    event.preventDefault();
    const codeName = codeNameInput.value.trim();
    const secretIdentity = secretIdentityInput.value.trim();
    const gender = genderSelect.value;
    if(!codeName || !secretIdentity) {
        alert('Code namd and secret identity must be supplied!');
        return;
    }
    const result = await fetch('/api', {
        method: "POST",
        body: JSON.stringify({ codeName, secretIdentity, gender }),
        headers: { "Content-Type": "application/json" }
    });
    if(result.ok) {
        window.location.replace('/friends');
    } else {
        alert(result.message);
    }
}

addHeroForm.addEventListener('submit', addHero);