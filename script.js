/* ==========================================================================
   Dramatic Diplomacy — Game Logic (script.js)
   ========================================================================== */

// 1. GAME DATA & TOUR CONFIGURATION
const gameData = {
  tour1: {
    title: "Tour I: Early 1950s",
    minSelection: 5,
    maxSelection: 10,
    politicalBriefing: "The British Commonwealth territories in East and Southeast Asia are experiencing severe post-WWII political instability. Western influence is fragile, and anti-colonial movements are rising. Your objective is to foster regional harmony without provoking anti-Western backlash.",
    territories: ["Federation of Malaya", "Singapore", "British Borneo"],
    
    // TEXTO DE CADA TERRITORIO EN EL TOUR 1
    territoryInfo: {
      "Federation of Malaya": "1950s: Amid the Malayan Emergency, British authorities and local elites navigate intense anti-communist insurgencies and rising independence demands.",
      "Singapore": "1950s: A vital British crown colony and naval hub experiencing student activism, trade union strikes, and rapid political awakening.",
      "British Borneo": "1950s: Encompassing Sarawak, North Borneo, and Brunei, these territories remain under British colonial administration amidst post-war restructuring."
    },

    // 10 obras -> 2 BLOQUEAN (#103, #106)
    artRoster: Array.from({ length: 10 }, (_, i) => {
      const isRisk = i === 2 || i === 5; 
      return {
        id: 101 + i,
        name: `Artwork #${101 + i}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Linked to anti-colonial political movements." 
          : "Standard exhibition piece approved by Ministry censors."
      };
    })
  },

  tour2: {
    title: "Tour II: Late 50s–Late 60s",
    minSelection: 10,
    maxSelection: 15,
    politicalBriefing: "The 'Free World' network is expanding rapidly across East Asia. Diplomatic stakes are high as the US and its allies seek to build soft power against the communist bloc. Carefully balance national pride and regional sensitivities.",
    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "South Vietnam", "Singapore", "Malaya", "Indonesia"],
    
    // TEXTO DE CADA TERRITORIO EN EL TOUR 2
    territoryInfo: {
      "Japan": "1960s: Experiencing an unprecedented economic miracle while serving as a crucial diplomatic anchor for regional strategies.",
      "Taiwan": "1960s: Under martial law, functioning as a primary nexus for Republic of China cultural diplomacy.",
      "Philippines": "1960s: A key regional state balancing close diplomatic alignment with Washington against growing domestic movements.",
      "Thailand": "1960s: Frontline state in regional defense strategies, receiving substantial development aid.",
      "South Vietnam": "1960s: Marked by intense political turmoil and escalating conflict, making cultural engagements highly delicate.",
      "Singapore": "1960s: Rapidly transitioning towards full independence while managing complex ethnic and ideological tensions.",
      "Malaya": "1960s: Following independence in 1957, actively defining its regional identity prior to the formation of Malaysia.",
      "Indonesia": "1960s: Navigating high-stakes diplomacy under Sukarno before major political realignments."
    },

    // 15 obras -> 4 BLOQUEAN (#203, #206, #210, #213)
    artRoster: Array.from({ length: 15 }, (_, i) => {
      const isRisk = i === 2 || i === 5 || i === 9 || i === 12;
      return {
        id: 201 + i,
        name: `Artwork #${201 + i}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Artist criticized foreign military presence and allied policies." 
          : "Standard exhibition piece approved by Ministry censors."
      };
    })
  },

  tour3: {
    title: "Tour III: Late 1980s",
    minSelection: 15,
    maxSelection: 20,
    politicalBriefing: "The late Cold War era presents a complex geopolitical landscape. Glasnost is reshaping global politics, but regional proxy tensions remain tense. Select a comprehensive collection to secure your legacy.",
    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "Vietnam", "Singapore", "Malaya", "Indonesia", "Myanmar"],
    
    // TEXTO DE CADA TERRITORIO EN EL TOUR 3
    territoryInfo: {
      "Japan": "1980s: Global economic power hosting major international art exchanges.",
      "Taiwan": "1980s: Transitioning out of martial law and expanding soft-power initiatives globally.",
      "Philippines": "1980s: Post-People Power Revolution era rebuilding democratic institutions and cultural ties.",
      "Thailand": "1980s: Rapidly expanding economy serving as a gateway to Southeast Asian diplomacy.",
      "Vietnam": "1980s: Entering economic reform periods, gradually seeking regional normalization.",
      "Singapore": "1980s: Established global trade hub positioning itself as a regional arts center.",
      "Malaya": "1980s: Driving regional economic and cultural cooperation.",
      "Indonesia": "1980s: Playing a leading role in regional stability and ASEAN cultural diplomacy.",
      "Myanmar": "1980s: Operating under rigid governance with limited cultural exchanges."
    },

    // 20 obras -> 6 BLOQUEAN (#302, #305, #309, #312, #316, #319)
    artRoster: Array.from({ length: 20 }, (_, i) => {
      const isRisk = i === 1 || i === 4 || i === 8 || i === 11 || i === 15 || i === 18;
      return {
        id: 301 + i,
        name: `Artwork #${301 + i}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Subversive artwork funded by dissident student groups." 
          : "Harmonious cultural diplomacy selection."
      };
    })
  }
};

// 2. STATE MANAGEMENT
let currentTour = 1;
let selectedArtworks = [];
let activeTerritory = null; // Guarda qué botón/territorio está abierto actualmente

// 3. DOM ELEMENTS
const screens = {
  intro: document.getElementById('screen-intro'),
  stage1: document.getElementById('screen-stage1-briefing'),
  stage2: document.getElementById('screen-stage2-territories'),
  stage3: document.getElementById('screen-stage3-selection'),
  result: document.getElementById('screen-result')
};

const badges = {
  tour1: document.getElementById('badge-tour1'),
  tour2: document.getElementById('badge-tour2'),
  tour3: document.getElementById('badge-tour3')
};

// 4. HELPER FUNCTIONS
function showScreen(screenKey) {
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('hidden');
  });
  if (screens[screenKey]) {
    screens[screenKey].classList.remove('hidden');
  }
}

function updateTourBadges() {
  if (badges.tour1) badges.tour1.className = `tour-badge ${currentTour === 1 ? 'active' : currentTour > 1 ? 'completed' : 'locked'}`;
  if (badges.tour2) badges.tour2.className = `tour-badge ${currentTour === 2 ? 'active' : currentTour > 2 ? 'completed' : 'locked'}`;
  if (badges.tour3) badges.tour3.className = `tour-badge ${currentTour === 3 ? 'active' : currentTour > 3 ? 'completed' : 'locked'}`;
}

function getTourKey() {
  return `tour${currentTour}`;
}

// 5. STAGE FLOW CONTROLLERS
function startTour() {
  selectedArtworks = [];
  activeTerritory = null;
  updateTourBadges();
  
  const titleInput = document.getElementById('exhibition-title');
  const descInput = document.getElementById('exhibition-desc');
  if (titleInput) titleInput.value = '';
  if (descInput) descInput.value = '';

  showScreen('intro');
}

function loadStage1() {
  const config = gameData[getTourKey()];
  const briefingText = document.getElementById('political-briefing-text');
  if (briefingText && config) {
    briefingText.innerText = config.politicalBriefing;
  }
  showScreen('stage1');
}

// ETAPA 2: GENERAR BOTONES CON SUB-CAJAS INDIVIDUALES (ACCORDION)
function loadStage2() {
  const config = gameData[getTourKey()];
  const territoryList = document.getElementById('visiting-territories-list');
  
  activeTerritory = null;

  if (territoryList && config && config.territories) {
    territoryList.innerHTML = '';
    
    config.territories.forEach(territory => {
      // 1. Crear el contenedor principal para este territorio
      const li = document.createElement('li');
      li.className = 'territory-item';

      // 2. Elemento para el título/botón del territorio
      const titleSpan = document.createElement('span');
      titleSpan.className = 'territory-title';
      titleSpan.innerText = territory;

      // 3. Sub-caja desplegable directamente debajo del nombre
      const subBox = document.createElement('div');
      subBox.className = 'territory-subbox hidden';
      
      const contextText = (config.territoryInfo && config.territoryInfo[territory]) 
        ? config.territoryInfo[territory] 
        : `${territory}: Briefing context pending for this era.`;
        
      subBox.innerHTML = `<strong>${territory}</strong> — ${contextText}`;

      // Unir los elementos
      li.appendChild(titleSpan);
      li.appendChild(subBox);

      // Evento al hacer clic en el nombre del territorio
      titleSpan.addEventListener('click', () => toggleTerritoryInfo(territory, li));
      
      territoryList.appendChild(li);
    });
  }

  showScreen('stage2');
}

// FUNCIÓN DE DESPLIEGUE INDIVIDUAL (ACCORDION)
function toggleTerritoryInfo(territoryName, clickedLi) {
  const allItems = document.querySelectorAll('.territory-item');
  const currentSubBox = clickedLi.querySelector('.territory-subbox');

  // Si se vuelve a hacer clic en el mismo territorio abierto -> Se cierra su sub-caja
  if (activeTerritory === territoryName) {
    activeTerritory = null;
    clickedLi.classList.remove('active');
    if (currentSubBox) currentSubBox.classList.add('hidden');
    return;
  }

  // Si se hace clic en uno nuevo -> Se cierran las demás sub-cajas y se abre la actual
  allItems.forEach(item => {
    item.classList.remove('active');
    const box = item.querySelector('.territory-subbox');
    if (box) box.classList.add('hidden');
  });

  clickedLi.classList.add('active');
  activeTerritory = territoryName;

  if (currentSubBox) {
    currentSubBox.classList.remove('hidden');
  }
}

// ETAPA 3: SELECCIÓN DE OBRAS DE ARTE
function loadStage3() {
  const config = gameData[getTourKey()];
  const rosterGrid = document.getElementById('art-roster-grid');
  
  selectedArtworks = [];

  const selectedCountEl = document.getElementById('selected-count');
  const maxCountEl = document.getElementById('max-count');
  
  if (selectedCountEl) selectedCountEl.innerText = "0";
  if (maxCountEl && config) maxCountEl.innerText = `${config.minSelection} to ${config.maxSelection}`;

  if (rosterGrid && config && config.artRoster) {
    rosterGrid.innerHTML = '';
    config.artRoster.forEach(art => {
      const card = document.createElement('div');
      card.className = 'art-card';
      card.dataset.id = art.id;

      card.innerHTML = `
        <div style="height:90px; background:#111; border-radius:4px; margin-bottom:8px; display:flex; align-items:center; justify-content:center; font-family:var(--font-mono); color:var(--cathay-teal);">
          [IMG ${art.id}]
        </div>
        <span>${art.name}</span>
      `;

      card.addEventListener('click', () => toggleArtSelection(art, card));
      rosterGrid.appendChild(card);
    });
  }

  showScreen('stage3');
}

function toggleArtSelection(art, cardElement) {
  const config = gameData[getTourKey()];
  const index = selectedArtworks.findIndex(item => item.id === art.id);

  if (index > -1) {
    selectedArtworks.splice(index, 1);
    cardElement.classList.remove('selected');
  } else {
    if (config && selectedArtworks.length >= config.maxSelection) {
      alert(`You can select a maximum of ${config.maxSelection} artworks for this tour.`);
      return;
    }
    selectedArtworks.push(art);
    cardElement.classList.add('selected');
  }

  const selectedCountEl = document.getElementById('selected-count');
  if (selectedCountEl) selectedCountEl.innerText = selectedArtworks.length;
}

// EVALUACIÓN Y RESULTADO DE LA GIRA
function evaluateTour() {
  const config = gameData[getTourKey()];

  if (config && selectedArtworks.length < config.minSelection) {
    alert(`Please select at least ${config.minSelection} artworks to proceed.`);
    return;
  }

  const failingPiece = selectedArtworks.find(art => art.risk === true);

  const resultCard = document.getElementById('result-card');
  const resultTitle = document.getElementById('result-title');
  const resultMsg = document.getElementById('result-message');
  const revealBox = document.getElementById('revealed-info');
  const actionBtn = document.getElementById('btn-result-action');

  if (failingPiece) {
    // CAMINO DE FRACASO: Bloqueo diplomático
    if (resultCard) resultCard.className = "result-card failure";
    if (resultTitle) resultTitle.innerText = "DIPLOMATIC INCIDENT TRIGGERED";
    if (resultMsg) resultMsg.innerText = "A political blockade was declared! The exhibition has been canceled.";

    if (revealBox) {
      revealBox.innerHTML = `
        <strong style="color:var(--accent-red, #ff5555);">Incident Cause:</strong><br>
        <strong>${failingPiece.name}</strong><br>
        <em>${failingPiece.detail}</em><br><br>
        <small>* All other selected pieces remain classified.</small>
      `;
    }

    if (actionBtn) {
      actionBtn.innerText = "Restart from Tour I";
      actionBtn.onclick = () => {
        currentTour = 1;
        startTour();
      };
    }

  } else {
    // CAMINO DE ÉXITO
    if (currentTour < 3) {
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = `TOUR ${currentTour} SUCCESSFUL`;
      if (resultMsg) resultMsg.innerText = "The tour was received with high praise across all host territories. Diplomatic relations have strengthened.";
      if (revealBox) revealBox.innerHTML = `<em>* Artwork details remain hidden until final victory.</em>`;

      if (actionBtn) {
        actionBtn.innerText = `Proceed to Tour ${currentTour + 1}`;
        actionBtn.onclick = () => {
          currentTour++;
          startTour();
        };
      }
    } else {
      // VICTORIA FINAL
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = "VICTORY: PROMOTED!";
      if (resultMsg) resultMsg.innerText = "Congratulations! You have successfully navigated Cold War diplomacy across three decades!";

      let fullRevealHTML = "<strong>Master Collection Unlocked:</strong><br><br>";
      selectedArtworks.forEach(art => {
        fullRevealHTML += `• <strong>${art.name}:</strong> ${art.detail}<br>`;
      });
      if (revealBox) revealBox.innerHTML = fullRevealHTML;

      if (actionBtn) {
        actionBtn.innerText = "Play Again";
        actionBtn.onclick = () => {
          currentTour = 1;
          startTour();
        };
      }
    }
  }

  showScreen('result');
}

// 6. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  const btnStart = document.getElementById('btn-start-game');
  const btnToStage2 = document.getElementById('btn-to-stage2');
  const btnToStage3 = document.getElementById('btn-to-stage3');
  const btnLaunch = document.getElementById('btn-launch-tour');

  if (btnStart) btnStart.addEventListener('click', loadStage1);
  if (btnToStage2) btnToStage2.addEventListener('click', loadStage2);
  if (btnToStage3) btnToStage3.addEventListener('click', loadStage3);
  if (btnLaunch) btnLaunch.addEventListener('click', evaluateTour);

  startTour();
});