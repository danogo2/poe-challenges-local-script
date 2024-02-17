// ==UserScript==
// @name         PoE Challenges
// @namespace    http://tampermonkey.net/
// @version      000.001.002
// @updateURL       https://raw.githubusercontent.com/danogo2/pathofexile.com-challenges/main/index.js
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
  /* adding settings */
.settings {
  display: flex;
  padding: 5px 0;
  gap: 1%;
}

.input-search {
  background-color: rgba(42, 42, 42, 0.9);
  border: 3px solid #1d1d1c;
  border-image: url(/protected/image/border/border1.png?v=1704855224122&key=DPRxGBu6U2K_Mk-O2PTPUg)
    3 3 3 3 repeat;
  color: #beb698;
  box-sizing: border-box;
  padding: 3px;
  font-size: 0.8rem;
}

.input-search::placeholder {
  color: #beb69888;
  font-size: 0.8rem;
  padding-left: 0;
}

.input-search:focus {
  outline: none;
  border-image: url('/protected/image/border/border1-active.png?v=1704855224122&key=Uu-xjxla35hOBDKrRr9TFA')
    3 3 3 3 repeat;
}

/* hide toggle button */

.button-hide {
  display: flex;
  height: 100%;
  align-items: center;
  background: transparent;
  border: none;
  box-sizing: border-box;
  outline: none;
}

.button-hide:hover {
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
.hide-completed .achievement:not(.incomplete) {
  display: none;
}

/* adjusting layout */
.profile {
  display: flex;
  flex-direction: column;
}
.profile .profile-container,
.profile .profile-container .container-top {
  width: 100%;
}

.profile .profile-container .achievement-container .achievement-list {
  width: 100%;
  margin-top: 10px;
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
  font-size: 12px;
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

.inner-block {
  display: block;
}


    `);

  const svgIconEye =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="#beb698"/><path fill="#beb698" d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z"/></svg>';

  const svgIconEyeOff =
    '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z" fill="#beb698"/><path d="M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z" fill="#beb698"/></svg>';

  const state = {
    challElMap: new Map(),
    challObjMap: new Map(),
    challsGotLoaded: false,
    allTagsSet: new Set(),
    league: document.querySelector('select[name="season"]').value,
    hideCompleted: false,
  };

  const getChallsFromLS = () => {
    const challsArray = JSON.parse(localStorage.getItem(state.league));
    if (challsArray) {
      state.challsGotLoaded = true;
      state.challObjMap = new Map(challsArray);
    }
  };

  const updateLS = () => {
    localStorage.setItem(
      state.league,
      JSON.stringify(Array.from(state.challObjMap))
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
      `<div class="settings-option"><button class='button-hide'><div class="settings-icon icon-hide" title="hide completed">${svgIconEye}</div><div class="settings-icon icon-show" title="show completed">${svgIconEyeOff}</div></button></div>`
    );
    return parentEl.querySelector('.button-hide');
  };

  // TODO: add tag input
  // const insertTagInputEl = (headerEl, id, challObj) => {
  //   headerEl.insertAdjacentHTML(
  //     'beforeend',
  //     `<input type="text" class="input-tag" placeholder="tag1, tag2, tag3.." data-id="${id}"/>`
  //   );
  //   const curChalTags = challObj.tags;
  //   if (curChalTags.length === 0) return;
  //   for (let tag of curChalTags) {
  //     state.allTagsSet.add(tag);
  //   }
  //   const tagsString = curChalTags.join(', ');
  //   headerEl.querySelector('.input-tag').value = tagsString;
  // };

  const insertNoteTextareaEl = (parentEl, id) => {
    parentEl.insertAdjacentHTML(
      'beforeend',
      `<div class="note-container"><textarea name="textarea" class="note-textarea" placeholder="Write your note here" data-id="${id}"></textarea>`
    );
    return parentEl.querySelector('.note-textarea');
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
    // note input
    const taskList = challEl.querySelector('.items');
    let textareaEl;
    if (taskList) {
      textareaEl = insertNoteTextareaEl(taskList, id);
    } else {
      const detailInnerEl = challEl.querySelector('.detail-inner');
      detailEl.querySelector('.text').classList.add('inner-block');
      textareaEl = insertNoteTextareaEl(detailInnerEl, id);
    }
    textareaEl.addEventListener('change', event => {
      noteChangeHandler(event);
    });
  };

  const getChallengeSearchChars = challEl => {
    const header = challEl.querySelector('h2');
    const singleTask = challEl.querySelector('.text');
    const subTasks = challEl.querySelectorAll('.items ul li');
    let subTasksString;
    if (subTasks.length !== 0) {
      subTasksString = [...subTasks].map(taskEl => taskEl.textContent).join('');
    } else {
      subTasksString = '';
    }

    const searchChars =
      header.textContent + singleTask.textContent + subTasksString;

    return searchChars.trim().toLowerCase();
  };

  const createChallObj = (id, challEl) => {
    const newChallObj = {
      note: '',
      tags: [],
      searchChars: getChallengeSearchChars(challEl),
    };
    state.challObjMap.set(id, newChallObj);
  };

  const updateChallEl = (id, challEl) => {
    const challObj = state.challObjMap.get(id);
    // in case they are changing challenge text
    const searchChars = getChallengeSearchChars(challEl);
    challEl.querySelector('.note-textarea').value = challObj.note;
    challObj.searchChars = searchChars;
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

  const formatSearchInputValue = event => {
    const searchEl = event.target;
    const searchValue = searchEl.value;
    if (searchValue === '') return;
    let searchValues = [...searchValue.match(/\S+/g)];
    searchValues = new Set(searchValues);
    searchEl.value = [...searchValues].join(' ');
  };

  const addSettingsHTML = () => {
    const settingsContainer = document.querySelector('.profile .info');
    settingsContainer.insertAdjacentHTML(
      'beforeend',
      '<div class="settings"></div>'
    );
    const settingsEl = settingsContainer.querySelector('.settings');
    const searchInputEl = insertSearchInputEl(settingsEl);
    const hideButtonEl = insertHideButtonEl(settingsEl);
    searchInputEl.addEventListener('input', event => {
      searchChallHandler(event);
    });
    searchInputEl.addEventListener('change', event => {
      formatSearchInputValue(event);
    });
    hideButtonEl.addEventListener('click', event => {
      clickHideButtonHandler(event);
    });
  };

  const init = () => {
    getChallsFromLS();
    addSettingsHTML();
    processChallenges();
  };

  init();
})();
