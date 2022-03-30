//import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

const mainNavEl = document.getElementById('main-nav');
const newCheatTemplate = document.getElementById('new-cheat-template');
const pageViews = Array.from(document.querySelectorAll('.page-view'));
const addCheatBtn = document.getElementById('add-cheat-btn');

let cheatCount = 0;
let currentGameList = [];

if(location.hash === '') {
  location.hash = '#/';
}

function fetchGameList(category) {
  fetch(`/netlify/functions/games/${category}.json`)
  .then(res => res.json())
  .then(result => {
    currentGameList = result;
  })
  .catch(console.log);
}

function setCurrentCheatList() {}

function changeCurrentView() {
  pageViews.forEach(node => node.style.display = 'none');

  const view = pageViews.find(node => {
    const idRoute = node.getAttribute('id');
    const hasExact = node.getAttribute('exact') === 'true';

    if(hasExact) {
      return location.hash === idRoute;
    } else {
      const matchResult = location.hash.match(new RegExp(idRoute.replace(/:[^\s/]+/g, '([\\w-]+)')));
      return matchResult;
    }
  });

  if(view) {
    view.style.display = 'block';
  } else {
    document.getElementById('404-template').style.display = 'block';
  }
}

function addNewCheatForm() {
  const newGameForm = document.getElementById('new-game-form');
  if(newGameForm) {
    cheatCount++;
    const cheatTemplateClone = newCheatTemplate.content.cloneNode(true);
    cheatTemplateClone.querySelector('.cheat-title-label').setAttribute('for', `cheat-title-${cheatCount}`);
    cheatTemplateClone.querySelector('.cheat-title-input').setAttribute('id', `cheat-title-${cheatCount}`);
    cheatTemplateClone.querySelector('.cheat-code-label').setAttribute('for', `cheat-code-${cheatCount}`);
    cheatTemplateClone.querySelector('.cheat-code-input').setAttribute('id', `cheat-code-${cheatCount}`);
    newGameForm.firstElementChild.appendChild(cheatTemplateClone);
  }
}

// routing
window.addEventListener('hashchange', e => {
  changeCurrentView();
});

addCheatBtn.addEventListener('click', () => {
  addNewCheatForm();
});

// Untoggle nav checkbox when nav-link is clicked to close nav
mainNavEl.addEventListener('click', e => {
  if(e.target.tagName.toLowerCase() === 'a' && e.target.classList.contains('nav-link')) {
    mainNavEl.querySelector('#menu-toggle').checked = false;
  }
});

// Initial view render
changeCurrentView();