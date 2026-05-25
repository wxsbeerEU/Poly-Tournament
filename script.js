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
    let alleSpelers = [...new Set([...gekozenSpelers, ...extraSpelers])];
    
    if (alleSpelers.length < 2) {
        alert("Voeg minimaal 2 spelers toe!");
        return;
    }

    alleSpelers.sort(() => Math.random() - 0.5); 
    rondes = [alleSpelers];
    
    document.getElementById('setup-card').classList.remove('active-screen');
    document.getElementById('bracket-card').classList.add('active-screen');
    document.getElementById('bracket-title').innerText = gekozenGame;
    renderRonde();
}

function renderRonde() {
    const container = document.getElementById('rounds-container');
    container.innerHTML = "";
    
    // We tonen alleen de laatst gespeelde ronde
    let index = rondes.length - 1;
    let rondeSpelers = rondes[index];
    
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
            match.innerHTML = `<div class="bye-text">✨ ${rondeSpelers[i]} gaat door (Bye)</div>`;
            // Bye speler gaat direct door naar de volgende ronde
            setTimeout(() => winnaarKiezen(rondeSpelers[i], index), 1000);
        }
        rondeDiv.appendChild(match);
    }
    container.appendChild(rondeDiv);
}

function winnaarKiezen(naam, rondeIndex) {
    if (!rondes[rondeIndex + 1]) rondes[rondeIndex + 1] = [];
    
    // Voeg winnaar alleen toe als hij er nog niet in staat (voorkomt dubbels door Bye/Klik)
    if (!rondes[rondeIndex + 1].includes(naam)) {
        rondes[rondeIndex + 1].push(naam);
    }
    
    // Check of de huidige ronde klaar is
    let aantalVerwachteWinnaars = Math.ceil(rondes[rondeIndex].length / 2);
    
    if (rondes[rondeIndex + 1].length === aantalVerwachteWinnaars) {
        // Is er nog maar 1 speler over? Dan is er een toernooiwinnaar!
        if (rondes[rondeIndex + 1].length === 1) {
            document.getElementById('champion-name').innerText = rondes[rondeIndex + 1][0];
            document.getElementById('winner-overlay').classList.remove('hidden');
        } else {
            renderRonde();
        }
    }
}

function sluitWinnaarPopup() { document.getElementById('winner-overlay').classList.add('hidden'); }
function resetTournament() { location.reload(); }
