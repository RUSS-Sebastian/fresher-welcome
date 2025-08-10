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

/*// Track user's vote per category
let userVotes = {
    king: null,
    queen: null
};

// Attach voting logic to each slide
document.querySelectorAll('.swiper-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        const name = slide.querySelector('.title span')?.textContent;
        const parentSwiper = slide.closest('.swiper');
        const category = parentSwiper.classList.contains('king-swiper') ? 'king' : 'queen';

        if (!name || !category) return;

        // Check if user already voted in this category
        if (userVotes[category]) {
            alert(`You have already voted for ${userVotes[category]} in the ${category.toUpperCase()} category.`);
            return;
        }

        // Confirm vote
        const confirmVote = confirm(`Are you sure you want to vote for ${name} as ${category.toUpperCase()}?`);
        if (confirmVote) {
            // Register vote
            userVotes[category] = name;

            // Feedback
            alert(`Successfully voted for ${name} as ${category.toUpperCase()}!`);

            // Mark as voted visually
            slide.classList.add('voted');
        }
    });
});*/

let userVotes = {
    king: null,
    queen: null
};

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
yesBtn.addEventListener('click', () => {
    userVotes[selectedCategory] = selectedName;
    selectedSlide.classList.add('voted');
    showModal(`Successfully voted for ${selectedName} as ${selectedCategory.toUpperCase()}!`, 'alert');
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












































/*const kingSwiper = new Swiper(".king-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 600,
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
            kingSwiper.slideTo(this.clickedIndex);
        },
    },
    pagination: {
        el: ".king-pagination",
    },
});


// QUEEN Swiper
const queenSwiper = new Swiper(".queen-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 600,
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
            queenSwiper.slideTo(this.clickedIndex);
        },
    },
    pagination: {
        el: ".queen-pagination",
    },
});*/


 /*new Swiper(".king-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".king-pagination",
            clickable: true,
        },
        loop: true,
        centeredSlides: true,
    });

    new Swiper(".queen-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".queen-pagination",
            clickable: true,
        },
        loop: true,
        centeredSlides: true,
    });
*/







/*var swiper=new Swiper(".swiper",{
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
        click(event){
            if (this.clickedIndex !== undefined) {
            swiper.slideTo(this.clickedIndex);
        }
    }
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

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
      value: ["#ffffff", "#192bce", "#08a06b"]
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
});*/