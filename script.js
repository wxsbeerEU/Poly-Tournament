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
        rondeDiv.innerHTML = `<h3 style="color: #aaa; margin-top:20px;">Ronde ${index + 1}</h3>`;
        
        for (let i = 0; i < rondeSpelers.length; i += 2) {
            let match = document.createElement('div');
            match.className = 'match';
            
            if (rondeSpelers[i+1]) {
                match.innerHTML = `
                    <button onclick="winnaarKiezen('${rondeSpelers[i]}', ${index})">${rondeSpelers[i]}</button>
                    <span style="color:#555">VS</span>
                    <button onclick="winnaarKiezen('${rondeSpelers[i+1]}', ${index})">${rondeSpelers[i+1]}</button>
                `;
            } else {
                // Hier de fancy 'Bye' weergave
                match.innerHTML = `<div class="bye-text">✨ ${rondeSpelers[i]} krijgt een bye!</div>`;
                // Automatisch door naar volgende ronde na 1 seconde
                setTimeout(() => winnaarKiezen(rondeSpelers[i], index), 1500);
            }
            rondeDiv.appendChild(match);
        }
        container.appendChild(rondeDiv);
    });
}

function winnaarKiezen(naam, rondeIndex) {
    if (!rondes[rondeIndex + 1]) rondes[rondeIndex + 1] = [];
    
    // Voorkom dubbele inzendingen in dezelfde ronde
    if (!rondes[rondeIndex + 1].includes(naam)) {
        rondes[rondeIndex + 1].push(naam);
    }
    
    // Check of we klaar zijn
    if (rondes[rondeIndex + 1].length === Math.ceil(rondes[rondeIndex].length / 2)) {
        renderRonde();
    }
    
    // Winnaar check
    if (rondes[rondeIndex + 1].length === 1 && rondes[rondeIndex].length > 1 && rondes[rondeIndex + 1][0] === naam) {
         // Kleine vertraging voor het effect
         setTimeout(() => {
            document.getElementById('champion-name').innerText = naam;
            document.getElementById('winner-overlay').classList.remove('hidden');
         }, 500);
    }
}
function sluitWinnaarPopup() { document.getElementById('winner-overlay').classList.add('hidden'); }
function resetTournament() { location.reload(); }
