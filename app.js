const storageKey = "chapterforge-project-v1";
const libraryKey = "chapterforge-library-v1";
const minAudiobookSeconds = 60;
const maxAudiobookSeconds = 20 * 60 * 60;
const narrationWordsPerMinute = 155;
const wordsPerPage = 275;
const minPlannedPages = 10;
const maxPlannedPages = 500;
const popularLanguages = ["English", "Mandarin Chinese", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Portuguese", "Indonesian", "Urdu"];

const sampleManuscript = `Chapter 1: The Locked Library
NARRATOR: Rain tapped against the glass roof of the old city library as Mara Voss slipped between the stacks.
MARA VOSS: If the map is real, it has to be behind the astronomy shelves.
CAPTAIN ROOK: Or behind the guard who is about to ask why we are here after midnight.
THE ARCHIVIST: The library does not mind visitors. It minds thieves.
NARRATOR: Mara froze. The voice came from everywhere at once, soft as turning pages.
MARA VOSS: We are not stealing. We are returning what belongs here.
THE ARCHIVIST: Then speak the title that opens the door.

Chapter 2: A Voice in the Margins
NARRATOR: The book in Mara's hand warmed like a cup of tea.
CAPTAIN ROOK: Books are not supposed to breathe.
MARA VOSS: Neither are maps, but this one keeps sighing at me.
THE ARCHIVIST: Every lost story wants to be read by the right voice.
NARRATOR: The shelves shifted, making a corridor where none had been.
CAPTAIN ROOK: I hate it when buildings have opinions.`;

const defaultLiveChat = {
  mystery_chapter: [
    { author: "Host", text: "Welcome in. We are reading the clue scene and taking voice notes live.", time: "Now" },
    { author: "Editor", text: "Track slider is synced to the current chapter target.", time: "Now" }
  ],
  fantasy_cast: [
    { author: "Host", text: "Full-cast fantasy table read is open. Pick a role and jump in.", time: "Now" },
    { author: "Narrator", text: "Listening for clean character separation and emotional pacing.", time: "Now" }
  ],
  sleep_story: [
    { author: "Host", text: "Soft room is live. Keep the chat calm and focused on relaxing narration.", time: "Now" }
  ],
  song_lab: [
    { author: "Host", text: "Drop a language or narration style and we will shape the audiobook draft.", time: "Now" }
  ],
  translation_booth: [
    { author: "Director", text: "Translation booth is checking character names, idioms, and chapter hooks.", time: "Now" }
  ]
};

const defaultState = {
  title: "The Glass Orchard",
  author: "Avery Stone",
  genre: "Fantasy",
  manuscript: sampleManuscript,
  activeChapterIndex: 0,
  activeTrackIndex: 0,
  activeRoomId: "mystery_chapter",
  enteredRoomId: "",
  theme: "noir",
  profileFocusId: "connor",
  profileXp: 0,
  coins: 0,
  liveCategory: "New",
  dailyLogin: {
    lastClaim: "",
    streak: 0
  },
  publishCarouselIndex: 0,
  messageTab: "requests",
  weirdness: 10,
  styleInfluence: 80,
  profile: {
    name: "Guest 4827",
    handle: "@guest4827",
    bio: "Guest audiobook creator.",
    mascot: "saint_hound",
    image: "",
    lastUsernameChange: ""
  },
  liveChat: defaultLiveChat,
  targetDurationSeconds: Math.ceil(((140 * wordsPerPage) / narrationWordsPerMinute) * 60),
  targetChapters: 12,
  targetPages: 140,
  planSections: "Part 1: Hook and setup\nPart 2: Rising conflict\nPart 3: Climax and resolution",
  planModelVersion: 1,
  connectedAccounts: {
    Audible: false,
    "Apple Books": false,
    Spotify: false,
    "Google Play": false,
    "Direct Store": true
  },
  narratorCredit: "ChapterForge Ensemble",
  releaseDate: "",
  format: "M4B audiobook",
  price: "Free",
  summary: "A character-driven fantasy audiobook about a hidden library, a living map, and the voices needed to unlock a lost city.",
  channels: ["Audible", "Apple Books", "Spotify", "Direct Store"],
  voiceMode: "openvoice",
  voiceUpgradeVersion: 3,
  audioQuality: "wav",
  mastering: "audiobook",
  targetLanguage: "English",
  ideaPrompt: "",
  excludedStyles: "",
  generationCount: 2,
  songStyle: "cinematic mystery narration",
  languageMode: "book",
  languageOutput: "",
  customVoiceName: "",
  activeOrganizationId: "root",
  organizationItems: [
    {
      id: "root",
      type: "workspace",
      name: "Workspace",
      children: [
        {
          id: "drafts",
          type: "workspace",
          name: "Drafts",
          children: [
            { id: "playlist-finished", type: "playlist", name: "Finished Products", children: [] }
          ]
        }
      ]
    }
  ],
  cast: {
    narrator: {
      id: "narrator",
      name: "Narrator",
      role: "Warm literary narrator",
      color: "#54b6a6",
      voiceURI: "",
      cloudVoice: "marin",
      rate: 0.92,
      pitch: 1
    },
    mara_voss: {
      id: "mara_voss",
      name: "Mara Voss",
      role: "Curious lead",
      color: "#d8a94c",
      voiceURI: "",
      cloudVoice: "coral",
      rate: 0.98,
      pitch: 1.08
    },
    captain_rook: {
      id: "captain_rook",
      name: "Captain Rook",
      role: "Dry-humored protector",
      color: "#b66a43",
      voiceURI: "",
      cloudVoice: "onyx",
      rate: 0.9,
      pitch: 0.86
    },
    the_archivist: {
      id: "the_archivist",
      name: "The Archivist",
      role: "Mysterious keeper",
      color: "#9e6fa6",
      voiceURI: "",
      cloudVoice: "cedar",
      rate: 0.82,
      pitch: 0.72
    }
  }
};

const accentColors = ["#54b6a6", "#d8a94c", "#b66a43", "#9e6fa6", "#86a8e7", "#e06c75", "#8ec07c"];
const hdVoices = ["marin", "cedar", "coral", "onyx", "verse", "alloy", "ash", "ballad", "sage", "shimmer", "nova", "echo", "fable"];
const mascotOptions = [
  ["saint_hound", "Saint Hound", "hound"], ["ember_wolf", "Ember Wolf", "wolf"], ["royal_lion", "Royal Lion", "lion"], ["storm_eagle", "Storm Eagle", "eagle"],
  ["forest_owl", "Forest Owl", "owl"], ["neon_tiger", "Neon Tiger", "tiger"], ["ice_panther", "Ice Panther", "panther"], ["ruby_dragon", "Ruby Dragon", "dragon"],
  ["solar_ram", "Solar Ram", "ram"], ["jade_serpent", "Jade Serpent", "serpent"], ["rose_stag", "Rose Stag", "stag"], ["iron_raven", "Iron Raven", "raven"],
  ["aqua_shark", "Aqua Shark", "shark"], ["bronze_lynx", "Bronze Lynx", "lynx"], ["opal_horse", "Opal Horse", "horse"], ["cobalt_bull", "Cobalt Bull", "bull"],
  ["gold_bear", "Gold Bear", "bear"], ["violet_fox", "Violet Fox", "fox"], ["silver_falcon", "Silver Falcon", "falcon"], ["plum_bison", "Plum Bison", "bison"],
  ["green_flame", "Green Flame", "phoenix"], ["purple_orbit", "Purple Orbit", "manta"], ["white_star", "White Star", "unicorn"], ["yellow_bolt", "Yellow Bolt", "cheetah"],
  ["blue_anchor", "Blue Anchor", "whale"], ["red_shield", "Red Shield", "rhino"], ["black_knight", "Black Knight", "bat"], ["cream_falcon", "Cream Falcon", "hawk"],
  ["teal_turtle", "Teal Turtle", "turtle"], ["amber_mouse", "Amber Mouse", "mouse"], ["midnight_otter", "Midnight Otter", "otter"], ["gold_crown", "Gold Crown", "griffin"],
  ["coral_crab", "Coral Crab", "crab"], ["indigo_elephant", "Indigo Elephant", "elephant"], ["lime_gecko", "Lime Gecko", "gecko"]
].map(([id, name, animal], index) => ({ id, name, animal, hue: (index * 31 + 206) % 360, altHue: (index * 47 + 38) % 360 }));
const roomCategories = ["New", "Popular", "Oldest / Longest"];
const audiobookCatalog = buildAudiobookCatalog(360);
const liveRooms = [
  {
    id: "mystery_chapter",
    title: "Mystery Chapter Room",
    host: "Mara Voss",
    status: "Available",
    listeners: 128,
    accent: "#54b6a6",
    gradient: "linear-gradient(145deg, #111a1d 0%, #33545a 45%, #111112 100%)",
    description: "Live clue read-through with timed pauses, character marks, and chapter pacing."
  },
  {
    id: "fantasy_cast",
    title: "Fantasy Cast Room",
    host: "Ensemble Booth",
    status: "Available",
    listeners: 94,
    accent: "#d8a94c",
    gradient: "linear-gradient(145deg, #24140f 0%, #8a6540 42%, #15120f 100%)",
    description: "Side-by-side character auditions for narrator, hero, protector, and keeper voices."
  },
  {
    id: "sleep_story",
    title: "Sleep Story Live",
    host: "Quiet Narrator",
    status: "Live",
    listeners: 211,
    accent: "#86a8e7",
    gradient: "linear-gradient(145deg, #101724 0%, #314767 48%, #0e1118 100%)",
    description: "Slow audiobook delivery, softer mastering, and calm listener chat."
  },
  {
    id: "song_lab",
    title: "Book Lab",
    host: "Draft Room",
    status: "Available",
    listeners: 76,
    accent: "#e06c75",
    gradient: "linear-gradient(145deg, #211317 0%, #7d3d53 46%, #131113 100%)",
    description: "Generate narration styles and language variants for your audiobook release."
  },
  {
    id: "translation_booth",
    title: "Translation Booth",
    host: "Localization Desk",
    status: "Live",
    listeners: 156,
    accent: "#9e6fa6",
    gradient: "linear-gradient(145deg, #1a1420 0%, #604970 48%, #111114 100%)",
    description: "Live translation review for dialogue, idioms, and multilingual narration."
  }
];
const otherSiteTargets = [
  { name: "Audible", status: "Metadata ready", format: "M4B + ACX notes", accent: "#d8a94c" },
  { name: "Apple Books", status: "Store package", format: "M4B + cover + free listing", accent: "#54b6a6" },
  { name: "Spotify", status: "Streaming package", format: "Chapter MP3 + RSS fields", accent: "#8ec07c" },
  { name: "Google Play", status: "Retail checklist", format: "EPUB companion + audio", accent: "#86a8e7" },
  { name: "Kobo", status: "Partner export", format: "ONIX metadata + M4B", accent: "#9e6fa6" },
  { name: "YouTube Music", status: "Audio episodes", format: "Chapter videos + captions", accent: "#e06c75" }
];
const publishTargets = [
  { name: "Audible", account: "ACX / Audible", accent: "#d8a94c", connectUrl: "https://www.acx.com/" },
  { name: "Apple Books", account: "Apple Books Connect", accent: "#54b6a6", connectUrl: "https://authors.apple.com/" },
  { name: "Spotify", account: "Spotify for Creators", accent: "#8ec07c", connectUrl: "https://creators.spotify.com/" },
  { name: "Google Play", account: "Google Play Books", accent: "#86a8e7", connectUrl: "https://play.google.com/books/publish/" },
  { name: "Direct Store", account: "SAGA Direct", accent: "#9e6fa6", connectUrl: "" }
];
const themeOptions = [
  { id: "noir", name: "Noir Grid", accent: "#54b6a6", cost: 0 },
  { id: "waveform", name: "Waveform", accent: "#d8a94c", cost: 0 },
  { id: "manuscript", name: "Manuscript", accent: "#86a8e7", cost: 0 },
  { id: "stage", name: "Stage Lights", accent: "#e06c75", cost: 100 },
  { id: "ember", name: "Ember", accent: "#e06c75", cost: 200 },
  { id: "forest", name: "Forest", accent: "#8ec07c", cost: 400 },
  { id: "ocean", name: "Ocean", accent: "#54b6a6", cost: 800 },
  { id: "violet", name: "Violet", accent: "#9e6fa6", cost: 1600 },
  { id: "solar", name: "Solar", accent: "#f5ca5e", cost: 3200 },
  { id: "obsidian", name: "Obsidian", accent: "#86a8e7", cost: 6400 }
];
const profilePeople = {
  connor: {
    id: "connor",
    name: "Guest 4827",
    handle: "@guest4827",
    role: "Guest Creator",
    bio: "Guest audiobook creator.",
    avatar: "G"
  },
  aria: {
    id: "aria",
    name: "Aria Vale",
    handle: "@ariavale",
    role: "Narration Director",
    bio: "Builds character casts for serialized audio.",
    avatar: "AV"
  },
  malik: {
    id: "malik",
    name: "Malik Stone",
    handle: "@malikstone",
    role: "Sound Designer",
    bio: "Scores chapter openings and live room themes.",
    avatar: "MS"
  },
  june: {
    id: "june",
    name: "June Park",
    handle: "@junepark",
    role: "Publisher",
    bio: "Packages audiobooks for retail and direct release.",
    avatar: "JP"
  },
  nico: {
    id: "nico",
    name: "Nico Hart",
    handle: "@nicohart",
    role: "Live Host",
    bio: "Runs listener rooms and launch-night readings.",
    avatar: "NH"
  }
};
const profileNetwork = {
  posts: ["current_book", "live_room"],
  followers: ["aria", "malik", "june"],
  friends: ["aria", "nico"]
};

function buildAudiobookCatalog(count) {
  const genres = ["Mystery", "Fantasy", "Sleep", "Sci-Fi", "Romance", "History", "Business", "Kids", "Thriller", "Memoir"];
  const moods = ["Glass", "Hidden", "Silver", "Midnight", "Golden", "Quiet", "Neon", "Ancient", "Wild", "Last"];
  const nouns = ["Library", "Orchard", "Signal", "Kingdom", "Voyage", "Archive", "Harbor", "Garden", "Machine", "Promise"];
  return Array.from({ length: count }, (_, index) => {
    const genre = genres[index % genres.length];
    const title = `${moods[index % moods.length]} ${nouns[(index * 7) % nouns.length]} ${index + 1}`;
    return {
      id: `catalog-${index + 1}`,
      title,
      genre,
      category: index < 40 ? "New" : index % 3 === 0 ? "Popular" : "Oldest / Longest",
      listeners: 40 + ((index * 91) % 9400),
      popularity: 30 + ((index * 47) % 70),
      minutes: 260 + ((index * 17) % 190),
      words: 40000 + ((index * 1379) % 26000),
      date: Date.now() - index * 86400000,
      accent: accentColors[index % accentColors.length],
      image: "assets/studio-cover.png"
    };
  });
}
const messageThreads = {
  requests: [
    { title: "Message Request", from: "Aria Vale", preview: "Wants to test the opening in Spanish.", unread: 2 },
    { title: "Retail Review", from: "June Park", preview: "Your chapter package passed the first check.", unread: 1 }
  ],
  friends: [
    { title: "Friend Request", from: "Nico Hart", preview: "Wants to join your live audiobook workspace.", unread: 1 },
    { title: "Friend Request", from: "Malik Stone", preview: "Sent a request after reviewing your cast notes.", unread: 1 }
  ],
  visits: [
    { title: "Profile Visit", from: "June Park", preview: "Viewed your creator profile and release checklist.", unread: 0 },
    { title: "Profile Visit", from: "Aria Vale", preview: "Opened your voice preferences and current pipeline.", unread: 0 }
  ]
};

let state = loadState();
let library = loadLibrary();
let voices = [];
let parsedBook = parseManuscript(state.manuscript);
let activeQueue = [];
let activeQueueIndex = 0;
let activeAudio = null;
let activeAudioContext = null;
let songAudioContext = null;
let songOscillators = [];
let songGain = null;
let songProgressTimer = null;
let songProgressSeconds = 0;
let songUtterance = null;
let activePersonContextId = "";
let profileHistory = [];
let liveAudioTimer = null;
let liveAudioPlaying = false;
let liveAudioProgressSeconds = 0;
let livePlaybackRate = 1;
let liveVolume = 1;
let openedBookComments = null;
let searchSortMode = 'recommended';
const searchSortDirections = { popular: -1, alphabetical: 1, age: -1 };
let dictationRecognizer = null;
let dictationActive = false;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  syncOwnProfile();
  hydrateInputs();
  bindEvents();
  applyTheme();
  refreshVoices();
  renderAll();
  setStatus("Ready");
});

function cacheElements() {
  els.navButtons = Array.from(document.querySelectorAll(".nav-button"));
  els.profileButton = document.getElementById("profileButton");
  els.topProfileButton = document.getElementById("topProfileButton");
  els.hamburgerButton = document.getElementById("hamburgerButton");
  els.appMenu = document.getElementById("appMenu");
  els.openThemesButton = document.getElementById("openThemesButton");
  els.themeModal = document.getElementById("themeModal");
  els.closeThemeModalButton = document.getElementById("closeThemeModalButton");
  els.themePicker = document.getElementById("themePicker");
  els.projectBanner = document.querySelector(".project-banner");
  els.stopButton = document.getElementById("stopButton");
  els.previewButton = document.getElementById("previewButton");
  els.views = {
    studio: document.getElementById("studioView"),
    characters: document.getElementById("charactersView"),
    search: document.getElementById("searchView"),
    publish: document.getElementById("publishView"),
    live: document.getElementById("liveView"),
    otherSites: document.getElementById("otherSitesView"),
    profile: document.getElementById("profileView")
  };
  els.bookTitle = document.getElementById("bookTitle");
  els.authorName = document.getElementById("authorName");
  els.genreSelect = document.getElementById("genreSelect");
  els.wordCount = document.getElementById("wordCount");
  els.runtimeEstimate = document.getElementById("runtimeEstimate");
  els.pageCountDisplay = document.getElementById("pageCountDisplay");
  els.targetWordCountDisplay = document.getElementById("targetWordCountDisplay");
  if (els.scriptRuntimeEstimate) els.scriptRuntimeEstimate.textContent = String(minutes) + 'm';
  els.planChaptersInput = document.getElementById("planChaptersInput");
  els.planPagesInput = document.getElementById("planPagesInput");
  els.chapterCount = document.getElementById("chapterCount");
  els.castCount = document.getElementById("castCount");
  els.manuscriptInput = document.getElementById("manuscriptInput");
  els.ideaPromptInput = document.getElementById("ideaPromptInput");
  els.excludedStylesInput = document.getElementById("excludedStylesInput");
  els.targetWordsInput = document.getElementById("targetWordsInput");
  els.generationCountInput = document.getElementById("generationCountInput");
  els.imageReferenceInput = document.getElementById("imageReferenceInput");
  els.targetLanguageInput = document.getElementById("targetLanguageInput");
  els.songStyleInput = document.getElementById("songStyleInput");
  els.planSectionsInput = document.getElementById("planSectionsInput");
  els.languageModeSelect = document.getElementById("languageModeSelect");
  els.languageOutput = document.getElementById("languageOutput");
  els.weirdnessRange = document.getElementById("weirdnessRange");
  els.weirdnessValue = document.getElementById("weirdnessValue");
  els.styleInfluenceRange = document.getElementById("styleInfluenceRange");
  els.styleInfluenceValue = document.getElementById("styleInfluenceValue");
  els.songPlayPauseButton = document.getElementById("songPlayPauseButton");
  els.songProgress = document.getElementById("songProgress");
  els.songPlayerTime = document.getElementById("songPlayerTime");
  els.songPlayerTitle = document.getElementById("songPlayerTitle");
  els.createCastCard = document.getElementById("createCastCard");
  els.createCastGrid = document.getElementById("createCastGrid");
  els.createBookPlaylist = document.getElementById("createBookPlaylist");
  els.workspaceTree = document.getElementById("workspaceTree");
  els.playlistBottomNav = document.getElementById("playlistBottomNav");
  els.addWorkspaceButton = document.getElementById("addWorkspaceButton");
  els.addPlaylistButton = document.getElementById("addPlaylistButton");
  els.aiFillBasicsButton = document.getElementById("aiFillBasicsButton");
  els.aiFillOutlineButton = document.getElementById("aiFillOutlineButton");
  els.importManuscriptButton = document.getElementById("importManuscriptButton");
  els.manuscriptImportInput = document.getElementById("manuscriptImportInput");
  els.dictateButton = document.getElementById("dictateButton");
  els.addOwnVoiceButton = document.getElementById("addOwnVoiceButton");
  els.ownVoiceInput = document.getElementById("ownVoiceInput");
  els.searchInput = document.getElementById("searchInput");
  els.searchSortButtons = Array.from(document.querySelectorAll("[data-search-sort]"));
  els.searchResults = document.getElementById("searchResults");
  els.dailyLoginButton = document.getElementById("dailyLoginButton");
  els.dailyLoginModal = document.getElementById("dailyLoginModal");
  els.closeDailyLoginButton = document.getElementById("closeDailyLoginButton");
  els.claimDailyLoginButton = document.getElementById("claimDailyLoginButton");
  els.dailyCalendar = document.getElementById("dailyCalendar");
  els.chapterList = document.getElementById("chapterList");
  els.linePreview = document.getElementById("linePreview");
  els.activeTakeTitle = document.getElementById("activeTakeTitle");
  els.castGrid = document.getElementById("castGrid");
  els.sceneCasting = document.getElementById("sceneCasting");
  els.voiceModeSelect = document.getElementById("voiceModeSelect");
  els.ttsApiKey = document.getElementById("ttsApiKey");
  els.audioQualitySelect = document.getElementById("audioQualitySelect");
  els.masteringSelect = document.getElementById("masteringSelect");
  els.voiceInventory = document.getElementById("voiceInventory");
  els.narratorCredit = document.getElementById("narratorCredit");
  els.releaseDate = document.getElementById("releaseDate");
  els.formatSelect = document.getElementById("formatSelect");
  els.priceInput = document.getElementById("priceInput");
  els.summaryInput = document.getElementById("summaryInput");
  els.channelList = document.getElementById("channelList");
  els.publishPrevButton = document.getElementById("publishPrevButton");
  els.publishNextButton = document.getElementById("publishNextButton");
  els.publishDots = document.getElementById("publishDots");
  els.releasePreview = document.getElementById("releasePreview");
  els.trackPrevButton = document.getElementById("trackPrevButton");
  els.trackNextButton = document.getElementById("trackNextButton");
  els.trackSlider = document.getElementById("trackSlider");
  els.activeTrackTitle = document.getElementById("activeTrackTitle");
  els.activeTrackMeta = document.getElementById("activeTrackMeta");
  els.liveRoomGrid = document.getElementById("liveRoomGrid");
  els.roomStageTitle = document.getElementById("roomStageTitle");
  els.roomStageMeta = document.getElementById("roomStageMeta");
  els.roomStagePlayer = document.getElementById("roomStagePlayer");
  els.roomPresence = document.getElementById("roomPresence");
  els.leaveRoomButton = document.getElementById("leaveRoomButton");
  els.liveChatMessages = document.getElementById("liveChatMessages");
  els.liveChatInput = document.getElementById("liveChatInput");
  els.sendChatButton = document.getElementById("sendChatButton");
  els.otherSiteGrid = document.getElementById("otherSiteGrid");
  els.libraryGrid = document.getElementById("libraryGrid");
  els.profileBackButton = document.getElementById("profileBackButton");
  els.profileCloseButton = document.getElementById("profileCloseButton");
  els.profileEditButton = document.getElementById("profileEditButton");
  els.profileMailButton = document.getElementById("profileMailButton");
  els.profileAvatarLarge = document.getElementById("profileAvatarLarge");
  els.profileRole = document.getElementById("profileRole");
  els.profileDisplayName = document.getElementById("profileDisplayName");
  els.profileHandle = document.getElementById("profileHandle");
  els.profileBio = document.getElementById("profileBio");
  els.profileStatsGrid = document.getElementById("profileStatsGrid");
  els.profileWorkGrid = document.getElementById("profileWorkGrid");
  els.profileLevelFill = document.getElementById("profileLevelFill");
  els.profileLevelLabel = document.getElementById("profileLevelLabel");
  els.profileXpLabel = document.getElementById("profileXpLabel");
  els.profileEditModal = document.getElementById("profileEditModal");
  els.profileSettingsModal = document.getElementById("profileSettingsModal");
  els.closeProfileSettingsButton = document.getElementById("closeProfileSettingsButton");
  els.settingsSubmenu = document.getElementById("settingsSubmenu");
  els.mascotPicker = document.getElementById("mascotPicker");
  els.profileImageInput = document.getElementById("profileImageInput");
  els.editDisplayName = document.getElementById("editDisplayName");
  els.editUsername = document.getElementById("editUsername");
  els.editBio = document.getElementById("editBio");
  els.saveProfileEditButton = document.getElementById("saveProfileEditButton");
  els.cancelProfileEditButton = document.getElementById("cancelProfileEditButton");
  els.personContextMenu = document.getElementById("personContextMenu");
  els.messagesDrawer = document.getElementById("messagesDrawer");
  els.messagesHeading = document.getElementById("messagesHeading");
  els.messageList = document.getElementById("messageList");
  els.toastNotice = document.getElementById("toastNotice");
  els.statusBar = document.getElementById("statusBar");
}

function bindEvents() {
  els.navButtons.forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });
  els.profileButton.addEventListener("click", () => openProfile("connor"));
  els.topProfileButton.addEventListener("click", () => openProfile("connor", { resetHistory: true }));
  els.hamburgerButton.addEventListener("click", toggleAppMenu);
  els.openThemesButton.addEventListener("click", openThemeModal);
  els.closeThemeModalButton.addEventListener("click", closeThemeModal);
  els.themeModal.addEventListener("click", (event) => {
    if (event.target === els.themeModal) closeThemeModal();
  });
  els.themePicker.addEventListener("click", handleThemeClick);
  document.getElementById("googleLoginButton").addEventListener("click", startGoogleLogin);
  document.getElementById("settingsButton").addEventListener("click", openProfileSettings);
  bindOptionalClick("dailyLoginButton", openDailyLogin);
  bindOptionalClick("profileSettingsButton", openProfileSettings);
  bindOptionalClick("profileMailButton", () => openMessages("requests"));
  els.searchSortButtons.forEach((button) => button.addEventListener("click", () => handleSearchSortClick(button.dataset.searchSort)));
  els.searchInput.addEventListener("input", renderSearchResults);
  els.profileBackButton.addEventListener("click", goBackFromProfile);
  els.profileCloseButton.addEventListener("click", closeProfileToCreate);
  els.profileEditButton.addEventListener("click", openProfileEditor);
  els.saveProfileEditButton.addEventListener("click", saveProfileEditor);
  els.cancelProfileEditButton.addEventListener("click", closeProfileEditor);
  els.profileEditModal.addEventListener("click", (event) => {
    if (event.target === els.profileEditModal) closeProfileEditor();
  });
  if (els.profileSettingsModal) {
    els.profileSettingsModal.addEventListener("click", (event) => {
      if (event.target === els.profileSettingsModal) closeProfileSettings();
    });
  }
  bindOptionalClick("closeProfileSettingsButton", closeProfileSettings);
  bindOptionalClick("closeDailyLoginButton", closeDailyLogin);
  bindOptionalClick("claimDailyLoginButton", claimDailyLogin);
  if (els.dailyLoginModal) {
    els.dailyLoginModal.addEventListener("click", (event) => {
      if (event.target === els.dailyLoginModal) closeDailyLogin();
    });
  }
  if (els.profileSettingsModal) {
    els.profileSettingsModal.querySelectorAll("[data-settings-panel]").forEach((button) => {
      button.addEventListener("click", () => renderSettingsSubmenu(button.dataset.settingsPanel, button));
    });
  }
  document.getElementById("closeMessagesButton").addEventListener("click", closeMessages);
  document.querySelectorAll("[data-message-tab]").forEach((button) => {
    button.addEventListener("click", () => openMessages(button.dataset.messageTab));
  });
  els.personContextMenu.addEventListener("click", handlePersonContextAction);
  document.addEventListener("click", closeFloatingPanels);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAppMenu();
      closeThemeModal();
      closeProfileEditor();
      closeProfileSettings();
      closeMessages();
      hidePersonContextMenu();
      return;
    }
    handleGlobalPlaybackKey(event);
  });

  els.previewButton.addEventListener("click", () => speakCurrentChapter(10));
  bindOptionalClick("playSelectionButton", () => speakCurrentChapter(8));
  bindOptionalClick("auditionCastButton", () => speakCurrentChapter(12));
  els.stopButton.addEventListener("click", stopAllPlayback);
  bindOptionalClick("stopInlineButton", stopSpeech);
  bindOptionalClick("saveProjectButton", () => {
    persistState();
    setStatus("Project saved");
  });
  bindOptionalClick("translateButton", translateManuscript);
  bindOptionalClick("songButton", createTimedBook);
  bindOptionalClick("openCastButton", () => {
    focusCreateCast();
    setStatus("Cast controls opened in Create");
  });
  bindOptionalClick("useGeneratedButton", useGeneratedOutput);
  bindOptionalClick("playLanguageOutputButton", playLanguageOutput);
  bindOptionalClick("createTimedBookButton", createTimedBook);
  bindOptionalClick("createPremiumMatchButton", () => {
    autoAssignVoices();
    renderCast();
    renderCreateCast();
    renderReleasePreview();
    setStatus("Create cast matched to the best available voices");
  });
  bindOptionalClick("detectCharactersButton", () => {
    addMissingCharactersFromScript();
    renderAll();
    setStatus("Characters detected from manuscript");
  });
  bindOptionalClick("premiumMatchButton", () => {
    autoAssignVoices();
    renderAll();
    setStatus("Studio-grade voices matched to cast");
  });
  bindOptionalClick("addCharacterButton", addCharacterFromForm);
  bindOptionalClick("importManuscriptButton", importManuscriptFile);
  bindOptionalClick("dictateButton", toggleDictation);
  bindOptionalClick("aiFillBasicsButton", fillBookBasicsFromIdea);
  bindOptionalClick("aiFillOutlineButton", fillOutlineFromIdea);
  bindOptionalClick("addOwnVoiceButton", selectOwnVoiceFile);
  bindOptionalClick("addWorkspaceButton", () => addOrganizationItem("workspace"));
  bindOptionalClick("addPlaylistButton", () => addOrganizationItem("playlist"));
  if (els.manuscriptImportInput) {
    els.manuscriptImportInput.addEventListener("change", handleManuscriptImport);
  }
  if (els.ownVoiceInput) {
    els.ownVoiceInput.addEventListener("change", handleOwnVoiceUpload);
  }
  document.getElementById("publishButton").addEventListener("click", publishAudiobook);
  bindOptionalClick("publishPrevButton", () => movePublishCarousel(-1));
  bindOptionalClick("publishNextButton", () => movePublishCarousel(1));
  document.getElementById("exportPackageButton").addEventListener("click", exportCurrentPackage);
  document.getElementById("exportOtherSitesButton").addEventListener("click", exportAllOtherSitesPackage);
  document.getElementById("clearLibraryButton").addEventListener("click", clearLibrary);
  els.channelList.addEventListener("click", handlePublishAccountClick);
  els.trackPrevButton.addEventListener("click", () => moveActiveTrack(-1));
  els.trackNextButton.addEventListener("click", () => moveActiveTrack(1));
  els.trackSlider.addEventListener("input", () => setActiveTrack(Number(els.trackSlider.value), false));
  els.trackSlider.addEventListener("change", () => setActiveTrack(Number(els.trackSlider.value), true));
  els.leaveRoomButton.addEventListener("click", leaveLiveRoom);
  els.sendChatButton.addEventListener("click", sendLiveChat);
  els.liveChatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendLiveChat();
    }
  });
  els.songPlayPauseButton.addEventListener("click", toggleSongPlayback);
  els.songProgress.addEventListener("input", () => seekSongProgress(Number(els.songProgress.value)));
  if (els.weirdnessRange) els.weirdnessRange.addEventListener("input", () => handleSongSlider("weirdness"));
  if (els.styleInfluenceRange) els.styleInfluenceRange.addEventListener("input", () => handleSongSlider("styleInfluence"));
  document.querySelectorAll(".suno-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".suno-tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      setStatus(`${button.textContent.trim()} mode selected`);
    });
  });
  document.querySelectorAll(".suno-add-strip button").forEach((button) => {
    button.addEventListener("click", () => setStatus(`${button.textContent.trim().replace(/\s+/g, " ")} selected`));
  });
  document.querySelectorAll(".style-chips button").forEach((button) => {
    button.addEventListener("click", () => {
      els.songStyleInput.value = button.textContent.trim();
      handleInputChange();
      setStatus(`${button.textContent.trim()} style selected`);
    });
  });

  [els.bookTitle, els.authorName, els.genreSelect, els.manuscriptInput, els.ideaPromptInput, els.excludedStylesInput, els.generationCountInput, els.targetLanguageInput, els.songStyleInput, els.planSectionsInput, els.languageModeSelect, els.languageOutput, els.voiceModeSelect, els.audioQualitySelect, els.masteringSelect, els.narratorCredit, els.releaseDate, els.formatSelect, els.priceInput, els.summaryInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", handleInputChange);
    input.addEventListener("change", handleInputChange);
  });
  [els.planChaptersInput, els.planPagesInput, els.targetWordsInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => handlePlanInput(false));
    input.addEventListener("change", () => handlePlanInput(true));
    input.addEventListener("blur", () => handlePlanInput(true));
  });

  els.channelList.addEventListener("change", () => {
    state.channels = selectedChannels();
    persistState();
    renderReleasePreview();
  });
  els.ttsApiKey.addEventListener("input", () => {
    sessionStorage.setItem("chapterforge-openai-key", els.ttsApiKey.value.trim());
    renderVoiceInventory();
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      refreshVoices();
      renderAll();
    };
  }
}

function bindOptionalClick(id, handler) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", handler);
  }
}

function setInputValue(input, value) {
  if (input) input.value = value;
}

function hydrateInputs() {
  setInputValue(els.bookTitle, state.title);
  setInputValue(els.authorName, state.author);
  setInputValue(els.genreSelect, state.genre);
  setInputValue(els.manuscriptInput, state.manuscript);
  setInputValue(els.ideaPromptInput, state.ideaPrompt || "");
  setInputValue(els.excludedStylesInput, state.excludedStyles || "");
  setInputValue(els.generationCountInput, String(state.generationCount || 2));
  hydratePlanInputs();
  setInputValue(els.targetLanguageInput, state.targetLanguage);
  setInputValue(els.songStyleInput, state.songStyle);
  setInputValue(els.planSectionsInput, state.planSections);
  setInputValue(els.languageModeSelect, normalizeLanguageMode(state.languageMode));
  setInputValue(els.languageOutput, state.languageOutput);
  setInputValue(els.weirdnessRange, String(state.weirdness));
  setInputValue(els.styleInfluenceRange, String(state.styleInfluence));
  updateSongSliderLabels();
  setInputValue(els.voiceModeSelect, state.voiceMode);
  setInputValue(els.ttsApiKey, sessionStorage.getItem("chapterforge-openai-key") || "");
  setInputValue(els.audioQualitySelect, state.audioQuality);
  setInputValue(els.masteringSelect, state.mastering);
  setInputValue(els.narratorCredit, state.narratorCredit);
  setInputValue(els.releaseDate, state.releaseDate);
  setInputValue(els.formatSelect, state.format);
  setInputValue(els.priceInput, "Free");
  setInputValue(els.summaryInput, state.summary);
  Array.from(els.channelList?.querySelectorAll("input") || []).forEach((input) => {
    input.checked = state.channels.includes(input.value);
  });
}

function handleInputChange() {
  state.title = els.bookTitle.value.trim() || "Untitled Audiobook";
  state.author = els.authorName.value.trim() || "Unknown Author";
  state.genre = els.genreSelect.value;
  state.manuscript = els.manuscriptInput.value;
  state.ideaPrompt = els.ideaPromptInput?.value.trim() || "";
  state.excludedStyles = els.excludedStylesInput?.value.trim() || "";
  state.generationCount = clamp(Math.round(Number(els.generationCountInput?.value) || 2), 1, 5);
  state.targetLanguage = els.targetLanguageInput.value || "English";
  state.songStyle = els.songStyleInput.value.trim() || "cinematic mystery narration";
  state.planSections = els.planSectionsInput.value.trim() || defaultState.planSections;
  state.languageMode = normalizeLanguageMode(els.languageModeSelect.value);
  state.languageOutput = els.languageOutput.value;
  state.voiceMode = els.voiceModeSelect.value;
  state.audioQuality = els.audioQualitySelect.value;
  state.mastering = els.masteringSelect.value;
  state.narratorCredit = els.narratorCredit.value.trim();
  state.releaseDate = els.releaseDate.value;
  state.format = els.formatSelect.value;
  state.price = "Free";
  state.summary = els.summaryInput.value.trim();
  parsedBook = parseManuscript(state.manuscript);
  addMissingCharactersFromScript(false);
  clampActiveChapter();
  persistState();
  renderAll();
}

function handlePlanInput(normalize) {
  readPlanInputs(normalize);
  persistState();
  renderStats();
  renderReleasePreview();
  renderTrackSlider();
}

function updateManuscriptFromText(text, statusMessage) {
  const nextText = sanitizeGeneratedBookText(text);
  state.manuscript = nextText;
  if (els.manuscriptInput) {
    els.manuscriptInput.value = nextText;
  }
  parsedBook = parseManuscript(state.manuscript);
  addMissingCharactersFromScript(false);
  clampActiveChapter();
  songProgressSeconds = 0;
  persistState();
  renderAll();
  if (statusMessage) {
    setStatus(statusMessage);
  }
}

function importManuscriptFile() {
  if (!els.manuscriptImportInput) return;
  els.manuscriptImportInput.click();
}

function handleManuscriptImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = String(reader.result || "").trim();
    if (!imported) {
      setStatus("Imported file was empty");
      return;
    }
    const current = (state.manuscript || "").trim();
    const replace = !current || window.confirm("Replace the current manuscript with this import? Cancel appends it.");
    const nextText = replace ? imported : `${current}\n\n${imported}`;
    updateManuscriptFromText(nextText, `${file.name} imported`);
    event.target.value = "";
  };
  reader.onerror = () => setStatus("Could not import that file");
  reader.readAsText(file);
}

function toggleDictation() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    setStatus("Microphone dictation is unavailable in this browser");
    return;
  }
  if (dictationActive && dictationRecognizer) {
    dictationRecognizer.stop();
    return;
  }
  dictationRecognizer = new Recognition();
  dictationRecognizer.continuous = true;
  dictationRecognizer.interimResults = false;
  dictationRecognizer.lang = "en-US";
  dictationRecognizer.onstart = () => {
    dictationActive = true;
    updateDictationButton();
    setStatus("Dictation started");
  };
  dictationRecognizer.onresult = (event) => {
    const transcript = Array.from(event.results)
      .slice(event.resultIndex)
      .map((result) => result[0]?.transcript || "")
      .join(" ")
      .trim();
    if (transcript) {
      appendDictationText(transcript);
    }
  };
  dictationRecognizer.onerror = () => setStatus("Dictation stopped");
  dictationRecognizer.onend = () => {
    dictationActive = false;
    updateDictationButton();
  };
  dictationRecognizer.start();
}

function appendDictationText(text) {
  const target = els.ideaPromptInput || els.songStyleInput || els.manuscriptInput;
  const current = target.value;
  const spacer = current && !current.endsWith("\n") ? "\n\n" : "";
  target.value = `${current}${spacer}${text}`;
  handleInputChange();
  setStatus("Dictation added to idea prompt");
}

function updateDictationButton() {
  if (!els.dictateButton) return;
  els.dictateButton.classList.toggle("is-active", dictationActive);
  els.dictateButton.innerHTML = `
    <svg class="ico"><use href="#icon-mic"></use></svg>
    ${dictationActive ? "Stop dictation" : "Dictate idea"}
  `;
}

function fillBookBasicsFromIdea() {
  const idea = (els.ideaPromptInput?.value || state.ideaPrompt || "").trim();
  const seed = idea || "a cinematic mystery fantasy audiobook about a hidden library and a living map";
  if (!state.title || state.title === defaultState.title) {
    state.title = titleCase(seed.split(/[,.]/)[0].replace(/\b(a|an|the|about|with)\b/gi, "").trim()).slice(0, 48) || "Untitled Audiobook";
  }
  if (!state.genre || state.genre === defaultState.genre) {
    const lower = seed.toLowerCase();
    state.genre = lower.includes("mystery") ? "Mystery" : lower.includes("sci") ? "Science Fiction" : lower.includes("romance") ? "Romance" : "Fantasy";
  }
  if (!state.songStyle || state.songStyle === defaultState.songStyle) {
    state.songStyle = "cinematic, polished, immersive, full-cast audiobook";
  }
  hydrateInputs();
  persistState();
  setStatus("Book basics filled from the idea");
}

function fillOutlineFromIdea() {
  const title = state.title || "the audiobook";
  const idea = (els.ideaPromptInput?.value || state.ideaPrompt || "the central conflict").trim();
  state.planSections = [
    `Part 1: Open ${title} with the strongest scene and introduce ${idea.slice(0, 74)}`,
    "Part 2: Escalate the conflict with character choices, reversals, and a clear midpoint",
    "Part 3: Resolve the core promise with a full emotional payoff and final image"
  ].join("\n");
  if (els.planSectionsInput) els.planSectionsInput.value = state.planSections;
  persistState();
  setStatus("Outline filled from the idea");
}

function selectOwnVoiceFile() {
  if (!els.ownVoiceInput) return;
  els.ownVoiceInput.click();
}

function handleOwnVoiceUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const cleanName = file.name.replace(/\.[^.]+$/, "").trim() || "My Voice";
  state.customVoiceName = cleanName;
  if (state.cast.narrator) {
    state.cast.narrator.cloudVoice = "custom";
  }
  persistState();
  renderVoiceInventory();
  renderCreateCast();
  renderCast();
  setStatus(`${cleanName} added to Voice Studio`);
  event.target.value = "";
}

function renderOrganizationTree() {
  if (!els.workspaceTree) return;
  const items = Array.isArray(state.organizationItems) && state.organizationItems.length
    ? state.organizationItems
    : clone(defaultState.organizationItems);
  state.organizationItems = items;
  normalizeOrganizationLabels(items);
  if (!findOrganizationItem(state.activeOrganizationId, items)) {
    state.activeOrganizationId = items[0]?.id || "root";
  }
  els.workspaceTree.innerHTML = items.map((item) => organizationItemHtml(item, 0)).join("");
  els.workspaceTree.querySelectorAll("[data-organization-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeOrganizationId = button.dataset.organizationId;
      persistState();
      renderOrganizationTree();
      setStatus(`${button.dataset.organizationType === "playlist" ? "Playlist" : "Workspace"} selected`);
    });
  });
  renderPlaylistBottomNav(items);
}

function normalizeOrganizationLabels(items) {
  (items || []).forEach((item) => {
    if (item.id === "root" || item.name === "Main Workspace") item.name = "Workspace";
    if (item.id === "series" || item.name === "Series Ideas") item.name = "Drafts";
    if (item.id === "playlist-drafts" || item.name === "Draft Playlist") item.name = "Finished Products";
    normalizeOrganizationLabels(item.children || []);
  });
}

function renderPlaylistBottomNav(items) {
  if (!els.playlistBottomNav) return;
  els.playlistBottomNav.innerHTML = "";
  els.playlistBottomNav.hidden = true;
}

function flattenOrganizationItems(items) {
  return (items || []).flatMap((item) => [item, ...flattenOrganizationItems(item.children || [])]);
}

function organizationItemHtml(item, depth) {
  const children = Array.isArray(item.children) ? item.children : [];
  const icon = item.type === "playlist" ? "#icon-library" : "#icon-book";
  return `
    <div class="workspace-tree-item" style="--depth:${depth}">
      <button type="button" class="workspace-node${item.id === state.activeOrganizationId ? " is-active" : ""}" data-organization-id="${escapeHtml(item.id)}" data-organization-type="${escapeHtml(item.type)}">
        <svg class="ico"><use href="${icon}"></use></svg>
        <span>${escapeHtml(item.name)}</span>
      </button>
      ${children.map((child) => organizationItemHtml(child, depth + 1)).join("")}
    </div>
  `;
}

function addOrganizationItem(type) {
  const rootItems = Array.isArray(state.organizationItems) && state.organizationItems.length
    ? state.organizationItems
    : clone(defaultState.organizationItems);
  state.organizationItems = rootItems;
  const parent = findOrganizationItem(state.activeOrganizationId, rootItems) || rootItems[0];
  const label = type === "playlist" ? "Playlist" : "Workspace";
  const name = window.prompt(`${label} name`, `${label} ${organizationItemCount(rootItems, type) + 1}`);
  if (!name || !name.trim()) return;
  const item = {
    id: `${type}-${Date.now()}`,
    type,
    name: name.trim(),
    children: []
  };
  parent.children = Array.isArray(parent.children) ? parent.children : [];
  parent.children.push(item);
  state.activeOrganizationId = item.id;
  persistState();
  renderOrganizationTree();
  setStatus(`${label} created inside ${parent.name}`);
}

function findOrganizationItem(id, items = state.organizationItems) {
  for (const item of items || []) {
    if (item.id === id) return item;
    const child = findOrganizationItem(id, item.children || []);
    if (child) return child;
  }
  return null;
}

function organizationItemCount(items, type) {
  return (items || []).reduce((count, item) => count + (item.type === type ? 1 : 0) + organizationItemCount(item.children || [], type), 0);
}

function renderAll() {
  renderThemePicker();
  renderStats();
  renderChapters();
  renderLinePreview();
  renderCast();
  renderCreateCast();
  renderVoiceInventory();
  renderSceneCasting();
  renderReleasePreview();
  renderPublishAccounts();
  renderSearchResults();
  renderLiveExperience();
  renderOtherSites();
  renderLibrary();
  renderCreateBookPlaylist();
  renderProfile();
  renderMessages();
  renderSongPlayer();
  renderOrganizationTree();
}

function switchView(viewName) {
  els.navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewName));
  if (els.profileButton) {
    els.profileButton.classList.toggle("is-active", viewName === "profile");
  }
  Object.entries(els.views).forEach(([key, view]) => {
    if (view) view.classList.toggle("is-active", key === viewName);
  });
  if (els.projectBanner) {
    els.projectBanner.hidden = viewName !== "studio";
  }
  if (els.stopButton && els.previewButton) {
    els.stopButton.hidden = true;
    els.previewButton.hidden = true;
  }
  if (els.hamburgerButton) {
    els.hamburgerButton.hidden = viewName === "profile";
  }
  closeAppMenu();
  hidePersonContextMenu();
}

function handleGlobalPlaybackKey(event) {
  const isPlaybackKey = event.code === "Space" || event.key === " " || event.key === "Spacebar" || event.key === "Enter";
  if (!isPlaybackKey || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (isTypingTarget(event.target) || isNativeActivationTarget(event.target) || isBlockingOverlayOpen()) return;
  event.preventDefault();
  toggleKeyboardPlayback();
}

function isTypingTarget(target) {
  const element = target instanceof Element ? target : null;
  if (!element) return false;
  return Boolean(element.closest("input, textarea, select, [contenteditable='true']"));
}

function isNativeActivationTarget(target) {
  const element = target instanceof Element ? target : null;
  if (!element) return false;
  return Boolean(element.closest("button, a, summary, label, input, textarea, select"));
}

function isBlockingOverlayOpen() {
  return !els.themeModal.hidden || !els.profileEditModal.hidden || !els.profileSettingsModal.hidden || !els.dailyLoginModal.hidden || !els.messagesDrawer.hidden;
}

function toggleKeyboardPlayback() {
  if (liveAudioPlaying) {
    toggleLiveAudiobookPlayback();
    return;
  }
  if (songProgressTimer) {
    toggleSongPlayback();
    return;
  }
  if (els.views.live?.classList.contains("is-active") && state.enteredRoomId) {
    toggleLiveAudiobookPlayback();
    return;
  }
  toggleSongPlayback();
}

function toggleAppMenu(event) {
  event.stopPropagation();
  const nextHidden = !els.appMenu.hidden ? true : false;
  els.appMenu.hidden = nextHidden;
  els.hamburgerButton.setAttribute("aria-expanded", String(!nextHidden));
}

function closeAppMenu() {
  if (!els.appMenu || els.appMenu.hidden) return;
  els.appMenu.hidden = true;
  els.hamburgerButton.setAttribute("aria-expanded", "false");
}

function openThemeModal() {
  closeAppMenu();
  els.themeModal.hidden = false;
}

function closeThemeModal() {
  if (els.themeModal) els.themeModal.hidden = true;
}

function closeFloatingPanels(event) {
  if (!event) return;
  const target = event.target;
  if (els.appMenu && !els.appMenu.hidden && !els.appMenu.contains(target) && target !== els.hamburgerButton && !els.hamburgerButton.contains(target)) {
    closeAppMenu();
  }
  if (els.personContextMenu && !els.personContextMenu.hidden && !els.personContextMenu.contains(target)) {
    hidePersonContextMenu();
  }
}

function handleThemeClick(event) {
  event.stopPropagation();
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  const nextTheme = button.dataset.theme;
  const theme = themeOptions.find((candidate) => candidate.id === nextTheme);
  if (!theme) return;
  if (theme.cost && (state.coins || 0) < theme.cost) {
    setStatus(`${theme.name} needs ${formatNumber(theme.cost)} coins`);
    return;
  }
  if (theme.cost) {
    state.coins = Math.max(0, (state.coins || 0) - theme.cost);
  }
  state.theme = nextTheme;
  applyTheme();
  persistState();
  renderThemePicker();
  closeThemeModal();
  setStatus(`${theme.name} theme selected`);
}

function applyTheme() {
  document.body.dataset.theme = state.theme || "noir";
}

function syncOwnProfile() {
  const own = state.profile || defaultState.profile;
  profilePeople.connor.name = own.name || defaultState.profile.name;
  profilePeople.connor.handle = normalizeHandle(own.handle || defaultState.profile.handle);
  profilePeople.connor.bio = own.bio || defaultState.profile.bio;
  const mascotId = mascotOptions.some((mascot) => mascot.id === own.mascot) ? own.mascot : defaultState.profile.mascot;
  state.profile.mascot = mascotId;
  profilePeople.connor.avatar = mascotId;
}

function openProfile(profileId = "connor", options = {}) {
  const targetId = profilePeople[profileId] ? profileId : "connor";
  if (options.resetHistory) {
    profileHistory = [];
  } else if (els.views.profile.classList.contains("is-active") && state.profileFocusId !== targetId && options.pushHistory !== false) {
    profileHistory.push(state.profileFocusId);
  }
  state.profileFocusId = targetId;
  syncOwnProfile();
  persistState();
  renderProfile();
  switchView("profile");
  setStatus(`Viewing ${profilePeople[state.profileFocusId].name}`);
}

function goBackFromProfile() {
  if (state.profileFocusId === "connor") {
    closeProfileToCreate();
    return;
  }
  const previous = profileHistory.pop();
  if (previous) {
    openProfile(previous, { pushHistory: false });
    return;
  }
  openProfile("connor", { pushHistory: false });
}

function closeProfileToCreate() {
  profileHistory = [];
  switchView("studio");
  setStatus("Create opened");
}

function showPersonContextMenu(event, personId) {
  event.preventDefault();
  event.stopPropagation();
  activePersonContextId = personId;
  els.personContextMenu.hidden = false;
  els.personContextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 170)}px`;
  els.personContextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - 130)}px`;
}

function hidePersonContextMenu() {
  if (!els.personContextMenu) return;
  els.personContextMenu.hidden = true;
  activePersonContextId = "";
}

function handlePersonContextAction(event) {
  const button = event.target.closest("[data-person-action]");
  if (!button || !activePersonContextId) return;
  const person = profilePeople[activePersonContextId];
  const action = button.dataset.personAction;
  hidePersonContextMenu();
  if (!person) return;
  if (action === "visit") {
    openProfile(person.id);
    return;
  }
  if (action === "message") {
    openMessages("requests");
    setStatus(`Message thread opened for ${person.name}`);
    return;
  }
  setStatus(`Friend request sent to ${person.name}`);
}

function openProfileEditor() {
  if (state.profileFocusId !== "connor") {
    setStatus("You can only edit your own profile");
    return;
  }
  syncOwnProfile();
  els.editDisplayName.value = profilePeople.connor.name;
  els.editUsername.value = profilePeople.connor.handle.replace(/^@/, "");
  els.editBio.value = profilePeople.connor.bio;
  renderMascotPicker();
  els.profileEditModal.hidden = false;
}

function closeProfileEditor() {
  if (els.profileEditModal) els.profileEditModal.hidden = true;
}

function saveProfileEditor() {
  const name = els.editDisplayName.value.trim();
  const username = els.editUsername.value.trim();
  const bio = els.editBio.value.trim();
  if (!name || !username) {
    showToast("Display name and username are required.");
    return;
  }
  if (name.length > 64 || username.length > 64 || bio.length > 1000) {
    showToast("Profile fields are over the allowed length.");
    return;
  }
  if (containsInappropriateInput(`${name} ${username} ${bio}`)) {
    showToast("You can't use, you can't input inappropriate names.");
    return;
  }
  const nextHandle = normalizeHandle(username);
  const currentHandle = normalizeHandle(state.profile.handle);
  if (nextHandle !== currentHandle && !canChangeUsername()) {
    showToast("Username can only be changed once a week.");
    return;
  }
  state.profile.name = name;
  state.profile.bio = bio;
  if (nextHandle !== currentHandle) {
    state.profile.handle = nextHandle;
    state.profile.lastUsernameChange = new Date().toISOString();
  }
  syncOwnProfile();
  persistState();
  closeProfileEditor();
  renderProfile();
  showToast("Profile updated.");
}

function renderMascotPicker() {
  if (!els.mascotPicker) return;
  const active = selectedMascot().id;
  els.mascotPicker.innerHTML = `
    <button type="button" class="mascot-choice upload-mascot-choice" data-upload-profile-image aria-label="Choose your own image">
      <span class="upload-mascot-circle"><svg class="ico"><use href="#icon-upload"></use></svg></span>
      <span>Choose Yours</span>
    </button>
  ` + mascotOptions.map((mascot) => `
    <button type="button" class="mascot-choice ${mascot.id === active ? "is-active" : ""}" data-mascot="${escapeHtml(mascot.id)}" style="--mascot-hue:${mascot.hue}" aria-label="${escapeHtml(mascot.name)}">
      ${mascotMarkup(mascot)}
      <span>${escapeHtml(mascot.name)}</span>
    </button>
  `).join("");
  els.mascotPicker.querySelectorAll("[data-mascot]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profile.mascot = button.dataset.mascot;
      state.profile.image = "";
      syncOwnProfile();
      persistState();
      renderMascotPicker();
      renderProfile();
    });
  });
  els.mascotPicker.querySelector("[data-upload-profile-image]")?.addEventListener("click", () => els.profileImageInput?.click());
  if (els.profileImageInput && !els.profileImageInput.dataset.bound) {
    els.profileImageInput.dataset.bound = "true";
    els.profileImageInput.addEventListener("change", handleProfileImageUpload);
  }
}

function selectedMascot() {
  const id = state.profile?.mascot || defaultState.profile.mascot;
  return mascotOptions.find((mascot) => mascot.id === id) || mascotOptions[0];
}

function mascotMarkup(mascot = selectedMascot()) {
  const initials = mascot.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  return `
    <span class="css-mascot mascot-${escapeHtml(mascot.animal)}" style="--mascot-hue:${mascot.hue};--mascot-alt-hue:${mascot.altHue}" aria-hidden="true">
      <span class="mascot-head">
        <span class="mascot-ear mascot-ear-left"></span>
        <span class="mascot-ear mascot-ear-right"></span>
        <span class="mascot-horn mascot-horn-left"></span>
        <span class="mascot-horn mascot-horn-right"></span>
        <span class="mascot-beak"></span>
        <span class="mascot-face">
          <span class="mascot-blaze"></span>
          <span class="mascot-eye mascot-eye-left"></span>
          <span class="mascot-eye mascot-eye-right"></span>
          <span class="mascot-muzzle">
            <span class="mascot-nose"></span>
          </span>
        </span>
      </span>
      <span class="mascot-badge">${escapeHtml(initials)}</span>
    </span>
  `;
}

function handleProfileImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.profile.image = String(reader.result || "");
    persistState();
    renderProfile();
    showToast("Profile image updated.");
  };
  reader.readAsDataURL(file);
}

function canChangeUsername() {
  if (!state.profile.lastUsernameChange) return true;
  const last = new Date(state.profile.lastUsernameChange).getTime();
  if (!Number.isFinite(last)) return true;
  return Date.now() - last >= 7 * 24 * 60 * 60 * 1000;
}

function normalizeHandle(value) {
  const cleaned = String(value || "")
    .trim()
    .replace(/^@+/, "")
    .replace(/[^a-zA-Z0-9_.-]+/g, "")
    .slice(0, 64);
  return `@${cleaned || "creator"}`;
}

function initialsForName(name) {
  return String(name || "Creator")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "C";
}

function containsInappropriateInput(value) {
  const normalized = String(value || "")
    .toLowerCase()
    .replaceAll("0", "o")
    .replaceAll("1", "i")
    .replaceAll("!", "i")
    .replaceAll("3", "e")
    .replaceAll("4", "a")
    .replaceAll("@", "a")
    .replaceAll("$", "s")
    .replace(/[^a-z]/g, "");
  const blocked = ["bitch", "fuck", "nigger", "nigga", "cunt", "shit", "faggot", "whore", "slut"];
  return blocked.some((term) => normalized.includes(term));
}

function showToast(message) {
  els.toastNotice.textContent = message;
  els.toastNotice.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toastNotice.hidden = true;
  }, 2800);
}

function openMessages(tab = "requests") {
  state.messageTab = messageThreads[tab] ? tab : "requests";
  persistState();
  renderMessages();
  els.messagesDrawer.hidden = false;
  closeAppMenu();
  setStatus(`${els.messagesHeading.textContent} opened`);
}

function closeMessages() {
  if (els.messagesDrawer) els.messagesDrawer.hidden = true;
}

function openProfileSettings() {
  if (!els.profileSettingsModal) return;
  els.profileSettingsModal.hidden = false;
  closeAppMenu();
  renderSettingsSubmenu("theme");
  setStatus("Profile settings opened");
}

function closeProfileSettings() {
  if (els.profileSettingsModal) els.profileSettingsModal.hidden = true;
}

function renderSettingsSubmenu(panel = "theme", anchorButton = null) {
  if (!els.settingsSubmenu) return;
  if (!anchorButton && els.profileSettingsModal) {
    anchorButton = els.profileSettingsModal.querySelector(`[data-settings-panel="${panel}"]`);
  }
  const labels = {
    theme: "Choose app themes and spend coins on premium looks.",
    notifications: "Room invites, publishing alerts, friend requests, and release updates.",
    audio: "Default playback speed, mastering profile, voice preview, and output quality.",
    visual: "Card density, motion, contrast, profile image, and cover display.",
    privacy: "Profile visibility, message requests, room presence, and search appearance.",
    account: "Google login, username, email, session security, and connected devices.",
    publishing: "Provider connections, release defaults, metadata, and store exports.",
    voice: "Narrator defaults, cloned voice files, cast routing, and HD voice engine.",
    workspace: "Default workspace, playlists, nested folders, and save location.",
    billing: "Coins, premium themes, purchases, and provider fees."
  };
  const controlSets = {
    notifications: ["Room invites", "Friend requests", "Publish alerts", "Weekly digest"],
    audio: ["Playback speed", "Mastering profile", "Voice preview", "HD output"],
    visual: ["Dense cards", "Reduce motion", "High contrast", "Large covers"],
    privacy: ["Public profile", "Show online status", "Allow messages", "Search visibility"],
    account: ["Google login", "Username", "Email", "Connected devices"],
    publishing: ["Default platforms", "Release metadata", "Store accounts", "Export package"],
    voice: ["Narrator default", "Cast matching", "Custom voices", "Voice quality"],
    workspace: ["Default workspace", "Nested playlists", "Autosave", "Archive drafts"],
    billing: ["Coin balance", "Theme purchases", "Invoices", "Provider fees"]
  };
  els.settingsSubmenu.innerHTML = `
    <strong>${escapeHtml(panel === "voice" ? "Voice Studio" : titleCase(panel))}</strong>
    <p>${escapeHtml(labels[panel] || labels.theme)}</p>
    ${panel === "theme" ? `<div class="theme-picker inline-theme-picker">${themeOptions.map(theme => `<button type="button" data-theme="${escapeHtml(theme.id)}" class="${state.theme === theme.id ? "is-active" : ""}" style="--swatch:${theme.accent}">${escapeHtml(theme.name)}<span>${theme.cost ? `${formatNumber(theme.cost)} coins` : "Free"}</span></button>`).join("")}</div>` : `<div class="settings-control-list">${(controlSets[panel] || []).map((item, index) => `<label><span>${escapeHtml(item)}</span><input type="${index === 0 ? "range" : "checkbox"}" ${index === 0 ? "min=\"0\" max=\"100\" value=\"60\"" : "checked"}></label>`).join("")}</div>`}
  `;
  if (anchorButton) {
    const slot = anchorButton.closest(".settings-option-slot") || anchorButton.parentElement;
    slot.appendChild(els.settingsSubmenu);
  }
  els.settingsSubmenu.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", handleThemeClick);
  });
}

function openDailyLogin() {
  if (!els.dailyLoginModal) return;
  closeAppMenu();
  renderDailyLogin();
  els.dailyLoginModal.hidden = false;
}

function closeDailyLogin() {
  if (els.dailyLoginModal) els.dailyLoginModal.hidden = true;
}

function renderDailyLogin() {
  if (!els.dailyCalendar) return;
  const streak = Math.max(0, Number(state.dailyLogin?.streak) || 0);
  els.dailyCalendar.innerHTML = Array.from({ length: 7 }, (_, index) => {
    const amount = 5 * Math.pow(2, index);
    return `<article class="${index < streak ? "is-claimed" : ""}"><strong>Day ${index + 1}</strong><span>${formatNumber(amount)} coins</span></article>`;
  }).join("");
}

function claimDailyLogin() {
  const today = todayKey();
  const last = state.dailyLogin?.lastClaim || "";
  if (last === today) {
    setStatus("Daily coins already claimed today");
    return;
  }
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const nextStreak = last === yesterday ? Math.min(7, (Number(state.dailyLogin?.streak) || 0) + 1) : 1;
  const reward = 5 * Math.pow(2, nextStreak - 1);
  state.dailyLogin = { lastClaim: today, streak: nextStreak };
  state.coins = (Number(state.coins) || 0) + reward;
  persistState();
  renderDailyLogin();
  setStatus(`Claimed ${formatNumber(reward)} coins. Streak day ${nextStreak}.`);
}

function startGoogleLogin() {
  const clientId = localStorage.getItem("saga-google-client-id") || "";
  if (!clientId) {
    setStatus("Add a Google OAuth Web Client ID in localStorage as saga-google-client-id, then click Google login again.");
    return;
  }
  const redirect = encodeURIComponent(window.location.origin + window.location.pathname);
  const scope = encodeURIComponent("openid email profile");
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${redirect}&response_type=token&scope=${scope}&prompt=select_account`;
}

function handleSongSlider(field) {
  if (field === "weirdness") {
    state.weirdness = Number(els.weirdnessRange.value);
  } else {
    state.styleInfluence = Number(els.styleInfluenceRange.value);
  }
  updateSongSliderLabels();
  persistState();
}

function updateSongSliderLabels() {
  if (els.weirdnessValue) els.weirdnessValue.textContent = `${state.weirdness}%`;
  if (els.styleInfluenceValue) els.styleInfluenceValue.textContent = `${state.styleInfluence}%`;
}

function renderStats() {
  const words = countWords(state.manuscript);
  const minutes = estimateMinutes(words);
  updateRuntimeFromPlan();
  const targetWords = targetWordCount();
  if (els.wordCount) els.wordCount.textContent = formatNumber(words);
  if (els.pageCountDisplay) els.pageCountDisplay.textContent = formatNumber(state.targetPages);
  if (els.runtimeEstimate) els.runtimeEstimate.textContent = formatDuration(state.targetDurationSeconds);
  if (els.targetWordCountDisplay) els.targetWordCountDisplay.textContent = formatNumber(targetWords);
  if (els.scriptRuntimeEstimate) els.scriptRuntimeEstimate.textContent = String(minutes) + 'm';
  if (els.chapterCount) els.chapterCount.textContent = String(state.targetChapters);
  if (els.castCount) els.castCount.textContent = String(activeCastCharacters().length);
}

function renderChapters() {
  els.chapterList.innerHTML = "";
  const chapters = parsedBook.chapters.length ? parsedBook.chapters : [{ title: "Manuscript", lines: parsedBook.lines }];
  chapters.forEach((chapter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chapter-row${index === state.activeChapterIndex ? " is-active" : ""}`;
    button.innerHTML = `
      <span>
        <strong>${escapeHtml(chapter.title)}</strong>
        <span class="meta-line">${chapter.lines.length} lines - ${estimateMinutes(countWords(chapter.lines.map((line) => line.text).join(" ")))}m</span>
      </span>
      <span class="pill">${index + 1}</span>
    `;
    button.addEventListener("click", () => {
      state.activeChapterIndex = index;
      persistState();
      renderChapters();
      renderLinePreview();
      renderSceneCasting();
    });
    els.chapterList.appendChild(button);
  });
}

function renderLinePreview() {
  const chapter = activeChapter();
  els.activeTakeTitle.textContent = chapter.title;
  els.linePreview.innerHTML = "";
  chapter.lines.slice(0, 14).forEach((line) => {
    els.linePreview.appendChild(createLineRow(line));
  });
}

function renderSceneCasting() {
  const chapter = activeChapter();
  els.sceneCasting.innerHTML = "";
  chapter.lines.slice(0, 22).forEach((line) => {
    els.sceneCasting.appendChild(createLineRow(line));
  });
}

function createLineRow(line) {
  const cast = getCastForLine(line);
  const row = document.createElement("div");
  row.className = "line-row";
  row.innerHTML = `
    <span class="speaker-chip" style="background:${cast.color}">${escapeHtml(cast.name)}</span>
    <p class="line-text">${escapeHtml(line.text)}</p>
  `;
  return row;
}

function renderCast() {
  els.castGrid.innerHTML = "";
  Object.values(state.cast).forEach((character, index) => {
    if (!character.cloudVoice) {
      character.cloudVoice = defaultHdVoice(character, index);
    }
    if ((!character.voiceURI || shouldUpgradeVoice(character.voiceURI)) && voices.length) {
      character.voiceURI = pickVoice(index, character).voiceURI;
    }
    const card = document.createElement("article");
    card.className = "cast-card";
    const voice = findVoice(character.voiceURI);
    const score = voice ? scoreVoice(voice) : 28;
    const initials = character.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
    card.innerHTML = `
      <div class="cast-card-head">
        <div class="cast-title">
          <span class="avatar" style="background:${character.color}">${escapeHtml(initials)}</span>
          <span>
            <strong>${escapeHtml(character.name)}</strong>
            <span>${escapeHtml(character.role || "Character voice")}</span>
          </span>
        </div>
        <button class="icon-button" type="button" data-action="test" aria-label="Test ${escapeHtml(character.name)}" title="Test voice">
          <svg class="ico"><use href="#icon-play"></use></svg>
        </button>
      </div>
      <label>
        <span>Voice ${voice ? `- ${escapeHtml(voiceDescriptor(voice))}` : ""}</span>
        <select data-field="voiceURI">${voiceOptions(character.voiceURI)}</select>
      </label>
      <label>
        <span>HD Voice</span>
        <select data-field="cloudVoice">${hdVoiceOptions(character.cloudVoice)}</select>
      </label>
      <div class="quality-row">
        <div class="quality-meter"><span style="width:${score}%"></span></div>
        <span>${qualityLabel(score)}</span>
      </div>
      <div class="range-grid">
        <label>
          <span>Speed ${character.rate.toFixed(2)}</span>
          <input type="range" min="0.65" max="1.25" step="0.01" value="${character.rate}" data-field="rate">
        </label>
        <label>
          <span>Pitch ${character.pitch.toFixed(2)}</span>
          <input type="range" min="0.55" max="1.45" step="0.01" value="${character.pitch}" data-field="pitch">
        </label>
      </div>
    `;

    card.querySelector('[data-action="test"]').addEventListener("click", () => {
      speakText(sampleForCharacter(character), character.id);
    });
    card.querySelector('[data-field="voiceURI"]').addEventListener("change", (event) => {
      character.voiceURI = event.target.value;
      persistState();
      renderCast();
      renderCreateCast();
      renderReleasePreview();
    });
    card.querySelector('[data-field="cloudVoice"]').addEventListener("change", (event) => {
      character.cloudVoice = event.target.value;
      persistState();
      renderCast();
      renderCreateCast();
      renderReleasePreview();
    });
    card.querySelectorAll('input[type="range"]').forEach((range) => {
      range.addEventListener("input", (event) => {
        character[event.target.dataset.field] = Number(event.target.value);
        persistState();
        renderCast();
        renderCreateCast();
      });
    });
    els.castGrid.appendChild(card);
  });
  persistState();
}

function focusCreateCast() {
  switchView("studio");
  if (els.createCastCard) {
    els.createCastCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function renderCreateCast() {
  if (!els.createCastGrid) return;
  els.createCastGrid.innerHTML = "";
  activeCastCharacters().forEach((character, index) => {
    if (!character.cloudVoice) {
      character.cloudVoice = defaultHdVoice(character, index);
    }
    if ((!character.voiceURI || shouldUpgradeVoice(character.voiceURI)) && voices.length) {
      character.voiceURI = pickVoice(index, character).voiceURI;
    }
    const voice = findVoice(character.voiceURI);
    const score = voice ? scoreVoice(voice) : 28;
    const initials = character.name.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();
    const card = document.createElement("article");
    card.className = "create-cast-item";
    card.innerHTML = `
      <div class="create-cast-head">
        <span class="avatar" style="background:${character.color}">${escapeHtml(initials)}</span>
        <span>
          <strong>${escapeHtml(character.name)}</strong>
          <small>${escapeHtml(character.role || "Character voice")}</small>
        </span>
        <button class="icon-button" type="button" data-action="test" aria-label="Test ${escapeHtml(character.name)}" title="Test voice">
          <svg class="ico"><use href="#icon-play"></use></svg>
        </button>
      </div>
      <div class="create-cast-controls">
        <label>
          <span>Voice ${voice ? `- ${escapeHtml(voiceDescriptor(voice))}` : ""}</span>
          <select data-field="voiceURI">${voiceOptions(character.voiceURI)}</select>
        </label>
        <label>
          <span>HD Voice</span>
          <select data-field="cloudVoice">${hdVoiceOptions(character.cloudVoice)}</select>
        </label>
      </div>
      <div class="quality-row">
        <div class="quality-meter"><span style="width:${score}%"></span></div>
        <span>${qualityLabel(score)}</span>
      </div>
      <div class="range-grid">
        <label>
          <span>Speed ${character.rate.toFixed(2)}</span>
          <input type="range" min="0.65" max="1.25" step="0.01" value="${character.rate}" data-field="rate">
        </label>
        <label>
          <span>Pitch ${character.pitch.toFixed(2)}</span>
          <input type="range" min="0.55" max="1.45" step="0.01" value="${character.pitch}" data-field="pitch">
        </label>
      </div>
    `;
    card.querySelector('[data-action="test"]').addEventListener("click", () => {
      speakText(sampleForCharacter(character), character.id);
    });
    card.querySelector('[data-field="voiceURI"]').addEventListener("change", (event) => {
      character.voiceURI = event.target.value;
      persistState();
      renderCreateCast();
      renderCast();
      renderReleasePreview();
    });
    card.querySelector('[data-field="cloudVoice"]').addEventListener("change", (event) => {
      character.cloudVoice = event.target.value;
      persistState();
      renderCreateCast();
      renderCast();
      renderReleasePreview();
    });
    card.querySelectorAll('input[type="range"]').forEach((range) => {
      range.addEventListener("input", (event) => {
        character[event.target.dataset.field] = Number(event.target.value);
        persistState();
        renderCreateCast();
        renderCast();
      });
    });
    els.createCastGrid.appendChild(card);
  });
}

function activeCastCharacters() {
  const ids = new Set(["narrator"]);
  parsedBook.lines.forEach((line) => {
    if (!isPlanningSpeaker(line.speakerId, line.speakerName)) {
      ids.add(line.speakerId);
    }
  });
  return Array.from(ids)
    .map((id) => state.cast[id])
    .filter(Boolean);
}

function renderVoiceInventory() {
  if (!els.voiceInventory) return;
  if (state.voiceMode === "openvoice") {
    const customLabel = state.customVoiceName ? ` Custom voice: ${state.customVoiceName}.` : "";
    els.voiceInventory.textContent = `Open Voice HD selected. Connect a local Piper or OpenVoice service for free neural voices; browser voices are only fallback.${customLabel}`;
    return;
  }
  if (state.voiceMode === "openai") {
    const keyReady = Boolean(els.ttsApiKey.value.trim());
    const formatLabel = state.audioQuality === "wav" ? "Ultra HD WAV" : state.audioQuality.toUpperCase();
    const customLabel = state.customVoiceName ? ` Custom voice: ${state.customVoiceName}.` : "";
    els.voiceInventory.textContent = keyReady
      ? `OpenAI HD ready: ${formatLabel}, ${titleCase(state.mastering)} mastering, per-character HD voices.${customLabel}`
      : `OpenAI HD selected. Add a session API key to hear the higher-quality voices; browser voices stay as fallback.${customLabel}`;
    return;
  }
  if (!("speechSynthesis" in window)) {
    els.voiceInventory.textContent = "Speech synthesis is unavailable in this browser.";
    return;
  }
  if (!voices.length) {
    els.voiceInventory.textContent = "No browser voices found yet. Try refreshing or opening the Cast view again.";
    return;
  }
  const englishCount = voices.filter(isEnglishVoice).length;
  const neuralCount = voices.filter(isNeuralVoice).length;
  const studioCount = voices.filter(isStudioVoice).length;
  const best = voices[0];
  const customLabel = state.customVoiceName ? ` Custom voice: ${state.customVoiceName}.` : "";
  els.voiceInventory.textContent = `${studioCount} studio / ${neuralCount} neural / ${englishCount} English voices. Best: ${best.name}.${customLabel}`;
}

function renderPublishAccounts() {
  if (!els.channelList) return;
  state.publishCarouselIndex = clamp(Math.round(Number(state.publishCarouselIndex) || 0), 0, publishTargets.length - 1);
  els.channelList.innerHTML = publishTargets.map((target, index) => {
    const connected = Boolean(state.connectedAccounts?.[target.name]);
    return `
      <article class="publish-account-card${connected ? " is-connected" : ""}${index === state.publishCarouselIndex ? " is-active" : ""}" style="--accent:${target.accent}" ${index === state.publishCarouselIndex ? "" : "hidden"}>
        <div class="publish-platform-center">
          <strong>${escapeHtml(target.name)}</strong>
          <small>${connected ? `Connected to ${target.account}` : `Connect ${target.account}`}</small>
        </div>
        ${connected ? `<span class="publish-connected-pill">Connected</span>` : `<button class="icon-text-button" type="button" data-publish-action="connect" data-channel="${escapeHtml(target.name)}"><svg class="ico"><use href="#icon-user-circle"></use></svg>Connect account</button>`}
      </article>
    `;
  }).join("");
  if (els.publishDots) {
    els.publishDots.innerHTML = publishTargets.map((target, index) => `<button type="button" class="${index === state.publishCarouselIndex ? "is-active" : ""}" data-publish-dot="${index}" aria-label="Show ${escapeHtml(target.name)}"></button>`).join("");
    els.publishDots.querySelectorAll("[data-publish-dot]").forEach((button) => {
      button.addEventListener("click", () => {
        state.publishCarouselIndex = Number(button.dataset.publishDot);
        persistState();
        renderPublishAccounts();
      });
    });
  }
}

function movePublishCarousel(direction) {
  state.publishCarouselIndex = (clamp(Math.round(Number(state.publishCarouselIndex) || 0), 0, publishTargets.length - 1) + direction + publishTargets.length) % publishTargets.length;
  persistState();
  renderPublishAccounts();
}

function handlePublishAccountClick(event) {
  const button = event.target.closest("[data-publish-action]");
  if (!button) return;
  const channel = button.dataset.channel;
  if (button.dataset.publishAction === "connect") {
    connectPublishAccount(channel);
    return;
  }
  publishAudiobook([channel]);
}

function connectPublishAccount(channel) {
  const target = publishTargets.find((candidate) => candidate.name === channel);
  if (!target) return;
  if (target.connectUrl) {
    window.open(target.connectUrl, "_blank", "noopener,noreferrer");
  }
  state.connectedAccounts = {
    ...defaultState.connectedAccounts,
    ...(state.connectedAccounts || {}),
    [channel]: true
  };
  state.channels = selectedChannels();
  persistState();
  renderPublishAccounts();
  renderReleasePreview();
  setStatus(`${channel} connection opened. Finish sign-in in the provider portal.`);
}

function renderReleasePreview() {
  const words = countWords(state.manuscript);
  const minutes = estimateMinutes(words);
  const quality = averageVoiceQuality();
  const channels = selectedChannels();
  const connected = connectedPublishChannels();
  els.releasePreview.innerHTML = `
    <dl>
      <div>
        <dt>Title</dt>
        <dd>${escapeHtml(state.title)}</dd>
      </div>
      <div>
        <dt>Author</dt>
        <dd>${escapeHtml(state.author)}</dd>
      </div>
      <div>
        <dt>Format</dt>
        <dd>${escapeHtml(state.format)}</dd>
      </div>
      <div>
        <dt>Runtime</dt>
        <dd>${formatDuration(state.targetDurationSeconds)}</dd>
      </div>
      <div>
        <dt>Pages</dt>
        <dd>${formatNumber(state.targetPages)}</dd>
      </div>
      <div>
        <dt>Plan Chapters</dt>
        <dd>${formatNumber(state.targetChapters)}</dd>
      </div>
      <div>
        <dt>Manuscript Estimate</dt>
        <dd>${minutes} minutes</dd>
      </div>
      <div>
        <dt>Voice Quality</dt>
        <dd>${qualityLabel(quality)} (${quality}%)</dd>
      </div>
      <div>
        <dt>Channels</dt>
        <dd>${escapeHtml(channels.join(", ") || "Unlisted")}</dd>
      </div>
      <div>
        <dt>Connected</dt>
        <dd>${escapeHtml(connected.join(", ") || "Connect an account")}</dd>
      </div>
    </dl>
  `;
}

function renderLibrary() {
  els.libraryGrid.innerHTML = "";
  if (!library.length) {
    els.libraryGrid.innerHTML = '<div class="empty-state">No published audiobooks yet.</div>';
    return;
  }
  library.forEach((book) => {
    const card = document.createElement("article");
    card.className = "library-card";
    card.innerHTML = `
      <img src="assets/studio-cover.png" alt="">
      <div class="library-body">
        <div>
          <strong>${escapeHtml(book.title)}</strong>
          <p class="meta-line">${escapeHtml(book.author)} - ${escapeHtml(book.genre)} - ${book.runtimeMinutes}m</p>
          <p class="meta-line">${escapeHtml(book.channels.join(", "))}</p>
        </div>
        <div class="library-actions">
          <button class="icon-text-button" type="button" data-action="preview">
            <svg class="ico"><use href="#icon-play"></use></svg>
            Preview
          </button>
          <button class="icon-text-button" type="button" data-action="download">
            <svg class="ico"><use href="#icon-download"></use></svg>
            Metadata
          </button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="preview"]').addEventListener("click", () => speakText(book.summary || book.title, "narrator"));
    card.querySelector('[data-action="download"]').addEventListener("click", () => downloadJson(book, `${slugify(book.title)}-metadata.json`));
    els.libraryGrid.appendChild(card);
  });
}

function renderCreateBookPlaylist() {
  if (!els.createBookPlaylist) return;
  const items = library.length ? library.slice(0, 8) : [currentPackage()];
  els.createBookPlaylist.innerHTML = items.map((book, index) => `
    <article class="created-book-row${index === 0 ? " is-active" : ""}" data-book-index="${index}">
      <img src="assets/studio-cover.png" alt="">
      <span>
        <strong>${escapeHtml(book.title || "Untitled Audiobook")}</strong>
        <small>${escapeHtml(book.author || state.author)} - ${escapeHtml(book.genre || "Audiobook")} - ${escapeHtml(book.runtime || formatDuration(state.targetDurationSeconds))}</small>
      </span>
      <div class="created-book-actions">
        <button class="icon-button" type="button" data-action="preview" aria-label="Preview ${escapeHtml(book.title || state.title)}"><svg class="ico"><use href="#icon-play"></use></svg></button>
        <button class="icon-button" type="button" data-action="publish" aria-label="Publish ${escapeHtml(book.title || state.title)}"><svg class="ico"><use href="#icon-upload"></use></svg></button>
      </div>
    </article>
  `).join("");
  els.createBookPlaylist.querySelectorAll(".created-book-row").forEach((button) => {
    button.addEventListener("click", () => {
      const book = items[Number(button.dataset.bookIndex)] || items[0];
      openCreatedBookPlayer(book);
    });
    button.querySelector('[data-action="preview"]').addEventListener("click", (event) => {
      event.stopPropagation();
      const book = items[Number(button.dataset.bookIndex)] || items[0];
      openCreatedBookPlayer(book);
    });
    button.querySelector('[data-action="publish"]').addEventListener("click", (event) => {
      event.stopPropagation();
      const book = items[Number(button.dataset.bookIndex)] || items[0];
      state.title = book.title || state.title;
      state.summary = book.summary || state.summary;
      publishAudiobook();
    });
  });
}

function openCreatedBookPlayer(book) {
  stopAllPlayback();
  state.title = book.title || state.title;
  state.author = book.author || state.author;
  state.genre = book.genre || state.genre;
  state.summary = book.summary || state.summary;
  if (Array.isArray(book.chapters) && book.chapters.length) {
    state.manuscript = book.chapters.map((chapter) => [
      `Chapter ${chapter.index}: ${chapter.title}`,
      ...(chapter.lines || []).map((line) => `${line.speakerName || "Narrator"}: ${line.text || ""}`)
    ].join("\n")).join("\n\n");
    parsedBook = parseManuscript(state.manuscript);
  }
  openedBookComments = [
    { author: "Avery", text: "The pacing on this version feels much stronger.", time: "Comment" },
    { author: "June", text: "This one is ready for a release pass once the cover is locked.", time: "Comment" },
    { author: "Malik", text: "The cast separation works. I would keep this voice direction.", time: "Comment" }
  ];
  switchView("live");
  enterLiveRoom("song_lab");
  renderLiveChat(openedBookComments);
  setStatus(`${state.title} opened in playback`);
}

function renderThemePicker() {
  if (!els.themePicker) return;
  els.themePicker.innerHTML = "";
  themeOptions.forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `theme-swatch${theme.id === state.theme ? " is-active" : ""}`;
    button.dataset.theme = theme.id;
    button.style.setProperty("--swatch", theme.accent);
    button.innerHTML = `${escapeHtml(theme.name)}<span>${theme.cost ? `${formatNumber(theme.cost)} coins` : "Free"}</span>`;
    els.themePicker.appendChild(button);
  });
}

function renderSongPlayer() {
  if (!els.songProgress) return;
  const isPlaying = Boolean(songProgressTimer);
  const duration = bookPlaybackDurationSeconds();
  els.songProgress.max = String(duration);
  els.songProgress.value = String(Math.round(songProgressSeconds));
  els.songPlayerTime.textContent = `${formatSongTime(songProgressSeconds)} / ${formatSongTime(duration)}`;
  els.songPlayerTitle.textContent = state.languageOutput.trim().split(/\r?\n/)[0] || `${state.title} audiobook`;
  els.songPlayPauseButton.innerHTML = `
    <svg class="ico"><use href="#${isPlaying ? "icon-pause" : "icon-play"}"></use></svg>
    ${isPlaying ? "Pause Book" : "Play Book"}
  `;
}

function renderProfile() {
  if (!els.profileStatsGrid) return;
  syncOwnProfile();
  const person = profilePeople[state.profileFocusId] || profilePeople.connor;
  state.profileFocusId = person.id;
  const ownImage = person.id === "connor" ? state.profile.image : "";
  const mascot = mascotOptions.find((candidate) => candidate.id === person.avatar) || selectedMascot();
  els.profileAvatarLarge.innerHTML = ownImage ? `<img src="${escapeHtml(ownImage)}" alt="">` : mascotMarkup(mascot);
  els.profileRole.textContent = person.role;
  els.profileDisplayName.textContent = person.name;
  els.profileHandle.textContent = person.handle;
  els.profileBio.textContent = person.bio;
  els.profileEditButton.hidden = person.id !== "connor";
  renderProfileStats();
  renderProfileWork();
  renderProfileLevel();
}

function renderProfileLevel() {
  if (!els.profileLevelFill) return;
  const xp = Math.max(0, Math.round(Number(state.profileXp) || 0));
  let level = 0;
  let spent = 0;
  while (xp - spent >= (level + 1) * 1000) {
    level += 1;
    spent += level * 1000;
  }
  const currentXp = xp - spent;
  const nextRequired = (level + 1) * 1000;
  const progress = clamp((currentXp / nextRequired) * 100, 0, 100);
  els.profileLevelFill.style.width = `${progress}%`;
  els.profileLevelLabel.textContent = `Level ${level}`;
  els.profileXpLabel.textContent = `${formatNumber(currentXp)} / ${formatNumber(nextRequired)} XP to Level ${level + 1}`;
}

function renderProfileStats() {
  const labels = [
    { key: "posts", label: "Posts" },
    { key: "followers", label: "Followers" },
    { key: "friends", label: "Friends" }
  ];
  els.profileStatsGrid.innerHTML = "";
  labels.forEach((group) => {
    const ids = group.key === "posts" ? profileNetwork.posts : (profileNetwork[group.key] || []);
    const details = document.createElement("details");
    details.className = "profile-stat-dropdown";
    details.innerHTML = `
      <summary>
        <strong>${ids.length}</strong>
        <span>${group.label}</span>
      </summary>
      <div class="profile-person-list"></div>
    `;
    const list = details.querySelector(".profile-person-list");
    if (group.key === "posts") {
      profilePosts().forEach((post) => {
        const button = document.createElement("button");
        button.type = "button";
        button.innerHTML = `
          <span>${escapeHtml(post.icon)}</span>
          <strong>${escapeHtml(post.title)}</strong>
          <small>${escapeHtml(post.meta)}</small>
        `;
        button.addEventListener("click", () => setStatus(`${post.title} opened`));
        list.appendChild(button);
      });
      els.profileStatsGrid.appendChild(details);
      return;
    }
    ids.forEach((id) => {
      const person = profilePeople[id];
      if (!person) return;
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.personId = person.id;
      button.innerHTML = `
        <span>${escapeHtml(person.avatar)}</span>
        <strong>${escapeHtml(person.name)}</strong>
        <small>${escapeHtml(person.handle)}</small>
      `;
      button.addEventListener("click", () => openProfile(person.id));
      button.addEventListener("contextmenu", (event) => showPersonContextMenu(event, person.id));
      list.appendChild(button);
    });
    els.profileStatsGrid.appendChild(details);
  });
}

function renderProfileWork() {
  const items = library.length ? library.slice(0, 4) : [
    currentPackage(),
    { title: "Midnight Library Sample", author: state.author, genre: "Audiobook", runtime: "0:03:40", voiceQuality: averageVoiceQuality() }
  ];
  els.profileWorkGrid.innerHTML = items.map((item) => `
    <article>
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.genre || "Audiobook")} - ${escapeHtml(item.runtime || formatDuration(state.targetDurationSeconds))}</span>
    </article>
  `).join("");
}

function profilePosts() {
  return [
    { icon: "B", title: state.title || "Untitled Audiobook", meta: `${state.genre} draft` },
    { icon: "L", title: "Live Room Clip", meta: selectedLiveRoom().title }
  ];
}

function renderMessages() {
  if (!els.messageList) return;
  const tab = messageThreads[state.messageTab] ? state.messageTab : "requests";
  state.messageTab = tab;
  const label = tab === "friends" ? "Friend Requests" : tab === "visits" ? "Profile Visits" : "Message Requests";
  els.messagesHeading.textContent = label;
  document.querySelectorAll(".message-tabs [data-message-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.messageTab === tab);
  });
  document.querySelectorAll(".profile-message-columns [data-message-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.messageTab === tab);
  });
  els.messageList.innerHTML = messageThreads[tab].map((thread) => `
    <article class="message-thread">
      <div>
        <strong>${escapeHtml(thread.title)}</strong>
        <span>${escapeHtml(thread.from)}</span>
      </div>
      <p>${escapeHtml(thread.preview)}</p>
      ${thread.unread ? `<b>${thread.unread}</b>` : ""}
    </article>
  `).join("");
}

function handleSearchSortClick(mode) {
  if (!mode) return;
  if (mode === 'recommended') searchSortMode = 'recommended';
  else if (searchSortMode === mode) searchSortDirections[mode] = (searchSortDirections[mode] || 1) * -1;
  else searchSortMode = mode;
  renderSearchResults();
}

function renderSearchResults() {
  if (!els.searchResults) return;
  const query = (els.searchInput?.value || "").trim().toLowerCase();
  const items = audiobookCatalog.filter((item) => {
    if (!query) return true;
    return `${item.genre} ${item.title} ${item.category}`.toLowerCase().includes(query);
  });
  const sort = searchSortMode || 'recommended';
  if (els.searchSortButtons) els.searchSortButtons.forEach((button) => {
    const mode = button.dataset.searchSort || 'recommended';
    const active = mode === sort;
    button.classList.toggle('is-active', active);
    const suffix = active && mode !== 'recommended' ? ((searchSortDirections[mode] || 1) > 0 ? ' Up' : ' Down') : '';
    button.textContent = mode === 'age' ? 'Age' + suffix : titleCase(mode) + suffix;
  });
  items.sort((a, b) => {
    if (sort === 'alphabetical') return (searchSortDirections.alphabetical || 1) * a.title.localeCompare(b.title);
    if (sort === 'age') return (searchSortDirections.age || -1) * (b.date - a.date);
    if (sort === 'popular') return (searchSortDirections.popular || -1) * (b.popularity - a.popularity);
    return (b.popularity - a.popularity) || (b.date - a.date);
  });
  els.searchResults.innerHTML = items.length ? "" : `
    <article class="search-result-card">
      <span>No matches</span>
      <strong>Try another search</strong>
      <small>Audiobooks, rooms, and releases appear here.</small>
    </article>
  `;
  items.slice(0, 80).forEach((item) => {
    const card = document.createElement("article");
    card.className = "search-result-card search-image-card";
    card.innerHTML = `
      <div class="catalog-cover" style="--cover-hue:${(item.popularity * 3) % 360};--cover-alt:${(item.minutes * 5) % 360}">
        <span>${escapeHtml(item.genre.slice(0, 2).toUpperCase())}</span>
      </div>
      <span>${escapeHtml(item.genre)} - ${escapeHtml(item.category)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${formatNumber(item.listeners)} listeners - ${formatNumber(Math.max(40000, item.words || Math.round(item.minutes * narrationWordsPerMinute)))} words - ${formatNumber(item.minutes)} min</small>
      <button class="icon-text-button" type="button">Enter</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      switchView("live");
      enterCatalogRoom(item);
    });
    els.searchResults.appendChild(card);
  });
}

function renderLiveExperience() {
  if (!els.liveRoomGrid) return;
  els.views.live.classList.toggle("is-room-open", Boolean(state.enteredRoomId));
  renderTrackSlider();
  renderLiveRooms();
  renderRoomStage();
}

function renderTrackSlider() {
  const tracks = liveTracks();
  clampActiveTrack();
  const active = tracks[state.activeTrackIndex] || tracks[0];
  els.trackSlider.max = String(Math.max(0, tracks.length - 1));
  els.trackSlider.value = String(state.activeTrackIndex);
  els.activeTrackTitle.textContent = `${active.index}. ${active.title}`;
  els.activeTrackMeta.textContent = `${active.runtime} target - ${active.lines} lines - ${formatNumber(active.words)} words`;
  els.trackPrevButton.disabled = state.activeTrackIndex <= 0;
  els.trackNextButton.disabled = state.activeTrackIndex >= tracks.length - 1;
}

function renderLiveRooms() {
  els.liveRoomGrid.innerHTML = "";
  ["Oldest / Longest", "Popular", "New"].forEach((category) => {
    const column = document.createElement("section");
    column.className = "live-category-column";
    column.innerHTML = `<h3>${escapeHtml(category)}</h3><div class="live-category-grid"></div>`;
    const grid = column.querySelector(".live-category-grid");
    audiobookCatalog.filter((item) => item.category === category).slice(0, 12).forEach((item) => {
      grid.appendChild(renderLiveRoomCard(item));
    });
    els.liveRoomGrid.appendChild(column);
  });
}

function enterCatalogRoom(item) {
  const roomId = liveRooms[Math.abs(item.id.length + item.title.length) % liveRooms.length].id;
  const targetWords = Math.max(40000, Number(item.words) || Math.round((item.minutes || 260) * narrationWordsPerMinute));
  const chapterCount = clamp(Math.round(targetWords / 9000), 4, 8);
  state.title = item.title;
  state.genre = item.genre;
  state.targetPages = clamp(Math.ceil(targetWords / wordsPerPage), minPlannedPages, maxPlannedPages);
  state.targetChapters = chapterCount;
  state.targetDurationSeconds = clampDuration(Math.ceil((targetWords / narrationWordsPerMinute) * 60));
  state.manuscript = buildTimedBookDraft(targetWords, chapterCount, [item.genre, item.category, item.title]);
  parsedBook = parseManuscript(state.manuscript);
  state.activeTrackIndex = 0;
  state.activeChapterIndex = 0;
  enterLiveRoom(roomId);
  state.activeRoomId = roomId;
  els.roomStageTitle.textContent = item.title;
}

function renderLiveRoomCard(item) {
  const card = document.createElement("article");
  const estimatedWords = Math.max(40000, Number(item.words) || Math.round(item.minutes * narrationWordsPerMinute));
  card.className = "live-room-card image-room-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Enter ${item.title}`);
  card.style.setProperty("--accent", item.accent);
  card.innerHTML = `
    <div class="catalog-cover" style="--cover-hue:${(item.popularity * 3) % 360};--cover-alt:${(item.minutes * 5) % 360}"></div>
    <div class="live-room-meta-strip">
      <span>${formatNumber(estimatedWords)} words</span>
      <span>${formatNumber(item.minutes)} min</span>
    </div>
    <div class="image-room-overlay">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${formatNumber(item.listeners)} listening</span>
    </div>
  `;
  const enter = () => enterCatalogRoom(item);
  card.addEventListener("click", enter);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enter();
    }
  });
  return card;
}

function renderRoomStage() {
  const room = selectedLiveRoom();
  const isEntered = state.enteredRoomId === room.id;
  if (isEntered) {
    ensureLiveManuscript(room);
  }
  const track = activeLiveTrack();
  const chat = liveChatForRoom(room.id);
  els.roomStageTitle.textContent = room.title;
  els.roomStageMeta.textContent = `${isEntered ? "Inside" : room.status} - ${room.listeners} listening`;
  els.roomPresence.textContent = isEntered
    ? `${room.title} is playing live.`
    : `Enter ${room.title} to listen and comment.`;
  els.leaveRoomButton.hidden = !isEntered;
  els.liveChatInput.disabled = !isEntered;
  els.sendChatButton.disabled = !isEntered;
  els.liveChatInput.placeholder = isEntered ? "Comment in this live room" : "Enter the room to comment";
  els.roomStagePlayer.style.setProperty("--accent", room.accent);
  els.roomStagePlayer.style.setProperty("--room-bg", room.gradient);
  const duration = liveTrackDurationSeconds();
  const remaining = Math.max(0, duration - liveAudioProgressSeconds);
  const livePage = currentLivePage();
  els.roomStagePlayer.innerHTML = isEntered ? `
    <div class="audible-player">
      <div class="audible-top-row">
        <button class="icon-button red-back-button" id="roomBackButton" type="button" aria-label="Back to rooms" title="Back to rooms">
          <svg class="ico"><use href="#icon-chevron-left"></use></svg>
        </button>
        <button class="icon-button red-close-button" id="roomMenuButton" type="button" aria-label="Close room" title="Close room">
          <span aria-hidden="true">X</span>
        </button>
      </div>
      <div class="audible-heading">
        <span>Chapter ${track.index}</span>
        <strong>${escapeHtml(track.title)}</strong>
      </div>
      <div class="audible-cover podcast-cover-art">
        <span>${escapeHtml(state.title || room.title)}</span>
      </div>
      <article class="live-page-reader" aria-label="Current audiobook page">
        <header>
          <span id="livePageNumber">Page ${livePage.page} / ${livePage.totalPages}</span>
          <span id="livePageWords">${formatNumber(livePage.words)} words</span>
        </header>
        <p id="livePageText">${escapeHtml(livePage.text)}</p>
      </article>
      <input id="liveAudioProgress" type="range" min="0" max="${duration}" value="${Math.round(liveAudioProgressSeconds)}" aria-label="Live audiobook progress">
      <span class="audible-remaining">${formatSongTime(remaining)} remaining</span>
      <div class="audible-controls">
        <button class="icon-button" id="livePrevTrackButton" type="button" aria-label="Previous chapter" title="Previous chapter">
          <svg class="ico"><use href="#icon-chevron-left"></use></svg>
        </button>
        <button class="audible-skip audible-skip-back" id="liveRewindButton" type="button" aria-label="Rewind 30 seconds"><span>30</span></button>
        <button class="audible-play" id="livePlayPauseButton" type="button" aria-label="${liveAudioPlaying ? "Pause audiobook" : "Play audiobook"}">
          <svg class="ico"><use href="#${liveAudioPlaying ? "icon-pause" : "icon-play"}"></use></svg>
        </button>
        <button class="audible-skip audible-skip-forward" id="liveForwardButton" type="button" aria-label="Forward 30 seconds"><span>30</span></button>
        <button class="icon-button" id="liveNextTrackButton" type="button" aria-label="Next chapter" title="Next chapter">
          <svg class="ico"><use href="#icon-chevron-right"></use></svg>
        </button>
      </div>
      <div class="audible-bottom-row">
        <button type="button" id="liveChaptersButton">Chapters<span>List</span></button>
        <button type="button" id="liveShareSectionButton">Share<span>Section</span></button>
        <button type="button" id="liveShareBookButton">Share<span>Book</span></button>
      </div>
      <label class="live-speed-control">
        <span>Speed <b id="liveSpeedValue">${livePlaybackRate.toFixed(2)}x</b></span>
        <input id="liveSpeedRange" type="range" min="0.5" max="2" step="0.05" value="${livePlaybackRate}" aria-label="Live playback speed">
      </label>
      <label class="live-volume-control">
        <span>Volume</span>
        <input id="liveVolumeRange" type="range" min="0" max="1" step="0.05" value="${liveVolume}" aria-label="Live volume">
      </label>
      <div class="live-chapter-menu" id="liveChapterMenu" hidden></div>
      <div class="live-share-menu" id="liveShareMenu" hidden></div>
    </div>
  ` : `
    <div class="room-empty-state" hidden></div>
  `;
  if (isEntered) {
    els.roomStagePlayer.querySelector("#roomBackButton").addEventListener("click", leaveLiveRoom);
    els.roomStagePlayer.querySelector("#roomMenuButton").addEventListener("click", leaveLiveRoom);
    els.roomStagePlayer.querySelector("#livePlayPauseButton").addEventListener("click", toggleLiveAudiobookPlayback);
    els.roomStagePlayer.querySelector("#liveRewindButton").addEventListener("click", () => seekLiveAudiobook(-30));
    els.roomStagePlayer.querySelector("#liveForwardButton").addEventListener("click", () => seekLiveAudiobook(30));
    els.roomStagePlayer.querySelector("#livePrevTrackButton").addEventListener("click", () => moveActiveTrack(-1));
    els.roomStagePlayer.querySelector("#liveNextTrackButton").addEventListener("click", () => moveActiveTrack(1));
    els.roomStagePlayer.querySelector("#liveAudioProgress").addEventListener("input", (event) => setLiveAudiobookProgress(Number(event.target.value)));
    els.roomStagePlayer.querySelector("#liveSpeedRange").addEventListener("input", (event) => setLivePlaybackRate(Number(event.target.value)));
    els.roomStagePlayer.querySelector("#liveChaptersButton").addEventListener("click", toggleLiveChapterList);
    els.roomStagePlayer.querySelector("#liveShareSectionButton").addEventListener("click", () => shareLiveAudio("section"));
    els.roomStagePlayer.querySelector("#liveShareBookButton").addEventListener("click", () => shareLiveAudio("book"));
    els.roomStagePlayer.querySelector("#liveVolumeRange").addEventListener("input", (event) => setLiveVolume(Number(event.target.value)));
  }
  renderLiveChat(chat);
}

function renderLiveChat(chat = liveChatForRoom(selectedLiveRoom().id)) {
  els.liveChatMessages.innerHTML = chat.map((message) => `
    <div class="chat-message${message.author === "You" ? " is-you" : ""}" style="--chat-hue:${hashText(message.author) % 360}">
      <strong>${escapeHtml(message.author)}</strong>
      <p>${escapeHtml(message.text)}</p>
      <span>${escapeHtml(message.time)}</span>
    </div>
  `).join("");
  els.liveChatMessages.scrollTop = els.liveChatMessages.scrollHeight;
}

function renderOtherSites() {
  if (!els.otherSiteGrid) return;
  const pkg = currentPackage();
  els.otherSiteGrid.innerHTML = "";
  otherSiteTargets.forEach((target) => {
    const card = document.createElement("article");
    card.className = "other-site-card";
    card.style.setProperty("--accent", target.accent);
    card.innerHTML = `
      <div class="other-site-head">
        <span class="site-mark">${escapeHtml(target.name.slice(0, 2).toUpperCase())}</span>
        <span>
          <strong>${escapeHtml(target.name)}</strong>
          <span>${escapeHtml(target.status)}</span>
        </span>
      </div>
      <dl>
        <div>
          <dt>Format</dt>
          <dd>${escapeHtml(target.format)}</dd>
        </div>
        <div>
          <dt>Runtime</dt>
          <dd>${escapeHtml(pkg.runtime)}</dd>
        </div>
        <div>
          <dt>Voice</dt>
          <dd>${escapeHtml(qualityLabel(pkg.voiceQuality))} (${pkg.voiceQuality}%)</dd>
        </div>
      </dl>
      <button class="icon-text-button" type="button">
        <svg class="ico"><use href="#icon-upload"></use></svg>
        Package
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => exportOtherSitePackage(target.name));
    els.otherSiteGrid.appendChild(card);
  });
}

async function createTimedBook() {
  handleInputChange();
  readPlanInputs(true);
  const targetWords = targetWordCount();
  const chapterCount = state.targetChapters;
  const duration = formatDuration(state.targetDurationSeconds);
  const sections = planSections();
  const versionCount = clamp(Math.round(Number(state.generationCount) || 2), 1, 5);
  setStatus(`Writing ${versionCount} versions across ${chapterCount} chapters`);
  const prompt = [
    `Write an original ${state.genre} audiobook manuscript titled "${state.title}" by ${state.author}.`,
    state.ideaPrompt ? `User idea: ${state.ideaPrompt}.` : "",
    state.songStyle ? `Preferred styles, themes, and tone: ${state.songStyle}.` : "",
    state.excludedStyles ? `Avoid these styles: ${state.excludedStyles}.` : "",
    `Background structure only: ${state.targetPages} pages, ${chapterCount} chapters, about ${targetWords} words at ${wordsPerPage} words per page.`,
    `Estimated audiobook runtime is ${duration} at ${narrationWordsPerMinute} narrated words per minute; use this only for pacing.`,
    `Use these sections as private structure: ${sections.join("; ")}.`,
    "Return only the reader-facing manuscript: title, part/chapter headings, polished narration prose, and natural character dialogue.",
    "Do not print page targets, purpose labels, scene lists, narrator notes, character notes, production notes, or planning metadata.",
    "Make it sound like an actual book being read aloud, not a list of properties."
  ].filter(Boolean).join("\n");
  const fallback = buildTimedBookDraft(targetWords, chapterCount, sections);
  const results = [];
  for (let index = 0; index < versionCount; index += 1) {
    const variantPrompt = `${prompt}\nVariation ${index + 1}: use a distinct chapter rhythm, voice texture, and audiobook word choice while preserving the same core idea.`;
    const variantFallback = index === 0 ? fallback : buildTimedBookDraft(targetWords, chapterCount, sections)
      .replace(state.title, `${state.title}: Version ${index + 1}`)
      .replaceAll("The library", index % 2 ? "The archive" : "The listening room");
    results.push(ensureGeneratedLength(sanitizeGeneratedBookText(await runTextGeneration(variantPrompt, variantFallback)), targetWords, chapterCount, sections));
  }
  state.languageOutput = "";
  if (els.languageOutput) {
    els.languageOutput.value = "";
  }
  results.slice().reverse().forEach((text, index) => {
    const versionNumber = results.length - index;
    library.unshift({
      ...currentPackage(),
      id: `draft-${Date.now()}-${versionNumber}`,
      title: `${state.title} - Version ${versionNumber}`,
      summary: storyExcerpt(text, 42),
      status: "Draft",
      publishedAt: new Date().toISOString()
    });
  });
  saveLibrary();
  updateManuscriptFromText(results[0], `Created ${versionCount} book version${versionCount === 1 ? "" : "s"}`);
  renderCreateBookPlaylist();
}

async function handleGenerateBookClick() {
  syncLanguageState();
  const mode = normalizeLanguageMode(state.languageMode);
  if (mode === "translate") {
    await translateManuscript();
    return;
  }
  if (mode === "both") {
    await translateManuscript();
    await generateBookOutput();
    return;
  }
  await generateBookOutput();
}

async function translateManuscript() {
  syncLanguageState();
  const language = state.targetLanguage || "English";
  setStatus(`Translating audiobook to ${language}`);
  const prompt = [
    `Translate this audiobook manuscript into ${language}.`,
    "Preserve chapter headings, speaker labels, line breaks, pacing, and character names unless a localized name is natural.",
    "Return only the translated manuscript.",
    "",
    state.manuscript
  ].join("\n");
  const fallback = buildOfflineTranslation(language);
  const result = sanitizeGeneratedBookText(await runTextGeneration(prompt, fallback));
  state.languageOutput = result;
  els.languageOutput.value = result;
  persistState();
  setStatus(`Translation ready in ${language}`);
}

async function generateBookOutput() {
  syncLanguageState();
  readPlanInputs(true);
  const language = state.targetLanguage || "English";
  const style = state.songStyle || "cinematic mystery narration";
  setStatus(`Generating ${language} audiobook`);
  const prompt = [
    `Create an original audiobook draft in ${language}.`,
    `Style: ${style}.`,
    `Use this as private structure: ${state.targetPages} pages, ${state.targetChapters} chapters, sections: ${planSections().join("; ")}.`,
    `Pace it for roughly ${formatNumber(targetWordCount())} words, with runtime derived from words.`,
    "Return only the reader-facing manuscript: title, part/chapter headings, narration prose, and natural dialogue.",
    "Do not include page targets, purposes, scene lists, narrator direction, character notes, production notes, or planning labels.",
    "Make it read like an actual audiobook manuscript.",
    "",
    state.manuscript
  ].join("\n");
  const fallback = buildOfflineBook(language, style);
  const result = sanitizeGeneratedBookText(await runTextGeneration(prompt, fallback));
  state.languageOutput = result;
  els.languageOutput.value = result;
  songProgressSeconds = 0;
  persistState();
  renderSongPlayer();
  setStatus(`${language} audiobook ready`);
}

function useGeneratedOutput() {
  const output = els.languageOutput.value.trim();
  if (!output) {
    setStatus("No language output to use");
    return;
  }
  state.manuscript = output;
  els.manuscriptInput.value = output;
  parsedBook = parseManuscript(state.manuscript);
  addMissingCharactersFromScript(false);
  clampActiveChapter();
  persistState();
  renderAll();
  setStatus("Language output moved into manuscript");
}

function playLanguageOutput() {
  const output = els.languageOutput.value.trim();
  if (!output) {
    setStatus("No language output to play");
    return;
  }
  const cast = state.cast.narrator || defaultState.cast.narrator;
  const text = output.slice(0, 900);
  if (shouldUseHdTts()) {
    speakHdLanguageOutput(text, cast);
    return;
  }
  speakText(text, "narrator");
}

function toggleSongPlayback() {
  if (songProgressTimer) {
    pauseSongPlayback();
    return;
  }
  startSongPlayback();
}

function startSongPlayback() {
  stopSpeech(false);
  const duration = bookPlaybackDurationSeconds();
  if (songProgressSeconds >= duration) {
    songProgressSeconds = 0;
  }
  stopSongNodes();
  if ("speechSynthesis" in window) {
    const text = bookPlaybackText();
    const cast = state.cast.narrator || defaultState.cast.narrator;
    songUtterance = new SpeechSynthesisUtterance(text);
    applyCastVoice(songUtterance, cast);
    songUtterance.volume = 1;
    songUtterance.onend = () => {
      songUtterance = null;
      stopSongPlayback(false);
      setStatus("Audiobook preview complete");
    };
    songUtterance.onerror = () => {
      songUtterance = null;
      stopSongPlayback(false);
      setStatus("Audiobook preview stopped");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(songUtterance);
    songProgressTimer = window.setInterval(() => {
      songProgressSeconds = Math.min(bookPlaybackDurationSeconds(), songProgressSeconds + 0.5);
      renderSongPlayer();
      if (songProgressSeconds >= bookPlaybackDurationSeconds()) {
        stopSongPlayback(false);
        setStatus("Audiobook preview complete");
      }
    }, 500);
    renderSongPlayer();
    setStatus("Audiobook narration playing");
    return;
  }
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    setStatus("Audiobook playback is unavailable in this browser");
    return;
  }
  songAudioContext = new AudioContextCtor();
  songGain = songAudioContext.createGain();
  songGain.gain.value = 0.16;
  songGain.connect(songAudioContext.destination);
  const base = 110 + Math.round((state.styleInfluence || 80) * 0.6);
  const spread = 1 + ((state.weirdness || 10) / 220);
  const tones = [base, base * 1.5 * spread, base * 2];
  songOscillators = tones.map((frequency, index) => {
    const osc = songAudioContext.createOscillator();
    const gain = songAudioContext.createGain();
    osc.type = index === 1 ? "triangle" : "sine";
    osc.frequency.value = frequency;
    gain.gain.value = index === 0 ? 0.72 : 0.34;
    osc.connect(gain);
    gain.connect(songGain);
    osc.start();
    return osc;
  });
  songProgressTimer = window.setInterval(() => {
    songProgressSeconds = Math.min(bookPlaybackDurationSeconds(), songProgressSeconds + 0.25);
    renderSongPlayer();
    if (songProgressSeconds >= bookPlaybackDurationSeconds()) {
      stopSongPlayback(false);
      setStatus("Audiobook preview complete");
    }
  }, 250);
  renderSongPlayer();
  setStatus("Audiobook playing");
}

function pauseSongPlayback() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause();
  }
  stopSongNodes();
  renderSongPlayer();
  setStatus("Audiobook paused");
}

function stopSongPlayback(resetProgress = true) {
  stopSongNodes();
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  songUtterance = null;
  if (resetProgress) {
    songProgressSeconds = 0;
  }
  renderSongPlayer();
}

function stopSongNodes() {
  if (songProgressTimer) {
    window.clearInterval(songProgressTimer);
    songProgressTimer = null;
  }
  songOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch {}
  });
  songOscillators = [];
  if (songAudioContext) {
    songAudioContext.close().catch(() => {});
    songAudioContext = null;
  }
  songGain = null;
}

function bookPlaybackText() {
  const output = (state.languageOutput || "").trim();
  const manuscript = (state.manuscript || "").trim();
  const source = manuscript || output || `${state.title}. ${state.summary}`;
  const clean = source
    .replace(/^SECTION\b.*$/gim, "")
    .replace(/^PAGE TARGET:.*$/gim, "")
    .replace(/^BOOK PLAN:.*$/gim, "")
    .replace(/^(CHAPTER PURPOSE|PURPOSE|SCENES|AUDIO NOTES|CHARACTER NOTES|PRODUCTION NOTES|NARRATOR DIRECTION|CHAPTER BEATS|SECTION PLAN):.*$/gim, "")
    .replace(/\s+/g, " ")
    .trim();
  return clean.slice(0, 1800) || "Audiobook preview is ready.";
}

function bookPlaybackDurationSeconds() {
  updateRuntimeFromPlan();
  return clampDuration(state.targetDurationSeconds || defaultState.targetDurationSeconds);
}

function seekSongProgress(value) {
  songProgressSeconds = clamp(Number(value) || 0, 0, bookPlaybackDurationSeconds());
  renderSongPlayer();
}

function formatSongTime(seconds) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function toggleLiveAudiobookPlayback() {
  if (liveAudioPlaying) {
    pauseLiveAudiobookPlayback();
    return;
  }
  startLiveAudiobookPlayback();
}

function startLiveAudiobookPlayback() {
  if (!state.enteredRoomId) {
    setStatus("Enter a room first");
    return;
  }
  if (!("speechSynthesis" in window)) {
    setStatus("Live audiobook playback is unavailable in this browser");
    return;
  }
  stopSongPlayback(false);
  if (activeQueue.length) {
    window.speechSynthesis.resume();
  } else {
    const lines = liveAudiobookLines();
    if (!lines.length) {
      setStatus("No audiobook lines to play");
      return;
    }
    state.activeChapterIndex = Math.min(state.activeTrackIndex, Math.max(0, parsedBook.chapters.length - 1));
    liveAudioPlaying = true;
    speakBrowserQueue(lines);
  }
  liveAudioPlaying = true;
  startLiveAudioTimer();
  renderRoomStage();
  setStatus(`${selectedLiveRoom().title} audiobook playing`);
}

function pauseLiveAudiobookPlayback() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause();
  }
  liveAudioPlaying = false;
  stopLiveAudioTimer();
  renderRoomStage();
  setStatus("Live audiobook paused");
}

function stopLiveAudiobookPlayback(resetProgress = false) {
  liveAudioPlaying = false;
  stopLiveAudioTimer();
  activeQueue = [];
  activeQueueIndex = 0;
  if (resetProgress) {
    liveAudioProgressSeconds = 0;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function startLiveAudioTimer() {
  stopLiveAudioTimer();
  liveAudioTimer = window.setInterval(() => {
    liveAudioProgressSeconds = Math.min(liveTrackDurationSeconds(), liveAudioProgressSeconds + livePlaybackRate);
    updateLiveAudioProgressUi();
    if (liveAudioProgressSeconds >= liveTrackDurationSeconds()) {
      stopLiveAudiobookPlayback(false);
      setStatus("Live audiobook chapter complete");
      updateLiveAudioProgressUi();
    }
  }, 1000);
}

function stopLiveAudioTimer() {
  if (liveAudioTimer) {
    window.clearInterval(liveAudioTimer);
    liveAudioTimer = null;
  }
}

function seekLiveAudiobook(delta) {
  setLiveAudiobookProgress(liveAudioProgressSeconds + delta);
  setStatus(delta < 0 ? "Rewound 30 seconds" : "Skipped ahead 30 seconds");
}

function setLiveAudiobookProgress(value) {
  liveAudioProgressSeconds = clamp(Number(value) || 0, 0, liveTrackDurationSeconds());
  updateLiveAudioProgressUi();
}

function updateLiveAudioProgressUi() {
  const duration = liveTrackDurationSeconds();
  const remaining = Math.max(0, duration - liveAudioProgressSeconds);
  const progress = document.getElementById("liveAudioProgress");
  if (progress) {
    progress.max = String(duration);
    progress.value = String(Math.round(liveAudioProgressSeconds));
  }
  const remainingLabel = els.roomStagePlayer.querySelector(".audible-remaining");
  if (remainingLabel) {
    remainingLabel.textContent = `${formatSongTime(remaining)} remaining`;
  }
  const livePage = currentLivePage();
  const pageNumber = document.getElementById("livePageNumber");
  const pageWords = document.getElementById("livePageWords");
  const pageText = document.getElementById("livePageText");
  if (pageNumber) pageNumber.textContent = `Page ${livePage.page} / ${livePage.totalPages}`;
  if (pageWords) pageWords.textContent = `${formatNumber(livePage.words)} words`;
  if (pageText) pageText.textContent = livePage.text;
  const playButton = document.getElementById("livePlayPauseButton");
  if (playButton) {
    playButton.setAttribute("aria-label", liveAudioPlaying ? "Pause audiobook" : "Play audiobook");
    playButton.innerHTML = `<svg class="ico"><use href="#${liveAudioPlaying ? "icon-pause" : "icon-play"}"></use></svg>`;
  }
  const speedValue = document.getElementById("liveSpeedValue");
  if (speedValue) speedValue.textContent = `${livePlaybackRate.toFixed(2)}x`;
}

function cycleLivePlaybackSpeed() {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const currentIndex = speeds.findIndex((speed) => speed >= livePlaybackRate - 0.01);
  livePlaybackRate = speeds[(currentIndex + 1) % speeds.length];
  if (liveAudioPlaying) {
    stopLiveAudiobookPlayback(false);
    window.setTimeout(startLiveAudiobookPlayback, 0);
  } else {
    renderRoomStage();
  }
  setStatus(`Playback speed ${livePlaybackRate.toFixed(2)}x`);
}

function setLivePlaybackRate(value) {
  livePlaybackRate = clamp(Number(value) || 1, 0.5, 2);
  const speedValue = document.getElementById("liveSpeedValue");
  if (speedValue) speedValue.textContent = `${livePlaybackRate.toFixed(2)}x`;
  if (liveAudioPlaying) {
    stopLiveAudiobookPlayback(false);
    window.setTimeout(startLiveAudiobookPlayback, 0);
  }
  setStatus(`Playback speed ${livePlaybackRate.toFixed(2)}x`);
}

function setLiveVolume(value) {
  liveVolume = clamp(Number(value), 0, 1);
  setStatus(`Live volume ${Math.round(liveVolume * 100)}%`);
}

function ensureLiveManuscript(room = selectedLiveRoom()) {
  const totalWords = countWords(state.manuscript || "");
  const tracks = parsedBook?.chapters?.length ? tracksFromChapters(parsedBook.chapters) : [];
  const weakestChapterWords = tracks.length ? Math.min(...tracks.map((track) => track.words || 0)) : 0;
  if (totalWords >= 40000 && weakestChapterWords >= 3000) return;
  const targetWords = Math.max(45000, Number(state.targetPages || 0) * wordsPerPage || 45000);
  const chapterCount = clamp(Math.round(targetWords / 9000), 4, 8);
  state.targetPages = clamp(Math.ceil(targetWords / wordsPerPage), minPlannedPages, maxPlannedPages);
  state.targetChapters = chapterCount;
  state.targetDurationSeconds = clampDuration(Math.ceil((targetWords / narrationWordsPerMinute) * 60));
  state.manuscript = buildTimedBookDraft(targetWords, chapterCount, [state.genre || room.title, room.title, "Full live audiobook"]);
  parsedBook = parseManuscript(state.manuscript);
  state.activeTrackIndex = clamp(state.activeTrackIndex || 0, 0, Math.max(0, parsedBook.chapters.length - 1));
  state.activeChapterIndex = state.activeTrackIndex;
}

function toggleLiveChapterList() {
  const menu = document.getElementById("liveChapterMenu");
  if (!menu) return;
  menu.hidden = !menu.hidden;
  if (menu.hidden) return;
  menu.innerHTML = liveTracks().map((track, index) => `
    <button type="button" class="${index === state.activeTrackIndex ? "is-active" : ""}" data-track-index="${index}">
      <strong>${escapeHtml(track.title)}</strong>
      <span>${escapeHtml(track.runtime)} - ${formatNumber(track.words)} words</span>
    </button>
  `).join("");
  menu.querySelectorAll("[data-track-index]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTrack(Number(button.dataset.trackIndex), true);
      const updatedMenu = document.getElementById("liveChapterMenu");
      if (updatedMenu) updatedMenu.hidden = true;
    });
  });
}

async function shareLiveAudio(scope) {
  const menu = document.getElementById("liveShareMenu");
  if (menu) {
    menu.hidden = !menu.hidden;
    if (!menu.hidden) {
      menu.innerHTML = shareTargets().map((target) => `
        <button type="button" data-share-target="${escapeHtml(target.id)}">
          <strong>${escapeHtml(target.label)}</strong>
          <span>${escapeHtml(target.description)}</span>
        </button>
      `).join("");
      menu.querySelectorAll("[data-share-target]").forEach((button) => {
        button.addEventListener("click", () => openShareTarget(scope, button.dataset.shareTarget));
      });
    }
    return;
  }
  await openShareTarget(scope, "native");
}

function shareTargets() {
  return [
    { id: "x", label: "X", description: "Post a share link" },
    { id: "facebook", label: "Facebook", description: "Share to feed" },
    { id: "instagram", label: "Instagram", description: "Copy for story or DM" },
    { id: "mail", label: "Mail", description: "Send by email" },
    { id: "whatsapp", label: "WhatsApp", description: "Send to chats" },
    { id: "podcast", label: "Podcast Apps", description: "Use system share" }
  ];
}

async function openShareTarget(scope, targetId) {
  const track = activeLiveTrack();
  const text = scope === "section"
    ? `${state.title}: ${track.title}`
    : `${state.title} by ${state.author}`;
  const url = window.location.href.split("#")[0];
  const message = `${text}\n${url}`;
  const encodedText = encodeURIComponent(text);
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);
  try {
    if (targetId === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
    } else if (targetId === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, "_blank", "noopener,noreferrer");
    } else if (targetId === "mail") {
      window.location.href = `mailto:?subject=${encodeURIComponent(state.title)}&body=${encodedMessage}`;
    } else if (targetId === "whatsapp") {
      window.open(`https://wa.me/?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
    } else if (navigator.share) {
      await navigator.share({ title: state.title, text: message, url });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(message);
    }
    if (targetId === "instagram") {
      if (navigator.clipboard) await navigator.clipboard.writeText(message);
      setStatus("Copied for Instagram story or DM");
      return;
    }
    if (targetId === "podcast" && !navigator.share && navigator.clipboard) {
      await navigator.clipboard.writeText(message);
      setStatus("Copied for podcast app sharing");
      return;
    }
    setStatus(scope === "section" ? "Section share opened" : "Audiobook share opened");
  } catch {
    setStatus("Share canceled");
  }
}

function currentLivePage() {
  const chapter = activeChapter();
  const source = chapter.lines.length
    ? chapter.lines.map((line) => line.text).join(" ")
    : state.manuscript || state.summary || state.title;
  const words = String(source || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  const pageSize = wordsPerPage;
  const totalPages = Math.max(1, Math.ceil(words.length / pageSize));
  const duration = liveTrackDurationSeconds();
  const pageIndex = clamp(Math.floor((liveAudioProgressSeconds / Math.max(1, duration)) * totalPages), 0, totalPages - 1);
  const pageWords = words.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  return {
    page: pageIndex + 1,
    totalPages,
    words: pageWords.length,
    text: pageWords.join(" ") || activeLiveTrack().excerpt || selectedLiveRoom().description
  };
}

function liveTrackDurationSeconds() {
  const track = activeLiveTrack();
  const parts = String(track.runtime || "0:03:00").split(":").map((part) => Number(part) || 0);
  return Math.max(60, (parts[0] * 3600) + (parts[1] * 60) + parts[2]);
}

function liveAudiobookLines() {
  const chapter = activeChapter();
  if (chapter.lines.length) return chapter.lines.slice(0, 12);
  return [{ speakerId: "narrator", speakerName: "Narrator", text: state.manuscript || state.summary || state.title }];
}

async function speakHdLanguageOutput(text, cast) {
  stopSpeech(false);
  let audioUrl = "";
  try {
    setStatus("Generating Ultra HD language output");
    audioUrl = await createHdSpeech(text, {
      ...cast,
      role: `premium audiobook narrator, ${state.songStyle || "clear full-cast narration"}`,
      cloudVoice: cast.cloudVoice || "marin"
    });
    await playAudioUrl(audioUrl);
    setStatus("Language output playback complete");
  } catch {
    setStatus("Ultra HD output failed. Using browser fallback.");
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    speakBrowserText(text, "narrator");
  } finally {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }
}

function syncLanguageState() {
  state.targetLanguage = els.targetLanguageInput.value || "English";
  state.songStyle = els.songStyleInput.value.trim() || "cinematic mystery narration";
  state.languageMode = normalizeLanguageMode(els.languageModeSelect.value);
  state.languageOutput = sanitizeGeneratedBookText(els.languageOutput.value);
  persistState();
}

function normalizeLanguageMode(mode) {
  if (mode === "song" || mode === "book") return "book";
  if (mode === "both") return "both";
  return "translate";
}

function sanitizeGeneratedBookText(text) {
  const raw = String(text || "");
  if (!raw) return "";
  const lines = raw
    .replace(/\bSong Style:/gi, "Narration Style:")
    .replace(/\blyrics\b/gi, "manuscript")
    .replace(/\bSong\b/g, "Audiobook")
    .replace(/\bsong\b/g, "audiobook")
    .replace(/Performance notes:/gi, "Production notes:")
    .split(/\r?\n/);
  const planningLine = /^(SECTION\s+\d+|BOOK PLAN|BOOK TARGET|BOOK WORD TARGET|BOOK CHAPTERS|ESTIMATED AUDIOBOOK RUNTIME|PAGE TARGET|PAGE PACE|NARRATION PACE|CHAPTER PURPOSE|PURPOSE|SCENES|AUDIO NOTES|CHARACTER NOTES|PRODUCTION NOTES|NARRATOR DIRECTION|CHAPTER BEATS|SECTION PLAN|STYLE):/i;
  if (lines[0]) {
    lines[0] = lines[0]
      .replace(/\s+-\s+(.+?)\s+Narration Style:.*$/i, " - $1 Audiobook Draft")
      .replace(/\s+-\s+(.+?)\s+Audiobook Style:.*$/i, " - $1 Audiobook Draft")
      .replace(/\s+-\s+(.+?)\s+Audiobook$/i, " - $1 Audiobook Draft");
  }
  return lines.filter((line) => !planningLine.test(line.trim())).join("\n").trim();
}

function sanitizeLiveChatMessages(messages) {
  return (Array.isArray(messages) ? messages : []).map((message) => ({
    ...message,
    text: sanitizeLiveRoomCopy(message.text)
  }));
}

function sanitizeLiveChatState(chatState) {
  const sanitized = {};
  Object.entries(chatState || {}).forEach(([roomId, messages]) => {
    sanitized[roomId] = sanitizeLiveChatMessages(messages);
  });
  return sanitized;
}

function sanitizeLiveRoomCopy(text) {
  return String(text || "")
    .replace(/Song Lab/g, "Book Lab")
    .replace(/song lab/gi, "book lab")
    .replace(/song style/gi, "narration style")
    .replace(/\bsongs\b/gi, "audiobooks")
    .replace(/\bsong\b/gi, "audiobook");
}

async function runTextGeneration(prompt, fallback) {
  const apiKey = els.ttsApiKey.value.trim();
  if (!apiKey) return fallback;
  const models = ["gpt-5.5", "gpt-4.1-mini", "gpt-4o-mini"];
  for (const model of models) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          input: prompt,
          temperature: 0.7
        })
      });
      if (!response.ok) continue;
      const data = await response.json();
      const text = extractResponseText(data);
      if (text) return text;
    } catch {
      break;
    }
  }
  return fallback;
}

function extractResponseText(data) {
  if (data.output_text) return data.output_text.trim();
  const chunks = [];
  (data.output || []).forEach((item) => {
    (item.content || []).forEach((part) => {
      if (part.text) chunks.push(part.text);
    });
  });
  return chunks.join("\n").trim();
}

function buildOfflineTranslation(language) {
  return [
    `Translation draft (${language})`,
    "",
    state.manuscript,
    "",
    `[${language} localization is ready for AI translation when an HD API key is entered.]`
  ].join("\n");
}

function buildOfflineBook(language, style) {
  return buildTimedBookDraft(targetWordCount(), state.targetChapters || defaultState.targetChapters, planSections(), language, style);
}

function planSections() {
  const source = state.planSections || defaultState.planSections;
  const sections = String(source)
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-*\d.\s]+/, ""))
    .filter(Boolean);
  return sections.length ? sections.slice(0, 12) : ["Setup", "Rising conflict", "Resolution"];
}

function buildTimedBookDraft(targetWords, chapterCount, sections = planSections(), language = "English", style = state.songStyle) {
  const safeChapterCount = Math.max(1, Math.round(Number(chapterCount) || 1));
  const safeWords = Math.max(safeChapterCount * 240, Math.round(Number(targetWords) || safeChapterCount * 900));
  const chapterTargets = distributeWordCount(safeWords, safeChapterCount);
  const chapters = Array.from({ length: safeChapterCount }, (_, index) => {
    const chapterNumber = index + 1;
    const chapterTitle = timedChapterTitle(chapterNumber);
    const section = sections[Math.min(sections.length - 1, Math.floor((index / safeChapterCount) * sections.length))] || sections[0];
    const beat = storyBeatForChapter(chapterNumber, section, style);
    return buildChapterManuscript(chapterNumber, chapterTitle, section, beat, chapterTargets[index] || 0, style);
  });
  return [
    `${state.title} - ${language} Audiobook Manuscript`,
    "",
    chapters.join("\n")
  ].join("\n");
}

function ensureGeneratedLength(text, targetWords, chapterCount, sections = planSections()) {
  const cleanText = sanitizeGeneratedBookText(text);
  const currentWords = countWords(cleanText);
  const minimumWords = Math.round(Number(targetWords) * 0.9);
  if (currentWords >= minimumWords) return cleanText;
  const fallback = buildTimedBookDraft(targetWords, chapterCount, sections);
  if (currentWords < Math.round(minimumWords * 0.35)) return fallback;
  const neededWords = Math.max(0, Math.round(Number(targetWords) || 0) - currentWords);
  const appendix = buildTimedBookDraft(neededWords, Math.max(1, Math.ceil(Number(chapterCount) / 2)), sections)
    .replace(/^.*Audiobook Manuscript\s*/i, "")
    .trim();
  return sanitizeGeneratedBookText(`${cleanText}\n\n${appendix}`);
}

function distributeWordCount(totalWords, count) {
  const safeCount = Math.max(1, Math.round(Number(count) || 1));
  const safeWords = Math.max(safeCount, Math.round(Number(totalWords) || safeCount));
  const base = Math.floor(safeWords / safeCount);
  const remainder = safeWords % safeCount;
  return Array.from({ length: safeCount }, (_, index) => base + (index < remainder ? 1 : 0));
}

function buildChapterManuscript(chapterNumber, chapterTitle, section, beat, targetWords, style = "") {
  const lines = [
    `Chapter ${chapterNumber}: ${chapterTitle}`,
    `NARRATOR: ${beat.opening} ${beat.detail}`,
    `NARRATOR: ${beat.memory}`,
    `MARA VOSS: "${beat.mara}"`,
    `CAPTAIN ROOK: "${beat.rook}"`,
    `NARRATOR: ${beat.crossing}`,
    `MARA VOSS: "${beat.maraSecond}"`
  ];
  let currentWords = countWords(lines.join(" "));
  let pass = 0;
  const maxPasses = Math.min(620, Math.max(3, Math.ceil(Math.max(1, targetWords) / 135) + 3));
  while (currentWords < targetWords && pass < maxPasses) {
    const block = chapterExpansionLines(chapterNumber, section, beat, pass, style);
    lines.push(...block);
    currentWords += countWords(block.join(" "));
    pass += 1;
  }
  lines.push(
    `NARRATOR: ${beat.turn}`,
    `NARRATOR: ${beat.reveal}`,
    `THE ARCHIVIST: "${beat.archivist}"`,
    `CAPTAIN ROOK: "${beat.rookSecond}"`,
    `NARRATOR: ${beat.close}`,
    ""
  );
  return lines.join("\n");
}

function chapterExpansionLines(chapterNumber, section, beat, pass, style = "") {
  const calm = String(style || "").toLowerCase().includes("calm");
  const sensory = [
    "The lamplight pooled on the floor in amber circles, and every circle held a faint scratch of handwriting that faded whenever Mara tried to read it directly.",
    "Dust lifted from the shelves in slow ribbons, carrying the smell of rain, leather, and a winter fire that had gone out long before any of them were born.",
    "Above them, the glass ceiling showed a sky crowded with unfamiliar stars, each one bright enough to cast a tiny shadow across the open books.",
    "The hidden room answered with small domestic sounds: a chair settling, a kettle ticking, a page turning itself with the patience of an old judge.",
    "A draft moved through the stacks without touching their coats, stirring only the loose paper scattered across the tables."
  ];
  const motion = [
    "Mara followed the motion of the map until the ink path bent away from the page and seemed to continue across the floorboards.",
    "Rook tested each step before letting her take it, but the library moved under them anyway, reshaping the aisle into a narrow bridge of shelves.",
    "The Archivist watched from the edge of the lantern glow, never hurrying, never blinking, as if time had agreed to wait for him.",
    "The shelves shifted with soft knocks, opening a corridor that had not existed when Mara looked away only a moment before.",
    "A page loosened from the living book and drifted ahead of them, stopping whenever they stopped, leading whenever they were brave enough to follow."
  ];
  const interior = [
    "Mara wanted to name what she felt as fear, but fear was too simple. This was recognition, the cold shock of meeting a secret that had been waiting for her.",
    "Rook made another joke under his breath, then stopped himself, because even his defiance sounded too loud in the listening dark.",
    "For the first time since entering the library, Mara understood that the question was not whether the story would hurt them. The question was what kind of truth it needed before it would let them go.",
    "The closer they came to the answer, the more the room seemed to remember them in advance, placing chairs and shadows where their bodies would soon be.",
    "Something in Mara's chest tightened, not with panic, but with the stubborn hope that a lost thing might still be found if someone read carefully enough."
  ];
  const obstacles = [
    "Then the letters on the nearest shelf began to rearrange, sliding from spine to spine until they formed a warning in a language Mara could almost understand.",
    "The floor split into neat black seams, not wide enough to swallow them, but wide enough to show a depth filled with drifting pages.",
    "A bell rang below the city, and the map folded itself in half, hiding the route just when they needed it most.",
    "The living book snapped shut with a sound like thunder trapped inside a box, and every candle in the room leaned toward Mara.",
    "A shadow crossed the far wall in the shape of a person neither of them had seen, though both of them knew at once that it had seen them."
  ];
  const resolutions = [
    "Mara placed both hands on the table and read the next sentence aloud, slowly enough that the room could not pretend to misunderstand her.",
    "Rook set the lantern down between them and the dark, giving the story a circle of light it would have to cross honestly.",
    "The map opened again when Mara stopped asking it for an escape and asked it where the truth had been buried.",
    "The page ahead of them brightened at the edges, then settled into words that sounded less like command and more like invitation.",
    "Together they took the next step, and the shelves held still, as if respect had finally entered the room."
  ];
  const maraLines = [
    "I am tired of being led by half answers. If the library wants my voice, it can start by giving me the truth.",
    "This place keeps testing whether I will look away. I will not.",
    "A map is not a promise, Rook. But it is something that believes a way forward exists.",
    "If my name is in that book, then I get to decide how it is spoken.",
    "Somebody hid this story because they were afraid of what it would ask from them."
  ];
  const rookLines = [
    "For the record, I dislike doors that appear after midnight and books that behave like witnesses.",
    "I am still here. Whatever this room thinks it knows about you, it has to get through me first.",
    "A clean answer would be nice. A dry floor would also be nice. I am prepared to be disappointed.",
    "If the map starts negotiating, let me do the rude part.",
    "You read. I will keep watch. That arrangement has kept us alive for at least three impossible rooms."
  ];
  const archivistLines = [
    "A story becomes dangerous when the wrong person is willing to call it finished.",
    "Do not confuse secrecy with silence. The library has been speaking for years.",
    "Every chapter asks for a choice. The kinder ones tell you the cost was never money.",
    "Names are doors. Memories are keys. Regret is what happens when both are left unused.",
    "If you want the ending to change, read the page you have been avoiding."
  ];
  const stage = pickBySeed(["first", "second", "third", "next", "last"], chapterNumber, pass, 4);
  const sectionName = String(section || "journey").toLowerCase();
  const lines = [
    `NARRATOR: ${pickBySeed(sensory, chapterNumber, pass)} ${pickBySeed(motion, chapterNumber, pass, 1)}`,
    `NARRATOR: ${pickBySeed(interior, chapterNumber, pass, 2)} ${pickBySeed(obstacles, chapterNumber, pass, 3)}`,
    `MARA VOSS: "${pickBySeed(maraLines, chapterNumber, pass, 1)}"`,
    `CAPTAIN ROOK: "${pickBySeed(rookLines, chapterNumber, pass, 2)}"`,
    `NARRATOR: In the ${stage} movement of the ${sectionName}, ${calm ? "the danger softened into something watchful" : "the danger pressed closer with deliberate force"}, and the scene deepened instead of skipping ahead. ${pickBySeed(resolutions, chapterNumber, pass, 4)}`
  ];
  if (pass % 3 === 2) {
    lines.push(`THE ARCHIVIST: "${pickBySeed(archivistLines, chapterNumber, pass, 3)}"`);
    lines.push(`NARRATOR: ${beat.detail} This time the detail mattered, because it gave Mara one more piece of the pattern and one less reason to turn back.`);
  }
  return lines;
}

function pickBySeed(items, chapterNumber, pass, offset = 0) {
  return items[(chapterNumber * 7 + pass * 3 + offset) % items.length];
}

function storyBeatForChapter(chapterNumber, section, style = "") {
  const atmosphere = String(style || "cinematic audiobook").toLowerCase();
  const isCalm = atmosphere.includes("calm") || atmosphere.includes("sleep");
  const openings = [
    "Rain moved across the glass roof in careful silver lines, and Mara Voss listened until the old library seemed to breathe with it.",
    "By morning, the map had changed again, adding a street that none of the city records admitted had ever existed.",
    "The first door stood behind a shelf of blank books, its brass handle warm from a hand that had not touched it in a hundred years.",
    "Every voice in the stacks went quiet when Captain Rook lifted the lantern and found footprints crossing the dust ahead of them.",
    "The key did not look valuable until it began to hum, low and patient, against Mara's palm.",
    "Below the library, a city of glass waited in darkness, its towers reflecting stars that were not in the sky.",
    "The orchard appeared where the map folded in on itself, each tree bearing fruit made of memory and light.",
    "The Archivist offered them a bargain in a room where every wall was listening.",
    "At midnight, the story rewrote its own ending, and Mara saw her name vanish from the final page.",
    "The final reading began with no audience, no applause, and every locked door in the library opening at once.",
    "What the library remembered was not the war or the treasure, but the promise that had been broken between friends.",
    "When the door stayed open, Mara understood that some stories were not meant to be escaped."
  ];
  const details = [
    "The air smelled of wet stone, candle smoke, and paper so old it had learned to keep secrets.",
    "A thin gold line crawled across the parchment, stopping at a drawn fountain that flickered like real water.",
    "Rook checked the corridor behind them twice, but the only sound was the soft rearranging of shelves.",
    "Mara pressed her fingertips to the margin and felt a heartbeat answer from inside the page.",
    "The shadows around the reading desks lengthened, not away from the lamp, but toward it.",
    "Somewhere under their feet, bells rang once, then again, counting down to a choice no one had explained.",
    "The fruit shone with tiny scenes inside: a child's laugh, a burned letter, a crown sinking into black water.",
    "The Archivist's robe made no sound, though the floor was scattered with glass leaves.",
    "Each revision stole a memory from the room, leaving only the feeling that something precious had been there.",
    "Mara opened the book and saw the words rise like breath in winter.",
    "Rook lowered his sword because even he could tell this was not a fight that steel could win.",
    "A soft wind passed through the library, turning every page to the same unfinished sentence."
  ];
  const closes = [
    "Mara stepped forward before fear could teach her to stay still.",
    "The map brightened, and the impossible street began to draw itself beneath their feet.",
    "The handle turned on its own, inviting them into the dark.",
    "The footprints stopped at the table where Mara had left the living book open.",
    "The key chose a lock they had not seen, and the wall split like an eye waking.",
    "The city below answered with a thousand lights.",
    "Mara reached for the nearest glass apple and heard her mother's voice inside it.",
    "Rook moved closer to Mara, and for once he had no joke ready.",
    "The final page waited, clean and white, daring her to speak first.",
    "Every open door led to the same room, and in that room the lost city listened.",
    "The broken promise had a voice, and it knew Mara by name.",
    "Behind them, the library exhaled, and the story began again."
  ];
  const memories = [
    "She remembered being twelve years old and hiding under a reading table while thunder rolled above the city, promising herself she would never be afraid of a quiet room again.",
    "The changed street bent through the ink like a road seen under water, and every window drawn along it held the same small candle.",
    "Mara wanted the door to be only wood and hinges, but the grain moved beneath her gaze like a sleeping animal deciding whether to wake.",
    "The footprints were too small for Rook, too deep for Mara, and too fresh for a room that had been sealed since winter.",
    "For one breath, the humming key sounded exactly like her father's voice calling her home from the orchard at dusk.",
    "No one spoke as the hidden city widened below them, because the sight of it made language feel unfinished.",
    "The first glass apple turned slowly on its branch, showing Mara a memory of herself she did not remember living.",
    "Rook kept his hand near his sword, but even he looked smaller in the listening room, as if the walls had weighed his courage and found it mortal.",
    "The stolen memory left a clean ache behind it, the way a missing tooth keeps reminding the tongue of its shape.",
    "Mara could feel every door in the library waiting for her voice, and the waiting was worse than any lock.",
    "The broken promise had settled into the shelves like dust, touching every book without belonging to any of them.",
    "Open air moved through the stacks for the first time in years, carrying the smell of rain, apples, and ink."
  ];
  const crossings = [
    "They crossed the reading room one slow step at a time, passing tables set with cups of cold tea and spectacles folded beside books no hand had closed.",
    "Mara traced the new street with one finger; the parchment warmed, and somewhere beyond the windows a bell began to answer.",
    "Rook lifted the lantern. The flame bent toward the hidden door instead of away from it, as if light itself knew where to go.",
    "The stacks tightened around them, aisle by aisle, until the only path left was the one marked by the impossible footprints.",
    "The key rose from Mara's palm without touching her skin, turning toward a blank stretch of wall that had no lock at all.",
    "Their staircase became a bridge, and beneath it the glass roofs of the buried city reflected Mara's face in a thousand uncertain versions.",
    "Each tree in the orchard leaned toward them with a delicate chime, branches touching branches like listeners sharing a secret.",
    "The Archivist placed three books on the table: one red, one black, and one bound in glass so clear it seemed empty.",
    "Words scraped themselves from one page to another, rearranging the chapter while Mara watched her own choices become sentences.",
    "Rook stood at the threshold with his jaw tight, guarding her not from enemies, but from the terrible hope of being believed.",
    "The promise spoke through the floorboards first, a low vibration that made every lamp tremble.",
    "The open door showed not an exit but a morning street, ordinary and bright and almost impossible to trust."
  ];
  const reveals = [
    "Then Mara saw that the map was not leading them deeper into the library. It was leading the library back to itself.",
    "The fountain on the parchment spilled one drop of real water, and where it struck the floor, a silver root pushed through the stone.",
    "A name appeared above the door in careful script: not Mara's, not Rook's, but the name of someone both of them had lost.",
    "The footprints ended in front of the living book, and the last print was still filling with rain.",
    "The wall opened onto a staircase that descended through seasons: autumn at the first step, winter at the second, spring waiting far below.",
    "At the center of the buried city stood a dry fountain shaped like an open book, and every page was a street.",
    "Inside the apple, Mara's mother looked up from a younger world and mouthed a warning through the glass.",
    "The empty book was not empty; its letters were simply waiting for someone brave enough to disappoint them.",
    "Mara's vanished name returned at the bottom of the page, but the handwriting was not hers.",
    "Every door opened because the library had finally heard the right story in the right voice.",
    "Rook whispered the apology before Mara could ask for it, and the shelves answered by letting one hidden book fall.",
    "The story did not end. It made room."
  ];
  const index = (chapterNumber - 1) % openings.length;
  const softer = isCalm ? "softly" : "clearly";
  return {
    opening: openings[index],
    detail: details[index],
    memory: memories[index],
    mara: chapterNumber % 3 === 0 ? "If this place wants a witness, it can have one. But it does not get to choose what I remember." : "I can feel the story pulling at us. It is not a trap, not exactly, but it is hungry.",
    rook: chapterNumber % 2 === 0 ? "Hungry buildings are exactly the kind I prefer to leave behind." : "Stay close. If the shelves start whispering your name, let them finish before you answer.",
    crossing: crossings[index],
    maraSecond: chapterNumber % 2 === 0 ? "Then we keep walking until the story has to tell us the truth." : "I came here for a map, but I think the map came here for me.",
    turn: `The ${section.toLowerCase()} of the journey settled around them ${softer}, shaping every step into a decision they could not take back.`,
    archivist: chapterNumber % 4 === 0 ? "A book only lies when its reader is afraid of the truth." : "Every locked story asks the same question: what are you willing to hear?",
    reveal: reveals[index],
    rookSecond: chapterNumber % 3 === 0 ? "I am not afraid of a book. I am afraid you are starting to sound like one." : "Whatever answers next, let me stand between it and you.",
    close: closes[index]
  };
}

function timedChapterTitle(index) {
  const titles = [
    "The Opening Hook",
    "A Map Begins To Speak",
    "The First Door",
    "Voices In The Stacks",
    "The Key That Asked Nothing",
    "A City Under Glass",
    "The Lost Orchard",
    "The Keeper's Bargain",
    "Midnight Revisions",
    "The Final Reading",
    "What The Library Remembers",
    "The Door Stays Open"
  ];
  return titles[(index - 1) % titles.length];
}

function parseManuscript(text) {
  const rawLines = text.split(/\r?\n/);
  const lines = [];
  const chapters = [];
  let currentChapter = { title: "Opening", lines: [] };
  const speakerPattern = /^([A-Za-z][A-Za-z0-9 .'-]{0,38}):\s*(.+)$/;

  rawLines.forEach((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (/^chapter\s+\d+/i.test(trimmed)) {
      if (currentChapter.lines.length) chapters.push(currentChapter);
      currentChapter = { title: trimmed, lines: [] };
      return;
    }
    const match = trimmed.match(speakerPattern);
    const speakerName = match ? titleCase(match[1].trim()) : "Narrator";
    const speakerId = speakerName.toLowerCase() === "narrator" ? "narrator" : slugify(speakerName);
    const line = {
      speakerId,
      speakerName,
      text: match ? match[2].trim() : trimmed
    };
    lines.push(line);
    currentChapter.lines.push(line);
  });

  if (currentChapter.lines.length) chapters.push(currentChapter);
  if (!chapters.length) chapters.push({ title: "Manuscript", lines });
  return { lines, chapters };
}

function addMissingCharactersFromScript(shouldPersist = true) {
  removePlanningCastEntries(state.cast);
  parsedBook.lines.forEach((line) => {
    if (isPlanningSpeaker(line.speakerId, line.speakerName)) return;
    if (!state.cast[line.speakerId]) {
      const index = Object.keys(state.cast).length;
      state.cast[line.speakerId] = {
        id: line.speakerId,
        name: line.speakerName,
        role: line.speakerId === "narrator" ? "Narrator" : "Character voice",
        color: accentColors[index % accentColors.length],
        voiceURI: voices[index] ? voices[index].voiceURI : "",
        cloudVoice: defaultHdVoice({ id: line.speakerId, name: line.speakerName }, index),
        rate: line.speakerId === "narrator" ? 0.92 : 0.96,
        pitch: 0.9 + ((index % 5) * 0.08)
      };
    }
  });
  if (shouldPersist) persistState();
}

function isPlanningSpeaker(id, name = "") {
  const value = `${id || ""} ${name || ""}`.toLowerCase();
  return [
    "book-plan",
    "book-target",
    "book-word-target",
    "book-chapters",
    "estimated-audiobook-runtime",
    "page-target",
    "page-pace",
    "narration-pace",
    "chapter-purpose",
    "purpose",
    "scenes",
    "audio-notes",
    "character-notes",
    "production-notes",
    "narrator-direction",
    "chapter-beats",
    "section-plan",
    "style"
  ].some((term) => value.includes(term));
}

function removePlanningCastEntries(cast) {
  Object.keys(cast || {}).forEach((id) => {
    const character = cast[id];
    if (isPlanningSpeaker(id, character?.name)) {
      delete cast[id];
    }
  });
}

function addCharacterFromForm() {
  const nameInput = document.getElementById("newCharacterName");
  const roleInput = document.getElementById("newCharacterRole");
  const name = nameInput.value.trim();
  if (!name) {
    setStatus("Add a character name");
    return;
  }
  const id = slugify(name);
  const index = Object.keys(state.cast).length;
  state.cast[id] = {
    id,
    name,
    role: roleInput.value.trim() || "Character voice",
    color: accentColors[index % accentColors.length],
    voiceURI: voices[index] ? voices[index].voiceURI : "",
    cloudVoice: defaultHdVoice({ id, name, role: roleInput.value.trim() }, index),
    rate: 0.96,
    pitch: 0.95 + ((index % 4) * 0.08)
  };
  nameInput.value = "";
  roleInput.value = "";
  persistState();
  renderAll();
  setStatus(`${name} added to voice cast`);
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) {
    voices = [];
    setStatus("Speech voices are unavailable in this browser");
    return;
  }
  voices = window.speechSynthesis.getVoices().sort((a, b) => scoreVoice(b) - scoreVoice(a));
  if (voices.length) {
    addMissingCharactersFromScript(false);
    Object.values(state.cast).forEach((character, index) => {
      if (!character.voiceURI || shouldUpgradeVoice(character.voiceURI)) {
        character.voiceURI = pickVoice(index, character).voiceURI;
      }
    });
    persistState();
  }
}

function autoAssignVoices() {
  if (!voices.length) {
    refreshVoices();
  }
  Object.values(state.cast).forEach((character, index) => {
    const voice = pickVoice(index, character);
    if (voice) character.voiceURI = voice.voiceURI;
  });
  persistState();
}

function pickVoice(index, character = {}) {
  if (!voices.length) return { voiceURI: "" };
  const pool = voicePoolForMode();
  const preferred = pool.filter((voice) => voiceMatchesCharacter(voice, character));
  const finalPool = preferred.length ? preferred : pool;
  return finalPool[index % finalPool.length];
}

function voicePoolForMode() {
  if (!voices.length) return [];
  const english = voices.filter(isEnglishVoice);
  const base = english.length ? english : voices;
  const studio = base.filter(isStudioVoice);
  const neural = base.filter(isNeuralVoice);
  if (state.voiceMode === "neural") {
    return neural.length ? neural : studio.length ? studio : base;
  }
  if (state.voiceMode === "studio") {
    return studio.length ? studio : neural.length ? neural : base;
  }
  return base;
}

function shouldUpgradeVoice(uri) {
  if (state.voiceMode === "browser" || !voices.length) return false;
  const current = findVoice(uri);
  if (!current) return true;
  const pool = voicePoolForMode();
  const best = pool[0];
  return best ? scoreVoice(best) - scoreVoice(current) >= 14 : false;
}

function voiceMatchesCharacter(voice, character) {
  const name = `${voice.name} ${voice.lang}`.toLowerCase();
  const role = `${character.name || ""} ${character.role || ""}`.toLowerCase();
  if (role.includes("narrator") || role.includes("literary")) {
    return name.includes("natural") || name.includes("neural") || name.includes("online") || name.includes("ava") || name.includes("jenny");
  }
  if (role.includes("captain") || role.includes("protector") || role.includes("rook")) {
    return name.includes("guy") || name.includes("brian") || name.includes("andrew") || name.includes("david") || name.includes("male");
  }
  if (role.includes("mara") || role.includes("lead") || role.includes("curious")) {
    return name.includes("aria") || name.includes("ava") || name.includes("jenny") || name.includes("female") || name.includes("zira");
  }
  return true;
}

function isEnglishVoice(voice) {
  return /^en[-_]/i.test(voice.lang);
}

function isNeuralVoice(voice) {
  const name = `${voice.name} ${voice.lang}`.toLowerCase();
  return voice.localService === false || ["neural", "natural", "premium", "enhanced", "online", "cloud", "multilingual"].some((term) => name.includes(term));
}

function isStudioVoice(voice) {
  return scoreVoice(voice) >= 78;
}

function voiceDescriptor(voice) {
  if (isStudioVoice(voice)) return "Studio";
  if (isNeuralVoice(voice)) return "Neural";
  if (voice.localService === false) return "Cloud";
  return "Local";
}

function voiceOptions(selected) {
  if (!voices.length) {
    return '<option value="">Default browser voice</option>';
  }
  const pool = voicePoolForMode();
  const remaining = voices.filter((voice) => !pool.includes(voice));
  const ordered = [...pool, ...remaining];
  const options = [];
  ordered.forEach((voice) => {
    const label = `${voice.name} - ${voice.lang} - ${voiceDescriptor(voice)} - ${qualityLabel(scoreVoice(voice))}`;
    options.push(`<option value="${escapeHtml(voice.voiceURI)}"${voice.voiceURI === selected ? " selected" : ""}>${escapeHtml(label)}</option>`);
  });
  return options.join("");
}

function hdVoiceOptions(selected) {
  const baseOptions = hdVoices
    .map((voice) => `<option value="${voice}"${voice === selected ? " selected" : ""}>${titleCase(voice)} HD</option>`)
    .join("");
  if (!state.customVoiceName) return baseOptions;
  return `${baseOptions}<option value="custom"${selected === "custom" ? " selected" : ""}>${escapeHtml(state.customVoiceName)} Custom</option>`;
}

function defaultHdVoice(character, index) {
  const role = `${character.id || ""} ${character.name || ""} ${character.role || ""}`.toLowerCase();
  if (role.includes("narrator")) return "marin";
  if (role.includes("archivist") || role.includes("mysterious")) return "cedar";
  if (role.includes("captain") || role.includes("rook") || role.includes("protector")) return "onyx";
  if (role.includes("mara") || role.includes("lead")) return "coral";
  return hdVoices[index % hdVoices.length];
}

function scoreVoice(voice) {
  if (!voice) return 28;
  const name = `${voice.name} ${voice.lang}`.toLowerCase();
  let score = 34;
  if (isEnglishVoice(voice)) score += 16;
  if (voice.localService === false) score += 18;
  if (name.includes("natural")) score += 24;
  if (name.includes("neural")) score += 24;
  if (name.includes("premium")) score += 20;
  if (name.includes("enhanced")) score += 18;
  if (name.includes("online")) score += 14;
  if (name.includes("cloud")) score += 14;
  if (name.includes("multilingual")) score += 10;
  if (name.includes("microsoft")) score -= 8;
  if (name.includes("google")) score += 10;
  if (name.includes("siri")) score += 8;
  if (name.includes("desktop")) score -= 16;
  if (name.includes("compact")) score -= 20;
  if (name.includes("legacy")) score -= 20;
  if (name.includes("espeak")) score -= 24;
  return Math.max(20, Math.min(100, score));
}

function qualityLabel(score) {
  if (score >= 86) return "Studio";
  if (score >= 70) return "Premium";
  if (score >= 54) return "Clear";
  return "Standard";
}

function averageVoiceQuality() {
  if (state.voiceMode === "openvoice") return 94;
  if (state.voiceMode === "openai") return state.audioQuality === "wav" ? 99 : 96;
  const values = Object.values(state.cast).map((character) => scoreVoice(findVoice(character.voiceURI)));
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function speakCurrentChapter(limit) {
  const chapter = activeChapter();
  const lines = chapter.lines.slice(0, limit);
  if (!lines.length) {
    setStatus("No manuscript lines to preview");
    return;
  }
  speakQueue(lines);
}

function speakQueue(lines) {
  if (shouldUseHdTts()) {
    speakHdQueue(lines);
    return;
  }
  if (state.voiceMode === "openvoice") {
    setStatus("Open Voice HD is selected. Connect a local Piper/OpenVoice service for final render; using browser preview now.");
  } else if (state.voiceMode === "openai") {
    setStatus("OpenAI HD needs a session API key. Using browser fallback for now.");
  }
  speakBrowserQueue(lines);
}

function speakBrowserQueue(lines) {
  if (!("speechSynthesis" in window)) {
    setStatus("Speech playback is unavailable in this browser");
    return;
  }
  stopSpeech(false);
  activeQueue = lines;
  activeQueueIndex = 0;
  setStatus(`Studio preview playing ${activeQueue.length} cast lines`);
  speakNext();
}

async function speakHdQueue(lines) {
  stopSpeech(false);
  activeQueue = lines;
  activeQueueIndex = 0;
  setStatus(`Generating OpenAI HD audio for ${activeQueue.length} cast lines`);
  while (activeQueueIndex < activeQueue.length && activeQueue.length) {
    const line = activeQueue[activeQueueIndex];
    const cast = getCastForLine(line);
    let audioUrl = "";
    try {
      audioUrl = await createHdSpeech(line.text, cast);
      if (!activeQueue.length) break;
      await playAudioUrl(audioUrl);
      activeQueueIndex += 1;
      await wait(pauseForLine(line.text));
    } catch (error) {
      setStatus("HD voice failed. Falling back to browser preview.");
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      speakBrowserQueue(lines.slice(activeQueueIndex));
      return;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }
  activeQueue = [];
  activeAudio = null;
  setStatus("OpenAI HD preview complete");
}

function speakNext() {
  if (activeQueueIndex >= activeQueue.length) {
    setStatus("Preview complete");
    activeQueue = [];
    return;
  }
  const line = activeQueue[activeQueueIndex];
  const cast = getCastForLine(line);
  const utterance = new SpeechSynthesisUtterance(line.text);
  applyCastVoice(utterance, cast);
  if (liveAudioPlaying) {
    utterance.rate = clamp((utterance.rate || 1) * livePlaybackRate, 0.5, 2);
    utterance.volume = liveVolume;
  }
  utterance.onend = () => {
    activeQueueIndex += 1;
    window.setTimeout(speakNext, pauseForLine(line.text));
  };
  utterance.onerror = () => {
    activeQueueIndex += 1;
    window.setTimeout(speakNext, 160);
  };
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
}

function speakText(text, castId) {
  if (shouldUseHdTts()) {
    speakHdText(text, castId);
    return;
  }
  if (state.voiceMode === "openvoice") {
    setStatus("Open Voice HD is selected. Connect a local Piper/OpenVoice service for final render; using browser preview now.");
  } else if (state.voiceMode === "openai") {
    setStatus("OpenAI HD needs a session API key. Using browser fallback for now.");
  }
  speakBrowserText(text, castId);
}

function speakBrowserText(text, castId) {
  if (!("speechSynthesis" in window)) {
    setStatus("Speech playback is unavailable in this browser");
    return;
  }
  stopSpeech(false);
  const cast = state.cast[castId] || state.cast.narrator;
  const utterance = new SpeechSynthesisUtterance(text);
  applyCastVoice(utterance, cast);
  utterance.onend = () => setStatus("Voice test complete");
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
  setStatus(`Testing ${cast.name}`);
}

async function speakHdText(text, castId) {
  stopSpeech(false);
  const cast = state.cast[castId] || state.cast.narrator;
  let audioUrl = "";
  try {
    setStatus(`Generating OpenAI HD voice for ${cast.name}`);
    audioUrl = await createHdSpeech(text, cast);
    await playAudioUrl(audioUrl);
    setStatus("OpenAI HD voice test complete");
  } catch (error) {
    setStatus("HD voice failed. Falling back to browser voice.");
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    speakBrowserText(text, castId);
  } finally {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }
}

async function createHdSpeech(text, cast) {
  const apiKey = els.ttsApiKey.value.trim();
  if (cast.cloudVoice === "custom") {
    throw new Error("Custom voice samples need a voice-cloning backend before HD rendering.");
  }
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: cast.cloudVoice || "marin",
      input: text.slice(0, 4096),
      instructions: hdInstructions(cast),
      response_format: state.audioQuality || "wav"
    })
  });
  if (!response.ok) {
    throw new Error(`OpenAI speech request failed: ${response.status}`);
  }
  return URL.createObjectURL(await response.blob());
}

function hdInstructions(cast) {
  const role = `${cast.name || "Narrator"} ${cast.role || ""}`.toLowerCase();
  const base = "Record as a finished premium audiobook master: broadcast-clean, intimate, natural breath, high emotional fidelity, stable volume, crisp consonants, no robotic cadence, no exaggerated character acting.";
  if (role.includes("narrator")) {
    return `${base} Narrator voice: warm literary delivery, elegant pauses, controlled emotion, immersive but restrained.`;
  }
  if (role.includes("vocalist") || role.includes("song")) {
    return `${base} Vocal performance: lyrical, rhythmic, expressive, musical phrasing, clear hooks, tasteful energy, avoid flat robotic reading.`;
  }
  if (role.includes("archivist") || role.includes("mysterious")) {
    return `${base} Character voice: quiet, ancient, mysterious, cinematic, never cartoonish.`;
  }
  if (role.includes("captain") || role.includes("protector") || role.includes("rook")) {
    return `${base} Character voice: grounded, dry, confident, realistic protector energy.`;
  }
  return `${base} Character voice: distinct, believable, emotionally specific, clear diction, natural pacing.`;
}

function playAudioUrl(audioUrl) {
  return new Promise((resolve, reject) => {
    activeAudio = new Audio(audioUrl);
    activeAudio.preload = "auto";
    if (state.mastering !== "raw") {
      applyPlaybackMastering(activeAudio);
    }
    activeAudio.onended = () => {
      cleanupAudioContext();
      resolve();
    };
    activeAudio.onerror = () => {
      cleanupAudioContext();
      reject(new Error("Audio playback failed"));
    };
    activeAudio.play().catch(reject);
  });
}

function applyPlaybackMastering(audio) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;
  activeAudioContext = new AudioContextCtor();
  const source = activeAudioContext.createMediaElementSource(audio);
  const highpass = activeAudioContext.createBiquadFilter();
  const presence = activeAudioContext.createBiquadFilter();
  const compressor = activeAudioContext.createDynamicsCompressor();
  const gain = activeAudioContext.createGain();

  highpass.type = "highpass";
  highpass.frequency.value = state.mastering === "warm" ? 55 : 70;
  highpass.Q.value = 0.7;

  presence.type = state.mastering === "warm" ? "lowshelf" : "peaking";
  presence.frequency.value = state.mastering === "warm" ? 180 : 3200;
  presence.gain.value = state.mastering === "bright" ? 2.5 : state.mastering === "warm" ? 1.8 : 1.2;
  presence.Q.value = 0.9;

  compressor.threshold.value = -22;
  compressor.knee.value = 18;
  compressor.ratio.value = 2.6;
  compressor.attack.value = 0.006;
  compressor.release.value = 0.18;

  gain.gain.value = 1.04;
  source.connect(highpass);
  highpass.connect(presence);
  presence.connect(compressor);
  compressor.connect(gain);
  gain.connect(activeAudioContext.destination);
}

function cleanupAudioContext() {
  if (activeAudioContext) {
    activeAudioContext.close().catch(() => {});
    activeAudioContext = null;
  }
}

function shouldUseHdTts() {
  return state.voiceMode === "openai" && Boolean(els.ttsApiKey.value.trim());
}

function applyCastVoice(utterance, cast) {
  const voice = findVoice(cast.voiceURI);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  const rawRate = Number(cast.rate) || 0.95;
  const rawPitch = Number(cast.pitch) || 1;
  if (state.voiceMode === "browser") {
    utterance.rate = clamp(rawRate, 0.7, 1.18);
    utterance.pitch = clamp(rawPitch, 0.68, 1.32);
  } else {
    utterance.rate = clamp(rawRate * 0.94, 0.82, 1.04);
    utterance.pitch = clamp(1 + ((rawPitch - 1) * 0.55), 0.82, 1.18);
  }
  utterance.volume = 1;
}

function pauseForLine(text) {
  if (/[!?]$/.test(text)) return 280;
  if (/[.;:]$/.test(text)) return 230;
  if (/,/.test(text)) return 180;
  return 140;
}

function stopSpeech(showStatus = true) {
  activeQueue = [];
  activeQueueIndex = 0;
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.src = "";
    activeAudio = null;
  }
  if (activeAudioContext) {
    cleanupAudioContext();
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (showStatus) setStatus("Playback stopped");
}

function stopAllPlayback() {
  stopSpeech(false);
  stopLiveAudiobookPlayback(true);
  stopSongPlayback(true);
  setStatus("Playback stopped");
}

function publishAudiobook(targetChannels = connectedPublishChannels()) {
  targetChannels = Array.isArray(targetChannels) ? targetChannels : connectedPublishChannels();
  if (!targetChannels.length) {
    setStatus("Connect at least one publishing account first.");
    renderPublishAccounts();
    return;
  }
  const words = countWords(state.manuscript);
  state.releaseDate = todayKey();
  if (els.releaseDate) els.releaseDate.value = state.releaseDate;
  const book = currentPackage();
  book.channels = targetChannels;
  book.id = `release-${Date.now()}`;
  book.publishedAt = new Date().toISOString();
  book.status = "Published";
  book.wordCount = words;
  library.unshift(book);
  saveLibrary();
  renderLibrary();
  renderCreateBookPlaylist();
  switchView("otherSites");
  els.views.otherSites?.classList.add("is-published-layout");
  setStatus(`${book.title} published to ${targetChannels.join(", ")}.`);
}

function exportCurrentPackage() {
  const pkg = currentPackage();
  downloadJson(pkg, `${slugify(pkg.title)}-audiobook-package.json`);
  setStatus("Audiobook package exported");
}

function exportAllOtherSitesPackage() {
  const pkg = currentPackage();
  downloadJson({
    ...pkg,
    distributionTargets: otherSiteTargets.map((target) => ({
      site: target.name,
      status: target.status,
      format: target.format
    }))
  }, `${slugify(pkg.title)}-other-sites-package.json`);
  setStatus("Other-sites package exported");
}

function exportOtherSitePackage(siteName) {
  const pkg = currentPackage();
  downloadJson({
    ...pkg,
    targetSite: siteName,
    sitePackage: otherSiteTargets.find((target) => target.name === siteName) || null
  }, `${slugify(pkg.title)}-${slugify(siteName)}-package.json`);
  setStatus(`${siteName} package prepared`);
}

function currentPackage() {
  const words = countWords(state.manuscript);
  const chapterTargets = distributeSeconds(state.targetDurationSeconds, parsedBook.chapters.length || 1);
  const chapters = parsedBook.chapters.map((chapter, index) => ({
    index: index + 1,
    title: chapter.title,
    lines: chapter.lines,
    targetRuntimeSeconds: chapterTargets[index] || 0,
    targetRuntime: formatClock(chapterTargets[index] || 0),
    runtimeMinutes: estimateMinutes(countWords(chapter.lines.map((line) => line.text).join(" ")))
  }));
  return {
    title: state.title,
    author: state.author,
    genre: state.genre,
    narratorCredit: state.narratorCredit,
    releaseDate: state.releaseDate,
    format: state.format,
    price: "Free",
    summary: state.summary,
    channels: selectedChannels(),
    runtimeSeconds: state.targetDurationSeconds,
    runtime: formatDuration(state.targetDurationSeconds),
    runtimeMinutes: Math.ceil(state.targetDurationSeconds / 60),
    targetPages: state.targetPages,
    targetChapters: state.targetChapters,
    planSections: planSections(),
    targetWordCount: targetWordCount(),
    scriptRuntimeMinutes: estimateMinutes(words),
    voiceEngine: state.voiceMode,
    audioQuality: state.audioQuality,
    mastering: state.mastering,
    voiceQuality: averageVoiceQuality(),
    cast: Object.values(state.cast).map((character) => ({
      name: character.name,
      role: character.role,
      voice: findVoice(character.voiceURI)?.name || "No voice selected",
      voiceTier: findVoice(character.voiceURI) ? voiceDescriptor(findVoice(character.voiceURI)) : "Unavailable",
      hdVoice: character.cloudVoice || defaultHdVoice(character, 0),
      rate: character.rate,
      pitch: character.pitch
    })),
    chapters
  };
}

function clearLibrary() {
  if (!library.length) return;
  const ok = window.confirm("Clear published audiobooks from this browser?");
  if (!ok) return;
  library = [];
  saveLibrary();
  renderLibrary();
  renderCreateBookPlaylist();
  setStatus("Library cleared");
}

function selectedChannels() {
  const connected = connectedPublishChannels();
  if (connected.length) return connected;
  return Array.from(els.channelList.querySelectorAll("input:checked")).map((input) => input.value);
}

function connectedPublishChannels() {
  const accounts = {
    ...defaultState.connectedAccounts,
    ...(state.connectedAccounts || {})
  };
  return publishTargets.filter((target) => accounts[target.name]).map((target) => target.name);
}

function liveTracks() {
  const chapters = parsedBook.chapters.length ? parsedBook.chapters : [{ title: "Manuscript", lines: parsedBook.lines }];
  if (chapters.length > 1) {
    return tracksFromChapters(chapters);
  }
  const trackCount = 5;
  const sourceLines = parsedBook.lines.length ? parsedBook.lines : [{ text: state.manuscript || state.title }];
  const segmentSize = Math.max(1, Math.ceil(sourceLines.length / trackCount));
  const targets = distributeSeconds(state.targetDurationSeconds, trackCount);
  return Array.from({ length: trackCount }, (_, index) => {
    const segment = sourceLines.slice(index * segmentSize, (index + 1) * segmentSize);
    const segmentText = segment.length ? segment.map((line) => line.text).join(" ") : state.manuscript;
    return {
      index: index + 1,
      title: fallbackLiveTrackTitle(index),
      lines: segment.length || sourceLines.length,
      words: countWords(segmentText),
      runtime: formatClock(targets[index] || 0),
      excerpt: storyExcerpt(segmentText)
    };
  });
}

function tracksFromChapters(chapters) {
  const targets = distributeSeconds(state.targetDurationSeconds, chapters.length || 1);
  return chapters.map((chapter, index) => {
    const words = countWords(chapter.lines.map((line) => line.text).join(" "));
    return {
      index: index + 1,
      title: chapter.title,
      lines: chapter.lines.length,
      words,
      runtime: formatClock(targets[index] || 0),
      excerpt: storyExcerpt(chapter.lines.map((line) => line.text).join(" "))
    };
  });
}

function storyExcerpt(text, limit = 72) {
  const words = String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
}

function fallbackLiveTrackTitle(index) {
  const titles = [
    "Opening Hook Track",
    "Character Read Track",
    "Rising Scene Track",
    "Soundtrack Cue Track",
    "Final Export Track"
  ];
  return titles[index % titles.length];
}

function clampActiveTrack() {
  const maxIndex = Math.max(0, liveTracks().length - 1);
  state.activeTrackIndex = clamp(Math.round(Number(state.activeTrackIndex) || 0), 0, maxIndex);
}

function activeLiveTrack() {
  const tracks = liveTracks();
  clampActiveTrack();
  return tracks[state.activeTrackIndex] || tracks[0] || { index: 1, title: "Manuscript", lines: 0, words: 0, runtime: "0:00:00" };
}

function setActiveTrack(index, announce = true) {
  const tracks = liveTracks();
  state.activeTrackIndex = clamp(Math.round(Number(index) || 0), 0, Math.max(0, tracks.length - 1));
  state.activeChapterIndex = state.activeTrackIndex;
  liveAudioProgressSeconds = 0;
  if (liveAudioPlaying) {
    stopLiveAudiobookPlayback(false);
    window.setTimeout(startLiveAudiobookPlayback, 0);
  }
  persistState();
  renderTrackSlider();
  renderLiveRooms();
  renderRoomStage();
  if (announce) setStatus(`Track ${state.activeTrackIndex + 1} selected`);
}

function moveActiveTrack(direction) {
  setActiveTrack(state.activeTrackIndex + direction);
}

function selectedLiveRoom() {
  const room = liveRooms.find((candidate) => candidate.id === state.activeRoomId) || liveRooms[0];
  state.activeRoomId = room.id;
  return room;
}

function enterLiveRoom(roomId) {
  stopLiveAudiobookPlayback(true);
  state.activeRoomId = liveRooms.some((room) => room.id === roomId) ? roomId : liveRooms[0].id;
  ensureLiveManuscript(selectedLiveRoom());
  state.enteredRoomId = state.activeRoomId;
  const chat = liveChatForRoom(state.activeRoomId);
  chat.push({
    author: "System",
    text: `You entered ${selectedLiveRoom().title}.`,
    time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  });
  if (chat.length > 40) chat.splice(0, chat.length - 40);
  persistState();
  renderLiveExperience();
  startLiveAudiobookPlayback();
  setStatus(`Entered ${selectedLiveRoom().title}`);
}

function leaveLiveRoom() {
  const room = selectedLiveRoom();
  stopAllPlayback();
  state.enteredRoomId = "";
  openedBookComments = null;
  persistState();
  renderLiveExperience();
  setStatus(`Left ${room.title}`);
}

function liveChatForRoom(roomId) {
  if (openedBookComments) return openedBookComments;
  if (!state.liveChat || typeof state.liveChat !== "object") {
    state.liveChat = clone(defaultLiveChat);
  }
  if (!Array.isArray(state.liveChat[roomId])) {
    state.liveChat[roomId] = clone(defaultLiveChat[roomId] || [
      { author: "Host", text: "Room is live. Start the audiobook chat.", time: "Now" }
    ]);
  }
  state.liveChat[roomId] = sanitizeLiveChatMessages(state.liveChat[roomId]);
  return state.liveChat[roomId];
}

function sendLiveChat() {
  const text = els.liveChatInput.value.trim();
  if (!text) {
    setStatus("Type a chat message first");
    return;
  }
  const room = selectedLiveRoom();
  if (state.enteredRoomId !== room.id) {
    setStatus(`Enter ${room.title} before commenting`);
    renderRoomStage();
    return;
  }
  const chat = liveChatForRoom(room.id);
  chat.push({
    author: "You",
    text,
    time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  });
  if (chat.length > 40) chat.splice(0, chat.length - 40);
  els.liveChatInput.value = "";
  persistState();
  renderLiveChat(chat);
  setStatus(`Message sent to ${room.title}`);
}

function activeChapter() {
  clampActiveChapter();
  return parsedBook.chapters[state.activeChapterIndex] || parsedBook.chapters[0] || { title: "Manuscript", lines: [] };
}

function clampActiveChapter() {
  if (state.activeChapterIndex >= parsedBook.chapters.length) {
    state.activeChapterIndex = Math.max(0, parsedBook.chapters.length - 1);
  }
}

function getCastForLine(line) {
  return state.cast[line.speakerId] || state.cast.narrator || defaultState.cast.narrator;
}

function findVoice(uri) {
  return voices.find((voice) => voice.voiceURI === uri) || null;
}

function sampleForCharacter(character) {
  const line = parsedBook.lines.find((candidate) => candidate.speakerId === character.id);
  if (line) return line.text;
  if (character.id === "narrator") return "The first chapter opens with a calm, polished narration voice.";
  return `${character.name} is ready for the next scene.`;
}

function countWords(text) {
  const matches = text.match(/\b[\w']+\b/g);
  return matches ? matches.length : 0;
}

function estimateMinutes(words) {
  return Math.max(1, Math.ceil(words / 155));
}

function hydratePlanInputs() {
  readPlanInputs(true);
  els.planChaptersInput.value = String(state.targetChapters);
  els.planPagesInput.value = String(state.targetPages);
  if (els.targetWordsInput) els.targetWordsInput.value = String(targetWordCount());
}

function readPlanInputs(normalize = true) {
  const chapters = clamp(Number.parseInt(els.planChaptersInput.value, 10) || state.targetChapters || defaultState.targetChapters, 1, 80);
  const rawWords = Number.parseInt(els.targetWordsInput?.value, 10);
  const derivedPages = rawWords ? Math.ceil(rawWords / wordsPerPage) : Number.parseInt(els.planPagesInput.value, 10);
  const pages = clamp(derivedPages || state.targetPages || defaultState.targetPages, minPlannedPages, maxPlannedPages);
  state.targetChapters = Math.round(chapters);
  state.targetPages = Math.round(pages);
  updateRuntimeFromPlan();
  if (normalize) {
    els.planChaptersInput.value = String(state.targetChapters);
    els.planPagesInput.value = String(state.targetPages);
    if (els.targetWordsInput) els.targetWordsInput.value = String(targetWordCount());
  }
}

function updateRuntimeFromPlan() {
  state.targetPages = clamp(Math.round(Number(state.targetPages) || defaultState.targetPages), minPlannedPages, maxPlannedPages);
  state.targetChapters = clamp(Math.round(Number(state.targetChapters) || defaultState.targetChapters), 1, 80);
  state.targetDurationSeconds = clampDuration(Math.ceil((targetWordCount() / narrationWordsPerMinute) * 60));
}

function clampDuration(seconds) {
  return Math.round(clamp(Number(seconds) || minAudiobookSeconds, minAudiobookSeconds, maxAudiobookSeconds));
}

function durationParts(totalSeconds) {
  const safeSeconds = clampDuration(totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return { hours, minutes, seconds };
}

function formatDuration(totalSeconds) {
  const parts = durationParts(totalSeconds);
  const mm = String(parts.minutes).padStart(2, "0");
  const ss = String(parts.seconds).padStart(2, "0");
  return `${parts.hours}:${mm}:${ss}`;
}

function formatClock(totalSeconds) {
  const safeSeconds = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function targetWordCount() {
  return Math.round(state.targetPages * wordsPerPage);
}

function recommendedChapterCount(totalSeconds) {
  return state.targetChapters || clamp(Math.round(totalSeconds / (12 * 60)), 1, 80);
}

function distributeSeconds(totalSeconds, count) {
  const base = Math.floor(totalSeconds / count);
  const remainder = totalSeconds % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

function distributeWords(totalWords, count) {
  const base = Math.floor(totalWords / count);
  const remainder = totalWords % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function titleCase(value) {
  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (char) => char.toUpperCase())
    .replace(/\bMc([a-z])/g, (_, char) => `Mc${char.toUpperCase()}`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "item";
}

function hashText(value) {
  return String(value || "").split("").reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0) >>> 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(message) {
  els.statusBar.textContent = message;
  els.statusBar.hidden = false;
  window.clearTimeout(setStatus.timer);
  setStatus.timer = window.setTimeout(() => {
    if (els.statusBar) els.statusBar.hidden = true;
  }, 5000);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return clone(defaultState);
    const merged = {
      ...clone(defaultState),
      ...saved,
      cast: {
        ...clone(defaultState.cast),
        ...(saved.cast || {})
      },
      profile: {
        ...clone(defaultState.profile),
        ...(saved.profile || {})
      },
      liveChat: {
        ...clone(defaultState.liveChat),
        ...(saved.liveChat || {})
      },
      connectedAccounts: {
        ...clone(defaultState.connectedAccounts),
        ...(saved.connectedAccounts || {})
      }
    };
    if ((merged.profile?.name || "").includes("Con" + "nor") || (merged.profile?.handle || "").includes("four" + "crowns")) {
      merged.profile.name = defaultState.profile.name;
      merged.profile.handle = defaultState.profile.handle;
      merged.profile.bio = defaultState.profile.bio;
    }
    if ((saved.voiceUpgradeVersion || 0) < 3) {
      merged.voiceMode = "openvoice";
      merged.voiceUpgradeVersion = 3;
    }
    if ((saved.planModelVersion || 0) < 1) {
      merged.targetLanguage = "English";
      merged.targetChapters = defaultState.targetChapters;
      merged.targetPages = defaultState.targetPages;
      merged.planSections = defaultState.planSections;
      merged.planModelVersion = 1;
    }
    merged.languageMode = normalizeLanguageMode(merged.languageMode);
    if (!popularLanguages.includes(merged.targetLanguage)) {
      merged.targetLanguage = "English";
    }
    merged.languageOutput = sanitizeGeneratedBookText(merged.languageOutput);
    merged.manuscript = sanitizeGeneratedBookText(merged.manuscript);
    merged.liveChat = sanitizeLiveChatState(merged.liveChat);
    merged.targetPages = clamp(Math.round(Number(merged.targetPages) || defaultState.targetPages), minPlannedPages, maxPlannedPages);
    merged.price = "Free";
    merged.targetChapters = clamp(Math.round(Number(merged.targetChapters) || defaultState.targetChapters), 1, 80);
    merged.planSections = String(merged.planSections || defaultState.planSections);
    merged.targetDurationSeconds = clampDuration(Math.ceil(((merged.targetPages * wordsPerPage) / narrationWordsPerMinute) * 60));
    merged.activeTrackIndex = Math.max(0, Math.round(Number(merged.activeTrackIndex) || 0));
    if (!liveRooms.some((room) => room.id === merged.activeRoomId)) {
      merged.activeRoomId = defaultState.activeRoomId;
    }
    if (merged.enteredRoomId && !liveRooms.some((room) => room.id === merged.enteredRoomId)) {
      merged.enteredRoomId = "";
    }
    if (!themeOptions.some((theme) => theme.id === merged.theme)) {
      merged.theme = defaultState.theme;
    }
    if (!profilePeople[merged.profileFocusId]) {
      merged.profileFocusId = defaultState.profileFocusId;
    }
    if (!messageThreads[merged.messageTab]) {
      merged.messageTab = defaultState.messageTab;
    }
    merged.weirdness = clamp(Number(merged.weirdness) || defaultState.weirdness, 0, 100);
    merged.styleInfluence = clamp(Number(merged.styleInfluence) || defaultState.styleInfluence, 0, 100);
    Object.values(merged.cast).forEach((character, index) => {
      if (!character.cloudVoice) {
        character.cloudVoice = defaultHdVoice(character, index);
      }
    });
    removePlanningCastEntries(merged.cast);
    return merged;
  } catch {
    return clone(defaultState);
  }
}

function persistState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadLibrary() {
  try {
    return JSON.parse(localStorage.getItem(libraryKey)) || [];
  } catch {
    return [];
  }
}

function saveLibrary() {
  localStorage.setItem(libraryKey, JSON.stringify(library));
}

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
