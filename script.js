/* ==========================================================================
   Dramatic Diplomacy — Game Logic (script.js)
   ========================================================================== */

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
    
    welcomeStory: "Welcome to the Urban Council—where we manage everything from public amenities to high culture. Ready to make history, or at least curate it?\n\nOur Colonial Administrator, Sir Alexander Grantham, wants to improve Hong Kong's international communication and influence. He saw how the Americans use travelling art exhibitions to win hearts and minds, and now he wants us to do the same.\n\nSo, the mission falls on you, junior curator: dig through the chaos in the City Hall Museum and Art Gallery warehouse, dust off some pieces, and assemble an exhibition fit for the Cold War stage.",
    
    politicalBriefing: "The British Commonwealth territories in East and Southeast Asia are experiencing severe post-WWII political instability. Western influence is fragile, and anti-colonial movements are rising. Your objective is to foster regional harmony while avoiding anti-Western backlash.",
    
    territories: ["Federation of Malaya", "Singapore", "British Borneo"],
    
    territoryInfo: {
      "Federation of Malaya": "1950s: Amid the Malayan Emergency, British authorities and local elites navigate intense anti-communist insurgencies and rising calls for independence.",
      "Singapore": "1950s: A vital British colony and naval hub experiencing student activism, trade union strikes, and rapid political awakening.",
      "British Borneo": "1950s: Encompassing Sarawak, North Borneo, and Brunei, these territories remain under British colonial administration amidst post-war restructuring."
    },

    // --- TOUR I ARTWORKS (101 - 110) ---
    artRoster: [
      { id: 101, title: "Peony", author: "Pau Shiu Yao ", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 102, title: "Sun Flower", author: "Chao Shao-An", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 103, title: "The Founding Ceremony of the Nation", author: "Dong Xiwen", year: "1952", risk: true, incidentReason: "Contains political iconography linked to Chinese Mainland Communist propaganda.", detail: "SENSITIVE: Linked to Chinese mainland communist political movements." },
      { id: 104, title: "Ruined Church of St. Paul", author: "Lui Shau-Kwan ", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 105, title: "Lotus", author: "Chow Chian Chiu", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 106, title: "The Sumit of the Tatry Mountains", author: "Fu Baoshi", year: "1957", risk: true, incidentReason: "Artist recently signed anti-colonial manifesto triggering administrative ban.", detail: "SENSITIVE: Linked to Chinese mainland communist political movements." },
      { id: 107, title: "Landscape", author: "Lee Yin Shan", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 108, title: "View of “Alhi Hill", author: "Lam Kin Tung ", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 109, title: "View of Phoenix Peak ", author: "Wong Poon Yurk", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 110, title: "The King of the Forest", author: "Woo Yu Kee", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." }
    ]
  },

  tour2: {
    title: "Tour II: Late 50s–Late 60s",
    minSelection: 10,
    maxSelection: 15,
    
    successMessage: "Outstanding work on the first show and congrats on your promotion, Senior Curator. You made us look brilliant! \n\nOur new Governor, Sir David C. C. Trench, has arrived. As Cold War tensions rise, he's keen to project prestige and power. He wants another blockbuster exhibition, and he wants it yesterday.\n\nYour mission: return to the City Hall Art Gallery and Museum warehouse, select our finest pieces, and curate an exhibition that shows the world Hong Kong is the cultural capital of Asia. Good luck!",

    politicalBriefing: "The 'Free World' network is expanding rapidly across East and Southeast Asia. Diplomatic stakes are high as the US and its allies seek to expand their soft power strategy against the communist bloc. Carefully balance national pride and regional sensitivities.",

    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "South Vietnam", "Singapore", "Malaya", "Indonesia"],
    
    territoryInfo: {
      "Japan": "1960s: Experiencing an unprecedented economic miracle while serving as a crucial diplomatic anchor for US regional strategies.",
      "Taiwan": "1960s: Under martial law, they aimed to retake the Chinese mainland, hoping for a war that would drag the US in with them.",
      "Philippines": "1960s: A regional state balancing close diplomatic alignment with the US against communist sympathies.",
      "Thailand": "1960s: Frontline state in regional defence strategies, receiving substantial development aid.",
      "South Vietnam": "1960s: Marked by intense political turmoil and an escalating civil war, making cultural engagements highly delicate.",
      "Singapore": "1960s: Rapidly transitioning towards full independence while managing complex ethnic and ideological tensions.",
      "Malaysia": "1960s: Securing its national sovereignty against ongoing communist insurgencies following independence in 1957.",
      "Indonesia": "Integrating communism into state ideology under Sukarno’s 'Nasakom' before the 1965 political transition and anti-communist realignments."
    },

    // --- TOUR II ARTWORKS (201 - 215) ---
    artRoster: [
      { id: 201, title: " What is Inside? ", author: "King Chia-lun", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 202, title: "Stoat", author: "Griffith M.F.", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 203, title: "Lock III", author: "Yu Jac-son", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 204, title: "Flower Enigma", author: "Hon Chi-Fun", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 205, title: "Faly-in ", author: "Leung Kui Ting", year: "1970", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 206, title: "Sketches: Moving to Fight in Shanbei", author: "Shi Lu", year: "1965", risk: true, incidentReason: "Work contains provocative commentary on cross-strait political divides.", detail: "SENSITIVE: Artist relations with communist China" },
      { id: 207, title: "Landscape II", author: "Kwong Yeu-Ting", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 208, title: "Magic Square", author: "Cheung Yee", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 209, title: "Mai Xie", author: "Wucius Wong", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 210, title: "Third View", author: "Zie Alan Yongder", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 211, title: "Conglomeration", author: "Wucius Wong", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 212, title: "Chairman Mao talking to farmers in a spring landscape", author: "Hongcai Zhou", year: "1964", risk: true, incidentReason: "Artist publicly associated with Leftist trade union boycotts.", detail: "SENSITIVE: Artist relations with communist China" },
      { id: 213, title: "Mountain Solitude", author: "Kwong Yeu Ting", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 214, title: "Monolith", author: "Cheung Ye", year: "N/A", risk: false, incidentReason: "", detail: "Standard exhibition piece approved by Ministry censors." },
      { id: 215, title: "In Praise of the Himalayas", author: "Dong Xiwen", year: "1963", risk: true, incidentReason: "Visual symbolism triggered diplomatic protests from regional embassy allies.", detail: "SENSITIVE: Artist relations with communist China" }
    ]
  },

  tour3: {
    title: "Tour III: Late 1980s",
    minSelection: 15,
    maxSelection: 20,
    
    successMessage: "Assistant Director! Look at the news! History is happening right now; the Berlin Wall has fallen! \n\nGovernor Sir David Wilson sees this as a crucial turning point, and he needs us to show the world that Hong Kong is ready for the 1990s and beyond.\n\nYour objective: enter the Hong Kong Museum of Art warehouse, select pieces that celebrate global exchange and local heritage, and build an exhibition fit for a changing world. Let's show them what you've got!",
    
    politicalBriefing: "The late Cold War era presents a complex geopolitical landscape. Glasnost is reshaping global politics, but regional proxy tensions remain tense.",
    
    territories: ["Japan", "Taiwan", "Philippines", "Thailand", "Vietnam", "Singapore", "Malaya", "Indonesia", "Myanmar"],
    
    territoryInfo: {
      "Japan": "1980s: Global economic power hosting major international art exchanges.",
      "Taiwan": "1980s: Transitioning out of martial law and expanding soft-power initiatives globally.",
      "Philippines": "1980s: Post-People Power Revolution era rebuilding democratic institutions and cultural ties.",
      "Thailand": "1980s: Rapidly expanding economy serving as a new tourist hotspot in Southeast Asia.",
      "Vietnam": "1980s: Entering an economic reform period, gradually seeking regional normalisation.",
      "Singapore": "1980s: Established a global trade hub, trying to position itself as a regional arts centre.",
      "Malaya": "1980s: Driving regional economic and cultural cooperation.",
      "Indonesia": "1980s: Playing a leading role in regional stability and ASEAN integration.",
      "Myanmar": "1980s: Operating under rigid governance with limited cultural communication."
    },

    // --- TOUR III ARTWORKS (301 - 320) ---
    artRoster: [
      { id: 301, title: "ENTER TITLE HERE", author: " Liu Kuo-sung", year: "1977", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 302, title: "Last Supper", author: "Warhol", year: "1986", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 303, title: "The Way of Lotus", author: "Hong Chi Fun", year: "1974", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 304, title: "Dragon Seed", author: "Bland Douglas", year: "1983", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 305, title: "Silence", author: "Wang Keping", year: "1979", risk: true, incidentReason: "Exhibition provoked formal protest from state cultural ministers.", detail: "SENSITIVE: Subversive artwork by dissident artist." },
      { id: 306, title: "Petit Granite", author: "Lai Chi-Man", year: "1985", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 307, title: "Anatomy of a Trunk", author: "Cavalcanti Dirce", year: "1986", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 308, title: "Tiger", author: "Yang Shen-Sum", year: "1973", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 309, title: "Bagong Kristo", author: "Pablo Baens Santos", year: "1980", risk: true, incidentReason: "Artist linked to illegal underground publication networks.", detail: "SENSITIVE: Subversive artwork" },
      { id: 310, title: "Xiao Lisheng", author: "Luohan", year: "1973", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 311, title: "Lift Off", author: "Ko Wah-Man", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 312, title: "Explorer", author: "Ha Bik-Cheun", year: "1973", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 313, title: "Just A Stroke", author: "Tan Teng-Kee", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 314, title: "Origin of Life ", author: "Ha Bik-Cheun", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 315, title: "Floating", author: "Chou Hou-San", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 316, title: "Yellow Earth", author: "Fang Chao-Ling", year: "1985", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 317, title: "Goat Head ", author: "Bland Douglas", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 318, title: "Chuang Tzu ", author: "Lui Shou Kwan", year: "1984", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 319, title: "Two Persons", author: "Ng Wing-Yu", year: "N/A", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." },
      { id: 320, title: "Serenity", author: "Chui Tze-hung", year: "1984", risk: false, incidentReason: "", detail: "Harmonious cultural diplomacy selection." }
    ]
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
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.add('hidden');
  });

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

function startTour() {
  currentTour = 1;
  selectedArtworks = [];
  activeTerritory = null;
  updateTourBadges();

  const titleInput = document.getElementById('exhibition-title');
  const descInput = document.getElementById('exhibition-desc');
  if (titleInput) titleInput.value = '';
  if (descInput) descInput.value = '';

  const introParagraph = screens.intro ? screens.intro.querySelector('p') : null;
  if (introParagraph && gameData.tour1.welcomeStory) {
    introParagraph.innerText = gameData.tour1.welcomeStory;
  }

  showScreen('intro');
}

function loadStage1() {
  const config = gameData[getTourKey()];
  const briefingText = document.getElementById('political-briefing-text');

  const titleInput = document.getElementById('exhibition-title');
  const descInput = document.getElementById('exhibition-desc');
  if (titleInput) titleInput.value = '';
  if (descInput) descInput.value = '';

  if (briefingText && config) {
    briefingText.innerText = config.politicalBriefing;
  }
  showScreen('stage1');
}

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

// Stage 3: Selection (STRICTLY HIDDEN ARTWORK METADATA)
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

      // HIDDEN MODE: Only displays the thumbnail image and the basic filename label
      card.innerHTML = `
        <div style="height:150px; width:100%; overflow:hidden; border-radius:4px; display:flex; align-items:center; justify-content:center; background:#050505; margin-bottom:6px;">
          <img src="images/art${art.id}.jpg" alt="art${art.id}.jpg" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/150?text=art${art.id}.jpg';">
        </div>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); opacity:0.85; margin-top:2px; display:block; text-align:center;">art${art.id}.jpg</span>
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

// 6. EVALUATION & REVEAL LOGIC

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
    // ------------------------------------------------------------------
    // DIPLOMATIC INCIDENT (LOSS CONDITION)
    // REVEALS ONLY THE TRIGGERING SENSITIVE ARTWORK
    // ------------------------------------------------------------------
    if (resultCard) resultCard.className = "result-card failure";
    if (resultTitle) resultTitle.innerText = "🚨 DIPLOMATIC INCIDENT TRIGGERED";
    if (resultMsg) resultMsg.innerText = "A political blockade was declared! The exhibition has been cancelled.";

    if (revealBox) {
      revealBox.innerHTML = `
        <div style="border: 2px solid #ff5555; background: rgba(255, 85, 85, 0.1); padding: 15px; border-radius: 6px; text-align: center; margin-top: 10px;">
          <div style="height: 180px; width: 100%; overflow: hidden; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; background: #000; border-radius: 4px;">
            <img src="images/art${failingPiece.id}.jpg" alt="art${failingPiece.id}.jpg" style="max-height: 100%; max-width: 100%; object-fit: contain;" onerror="this.src='https://via.placeholder.com/180?text=art${failingPiece.id}.jpg';">
          </div>
          <h3 style="color: #ff5555; margin-bottom: 6px;"><em>"${failingPiece.title}"</em></h3>
          <p style="margin: 4px 0; color: #fff;"><strong>Artist / Author:</strong> ${failingPiece.author}</p>
          <p style="margin: 4px 0; color: #aaa;"><strong>Year:</strong> ${failingPiece.year} &nbsp;|&nbsp; <strong>File:</strong> art${failingPiece.id}.jpg</p>
          <p style="color: #ff7777; margin-top: 12px; font-weight: bold;">
            <strong>Incident Cause:</strong> ${failingPiece.incidentReason}
          </p>
        </div>
      `;
    }

    if (actionBtn) {
      actionBtn.innerText = "Restart from Tour I";
      actionBtn.onclick = () => {
        startTour();
      };
    }

  } else {
    if (currentTour < 3) {
      // ------------------------------------------------------------------
      // SUCCESS MID-TOUR (STRICTLY HIDDEN DETAILS)
      // ------------------------------------------------------------------
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = `✨ TOUR ${currentTour} SUCCESSFUL ✨`;
      
      if (resultMsg) {
        resultMsg.innerText = "Fantastic job, Curator! Your exhibition was warmly received, smoothly navigating regional diplomacy without a single incident!";
      }

      if (revealBox) revealBox.innerHTML = `<em>* Artwork details remain confidential until final victory.</em>`;

      if (actionBtn) {
        actionBtn.innerText = "Continue to Next Mission";
        actionBtn.onclick = () => {
          showNextMissionStory();
        };
      }
    } else {
      // ------------------------------------------------------------------
      // TOUR 3 FINAL SUCCESS (FINAL VICTORY)
      // REVEALS ALL SELECTED ARTWORKS WITH TITLES, AUTHORS & YEARS
      // ------------------------------------------------------------------
      if (resultCard) resultCard.className = "result-card success";
      if (resultTitle) resultTitle.innerText = "PROMOTED TO DIRECTOR!";
      if (resultMsg) {
        resultMsg.innerText = "Word from Government House is in: all three of your exhibitions were absolute triumphs on the world stage. You navigated the Cold War divide with pure strategy.\n\nThanks to the massive success of your three international exhibitions, you've just been appointed Director of the Hong Kong Museum of Art.\n\nGrab your keys—we're moving you into the main office in the brand-new Tsim Sha Tsui building!";
      }

      let fullRevealHTML = `
        <h3 style="margin-bottom:12px; color:var(--cathay-teal, #008080);">Master Exhibition Catalogue</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap:12px; max-height:300px; overflow-y:auto; padding-right:8px; text-align:left;">
      `;

      selectedArtworks.forEach(art => {
        fullRevealHTML += `
          <div style="background:#111; border:1px solid #333; border-radius:6px; padding:10px; text-align:center;">
            <div style="height:100px; overflow:hidden; border-radius:4px; margin-bottom:6px; background:#000; display:flex; align-items:center; justify-content:center;">
              <img src="images/art${art.id}.jpg" alt="art${art.id}.jpg" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/100?text=art${art.id}.jpg';">
            </div>
            <strong style="display:block; font-size:0.85em; color:#fff; margin-bottom:2px;">"${art.title}"</strong>
            <span style="display:block; font-size:0.75em; color:#00a896;"><strong>Artist:</strong> ${art.author}</span>
            <span style="display:block; font-size:0.7em; color:#aaa;"><strong>Year:</strong> ${art.year}</span>
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
      loadStage1();
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