
const writeFriends = friends => {
    let friendsMapping = friends.map(friend => {
        let fOutput = `<div class='flex-column'>
            <div><a href='/friends/${friend.heroId}'><h3>${friend.codeName}</h3></a></div>
            <div>Alias: ${friend.secretIdentity}</div>
        </div>`;
        return fOutput;
    })

    let output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Friends! - All Friends</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>
<body class="flex-column align-items-center padding-x-tiny">
    <header class="flex-row justify-content-between col8_8 bg6 align-items-center flex-wrap">
        <div class="col2_8">
            <h1 class="fc5 padding-x-tiny">Super Friends!</h1>
        </div>
        <div class="col5_8 flex-row justify-content-center">
            <nav>
                <ul class="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/friends">Friends</a></li>
                    <li><a href="/addHero">Add Hero</a></li>
                    <li><a href="/reset">Reset</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main class="col8_8 flex-row flex-wrap">
        <div class="col8_8 col3_8_md flex-column align-items-center">
            <h2>All Friends</h2>
            <p>See all of the current Super Friends here!</p>
        </div>
        <div class="col8_8 col5_8_md flex-column align-items-center">
            ${friendsMapping.join('')}
        </div>
    </main>
    <footer class="col8_8">

    </footer>
</body>
</html>`;
return output;
}

const writeFriendPage = friend => {
    let output = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Friends! - ${friend.codeName}</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>
<body class="flex-column align-items-center padding-x-tiny">
    <header class="flex-row justify-content-between col8_8 bg6 align-items-center flex-wrap">
        <div class="col2_8">
            <h1 class="fc5 padding-x-tiny">Super Friends!</h1>
        </div>
        <div class="col5_8 flex-row justify-content-center">
            <nav>
                <ul class="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/friends">Friends</a></li>
                    <li><a href="/addHero">Add Hero</a></li>
                    <li><a href="/reset">Reset</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main class="col8_8 flex-row flex-wrap">
        <div class="col8_8 col3_8_md flex-column align-items-center">
            <h2>${friend.codeName}</h2>
            <p>Does everything look right here with ${friend.codeName}?  Should ${friend.gender === 'male' ? 'he' : 'she'} even remain here?  You decide!</p>
        </div>
        <div class="col8_8 col5_8_md flex-column align-items-center">
            <h3>Update Hero</h3>
            <form class='flex-column' id='updateHero'>
                <label for='codeName'>Code Name:</label>
                <input type='text' id='codeName' name='codeName' value='${friend.codeName}' />
                <label for='secretIdentity'>Secret Identity:</label>
                <input type='text' id='secretIdentity' name='secretIdentity' value='${friend.secretIdentity}' />
                <div>
                    <label for='gender'>Gender: </label>
                    <select id='gender' name='gender'>
                        <option value='female' ${friend.gender === 'female' ? 'selected' : ''}>Female</option>
                        <option value='male' ${friend.gender === 'male' ? 'selected' : ''}>Male</option>
                    </select>
                </div>
                <button type='submit'>Update Hero!</button>
            </form>
            <h3>Dismiss Hero</h3>
            <form class='flex-column' id='deleteHero'>
                <button type='submit'>Dismiss!</button>
            </form>
        </div>
    </main>
    <footer class="col8_8">

    </footer>
    <script src='/js/editHero.js'></script>
</body>
</html>`;
return output;
}

module.exports = {
    writeFriends,
    writeFriendPage
};