/* ==========================================================================
   Dramatic Diplomacy — Game Logic (script.js)
   ========================================================================== */

// Helper to generate alphabetical codes (A, B, C ... Z, AA, AB...)
function getAlphaLabel(index) {
  let label = "";
  let i = index;
  while (i >= 0) {
    label = String.fromCharCode((i % 26) + 65) + label;
    i = Math.floor(i / 26) - 1;
  }
  return label;
}

// 1. GAME DATA & TOUR CONFIGURATION
const gameData = {
  tour1: {
    title: "Tour I: Early 1950s",
    minSelection: 5,
    maxSelection: 10,
    
    // Narrative for the single Initial Welcome Screen
    welcomeStory: "Ah, Ms./Mr. Curator! Welcome to the Urban Council—where we manage everything from public amenities to high culture. Ready to make history, or at least curate it?\n\nOur Colonial Administrator, Sir Alexander Grantham, wants to improve Hong Kong's international communication and influence. He saw how the Americans use travelling art exhibitions to win hearts and minds, and now he wants us to do the same.\n\nSo, the mission falls on you, junior officer: dig through the chaos in the City Hall Museum and Art Gallery warehouse, dust off some pieces, and assemble an exhibition fit for the Cold War stage. \n\nReady to get to work? Select wisely, and who knows—maybe you get a promotion!" ,
    
    // Geopolitical Intelligence text retained for Stage 1
    politicalBriefing: "The British Commonwealth territories in East and Southeast Asia are experiencing severe post-WWII political instability. Western influence is fragile, and anti-colonial movements are rising. Your objective is to foster regional harmony without provoking anti-Western backlash.",
    
    territories: ["Federation of Malaya", "Singapore", "British Borneo"],
    
    territoryInfo: {
      "Federation of Malaya": "1950s: Amid the Malayan Emergency, British authorities and local elites navigate intense anti-communist insurgencies and rising independence demands.",
      "Singapore": "1950s: A vital British crown colony and naval hub experiencing student activism, trade union strikes, and rapid political awakening.",
      "British Borneo": "1950s: Encompassing Sarawak, North Borneo, and Brunei, these territories remain under British colonial administration amidst post-war restructuring."
    },

    // Tour 1 Risks: art103 and art106
    artRoster: Array.from({ length: 10 }, (_, i) => {
      const artId = 101 + i;
      const isRisk = artId === 103 || artId === 106;
      const letter = getAlphaLabel(i); // A to J
      return {
        id: artId,
        name: `Artwork ${letter}`,
        author: `Artist ${letter}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Linked to Chinese mainland communist political movements." 
          : "Standard exhibition piece approved by Ministry censors."
      };
    })
  },

  tour2: {
    title: "Tour II: Late 50s–Late 60s",
    minSelection: 10,
    maxSelection: 15,
    
    // Narrative displayed upon SUCCESS of Tour 1
    successMessage: "Ms./Mr. Curator! Outstanding work on the first show and congrats on your promotion, Senior Officer. You made us look brilliant! \n\nOur new Governor, Sir David C. C. Trench, has arrived. As Cold War tensions rise, he's keen to project image, influence, and Western stability. He wants another blockbuster exhibition, and he wants it yesterday.\n\nYour mission: return to the City Hall Art Gallery and Museum warehouse, select our finest pieces, and curate an exhibition that shows the world Hong Kong is the cultural capital of Asia. Good luck!",
    
    // Geopolitical Intelligence text retained for Stage 1
    politicalBriefing: "The 'Free World' network is expanding rapidly across East Asia. Diplomatic stakes are high as the US and its allies seek to build soft power against the communist bloc. Carefully balance national pride and regional sensitivities.",
    
    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "South Vietnam", "Singapore", "Malaya", "Indonesia"],
    
    territoryInfo: {
      "Japan": "1960s: Experiencing an unprecedented economic miracle while serving as a crucial diplomatic anchor for regional strategies.",
      "Taiwan": "1960s: Under martial law, functioning as a primary nexus for the Kuomintang cultural diplomacy.",
      "Philippines": "1960s: A regional state balancing close diplomatic alignment with Washington against growing domestic movements.",
      "Thailand": "1960s: Frontline state in regional defence strategies, receiving substantial development aid.",
      "South Vietnam": "1960s: Marked by intense political turmoil and escalating conflict, making cultural engagements highly delicate.",
      "Singapore": "1960s: Rapidly transitioning towards full independence while managing complex ethnic and ideological tensions.",
      "Malaya": "1960s: Following independence in 1957, actively defining its regional identity prior to the formation of Malaysia.",
      "Indonesia": "1960s: Navigating high-stakes diplomacy under Sukarno before major political realignments."
    },

    // Tour 2 Risks: art206, art212, and art215
    artRoster: Array.from({ length: 15 }, (_, i) => {
      const artId = 201 + i;
      const isRisk = artId === 206 || artId === 212 || artId === 215;
      const letter = getAlphaLabel(10 + i); // K to Y
      return {
        id: artId,
        name: `Artwork ${letter}`,
        author: `Artist ${letter}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Artist relations with communist China" 
          : "Standard exhibition piece approved by Ministry censors."
      };
    })
  },

  tour3: {
    title: "Tour III: Late 1980s",
    minSelection: 15,
    maxSelection: 20,
    
    // Narrative displayed upon SUCCESS of Tour 2
    successMessage: "Ms./Mr. Curator, look at the news! History is happening right outside our window; the Berlin Wall has fallen! \n\nGovernor Sir David Wilson sees this as a crucial turning point, and he needs us to show the world that Hong Kong is ready for the 1990s and beyond.\n\nYour objective: enter the Hong Kong Museum of Art warehouse, select pieces that celebrate global exchange and local heritage, and build an exhibition fit for a changing world. Let's show them what you've got, Assistant Director ;) !",
    
    // Geopolitical Intelligence text retained for Stage 1
    politicalBriefing: "The late Cold War era presents a complex geopolitical landscape. Glasnost is reshaping global politics, but regional proxy tensions remain tense.",
    
    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "Vietnam", "Singapore", "Malaya", "Indonesia", "Myanmar"],
    
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

    // Tour 3 Risks: art302, art305, and art309
    artRoster: Array.from({ length: 20 }, (_, i) => {
      const artId = 301 + i;
      const isRisk = artId === 302 || artId === 305 || artId === 309;
      const letter = getAlphaLabel(25 + i); // Z, AA, AB ... SS
      return {
        id: artId,
        name: `Artwork ${letter}`,
        author: `Artist ${letter}`,
        risk: isRisk,
        detail: isRisk 
          ? "SENSITIVE: Subversive artwork funded by dissident groups/ or critical of established regimes" 
          : "Harmonious cultural diplomacy selection."
      };
    })
  }
};

// 2. STATE MANAGEMENT
let currentTour = 1;
let selectedArtworks = [];
let activeTerritory = null;

// 3. DOM ELEMENTS
const screens = {
  intro: document.getElementById('screen-intro'),
  about: document.getElementById('screen-about'),
  stage1: document.getElementById('screen-stage1-briefing'),
  stage2: document.getElementById('screen-stage2-territories'),
  stage3: document.getElementById('screen-stage3-selection'),
  result: document.getElementById('screen-result'),
  nextMission: document.getElementById('screen-next-mission')
};

const badges = {
  tour1: document.getElementById('badge-tour1'),
  tour2: document.getElementById('badge-tour2'),
  tour3: document.getElementById('badge-tour3')
};

// 4. HELPER FUNCTIONS
function showScreen(screenKey) {
  // Hide all screens
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('hidden');
  });

  // Only show "About the Game" when we are on the initial intro page
  if (screenKey === 'intro') {
    if (screens.intro) screens.intro.classList.remove('hidden');
    if (screens.about) screens.about.classList.remove('hidden');
  } else {
    if (screens[screenKey]) {
      screens[screenKey].classList.remove('hidden');
    }
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

// Initial Game Start: Single Welcome Screen (Tour 1 Only)
function startTour() {
  currentTour = 1;
  selectedArtworks = [];
  activeTerritory = null;
  updateTourBadges();

  const titleInput = document.getElementById('exhibition-title');
  const descInput = document.getElementById('exhibition-desc');
  if (titleInput) titleInput.value = '';
  if (descInput) descInput.value = '';

  // Populate Sir Alexander Grantham narrative on the initial welcome screen
  const introParagraph = screens.intro ? screens.intro.querySelector('p') : null;
  if (introParagraph && gameData.tour1.welcomeStory) {
    introParagraph.innerText = gameData.tour1.welcomeStory;
  }

  showScreen('intro');
}

// Stage 1: Geopolitical Intelligence Briefing
function loadStage1() {
  const config = gameData[getTourKey()];
  const briefingText = document.getElementById('political-briefing-text');
  if (briefingText && config) {
    briefingText.innerText = config.politicalBriefing;
  }
  showScreen('stage1');
}

// Stage 2: Visiting Territories
function loadStage2() {
  const config = gameData[getTourKey()];
  const territoryList = document.getElementById('visiting-territories-list');
  
  activeTerritory = null;

  if (territoryList && config && config.territories) {
    territoryList.innerHTML = '';
    
    config.territories.forEach(territory => {
      const li = document.createElement('li');
      li.className = 'territory-item';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'territory-title';
      titleSpan.innerText = territory;

      const subBox = document.createElement('div');
      subBox.className = 'territory-subbox hidden';
      
      const contextText = (config.territoryInfo && config.territoryInfo[territory]) 
        ? config.territoryInfo[territory] 
        : `${territory}: Briefing context pending for this era.`;
        
      subBox.innerHTML = `<strong>${territory}</strong> — ${contextText}`;

      li.appendChild(titleSpan);
      li.appendChild(subBox);

      titleSpan.addEventListener('click', () => toggleTerritoryInfo(territory, li));
      
      territoryList.appendChild(li);
    });
  }

  showScreen('stage2');
}

function toggleTerritoryInfo(territoryName, clickedLi) {
  const allItems = document.querySelectorAll('.territory-item');
  const currentSubBox = clickedLi.querySelector('.territory-subbox');

  if (activeTerritory === territoryName) {
    activeTerritory = null;
    clickedLi.classList.remove('active');
    if (currentSubBox) currentSubBox.classList.add('hidden');
    return;
  }

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

// Stage 3: Artwork Selection
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
        <div style="height:150px; width:100%; overflow:hidden; border-radius:4px; display:flex; align-items:center; justify-content:center; background:#050505; margin-bottom:6px;">
          <img src="images/art${art.id}.jpg" alt="art${art.id}.jpg" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/150?text=art${art.id}.jpg';">
        </div>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); opacity:0.85; margin-top:2px;">art${art.id}.jpg</span>
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

// 6. EVALUATION & TWO-STEP SUCCESS FLOW

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
    // FAILURE: REVEALS TRIGGERING PIECE DETAILS
    if (resultCard) resultCard.className = "result-card failure";
    if (resultTitle) resultTitle.innerText = "DIPLOMATIC INCIDENT TRIGGERED";
    if (resultMsg) resultMsg.innerText = "A political blockade was declared! The exhibition has been canceled.";

    if (revealBox) {
      revealBox.innerHTML = `
        <strong style="color:var(--accent-red, #ff5555);">Incident Cause:</strong><br>
        <strong>${failingPiece.name}</strong> (File: art${failingPiece.id}.jpg)<br>
        <em>${failingPiece.detail}</em><br><br>
        <small>* All other selected pieces remain classified.</small>
      `;
    }

    if (actionBtn) {
      actionBtn.innerText = "Restart from Tour I";
      actionBtn.onclick = () => {
        startTour();
      };
    }

  } else {
    // SUCCESS STEP 1: Show nice celebratory message
    if (currentTour < 3) {
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = `✨ TOUR ${currentTour} SUCCESSFUL ✨`;
      
      if (resultMsg) {
        resultMsg.innerText = "🎉 Fantastic job, Curator! Your exhibition was warmly received, smoothly navigating regional diplomacy without a single incident!";
      }

      if (revealBox) revealBox.innerHTML = `<em>* Artwork details remain confidential until final victory.</em>`;

      if (actionBtn) {
        actionBtn.innerText = "Continue to Next Mission";
        actionBtn.onclick = () => {
          showNextMissionStory(); // Proceeds to Step 2 (News & Story transition)
        };
      }
    } else {
      // TOUR 3 FINAL SUCCESS: PROMOTION TO DIRECTOR
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = "PROMOTED TO DIRECTOR!";
      if (resultMsg) {
        resultMsg.innerText = "Word from Government House is in: all three of your exhibitions were absolute triumphs on the world stage. You navigated the Cold War divide with pure strategy.\n\nThanks to the massive success of your three international exhibitions, you've just been appointed Director of the Hong Kong Museum of Art.\n\nGrab your keys we're moving you into the main office in the brand-new Tsim Sha Tsui building. You ran the cultural diplomacy game, and you won!";
      }

      // FINAL VICTORY GALLERY: UNLOCKS ALL THUMBNAILS, TITLES & DETAILS
      let fullRevealHTML = `
        <h3 style="margin-bottom:12px; color:var(--cathay-teal, #008080);">Master Collection Unlocked</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:12px; max-height:280px; overflow-y:auto; padding-right:8px; text-align:left;">
      `;

      selectedArtworks.forEach(art => {
        fullRevealHTML += `
          <div style="background:#111; border:1px solid #333; border-radius:6px; padding:8px; text-align:center;">
            <div style="height:100px; overflow:hidden; border-radius:4px; margin-bottom:6px; background:#000; display:flex; align-items:center; justify-content:center;">
              <img src="images/art${art.id}.jpg" alt="art${art.id}.jpg" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/100?text=art${art.id}.jpg';">
            </div>
            <strong style="display:block; font-size:0.85em; color:#fff; margin-bottom:2px;">${art.name}</strong>
            <span style="display:block; font-size:0.75em; color:#00a896; margin-bottom:4px; font-style:italic;">art${art.id}.jpg</span>
            <span style="display:block; font-size:0.7em; color:#aaa; line-height:1.2;">${art.detail}</span>
          </div>
        `;
      });

      fullRevealHTML += `</div>`;

      if (revealBox) revealBox.innerHTML = fullRevealHTML;

      if (actionBtn) {
        actionBtn.innerText = "Play Again";
        actionBtn.onclick = () => {
          startTour();
        };
      }
    }
  }

  showScreen('result');
}

// SUCCESS STEP 2: Dedicated slide for the incoming news & story narrative
function showNextMissionStory() {
  currentTour++;
  selectedArtworks = [];
  activeTerritory = null;
  updateTourBadges();

  const nextTourKey = getTourKey();
  const nextConfig = gameData[nextTourKey];

  const missionTitle = document.getElementById('mission-title');
  const missionStory = document.getElementById('mission-story-text');
  const startNextBtn = document.getElementById('btn-start-next-stage1');

  if (missionTitle) missionTitle.innerText = `Incoming Mission — Tour ${currentTour}`;
  if (missionStory && nextConfig) {
    missionStory.innerText = nextConfig.successMessage;
  }

  if (startNextBtn) {
    startNextBtn.onclick = () => {
      loadStage1(); // Smoothly advances to Stage 1 of the new tour
    };
  }

  showScreen('nextMission');
}

// 7. EVENT LISTENERS
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