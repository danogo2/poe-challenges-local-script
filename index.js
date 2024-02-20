// ==UserScript==
// @name         pathofexile.com Challenges
// @namespace    http://tampermonkey.net/
// @version      000.004.009
// @updateURL    https://raw.githubusercontent.com/danogo2/pathofexile.com-challenges/main/index.js
// @downloadURL  https://raw.githubusercontent.com/danogo2/pathofexile.com-challenges/main/index.js
// @description  path of exile challenges extension
// @author       danogo
// @match        https://www.pathofexile.com/account/view-profile/*/challenges*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pathofexile.com
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';
  GM_addStyle(`
    /* adjusting layout */
  .profile {
    display: flex;
    flex-direction: column;
  }

  .profile .profile-top {
    height: 30px;
  }

  .profile .title-bar {
    display: block;
    align-self: center;
    margin: 0;
    flex-grow: 1;
    text-align: right;
  }

  .profile .title-bar::first-letter {
    text-transform: uppercase;
  }

  .challenge-list.poeForm form,
  .challenge-list.poeForm form select {
    height: 100%;
    max-width: 160px;
  }

  .profile .profile-container,
  .profile .profile-container .container-top {
    width: 100%;
    box-sizing: border-box;
    padding-right: 2px;
  }

  .profile .profile-container .achievement-container .achievement-list {
    width: 100%;
    margin-top: 6px;
    box-sizing: border-box;
  }

  .profile .profile-container .container-top {
    background-size: cover;
  }

  .profile .profile-details,
  .profile .progress-bar-container.large,
  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail
    .challenge-progress-bar-container {
    display: none;
  }

  .stickyOffsetMargin {
    padding-top: 39px;
  }

  .info.sticky {
    position: fixed;
    top: 0;
    z-index: 1;
    background-color: #181818f0;
    box-sizing: border-box;
    width: 922px;
    padding: 4px 9px;
    transform: translateX(-17px);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 2px solid #282828;
    margin-left: 1px;
  }

  /* adding settings */
  .settings {
    display: flex;
    padding: 5px 0;
    gap: 2%;
    align-items: stretch;
  }

  .sticky .settings {
    padding: 5px 5px;
  }

  .input-search,
  .tag-select {
    background-color: rgba(42, 42, 42, 0.9);
    border: 3px solid #1d1d1c;
    border-image: url(/protected/image/border/border1.png?v=1704855224122&key=DPRxGBu6U2K_Mk-O2PTPUg)
      3 3 3 3 repeat;
    color: #beb698;
    box-sizing: border-box;
    padding: 3px;
    font-size: 0.8rem;
    max-width: 160px;
    height: 100%;
  }

  .tag-select {
    width: 160px;
  }

  .input-search::placeholder,
  .tag-select::placeholder {
    color: #beb69888;
    font-size: 0.8rem;
    padding-left: 0;
  }

  .input-search:focus,
  .tag-select:focus {
    outline: none;
    border-image: url('/protected/image/border/border1-active.png?v=1704855224122&key=Uu-xjxla35hOBDKrRr9TFA')
      3 3 3 3 repeat;
  }

  .tag-select,
  .league-select {
    cursor: pointer;
  }

  /* hide toggle button */

  .button-settings {
    display: flex;
    height: 100%;
    align-items: center;
    background: transparent;
    border: none;
    box-sizing: border-box;
    outline: none;
    padding: 0;
  }

  .button-settings:hover {
    filter: brightness(0.8);
  }

  .settings-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .icon-show,
  .hide-completed .icon-hide {
    display: none;
  }

  .icon-hide,
  .hide-completed .icon-show {
    display: block;
  }

  .hidden,
  .search-hidden,
  .tag-hidden,
  .hide-completed .achievement:not(.incomplete) {
    display: none;
  }

  /* challenge box */
  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement {
    width: 100%;
    background-size: 100% 40px;
  }

  .achievement-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    height: 40px;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    h2 {
    padding-left: 90px;
    justify-self: end;
    line-height: 40px;
  }

  .achievement-header h2:first-child {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    img.completion {
    position: static;
    width: 32px;
    height: 32px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    h2.completion-detail {
    line-height: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    padding-right: 26px;
  }
  /* challenge tag input */
  .input-tag {
    background-color: transparent;
    border: none;
    color: #989898;
    margin: 0 10px;
    align-self: center;
    flex-grow: 1;
    border-radius: 4px;
    padding: 4px;
  }

  .input-tag:focus {
    outline: 1px solid #989898;
  }

  .input-tag::placeholder {
    color: #beb69888;
  }

  /* unhide challenge details */
  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail {
    display: block;
    background-size: cover;
    margin-top: 0;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail-inner {
    padding-left: 90px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .btn-detail {
    display: none;
  }

  .completion {
    margin-right: 6px;
  }

  .items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 16px;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail
    ul.split {
    width: 100%;
  }

  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail
    ul:not(.split) {
    grid-column: 1 / span 2;
  }

  .note-textarea {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    background-color: transparent;
    resize: none;
    border: none;
    color: #989898;
    padding: 4px;
    font-size: 0.8rem;
    border-radius: 4px;
  }

  .note-textarea:focus {
    outline: 1px solid #333;
  }

  .note-textarea::-webkit-scrollbar {
    display: none;
  }

  .note-textarea::placeholder {
    color: #beb69888;
  }

  .inner-block {
    display: block;
  }
  `);

  const svgIconEye =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="#beb698"/><path fill="#beb698" d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z"/></svg>';

  const svgIconEyeOff =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z" fill="#beb698"/><path d="M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z" fill="#beb698"/></svg>';

  const svgIconTrash =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/><path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" fill="#beb698"/></svg>';

  const state = {
    challElMap: new Map(),
    challObjMap: new Map(),
    challsGotLoaded: false,
    defaultTagsChanged: false,
    defaultTagsSet: new Set(), // currently available in a league, not all from array below
    customTagsSet: new Set(),
    league: document.querySelector('select[name="season"]').value,
    hideCompleted: false,
    lastSelectedTagValue: '',
    defaultTags: [
      ['vendor', 'buy', 'recipe'],
      ['lab', 'labyrinth', 'divine font', 'transfigured', 'treasure key'],
      [
        'boss',
        'atziri, queen',
        'cortex',
        'the elder',
        'the shaper',
        'the maven',
        'catarina',
        'infinite hunger',
        'eater of worlds',
        'trialmaster',
        'oshabi',
        'omnitect',
        'lycia, unholy',
      ],
      ['affliction', 'wildwood', 'wisp', 'tincture', 'charm'],
      ['shrine'],
      ['essence'],
      ['einhar', 'beasts', 'bestiary'],
      ['delirium', 'simulacrum'],
      ['torment', 'touched', 'possessed'],
      [
        'leveling',
        'act 1',
        'act 2',
        'act 3',
        'act 4',
        'act 5',
        'act 6',
        'act 7',
        'act 8',
        'act 9',
      ],
      ['anarchy', 'rogue exile'],
      ['ambush', 'strongbox'],
      ['map', 'tier', 'quantity', 'rarity'],
      ['beyond', 'tainted'],
      ['blight', 'cassia', 'ravaged', ' oil'],
      ['expedition', 'remnant', 'logbook', 'artifact'],
      ['ultimatum', 'inscribed', 'trialmaster', 'catalyst'],
      ['alva', 'incursion', 'omnitect'],
      ['jun', 'betrayal', 'catarina', 'syndicate'],
      ['niko', 'delve', 'resonator', 'fossil'],
      ['divination', 'turn in'],
      ['scarab'],
      ['breach'],
      ['tempest'],
      ['harvest', 'lifeforce', 'oshabi'],
      ['kirac'],
      ['harbinger', 'fracturing', 'beachhead'],
      ['vaal'],
      ['monster'],
      ['memory'],
      ['essence'],
      ['heist', 'tempering', 'tailoring', 'blueprint', 'contract'],
      ['eldritch'],
      ['ritual', 'altar', 'vessel'],
      ['legion', 'timeless'],
      [
        'sanctum',
        'relic',
        'divinia',
        'lycia, unholy',
        'xenathar',
        'braom',
        'varakath',
      ],
      ['pinnacle'],
      ['atlas'],
    ],
    updatedDefaultTags: new Set(),
  };

  const checkDefaultTagsForDuplicates = () => {
    const allDefaultTagsSet = new Set(
      state.defaultTags.flatMap(tagArr => tagArr.join('#'))
    );
    state.defaultTags = [...allDefaultTagsSet].map(str => str.split('#'));
  };

  const setDifference = (set1, set2) => {
    set1 = new Set(set1);
    set2 = new Set(set2);
    for (let el of set2.values()) {
      set1.delete(el);
    }
    return set1;
  };

  const checkForDefaultTagsChanges = (tagsLS, tagsState) => {
    const tagNamesLS = new Set();
    const tagNamesState = new Set();
    const tagsStringsLS = new Set(
      tagsLS.map(tagArr => {
        tagNamesLS.add(tagArr[0]);
        return tagArr.join('#');
      })
    );
    const tagsStringsState = new Set(
      tagsState.map(tagArr => {
        tagNamesState.add(tagArr[0]);
        return tagArr.join('#');
      })
    );
    const tagsSetLS = new Set(tagsStringsLS);
    const tagsSetState = new Set(tagsStringsState);
    const tagsSetUpdated = setDifference(tagsSetState, tagsSetLS);

    if (tagsSetUpdated.size || tagsSetLS.size !== tagsSetState.size) {
      const tagsArrsUpdated = [...tagsSetUpdated].map(str => str.split('#')[0]);
      state.defaultTagsChanged = true;
      state.updatedDefaultTags = new Set(tagsArrsUpdated);
    }
  };

  const getStateFromLS = () => {
    let leagueStateLS = localStorage.getItem(state.league);

    if (leagueStateLS) {
      leagueStateLS = JSON.parse(leagueStateLS);
      const { challsArrayLS, defaultTagsLS } = leagueStateLS;
      if (challsArrayLS) {
        state.challsGotLoaded = true;
        state.challObjMap = new Map(JSON.parse(challsArrayLS));
      }
      if (defaultTagsLS) {
        checkForDefaultTagsChanges(
          JSON.parse(defaultTagsLS),
          state.defaultTags
        );
      }
    }
  };

  const updateLS = () => {
    localStorage.setItem(
      state.league,
      JSON.stringify({
        challsArrayLS: JSON.stringify(Array.from(state.challObjMap)),
        defaultTagsLS: JSON.stringify(state.defaultTags),
      })
    );
  };

  const insertSearchInputEl = parentEl => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      '<div class="settings-option"><input type="search" name="search" id="search" class="input-search" placeholder="Search" /></div>'
    );
    return parentEl.querySelector('.input-search');
  };

  const insertHideButtonEl = parentEl => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      `<div class="settings-option"><button class='button-settings button-hide'><div class="settings-icon icon-hide" title="hide completed">${svgIconEye}</div><div class="settings-icon icon-show" title="show completed">${svgIconEyeOff}</div></button></div>`
    );
    return parentEl.querySelector('.button-hide');
  };

  const insertClearButtonEl = parentEl => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      `<div class="settings-option"><button class='button-settings button-clear'><div class="settings-icon icon-clear" title="clear league">${svgIconTrash}</div></button></div>`
    );
    return parentEl.querySelector('.button-clear');
  };

  const insertTagSelectEl = parentEl => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      '<div class="settings-option"><select class="tag-select" name="tags" id="tags"><option class="tag-option" value="">— Tags —</option></select></div>'
    );
    return parentEl.querySelector('#tags');
  };

  const insertTagInputEl = (parentEl, id) => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      `<input type="text" class="input-tag" placeholder="tag1, tag2, tag3.." data-id="${id}"/>`
    );
    return parentEl.querySelector('.input-tag');
  };

  const insertNoteTextareaEl = (parentEl, id) => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      `<div class="note-container"><textarea name="textarea" class="note-textarea" placeholder="Write your note here" data-id="${id}"></textarea>`
    );
    return parentEl.querySelector('.note-textarea');
  };

  // using this method because {element.innerHTML = ''}doesn't clear event handlers of the child nodes and might cause memory leak
  const removeAllChildNodes = parent => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  // needs to run on every change in the input tag
  const updateStateTagSets = () => {
    // update default tags
    state.defaultTagsSet.clear();
    state.customTagsSet.clear();
    for (let challObj of state.challObjMap.values()) {
      for (let tagObj of challObj.tags) {
        const { name, type } = tagObj;
        state[`${type}TagsSet`].add(name);
      }
    }
  };

  const getTagObjectsFromStateTagSets = () => {
    const tagObjectsArr = [];
    // get custom tags without tags that are already in default tags
    const customTagsPure = setDifference(
      state.customTagsSet,
      state.defaultTagsSet
    );

    for (let tagName of state.defaultTagsSet.values()) {
      tagObjectsArr.push({ name: tagName, type: 'default' });
    }
    for (let tagName of customTagsPure.values()) {
      tagObjectsArr.push({ name: tagName, type: 'custom' });
    }
    return tagObjectsArr;
  };

  // need to run on every tag input change
  const updateTagsDropdownHTML = () => {
    // has to run after changing tag inputs
    const selectEl = document.querySelector('.tag-select');
    removeAllChildNodes(selectEl);
    updateStateTagSets();
    const enteredTagObjectsArr = getTagObjectsFromStateTagSets();
    selectEl.insertAdjacentHTML(
      'afterbegin',
      '<option class="tag-option" value="">— tags —</option>'
    );
    const sortedTagsArray = [...enteredTagObjectsArr].sort((aObj, bObj) =>
      aObj.name.localeCompare(bObj.name)
    );

    for (let tagObj of sortedTagsArray) {
      selectEl.insertAdjacentHTML(
        'beforeend',
        `<option class="tag-option tag-${tagObj.type}" value="${tagObj.name}">${tagObj.name}</option>`
      );
    }
    let selectedTagIndex;

    const allTagsSet = new Set([
      ...state.defaultTagsSet,
      ...state.customTagsSet,
    ]);
    if (!allTagsSet.has(state.lastSelectedTagValue)) {
      // none chall has currently selected tag
      selectEl.selectedIndex = 0;
      for (let challEl of state.challElMap.values()) {
        challEl.classList.remove('tag-hidden');
      }
      state.lastSelectedTagValue = '';
    } else {
      let i = 0;
      for (let option of selectEl.options) {
        if (option.value === state.lastSelectedTagValue) {
          selectedTagIndex = i;
        }
        i++;
      }
    }

    selectEl.selectedIndex = selectedTagIndex;
    updateLS();
  };

  const testAllValues = (testValues, str) => {
    const specialChars = new Set(['\\', '?', '[', ']', '*', '+', '(', ')']);
    let hasAllValues = true;
    // get rid of duplicates
    testValues = new Set(testValues);
    testValues = [...testValues];
    for (let value of testValues) {
      if (specialChars.has(value)) value = `\\${value}`;
      const re = new RegExp(value);
      if (!re.test(str)) {
        hasAllValues = false;
        break;
      }
    }
    return hasAllValues;
  };

  const searchChallHandler = event => {
    const searchEl = event.target;
    const searchValue = searchEl.value.toLowerCase();
    let searchValues = '';
    if (searchValue !== '') searchValues = [...searchValue.match(/\S+/g)];

    for (let [id, challObj] of state.challObjMap.entries()) {
      const challEl = state.challElMap.get(id);
      if (
        searchValue === '' ||
        testAllValues(searchValues, challObj.searchChars)
      ) {
        challEl.classList.remove('search-hidden');
      } else {
        challEl.classList.add('search-hidden');
      }
    }
  };

  const formatSearchInputHandler = event => {
    const searchEl = event.target;
    const searchValue = searchEl.value;
    if (searchValue === '') return;
    let searchValues = [...searchValue.match(/\S+/g)];
    searchValues = new Set(searchValues);
    searchEl.value = [...searchValues].join(' ');
  };

  const getCoords = elem => {
    // coords relative to the viewport
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + window.scrollY,
      right: box.right + window.scrollX,
      bottom: box.bottom + window.scrollY,
      left: box.left + window.scrollX,
    };
  };

  const scrollToTop = () => {
    const achievementContainerTop = getCoords(
      document.querySelector('.achievement-container')
    ).top;
    if (document.querySelector('.info').classList.contains('sticky')) {
      window.scrollTo({
        top: achievementContainerTop,
        behavior: 'smooth',
      });
    }
  };

  const selectTagHandler = event => {
    const selectedTagValue = event.target.value;
    const selectedTagIndex = event.target.selectedIndex;
    state.lastSelectedTagValue = selectedTagValue;
    // hide challenges without selected tag
    for (let [id, challObj] of state.challObjMap.entries()) {
      const challEl = state.challElMap.get(id);
      if (
        selectedTagIndex === 0 ||
        challObj.tags.some(tagObj => tagObj.name === selectedTagValue)
      ) {
        // show chall if default value is selected('') or has selected tag
        challEl.classList.remove('tag-hidden');
      } else {
        challEl.classList.add('tag-hidden');
      }
    }
    scrollToTop();
  };

  const clickHideButtonHandler = event => {
    state.hideCompleted = !state.hideCompleted;
    const challengeContainerEl = document.querySelector(
      '.achievement-container'
    );
    if (state.hideCompleted) {
      challengeContainerEl.classList.add('hide-completed');
    } else {
      challengeContainerEl.classList.remove('hide-completed');
    }
  };

  const clickClearButtonHandler = event => {
    const hasConfirmed = confirm(
      `Clear tags and notes for ${state.league} league?`
    );
    if (hasConfirmed) {
      localStorage.removeItem(state.league);
      location.reload();
    }
  };

  const addEventHandler = (element, eventType, handler) => {
    element.addEventListener(eventType, event => handler(event));
  };

  const changeTopLayout = () => {
    document.querySelector('.btn-show-achievements').remove();
    const titleEl = document.querySelector('.title-bar');
    const infoEl = document.querySelector('.profile .info');
    const leagueSelectEl = document.querySelector('.challenge-list.poeForm');
    leagueSelectEl.classList.add('settings-option');
    leagueSelectEl.querySelector('select').classList.add('league-select');
    titleEl.textContent = `${infoEl.textContent}`;
    infoEl.textContent = '';
    infoEl.insertAdjacentHTML('beforeend', '<div class="settings"></div>');
    const settingsEl = infoEl.querySelector('.settings');

    const searchInputEl = insertSearchInputEl(settingsEl);
    const tagSelectEl = insertTagSelectEl(settingsEl);
    settingsEl.insertAdjacentElement('beforeend', leagueSelectEl);
    const hideButtonEl = insertHideButtonEl(settingsEl);
    const clearButtonEl = insertClearButtonEl(settingsEl);
    titleEl.textContent = titleEl.textContent.replace('Challenges', '').trim();
    settingsEl.insertAdjacentElement('beforeend', titleEl);

    addEventHandler(searchInputEl, 'input', searchChallHandler);
    addEventHandler(searchInputEl, 'change', formatSearchInputHandler);
    addEventHandler(tagSelectEl, 'change', selectTagHandler);
    addEventHandler(hideButtonEl, 'click', clickHideButtonHandler);
    addEventHandler(clearButtonEl, 'click', clickClearButtonHandler);
  };

  const changeChallStyle = (id, challEl) => {
    // create header
    const headerEl = challEl.querySelector('h2');
    headerEl.textContent = `${id}. ${headerEl.textContent}`;
    const completionEl = challEl.querySelector('.completion-detail');
    const completionImgEl = challEl.querySelector('img.completion');
    let detailEl = challEl.querySelector('.detail');
    challEl.innerHTML = `<div class="achievement-header"></div>`;
    const headerContainerEl = challEl.querySelector('.achievement-header');
    headerContainerEl.insertAdjacentElement('beforeend', headerEl);
    if (completionEl) {
      headerContainerEl.insertAdjacentElement('beforeend', completionEl);
      completionEl.insertAdjacentElement('beforeend', completionImgEl);
    } else {
      headerContainerEl.insertAdjacentElement('beforeend', completionImgEl);
      completionImgEl.style.paddingRight = '26px';
    }
    // fix bug where is no detail el
    if (!detailEl) {
      challEl.insertAdjacentHTML(
        'beforeend',
        `<div class='detail'>
              <div class='detail-inner'>
                <span class='text'></span>
              </div>
            </div>`
      );
      detailEl = challEl.querySelector('.detail');
    }
    // add detail element
    challEl.insertAdjacentElement('beforeend', detailEl);
    // add tag input
    insertTagInputEl(headerEl, id);
    // add note input
    const taskList = challEl.querySelector('.items');
    if (taskList) {
      insertNoteTextareaEl(taskList, id);
    } else {
      const detailInnerEl = challEl.querySelector('.detail-inner');
      detailEl.querySelector('.text').classList.add('inner-block');
      insertNoteTextareaEl(detailInnerEl, id);
    }
  };

  const getChallengeSearchChars = challEl => {
    const header = challEl.querySelector('h2');
    const singleTask = challEl.querySelector('.text');
    const subTasks = challEl.querySelectorAll('.items ul li');
    let subTasksString;
    if (subTasks.length !== 0) {
      subTasksString = [...subTasks]
        .map(taskEl => taskEl.textContent)
        .join(' ');
    } else {
      subTasksString = '';
    }

    const searchChars = (
      header.textContent +
      ' ' +
      singleTask.textContent +
      ' ' +
      subTasksString
    )
      .trim()
      .toLowerCase();
    return searchChars;
  };

  const getDefaultTagsFromText = challText => {
    const defaultTags = [];
    for (let tagArray of state.defaultTags) {
      if (tagArray.some(key => challText.indexOf(key.toLowerCase()) !== -1)) {
        defaultTags.push(tagArray[0].toLowerCase());
        state.defaultTagsSet.add(tagArray[0].toLowerCase());
      }
    }
    return [...new Set(defaultTags)];
  };

  const createTagObjectsFromArr = (tagsArr, type) => {
    if (!tagsArr.length) return [];
    return tagsArr.map(tag => ({
      name: tag,
      type,
    }));
  };

  const createChallObj = (id, challEl) => {
    const challText = getChallengeSearchChars(challEl);
    const challDefaultTags = getDefaultTagsFromText(challText);
    const newChallObj = {
      searchChars: challText,
      note: '',
      defaultTags: challDefaultTags,
      tags: [...createTagObjectsFromArr(challDefaultTags, 'default')], // eg. tag objects {name: 'boss', type: 'default' || 'custom'}
    };
    state.challObjMap.set(id, newChallObj);
    // add tags to chall tag input when there is no local storage fetch
    const tagInputEl = challEl.querySelector('.input-tag');
    const tagsString = newChallObj.tags.map(tagObj => tagObj.name).join(', ');
    tagInputEl.value = tagsString;
  };

  const updateChallTags = challObj => {
    const challDefaultTagsSet = new Set(challObj.defaultTags);
    for (let tagObj of challObj.tags) {
      const { name, type } = tagObj;
      // change deleted default tags to custom
      if (!challDefaultTagsSet.has(name)) {
        tagObj.type = 'custom';
      }
      if (state.updatedDefaultTags.has(name)) {
        tagObj.type = 'default';
      }
    }

    for (let defaultTag of challObj.defaultTags) {
      if (state.updatedDefaultTags.has(defaultTag)) {
        if (!challObj.tags.some(tagObj => tagObj.name === defaultTag)) {
          challObj.tags.push({ name: defaultTag, type: 'default' });
        }
      }
    }
  };

  const updateChallEl = (id, challEl) => {
    const challObj = state.challObjMap.get(id);
    // in case they are changing challenge text
    const challText = getChallengeSearchChars(challEl);
    challObj.searchChars = challText;
    const noteTextareaEl = challEl.querySelector('.note-textarea');
    noteTextareaEl.value = challObj.note;
    const newDefaultTags = getDefaultTagsFromText(challText);
    challObj.defaultTags = newDefaultTags;
    if (state.defaultTagsChanged) {
      // change default tags to custom tags in case they are removed from state.defaultTags
      updateChallTags(challObj);
    }

    for (let tagObj of challObj.tags) {
      state[`${tagObj.type}TagsSet`].add(tagObj.name);
    }
    // TODO: display tags differently
    const tagInputEl = challEl.querySelector('.input-tag');
    const tagsString = challObj.tags.map(tagObj => tagObj.name).join(', ');
    tagInputEl.value = tagsString;
  };

  const processChallenges = () => {
    const challListEl = document.querySelectorAll('.achievement');
    for (let [index, challEl] of challListEl.entries()) {
      const id = index + 1;
      state.challElMap.set(id, challEl);
      changeChallStyle(id, challEl);
      state.challsGotLoaded
        ? updateChallEl(id, challEl)
        : createChallObj(id, challEl);
    }
  };

  const checkForDefaultRemoval = (challObj, enteredTagsSet) => {
    // from chall default tags delete those that were manually removed by the user
    const challDefaultTagsSet = new Set(challObj.defaultTags);
    const defaultTagsRemoved = setDifference(
      challDefaultTagsSet,
      enteredTagsSet
    );
    for (let removedTag of defaultTagsRemoved) {
      challDefaultTagsSet.delete(removedTag);
    }
    challObj.defaultTags = [...challDefaultTagsSet];
  };

  // TODO: create divs and spansm different display for default and custom tags in the input
  const updateTagInputHTML = (challObj, tagInputEl) => {
    const tagObjArr = challObj.tags;
    const tagsString = tagObjArr.map(tagObj => tagObj.name).join(', ');
    tagInputEl.value = tagsString;
  };

  // multi element events
  const tagInputHandler = event => {
    const tagInputEl = event.target;
    const inputValue = tagInputEl.value.trim();
    const challId = Number(tagInputEl.dataset.id);
    const challObj = state.challObjMap.get(challId);
    let enteredTags = inputValue.length
      ? inputValue.match(/[^\s,]+/g)
      : [...getDefaultTagsFromText(challObj.searchChars)];

    // create Set from array to get rid of duplicates
    const curChallTagsSet = new Set([...enteredTags]);
    // if deleted default tag, remove it from default tags until reset
    checkForDefaultRemoval(challObj, curChallTagsSet);
    enteredTags = [...curChallTagsSet];
    // tag max length: 16 characters
    const formattedTags = enteredTags.map(tag => tag.slice(0, 16));

    challObj.tags = [];
    const challDefaultTagsSet = new Set(challObj.defaultTags);
    for (let tag of formattedTags) {
      challObj.tags.push(
        challDefaultTagsSet.has(tag)
          ? { name: tag, type: 'default' }
          : { name: tag, type: 'custom' }
      );
      // no need to add to allTags set because allTags will be updated in updateTagsDropdownHTML()
    }

    updateTagInputHTML(challObj, tagInputEl);
    updateTagsDropdownHTML();
    // hide challenge after deleting currently selected tag from its tag input
    if (
      state.lastSelectedTagValue !== '' &&
      !curChallTagsSet.has(state.lastSelectedTagValue)
    ) {
      state.challElMap.get(challId).classList.add('tag-hidden');
    }
    updateLS();
  };

  const noteChangeHandler = event => {
    const textareaEl = event.target;
    const formattedNote = textareaEl.value.trim();
    textareaEl.value = formattedNote;
    const id = Number(textareaEl.dataset.id);
    const chall = state.challObjMap.get(id);
    chall.note = formattedNote;
    updateLS();
  };

  const delegateEventHandlers = () => {
    const challsContainerEl = document.querySelector('.achievement-list');
    challsContainerEl.addEventListener('change', event => {
      // event delegation
      const target = event.target;
      if (target.classList.contains('input-tag')) {
        tagInputHandler(event);
      }
      if (target.classList.contains('note-textarea')) {
        noteChangeHandler(event);
      }
    });
  };

  const makeInfoNavSticky = () => {
    // get coords relative to document (viewport + current scroll)

    const container = document.querySelector('.achievement-container');
    const nav = container.querySelector('.info');
    const containerCoords = getCoords(container);
    const containerTop = containerCoords.top;

    const makeSticky = () => {
      let scrollPos = window.scrollY;
      if (scrollPos > containerTop) {
        nav.classList.add('sticky');
        container.classList.add('stickyOffsetMargin');
      } else {
        nav.classList.remove('sticky');
        container.classList.remove('stickyOffsetMargin');
      }
    };
    makeSticky();
    window.addEventListener('scroll', event => {
      makeSticky();
    });
  };

  const init = () => {
    checkDefaultTagsForDuplicates();
    getStateFromLS();
    processChallenges();
    changeTopLayout();
    delegateEventHandlers();
    updateTagsDropdownHTML();
    makeInfoNavSticky();
  };

  init();
})();
