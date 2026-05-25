// Variabelen om de status van de app bij te houden
let gekozenGame = "";
let spelers = [];

// Functie om te navigeren tussen schermen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Stap 1: Game selecteren
function selectGame(game) {
    gekozenGame = game;
    document.getElementById('gameTitel').innerText = "Spelers voor: " + game;
    // Reset spelers bij een nieuwe game
    spelers = [];
    updateLijst();
    showScreen('screen2');
}

// Stap 2: Spelers beheren
function addPlayer(naam) {
    if (naam && !spelers.includes(naam)) {
        spelers.push(naam);
        updateLijst();
    }
}

function addCustomPlayer() {
    let input = document.getElementById('customNaam');
    let naam = input.value.trim();
    if (naam !== "") {
        addPlayer(naam);
        input.value = ""; // Maak input leeg na toevoegen
    }
}

function updateLijst() {
    let lijstDiv = document.getElementById('spelerLijst');
    lijstDiv.innerHTML = "<strong>Spelers:</strong> " + (spelers.length > 0 ? spelers.join(', ') : "Nog geen spelers toegevoegd.");
}

// Stap 3: Toernooi starten
function startBracket() {
    if (spelers.length < 2) {
        alert("Voeg minimaal 2 spelers toe om een bracket te maken!");
        return;
    }
    
    showScreen('screen3');
    
    // Hier kun je later de koppeling maken met een bracket-bibliotheek
    const container = document.getElementById('bracketContainer');
    container.innerHTML = `<p>Toernooi: <strong>${gekozenGame}</strong></p>
                           <p>Aantal deelnemers: ${spelers.length}</p>
                           <p><em>De bracket voor ${spelers.join(' vs ')} wordt hier geladen.</em></p>`;
}

// Functie voor de "Opnieuw" knop
function resetApp() {
    spelers = [];
    showScreen('screen1');
}
