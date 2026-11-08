/* EcoMate · Page 3 Home Dashboard · Deliverable A
 * Only this screen is implemented. Other destinations open a truthful preview
 * dialog until the team's real Flask routes are provided.
 */
(() => {
  'use strict';

  // Reference values from the supplied wireframe — not live user/account data.
  const demoDashboard = {
    initial: 'A',
    greeting: 'Good afternoon!',
    score: 125,
    streakDays: 4,
    reminderTitle: 'Spinach expires today',
    reminderDescription: 'Use it in a salad or freeze it.'
  };

  // Replace null with agreed routes when the group's other pages are ready.
  // Relative URLs work for static hosting; the Flask team can use paths like /food.
  const routePaths = {
    search: null,
    food: null,
    ranks: null,
    team: null,
    profile: null
  };

  const destinations = {
    search: { title: 'Which bin?', page: 4, detail: 'The recycling-item search screen' },
    food: { title: 'Food tracker', page: 6, detail: 'The food tracker and expiry-items screen' },
    ranks: { title: 'Leaderboard', page: 8, detail: 'The community rankings screen' },
    team: { title: 'House team', page: 9, detail: 'The house team screen' },
    profile: { title: 'Profile & settings', page: 10, detail: 'The profile and settings screen' }
  };

  const dialog = document.getElementById('destination-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogDescription = document.getElementById('dialog-description');
  const closeButton = document.getElementById('dialog-close');

  function setText(field, value) {
    const target = document.querySelector(`[data-field="${field}"]`);
    if (target) target.textContent = String(value);
  }

  function renderDashboard(data) {
    if (data.initial != null) setText('initial', data.initial);
    if (data.greeting != null) setText('greeting', data.greeting);
    if (data.score != null) setText('score', Number(data.score).toLocaleString('en-GB'));
    if (data.streakDays != null) setText('streak', `${data.streakDays} ${Number(data.streakDays) === 1 ? 'day' : 'days'}`);
    if (data.reminderTitle != null) setText('reminder-title', data.reminderTitle);
    if (data.reminderDescription != null) setText('reminder-description', data.reminderDescription);
  }

  function openDestination(name, isReminder) {
    if (name === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(destinations, name)) return;
    const targetUrl = routePaths[name];
    if (typeof targetUrl === 'string' && targetUrl.trim()) {
      window.location.assign(targetUrl);
      return;
    }

    const destination = destinations[name];
    dialogTitle.textContent = destination.title;
    dialogDescription.textContent = isReminder
      ? 'This example spinach reminder will open the Food tracker in the complete EcoMate app (wireframe page 6). The current deliverable implements Home only; no live item details or food database are connected.'
      : `${destination.detail} appears on page ${destination.page} of the wireframe. Only the Home Dashboard (page 3) is included in this first draft. Navigation will be connected when the team supplies the corresponding page and route.`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    closeButton.focus();
  }

  document.querySelectorAll('[data-destination]').forEach((button) => {
    button.addEventListener('click', () => {
      openDestination(button.dataset.destination, button.dataset.context === 'reminder');
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Lightweight integration points; no API calls or database assumed in Draft 1.
  // Example from a Flask-backed page: window.EcoMateHome.updateDashboard(apiData)
  window.EcoMateHome = Object.freeze({
    updateDashboard(data) {
      if (!data || typeof data !== 'object') throw new TypeError('Dashboard data must be an object.');
      renderDashboard(data);
    },
    configureRoutes(routes) {
      if (!routes || typeof routes !== 'object') throw new TypeError('Routes must be an object.');
      for (const [key, value] of Object.entries(routes)) {
        if (Object.prototype.hasOwnProperty.call(routePaths, key) && (value === null || typeof value === 'string')) {
          routePaths[key] = value;
        }
      }
    }
  });

  renderDashboard(demoDashboard);
})();
