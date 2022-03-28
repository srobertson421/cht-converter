const renderEl = document.getElementById('render');

const validViews = ['home', 'converter', 'db'];

function changeCurrentView(view) {
  if(validViews.includes(view)) {
    const viewTemplate = document.getElementById(`${view}-template`);
    renderEl.innerHTML = '';
    renderEl.appendChild(viewTemplate.content.cloneNode(true));
  } else {
    const viewTemplate = document.getElementById(`404-template`);
    renderEl.innerHTML = '';
    renderEl.appendChild(viewTemplate.content.cloneNode(true));
  }
}

window.addEventListener('hashchange', e => {
  changeCurrentView(location.hash.slice(1) || 'home');
});

changeCurrentView(location.hash.slice(1) || 'home');