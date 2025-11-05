document.addEventListener('DOMContentLoaded', () => {
  
  const themeButton = document.getElementById('theme-button');
  const toggleDarkMode = () => document.body.classList.toggle('dark-mode');
  if (themeButton) themeButton.addEventListener('click', toggleDarkMode);


  const rsvpButton = document.getElementById('rsvp-button');
  const rsvpForm   = document.getElementById('rsvp-form');
  const listEl     = document.getElementById('rsvp-participants');

  
  let count = 3;

  const addParticipant = () => {
    const nameEl  = document.getElementById('rsvp-name');
    const emailEl = document.getElementById('rsvp-email');
    const stateEl = document.getElementById('rsvp-state');

    const name  = nameEl.value.trim();
    const state = stateEl.value.trim();

    const p = document.createElement('p');
    p.textContent = `${name} from ${state} has RSVP'd.`;
    listEl.appendChild(p);

    const oldCount = document.getElementById('rsvp-count');
    if (oldCount) oldCount.remove();
    count++;

    const newCount = document.createElement('p');
    newCount.id = 'rsvp-count';
    newCount.textContent = `${count} people have RSVP'd to this event.`;
    listEl.appendChild(newCount);
  };

  const validateForm = (e) => {
    if (e) e.preventDefault();

    const inputs = rsvpForm.elements;
    let hasErrors = false;

    for (let i = 0; i < inputs.length; i++) {
      const el = inputs[i];
      if (el.tagName === 'INPUT') {
        const v = (el.value || '').trim();
        if (v.length < 2) {
          el.classList.add('error');
          hasErrors = true;
        } else {
          el.classList.remove('error');
        }
      }
    }

    const emailEl = document.getElementById('rsvp-email');
    if (emailEl) {
      const v = (emailEl.value || '').trim();
      if (!v.includes('@')) {
        emailEl.classList.add('error');
        hasErrors = true;
      } else {
        emailEl.classList.remove('error');
      }
    }

    if (!hasErrors) {
      addParticipant();
    
      for (let i = 0; i < inputs.length; i++) {
        const el = inputs[i];
        if (el.tagName === 'INPUT') el.value = '';
        el.classList.remove('error');
      }
    }
  };

  if (rsvpButton) rsvpButton.addEventListener('click', validateForm);


  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
