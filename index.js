// ==UserScript==
// @name         pathofexile.com Challenges
// @namespace    http://tampermonkey.net/
// @version      000.005.005
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
  
  option.tag-custom {
    color: rgb(0, 182, 255);
  }
  
  .side-notes {
    /* 17px is a scrollbar width */
    max-height: 100vh;
    width: calc((100vw - 1012px - 17px) / 2);
    background-color: #181818f0;
    border: 2px solid #282828;
    z-index: 1;
    box-sizing: border-box;
    top: 0;
    left: 0;
    position: fixed;
    overflow-x: hidden;
    padding: 0;
    display: none;
  }
  
  .side-notes.hide-notes {
    width: auto;
  }
  
  .side-notes.hide-notes .side-settings {
    gap: 0;
  }
  
  .side-notes:has(*.side-challenge:not(.hidden)) {
    display: block;
  }
  
  .side-notes::-webkit-scrollbar {
    width: 10px;
  }
  
  .side-notes::-webkit-scrollbar-track {
    background: #222;
  }
  
  .side-notes::-webkit-scrollbar-thumb {
    background: #444;
  }
  
  .side-notes::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  .side-notes.right {
    right: 0;
    left: auto;
    border-bottom-left-radius: 6px;
  }
  
  .side-notes:not(.right) {
    border-bottom-right-radius: 6px;
  }
  
  .side-nav {
    display: flex;
    justify-content: space-between;
    background-color: #282828;
    padding: 12px;
    align-items: center;
  }
  
  .right .side-nav {
    flex-direction: row-reverse;
  }
  
  .side-header {
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
  }
  
  .side-settings {
    display: flex;
    gap: 8px;
  }
  
  .right .side-settings {
    flex-direction: row-reverse;
  }
  
  .side-challenges {
    padding: 0 12px;
  }
  
  .side-challenges:has(> :not(.hidden)) {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  
  .hide-notes .side-challenges,
  .hide-completed .side-challenges {
    display: none;
  }
  
  .hide-completed .side-challenges:has(> .incomplete:not(.hidden)) {
    display: list-item;
  }
  
  .side-challenge {
    padding-top: 6px;
  }
  
  .side-challenge-header {
    font-size: 12px;
    display: flex;
    cursor: pointer;
    align-items: center;
  }
  
  .side-challenge-header:hover {
    filter: brightness(0.8);
  }
  
  .goto-container {
    display: flex;
    height: 100%;
    margin-left: 10px;
    align-items: center;
    visibility: hidden;
  }
  
  .icon-goto {
    width: 12px;
    height: 12px;
  }
  
  .side-challenge-header:hover .goto-container {
    visibility: visible;
  }
  
  .side-note {
    font-size: 11px;
    padding: 4px 0 8px 0;
    white-space: pre-wrap;
  }
  
  .settings-icon.icon-minimize {
    width: 18px;
    height: 18px;
  }
  
  .note-completion {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .note-completion-check.incomplete {
    visibility: hidden;
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
    align-items: center;
  }
  
  .icon-show-notes {
    width: 20px;
    width: 20px;
  }
  
  .icon-show,
  .icon-show-notes,
  .hide-completed .icon-hide,
  .hide-notes .icon-minimize,
  .hide-notes .arrow-left,
  .hide-notes .arrow-right,
  .arrow-left,
  .side-notes.right .arrow-right,
  .hide-notes .side-header,
  .hide-completed .side-challenge.complete {
    display: none;
  }
  
  .icon-hide,
  .hide-completed .icon-show,
  .hide-notes .icon-show-notes,
  .side-notes.right:not(.hide-notes) .arrow-left {
    display: flex;
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
    padding-right: 26px;
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
  
  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail
    span.text {
    display: block;
    padding-bottom: 8px;
    font-size: 14px;
  }
  
  .profile
    .profile-container
    .achievement-container
    .achievement-list
    .achievement
    .detail
    ul
    li {
    font-size: 14px;
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
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" fill="#beb698"/></svg>';

  const svgIconEyeOff =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" fill="#beb698"/></svg>';

  const svgIconTrash =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none"/><path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" fill="#beb698"/></svg>';

  const svgIconArrowR =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="#beb698" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M262.62 336L342 256l-79.38-80M330.97 256H170"/><path d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z" fill="none" stroke="#beb698" stroke-miterlimit="10" stroke-width="32"/></svg>';

  const svgIconArrowL =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="#beb698" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M249.38 336L170 256l79.38-80M181.03 256H342"/><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="#beb698" stroke-miterlimit="10" stroke-width="32"/></svg>';

  const svgIconArrowGoTo =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#beb698" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>';

  const svgIconNotePen =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" fill="#beb698"/></svg>';

  const svgIconMinimize =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM152 232H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" fill="#beb698"/></svg>';

  // decodeURIComponent is necessary for leagues separated by /
  const state = {
    challElMap: new Map(),
    challObjMap: new Map(),
    challsGotLoaded: false,
    defaultTagsChanged: false,
    defaultTagsSet: new Set(), // currently available in a league, not all from array below
    customTagsSet: new Set(),
    league: decodeURIComponent(
      document.querySelector('select[name="season"]').value
    ),
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
      `<div class="note-container"><textarea name="textarea" class="note-textarea" placeholder="Write your note here" data-id="${id}" wrap="hard"></textarea>`
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

  const updateSideNote = (noteID, newText) => {
    const noteEl = document.querySelector(`.side-note[data-id="${noteID}"]`);
    noteEl.textContent = newText;
    if (newText.length) {
      noteEl.closest('.side-challenge').classList.remove('hidden');
    } else {
      noteEl.closest('.side-challenge').classList.add('hidden');
    }
  };

  const clickToggleSideNotes = event => {
    const sideNotesEl = event.target.closest('.side-notes');
    if (sideNotesEl.classList.contains('hide-notes')) {
      sideNotesEl.classList.remove('hide-notes');
    } else {
      sideNotesEl.classList.add('hide-notes');
    }
  };

  const clickToggleSideNotesPosition = event => {
    const sideNotesEl = event.target.closest('.side-notes');
    if (sideNotesEl.classList.contains('right')) {
      sideNotesEl.classList.remove('right');
    } else {
      sideNotesEl.classList.add('right');
    }
  };

  const clickSideChallenges = event => {
    const target = event.target;
    if (
      target.closest('h3') &&
      target.closest('h3').className === 'side-challenge-header'
    ) {
      const id = target.closest('.side-challenge-header').dataset.id;
      const goToTarget = getCoords(state.challElMap.get(Number(id))).top;
      window.scrollTo({
        top: goToTarget - 51,
        behavior: 'smooth',
      });
    }
  };

  const createSideNotes = () => {
    document.querySelector('body').insertAdjacentHTML(
      'beforeend',
      `<div class='side-notes'>
        <div class="side-nav">
          <div class="settings-option"><button class="button-settings toggle-view"><div class="settings-icon icon-minimize" title="hide side-notes">${svgIconMinimize}</div><div class="settings-icon icon-show-notes" title="show side-notes">${svgIconNotePen}</div></button></div>
          <h2 class="side-header">${state.league} league notes</h2>
          <div class="settings-option"><button class="button-settings toggle-side"><div class="settings-icon arrow-right" title="show on the right">${svgIconArrowR}</div><div class="settings-icon arrow-left" title="show on the left">${svgIconArrowL}</div></button></div>
        </div>
        <ul class='side-challenges'></ul>
      </div>`
    );
    const challengeSideList = document.querySelector('.side-challenges');
    for (let [id, challObj] of state.challObjMap.entries()) {
      const challEl = state.challElMap.get(id);
      const completionProgress =
        challEl.querySelector('.completion-detail').textContent;
      const isComplete = !challEl.classList.contains('incomplete');
      const { note, name } = challObj;
      challengeSideList.insertAdjacentHTML(
        'beforeend',
        `<li class="side-challenge ${note.length ? '' : 'hidden'} ${
          isComplete ? 'complete' : 'incomplete'
        }" data-id="${id}"><h3 class="side-challenge-header" title="scroll to challenge" data-id="${id}"><span class="side-challenge-header--text">${name}</span><div class="goto-container"><div class="icon-goto">${svgIconArrowGoTo}</div></div><div class="note-completion"><span class="note-progress">${completionProgress}</span><span class="note-completion-check ${
          isComplete ? '' : 'incomplete'
        }">✓</span></div></h3><div class="side-note" data-id="${id}">${note}</div></li>`
      );
    }
    document
      .querySelector('.side-nav .toggle-view')
      .addEventListener('click', event => clickToggleSideNotes(event));
    document
      .querySelector('.side-nav .toggle-side')
      .addEventListener('click', event => clickToggleSideNotesPosition(event));
    document
      .querySelector('.side-challenges')
      .addEventListener('click', event => clickSideChallenges(event));
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
    const sideNotesEl = document.querySelector('.side-notes');
    if (state.hideCompleted) {
      challengeContainerEl.classList.add('hide-completed');
      sideNotesEl.classList.add('hide-completed');
    } else {
      challengeContainerEl.classList.remove('hide-completed');
      sideNotesEl.classList.remove('hide-completed');
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
    const challengeName = challEl.querySelector('h2').textContent;
    const newChallObj = {
      name: challengeName,
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
    const challengeName = challEl.querySelector('h2').textContent;
    challObj.name = challengeName;
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

  const removeBrs = () => {
    const brEls = document.querySelectorAll('br');
    for (let br of brEls.values()) {
      br.remove();
    }
  };

  const processChallenges = () => {
    const challListEl = document.querySelectorAll('.achievement');
    removeBrs();
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
    updateSideNote(id, formattedNote);
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
    createSideNotes();
    delegateEventHandlers();
    updateTagsDropdownHTML();
    makeInfoNavSticky();
  };

  init();
})();
