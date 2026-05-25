let gekozenGame = "";
let rondes = [];

function kiesGame(game) {
    gekozenGame = game;
    document.getElementById('game-card').classList.remove('active-screen');
    document.getElementById('game-card').classList.add('hidden-screen');
    document.getElementById('setup-card').classList.add('active-screen');
}

function terugNaarMenu() {
    document.getElementById('setup-card').classList.remove('active-screen');
    document.getElementById('game-card').classList.add('active-screen');
}

function startTournament() {
    let input = document.getElementById('player-input').value;
    let spelers = input.split(',').map(s => s.trim()).filter(s => s !== "");
    
    if (spelers.length < 2) { alert("Voeg minimaal 2 spelers toe!"); return; }

    spelers.sort(() => Math.random() - 0.5); // Shuffle
    rondes = [spelers];
    
    document.getElementById('setup-card').classList.remove('active-screen');
    document.getElementById('bracket-card').classList.add('active-screen');
    document.getElementById('bracket-title').innerText = gekozenGame;
    renderRonde();
}

function renderRonde() {
    const container = document.getElementById('rounds-container');
    container.innerHTML = "";
    
    rondes.forEach((rondeSpelers, index) => {
        let rondeDiv = document.createElement('div');
        rondeDiv.innerHTML = `<h3>Ronde ${index + 1}</h3>`;
        
        for (let i = 0; i < rondeSpelers.length; i += 2) {
            let match = document.createElement('div');
            match.className = 'match';
            
            if (rondeSpelers[i+1]) {
                match.innerHTML = `
                    <button onclick="winnaarKiezen('${rondeSpelers[i]}', ${index})">${rondeSpelers[i]}</button>
                    <span>VS</span>
                    <button onclick="winnaarKiezen('${rondeSpelers[i+1]}', ${index})">${rondeSpelers[i+1]}</button>
                `;
            } else {
                match.innerHTML = `<span>${rondeSpelers[i]} (Bye)</span>`;
                setTimeout(() => winnaarKiezen(rondeSpelers[i], index), 1000);
            }
            rondeDiv.appendChild(match);
        }
        container.appendChild(rondeDiv);
    });
}

function winnaarKiezen(naam, rondeIndex) {
    if (!rondes[rondeIndex + 1]) rondes[rondeIndex + 1] = [];
    rondes[rondeIndex + 1].push(naam);
    
    if (rondes[rondeIndex + 1].length === 1 && rondes[rondeIndex + 1].length >= 1 && rondeIndex + 1 > 0 && rondes[rondeIndex + 1][0] === naam && rondes[rondeIndex].length === 1) {
        document.getElementById('champion-name').innerText = naam;
        document.getElementById('winner-overlay').classList.remove('hidden');
    } else {
        renderRonde();
    }
}

function sluitWinnaarPopup() { document.getElementById('winner-overlay').classList.add('hidden'); }
function resetTournament() { location.reload(); }
