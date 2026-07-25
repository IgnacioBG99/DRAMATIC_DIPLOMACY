/* ==========================================================================
   Cold War Curator — Game Logic (script.js)
   ========================================================================== */

// 1. GAME DATA & ACT CONFIGURATION
const gameData = {
  act1: {
    title: "Act I: Early 1950s",
    minSelection: 5,
    maxSelection: 10,
    politicalBriefing: "The British Commonwealth territories in East and Southeast Asia are experiencing severe post-WWII political instability. Western influence is fragile, and anti-colonial movements are rising. Your objective is to foster regional harmony without provoking anti-Western backlash.",
    countries: ["Federation of Malaya", "Singapore", "British Borneo"],
    artRoster: [
      { id: 101, name: "Artwork #01", risk: false, detail: "Harmless traditional landscape painting." },
      { id: 102, name: "Artwork #02", risk: false, detail: "Portrait of local merchants." },
      { id: 103, name: "Artwork #03", risk: true,  detail: "SENSITIVE: Artist was linked to radical trade unions in Malaya." },
      { id: 104, name: "Artwork #04", risk: false, detail: "Botanical study of tropical flora." },
      { id: 105, name: "Artwork #05", risk: false, detail: "Abstract modernist woodcut." },
      { id: 106, name: "Artwork #06", risk: true,  detail: "SENSITIVE: Contains anti-colonial propaganda imagery." },
      { id: 107, name: "Artwork #07", risk: false, detail: "Still life with ceramic vase." },
      { id: 108, name: "Artwork #08", risk: false, detail: "Coastal fishing scene." },
      { id: 109, name: "Artwork #09", risk: false, detail: "Calligraphic ink study." },
      { id: 110, name: "Artwork #10", risk: false, detail: "Study of harbour life." }
    ]
  },
  act2: {
    title: "Act II: Late 50s–Late 60s",
    minSelection: 10,
    maxSelection: 15,
    politicalBriefing: "The 'Free World' network is expanding rapidly across East Asia. Diplomatic stakes are high as the US and its allies seek to build soft power against the communist bloc. Carefully balance national pride and regional sensitivities.",
    countries: ["Japan", "Taiwan", "Philippines", "Thailand", "South Vietnam", "Singapore", "Malaya", "Indonesia"],
    artRoster: Array.from({ length: 15 }, (_, i) => ({
      id: 201 + i,
      name: `Artwork #${201 + i}`,
      risk: i === 4 || i === 9, // Artwork 205 and 210 are risky
      detail: (i === 4 || i === 9) 
        ? "SENSITIVE: Artist criticized allied foreign military presence." 
        : "Standard exhibition piece approved by Ministry censors."
    }))
  },
  act3: {
    title: "Act III: Late 1980s",
    minSelection: 15,
    maxSelection: 20,
    politicalBriefing: "The late Cold War era presents a complex geopolitical landscape. Glasnost is reshaping global politics, but regional proxy tensions remain tense. Select a comprehensive collection to secure your legacy.",
    countries: ["Japan", "Taiwan", "Philippines", "Thailand", "Vietnam", "Singapore", "Malaya", "Indonesia", "Myanmar"],
    artRoster: Array.from({ length: 20 }, (_, i) => ({
      id: 301 + i,
      name: `Artwork #${301 + i}`,
      risk: i === 7 || i === 14, // Artwork 308 and 315 are risky
      detail: (i === 7 || i === 14) 
        ? "SENSITIVE: Subversive artwork funded by dissident student groups." 
        : "Harmonious cultural diplomacy selection."
    }))
  }
};

// 2. STATE MANAGEMENT
let currentAct = 1; // 1, 2, or 3
let selectedArtworks = [];

// 3. DOM ELEMENTS
const screens = {
  intro: document.getElementById('screen-intro'),
  stage1: document.getElementById('screen-stage1-briefing'),
  stage2: document.getElementById('screen-stage2-countries'),
  stage3: document.getElementById('screen-stage3-selection'),
  result: document.getElementById('screen-result')
};

const badges = {
  act1: document.getElementById('badge-act1'),
  act2: document.getElementById('badge-act2'),
  act3: document.getElementById('badge-act3')
};

// 4. HELPER FUNCTIONS
function showScreen(screenKey) {
  Object.values(screens).forEach(screen => screen.classList.add('hidden'));
  screens[screenKey].classList.remove('hidden');
}

function updateActBadges() {
  badges.act1.className = `act-badge ${currentAct === 1 ? 'active' : currentAct > 1 ? 'completed' : 'locked'}`;
  badges.act2.className = `act-badge ${currentAct === 2 ? 'active' : currentAct > 2 ? 'completed' : 'locked'}`;
  badges.act3.className = `act-badge ${currentAct === 3 ? 'active' : currentAct > 3 ? 'completed' : 'locked'}`;
}

function getActKey() {
  return `act${currentAct}`;
}

// 5. STAGE FLOW CONTROLLERS
function startAct() {
  selectedArtworks = [];
  updateActBadges();
  
  // Load Stage 1: Political Briefing
  const config = gameData[getActKey()];
  document.getElementById('political-briefing-text').innerText = config.politicalBriefing;
  showScreen('stage1');
}

function loadStage2() {
  const config = gameData[getActKey()];
  const countryList = document.getElementById('visiting-countries-list');
  countryList.innerHTML = '';

  config.countries.forEach(country => {
    const li = document.createElement('li');
    li.innerText = `• ${country}`;
    countryList.appendChild(li);
  });

  showScreen('stage2');
}

function loadStage3() {
  const config = gameData[getActKey()];
  const rosterGrid = document.getElementById('art-roster-grid');
  rosterGrid.innerHTML = '';
  selectedArtworks = [];

  document.getElementById('selected-count').innerText = "0";
  document.getElementById('max-count').innerText = `${config.minSelection} to ${config.maxSelection}`;

  config.artRoster.forEach(art => {
    const card = document.createElement('div');
    card.className = 'art-card';
    card.dataset.id = art.id;

    card.innerHTML = `
      <div style="height:100px; background:#000; border-radius:4px; margin-bottom:8px; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); color:var(--cathay-teal);">
        [IMG ${art.id}]
      </div>
      <span>${art.name}</span>
    `;

    card.addEventListener('click', () => toggleArtSelection(art, card));
    rosterGrid.appendChild(card);
  });

  showScreen('stage3');
}

function toggleArtSelection(art, cardElement) {
  const config = gameData[getActKey()];
  const index = selectedArtworks.findIndex(item => item.id === art.id);

  if (index > -1) {
    // Deselect
    selectedArtworks.splice(index, 1);
    cardElement.classList.remove('selected');
  } else {
    // Select
    if (selectedArtworks.length >= config.maxSelection) {
      alert(`You can select a maximum of ${config.maxSelection} artworks for this act.`);
      return;
    }
    selectedArtworks.push(art);
    cardElement.classList.add('selected');
  }

  document.getElementById('selected-count').innerText = selectedArtworks.length;
}

function evaluateTour() {
  const config = gameData[getActKey()];

  // Validate count
  if (selectedArtworks.length < config.minSelection) {
    alert(`Please select at least ${config.minSelection} artworks to proceed.`);
    return;
  }

  // Check for political triggers
  const failingPiece = selectedArtworks.find(art => art.risk === true);

  const resultCard = document.getElementById('result-card');
  const resultTitle = document.getElementById('result-title');
  const resultMsg = document.getElementById('result-message');
  const revealBox = document.getElementById('revealed-info');
  const actionBtn = document.getElementById('btn-result-action');

  if (failingPiece) {
    // FAILURE PATH: Reset to Act 1
    resultCard.className = "result-card failure";
    resultTitle.innerText = "DIPLOMATIC INCIDENT TRIGGERED";
    resultMsg.innerText = "A political blockade was declared! The exhibition has been canceled, and you have been sent to a re-education camp.";

    // Reveal ONLY the failing piece
    revealBox.innerHTML = `
      <strong style="color:var(--accent-red);">Incident Cause:</strong><br>
      <strong>${failingPiece.name}</strong><br>
      <em>${failingPiece.detail}</em><br><br>
      <small>* All other selected pieces remain classified.</small>
    `;

    actionBtn.innerText = "Restart from Act I";
    actionBtn.onclick = () => {
      currentAct = 1;
      showScreen('intro');
    };

  } else {
    // SUCCESS PATH
    if (currentAct < 3) {
      resultCard.className = "result-card success";
      resultTitle.innerText = `ACT ${currentAct} SUCCESSFUL`;
      resultMsg.innerText = "The tour was received with high praise across all host nations. Diplomatic relations have strengthened.";
      revealBox.innerHTML = `<em>* Artwork details remain hidden until final victory.</em>`;

      actionBtn.innerText = `Proceed to Act ${currentAct + 1}`;
      actionBtn.onclick = () => {
        currentAct++;
        startAct();
      };
    } else {
      // FINAL VICTORY (Completed Act 3)
      resultCard.className = "result-card success";
      resultTitle.innerText = "VICTORY: PROMOTED!";
      resultMsg.innerText = "Congratulations! You have successfully navigated Cold War diplomacy across three decades and have been promoted to Director of the Hong Kong Museum of Art!";

      // Reveal ALL selected pieces across victory
      let fullRevealHTML = "<strong>Master Collection Unlocked:</strong><br><br>";
      selectedArtworks.forEach(art => {
        fullRevealHTML += `• <strong>${art.name}:</strong> ${art.detail}<br>`;
      });
      revealBox.innerHTML = fullRevealHTML;

      actionBtn.innerText = "Play Again";
      actionBtn.onclick = () => {
        currentAct = 1;
        showScreen('intro');
      };
    }
  }

  showScreen('result');
}

// 6. EVENT LISTENERS
document.getElementById('btn-start-game').addEventListener('click', startAct);
document.getElementById('btn-to-stage2').addEventListener('click', loadStage2);
document.getElementById('btn-to-stage3').addEventListener('click', loadStage3);
document.getElementById('btn-launch-tour').addEventListener('click', evaluateTour);