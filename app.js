//import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

const mainNavEl = document.getElementById('main-nav');
const newCheatTemplate = document.getElementById('new-cheat-template');
const pageViews = document.querySelectorAll('.page-view');
const addCheatBtn = document.getElementById('add-cheat-btn');

const validViews = ['home', 'converter', 'db'];

let cheatCount = 0;

function changeCurrentView(view) {
  if(validViews.includes(view)) {
    pageViews.forEach(node => node.style.display = 'none');
    document.getElementById(`${view}-template`).style.display = 'block';
  } else {
    pageViews.forEach(node => node.style.display = 'none');
    document.getElementById(`404-template`).style.display = 'block';
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
  changeCurrentView(location.hash.slice(1) || 'home');
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
changeCurrentView(location.hash.slice(1) || 'home');