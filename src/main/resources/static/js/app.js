let csrfToken = null;
let csrfHeaderName = null;
window.addEventListener("DOMContentLoaded", async () => {
      // 1. Fetch CSRF token
      const csrfResponse = await fetch("/csrf-token");
      const csrfData = await csrfResponse.json();
      csrfToken = csrfData.token;
      csrfHeaderName = csrfData.headerName;
      console.log("CSRF Token Loaded:", csrfHeaderName, csrfToken);
});

var kingSwiper = new Swiper(".king-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 2,
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 350,
        modifier: 1,
        slideShadows: true,
    },
    on: {
        click(event) {
            if (this.clickedIndex !== undefined) {
                kingSwiper.slideTo(this.clickedIndex);
            }
        }
    },
    pagination: {
        el: ".king-pagination",
        clickable: true,
    },
});

// Initialize Queen swiper
var queenSwiper = new Swiper(".queen-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 2,
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 350,
        modifier: 1,
        slideShadows: true,
    },
    on: {
        click(event) {
            if (this.clickedIndex !== undefined) {
                queenSwiper.slideTo(this.clickedIndex);
            }
        }
    },
    pagination: {
        el: ".queen-pagination",
        clickable: true,
    },
});

// Initialize particles.js background
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 160,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#ffffff", "#192bce", "#08a06b"]
      },
      "shape": {
        "type": "circle",
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 10,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 4,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "none",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "retina_detect": true
});

// Store votes in memory
const votes = {
    king: {},
    queen: {}
};
let userVotes = {
    king: null,
    queen: null
};

async function loadUserVotes() {
    try {
        const response = await fetch('/api/votes/myVotes');
        if (response.ok) {
            const data = await response.json();
            userVotes.king = data.king || null;
            userVotes.queen = data.queen || null;

            // mark voted slides visually
            if (userVotes.king) {
                document.querySelector(`.king-swiper .swiper-slide[data-id='${userVotes.king}']`)?.classList.add('voted');
            }
            if (userVotes.queen) {
                document.querySelector(`.queen-swiper .swiper-slide[data-id='${userVotes.queen}']`)?.classList.add('voted');
            }
        }
    } catch (err) {
        console.error("Failed to load user votes:", err);
    }
}

window.addEventListener('DOMContentLoaded', loadUserVotes);

let selectedSlide = null;
let selectedName = '';
let selectedCategory = '';

// Modal elements
const modal = document.getElementById('vote-confirm-modal');
const voteMessage = document.getElementById('vote-message');
const yesBtn = document.getElementById('confirm-yes');
const noBtn = document.getElementById('confirm-no');
const okBtn = document.getElementById('confirm-ok');
const modalButtons = document.getElementById('modal-buttons');
const okButton = document.getElementById('ok-button');

// Show modal with custom message
function showModal(message, type = 'confirm') {
    voteMessage.textContent = message;
    modal.style.display = 'flex';

    if (type === 'confirm') {
        modalButtons.style.display = 'flex';
        okButton.style.display = 'none';
    } else {
        modalButtons.style.display = 'none';
        okButton.style.display = 'flex';
    }
}

// Hide modal
function hideModal() {
    modal.style.display = 'none';
}

// Handle vote confirmation
yesBtn.addEventListener('click', async () => {
    if (!selectedSlide) return;

    const candidateId = selectedSlide.dataset.id;
    const category = selectedCategory.toUpperCase();

    try {
        const response = await fetch('/api/votes/cast', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                [csrfHeaderName]: csrfToken
            },
            body: JSON.stringify({
                candidateId: candidateId,
                category: category
            })
        });

        const result = await response.text();

        if (response.ok) {
            selectedSlide.classList.add('voted');
            userVotes[selectedCategory] = selectedSlide.querySelector('.title span').textContent;
            showModal(`Successfully voted for ${userVotes[selectedCategory]} as ${category}!`, 'alert');
        } else {
            showModal(result, 'alert'); // show error message from backend
        }
    } catch (error) {
        console.error(error);
        showModal("Failed to submit vote. Please try again.", 'alert');
    }
});




// Handle vote cancellation
noBtn.addEventListener('click', () => {
    hideModal();
});

// Handle OK button for alert messages
okBtn.addEventListener('click', () => {
    hideModal();
});

// Attach voting logic to each slide
document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const name = slide.querySelector('.title span')?.textContent;
        const parentSwiper = slide.closest('.swiper');
        const category = parentSwiper.classList.contains('king-swiper') ? 'king' : 'queen';

        if (!name || !category) return;

        if (userVotes[category]) {
            showModal(`You have already voted for ${userVotes[category]} as ${category.toUpperCase()}.`, 'alert');
            return;
        }

        selectedSlide = slide;
        selectedName = name;
        selectedCategory = category;

        showModal(`Are you sure you want to vote for ${name} as ${category.toUpperCase()}?`, 'confirm');
    });
});
