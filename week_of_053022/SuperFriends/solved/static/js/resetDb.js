
const resetDBForm = document.querySelector('#resetDB');

const turnBackTime = async event => {
    event.preventDefault();

    const result = await fetch("/api/reset", {
        method: "POST"
    });

    if(result.ok) {
        window.location.replace('/');
    } else {
        alert(result.status);
    }
}

resetDBForm.addEventListener('submit', turnBackTime);