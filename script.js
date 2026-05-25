let gekozenGame = "";
let gekozenSpelers = [];
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

function addVasteSpeler(btn, naam) {
    if (!gekozenSpelers.includes(naam)) {
        gekozenSpelers.push(naam);
        btn.classList.add('selected');
    } else {
        gekozenSpelers = gekozenSpelers.filter(s => s !== naam);
        btn.classList.remove('selected');
    }
}

function startTournament() {
    let extraInput = document.getElementById('player-input').value;
    let extraSpelers = extraInput.split(',').map(s => s.trim()).filter(s => s !== "");
    
    // Combineer vaste lijst met extra namen
    let alleSpelers = [...new Set([...gekozenSpelers, ...extraSpelers])];
    
    if (alleSpelers.length < 2) {
        alert("Voeg minimaal 2 spelers toe!");
        return;
    }

    alleSpelers.sort(() => Math.random() - 0.5); // Shuffle
    rondes = [alleSpelers];
    
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
    
    if (rondes[rondeIndex].length > 1 && rondes[rondeIndex + 1].length === Math.ceil(rondes[rondeIndex].length / 2)) {
        renderRonde();
    } else if (rondes[rondeIndex + 1].length === 1 && rondes[rondeIndex].length === 1) {
        document.getElementById('champion-name').innerText = naam;
        document.getElementById('winner-overlay').classList.remove('hidden');
    }
}

function sluitWinnaarPopup() { document.getElementById('winner-overlay').classList.add('hidden'); }
function resetTournament() { location.reload(); }
