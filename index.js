document.addEventListener('DOMContentLoaded', () => {
  
  const themeButton = document.getElementById('theme-button');
  const toggleDarkMode = () => document.body.classList.toggle('dark-mode');
  if (themeButton) themeButton.addEventListener('click', toggleDarkMode);

  
  const rsvpButton = document.getElementById('rsvp-button');
  const listEl = document.getElementById('rsvp-participants');
  let count = 3; 

  
  const addParticipant = () => {
    const nameEl  = document.getElementById('name');
    const stateEl = document.getElementById('state');
    const emailEl = document.getElementById('email'); 

    const name  = nameEl.value.trim();
    const state = stateEl.value.trim();

    const p = document.createElement('p');
    p.textContent = ` ${name} from ${state} has RSVP'd.`;
    listEl.appendChild(p);

    
    const oldCount = document.getElementById('rsvp-count');
    if (oldCount) oldCount.remove();
    count++;

    const newCount = document.createElement('p');
    newCount.id = 'rsvp-count';
    newCount.textContent = ` ${count} people have RSVP'd to this event!`;
    listEl.appendChild(newCount);
  };

  
  const validateForm = () => {
    let containsErrors = false;
    const form = document.getElementById('rsvp-form');
    const inputs = form.querySelectorAll('input'); 

    
    for (const el of inputs) {
      const val = el.value.trim();
      if (val.length < 2) {
        containsErrors = true;
        el.classList.add('error');
      } else {
        el.classList.remove('error');
      }
    }

    
    const emailEl = document.getElementById('email');
    if (emailEl && !emailEl.value.trim().includes('@')) {
      containsErrors = true;
      emailEl.classList.add('error');
    } else if (emailEl) {
      emailEl.classList.remove('error');
    }

    if (!containsErrors) {
      addParticipant();
      
      for (const el of inputs) el.value = '';
    }
  };

  
  if (rsvpButton) {
    rsvpButton.addEventListener('click', (e) => {
      e.preventDefault();
      validateForm();
    });
  }

  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
