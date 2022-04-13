//import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

const mainNavEl = document.getElementById('main-nav');
const newCheatTemplate = document.getElementById('new-cheat-template');
const pageViews = Array.from(document.querySelectorAll('.page-view'));
const addCheatBtn = document.getElementById('add-cheat-btn');
const gameListViewEl = document.getElementById('#/cheats/:category');
const gameViewEl = document.getElementById('#/game/:key/:title');

let cheatCount = 0;
let currentGameList = [];
let currentGame = null;

if(location.hash === '') {
  location.hash = '#/';
}

const onMountActions = {
  '#/cheats/:category': function(data) {
    fetchGameList(data[0], renderGameList);
  },

  '#/game/:key/:title': function(data) {
    fetchGame(data[0], data[1], renderGameView);
  }
}

function renderGameView(game) {
  gameViewEl.querySelector('.game-title').innerText = game.title;
}

function fetchGameList(category, cb) {
  fetch(`/.netlify/functions/readGames?category=${category}`)
  .then(res => res.json())
  .then(result => {
    currentGameList = result;
    cb(result, category);
  })
  .catch(console.log);
}

function fetchGame(gameId, gameTitle, cb) {
  fetch(`/.netlify/functions/readGame?id=${gameId}`)
  .then(res => res.json())
  .then(result => {
    currentGame = result;
    cb(result);
  })
  .catch(console.log);
}

function renderGameList(gameList, category) {
  gameListViewEl.innerHTML = '';
  gameListViewEl.insertAdjacentHTML('afterbegin', `
<article>
  <h1>${category.toUpperCase()} Games</h1>
  <a href="/#/cheats/0-9">0-9</a>
  <a href="/#/cheats/a">A</a>
  <a href="/#/cheats/b">B</a>
  <a href="/#/cheats/c">C</a>
  <a href="/#/cheats/d">D</a>
  <a href="/#/cheats/e">E</a>
  <a href="/#/cheats/f">F</a>
  <a href="/#/cheats/g">G</a>
  <a href="/#/cheats/h">H</a>
  <a href="/#/cheats/i">I</a>
  <a href="/#/cheats/j">J</a>
  <a href="/#/cheats/k">K</a>
  <a href="/#/cheats/l">L</a>
  <a href="/#/cheats/m">M</a>
  <a href="/#/cheats/n">N</a>
  <a href="/#/cheats/o">O</a>
  <a href="/#/cheats/p">P</a>
  <a href="/#/cheats/q">Q</a>
  <a href="/#/cheats/r">R</a>
  <a href="/#/cheats/s">S</a>
  <a href="/#/cheats/t">T</a>
  <a href="/#/cheats/u">U</a>
  <a href="/#/cheats/v">V</a>
  <a href="/#/cheats/w">W</a>
  <a href="/#/cheats/x">X</a>
  <a href="/#/cheats/y">Y</a>
  <a href="/#/cheats/z">Z</a>
</article>`);

  gameList.forEach(game => {
    gameListViewEl.insertAdjacentHTML('beforeend', `<div><a href="/#/game/${game.key}/${encodeURI(game.title)}">${game.title}</a>`);
  });
}

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
    const idRoute = view.getAttribute('id');
    const splitInput = location.hash.match(new RegExp(idRoute.replace(/:[^\s/]+/g, '([\\w-]+)'))).input.split('/');
    const paramData = splitInput.slice(2);
    if(Object.hasOwn(onMountActions, idRoute)) {
      onMountActions[idRoute](paramData);
    }
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