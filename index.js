document.addEventListener('DOMContentLoaded', () => {


  const themeButton = document.getElementById('theme-button');
  const toggleDarkMode = () => document.body.classList.toggle('dark-mode');
  if (themeButton) themeButton.addEventListener('click', toggleDarkMode);

  
  const sections = document.querySelectorAll('.section');

  const handleScroll = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
    
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        section.classList.add('visible');
      } else {
      
        section.classList.remove('visible');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); 

  const rsvpButton = document.getElementById('rsvp-button');
  const listEl = document.getElementById('rsvp-participants');
  let count = 3; 
  const modal = document.getElementById('success-modal');
  const modalText = document.getElementById('modal-text');
  const modalImage = document.getElementById('modal-image');
  const closeModalButton = document.getElementById('close-modal');

  let rotateFactor = 0;
  let intervalId = null;


  const animateImage = () => {
    if (!modalImage) return;
    rotateFactor = rotateFactor === 0 ? -10 : 0;
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  };


  const toggleModal = (person) => {
    if (!modal) return;

    modal.style.display = 'flex';

    if (modalText) {
      modalText.textContent =
        `Thanks for RSVPing, ${person.name}! We can't wait to see you at Bible study.`;
    }

    intervalId = setInterval(animateImage, 500);

   
    setTimeout(() => {
      modal.style.display = 'none';

      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 5000);
  };

  
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  }

  const addParticipant = (person) => {
    if (!listEl) return;

    const p = document.createElement('p');
    p.textContent = `${person.name} from ${person.hometown} has RSVP'd.`;
    listEl.appendChild(p);

    const oldCount = document.getElementById('rsvp-count');
    if (oldCount) oldCount.remove();
    count++;

    const newCount = document.createElement('p');
    newCount.id = 'rsvp-count';
    newCount.textContent = `${count} people have RSVP'd to this event.`;
    listEl.appendChild(newCount);
  };

  
  const validateForm = () => {
    let containsErrors = false;
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input');

    const nameEl  = document.getElementById('name');
    const stateEl = document.getElementById('state');
    const emailEl = document.getElementById('email');

    const person = {
      name: nameEl ? nameEl.value.trim() : '',
      hometown: stateEl ? stateEl.value.trim() : '',
      email: emailEl ? emailEl.value.trim() : ''
    };

    
    for (const el of inputs) {
      const val = el.value.trim();
      if (val.length < 2) {
        containsErrors = true;
        el.classList.add('error');
      } else {
        el.classList.remove('error');
      }
    }

    
    if (emailEl && !person.email.includes('@')) {
      containsErrors = true;
      emailEl.classList.add('error');
    } else if (emailEl) {
      emailEl.classList.remove('error');
    }

    if (!containsErrors) {
      
      addParticipant(person);
      toggleModal(person);

      
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
