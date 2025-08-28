// Enhanced main script for dynamic welcome page with new color scheme
document.addEventListener('DOMContentLoaded', function() {
  initializeWelcomePage();
  setupCardInteractions();
  setupAnimations();
  initializeCounters();
  setupDynamicEffects();
});


function initializeWelcomePage() {
  // Enhanced entrance animations for welcome elements
  const welcomeContainer = document.querySelector('.welcome-container');
  if (welcomeContainer) {
    welcomeContainer.style.opacity = '0';
    
    setTimeout(() => {
      welcomeContainer.style.transition = 'opacity 1s ease-out';
      welcomeContainer.style.opacity = '1';
      
      // Trigger cascade animations
      triggerCascadeAnimations();
    }, 100);
  }

  // Initialize dynamic background elements
  initializeBackgroundAnimation();
  initializeParticleSystem();
  initializeGeometricShapes();
}

function triggerCascadeAnimations() {
  // Animate hero elements in sequence
  const heroElements = [
    '.welcome-logo-section',
    '.welcome-text',
    '.stats-section'
  ];
  
  heroElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      setTimeout(() => {
        element.style.animation = `fade-in-up 0.8s ease-out both`;
      }, index * 200);
    }
  });
}

function setupCardInteractions() {
  const cards = document.querySelectorAll('.registration-card');
  
  cards.forEach(card => {
    const formType = card.dataset.form;
    const button = card.querySelector('.card-btn');
    const glow = card.querySelector('.card-glow');
    
    // Enhanced click handler with particle effects
    card.addEventListener('click', (e) => {
      createClickParticles(e.clientX, e.clientY);
      navigateToForm(formType);
    });
    
    // Prevent button click from bubbling
    if (button) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        createClickParticles(e.clientX, e.clientY);
        navigateToForm(formType);
      });
    }
    
    // Enhanced hover effects with glow
    card.addEventListener('mouseenter', (e) => {
      handleCardHover(card, true);
      createHoverRipple(e, card);
    });
    
    card.addEventListener('mouseleave', () => {
      handleCardHover(card, false);
    });
    
    // Mouse move effect for dynamic glow positioning
    card.addEventListener('mousemove', (e) => {
      updateCardGlow(e, card, glow);
    });
  });
}

function handleCardHover(card, isHover) {
  const icon = card.querySelector('.card-icon');
  const features = card.querySelectorAll('.feature-item');
  const button = card.querySelector('.card-btn');
  const rings = card.querySelectorAll('.icon-rings .ring');
  const glow = card.querySelector('.card-glow');
  
  if (isHover) {
    // Lift the entire card consistently for all cards (also apply a CSS class)
    card.classList.add('is-hovered');
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.boxShadow = 'var(--shadow-intense)';
    card.style.zIndex = '10';
    if (glow) glow.style.opacity = '0.3';

    // Enhanced icon animation
    if (icon) {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
      icon.style.boxShadow = '0 20px 60px rgba(154, 128, 255, 0.4)';
    }
    
    // Animate feature items with stagger
    features.forEach((item, index) => {
      setTimeout(() => {
        item.style.transform = 'translateX(15px)';
        item.style.background = 'rgba(154, 128, 255, 0.15)';
        item.style.borderColor = 'rgba(154, 128, 255, 0.3)';
      }, index * 50);
    });
    
    // Activate orbit rings
    rings.forEach(ring => {
      ring.style.opacity = '1';
      ring.style.borderColor = 'rgba(154, 128, 255, 0.6)';
    });
    
    // Enhanced button animation
    if (button) {
      button.style.transform = 'translateY(-5px) scale(1.05)';
      button.style.boxShadow = '0 15px 40px rgba(154, 128, 255, 0.5)';
    }
  } else {
    // Reset animations
    card.classList.remove('is-hovered');
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = 'var(--shadow-soft)';
    card.style.zIndex = '';
    if (glow) glow.style.opacity = '0';

    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.boxShadow = '0 10px 40px rgba(154, 128, 255, 0.15)';
    }
    
    features.forEach(item => {
      item.style.transform = 'translateX(0)';
      item.style.background = 'rgba(154, 128, 255, 0.05)';
      item.style.borderColor = 'transparent';
    });
    
    rings.forEach(ring => {
      ring.style.opacity = '0';
    });
    
    if (button) {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = 'none';
    }
  }
}

function updateCardGlow(e, card, glow) {
  if (!glow) return;
  
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  
  glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(154, 128, 255, 0.6) 0%, rgba(154, 128, 255, 0.2) 30%, transparent 70%)`;
}

function createHoverRipple(e, card) {
  const rect = card.getBoundingClientRect();
  const ripple = document.createElement('div');
  const size = 100;
  
  ripple.className = 'hover-ripple';
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(154, 128, 255, 0.3) 0%, transparent 70%);
    left: ${e.clientX - rect.left - size/2}px;
    top: ${e.clientY - rect.top - size/2}px;
    pointer-events: none;
    z-index: 1;
    animation: ripple-expand 0.8s ease-out forwards;
  `;
  
  card.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 800);
}

async function navigateToForm(formType) {
  const card = document.querySelector(`[data-form="${formType}"]`);

  // Exit animation
  if (card) {
    card.style.transform = 'scale(0.9) rotateY(10deg)';
    card.style.opacity = '0.7';
    card.style.filter = 'blur(2px)';
  }

  // Show loading
  showNavigationLoading(formType);
  // Target page
  let targetPage;
  switch (formType) {
    case 'volunteer':
      targetPage = '/protected/volunteer';
      break;
    case 'activity':
      targetPage = '/protected/activity-form';
      break;
    case 'food-seller':
      targetPage = '/protected/food';
      break;
    default:
      console.error('Unknown form type:', formType);
      return;
  }

    if (formType === "volunteer") {
      try {
        console.log("working volunteer")
        const response = await fetch(`/api/admin-buttons/${"volunteer_form_button"}`);
        const allowed = await response.json(); // this is already true/false
        console.log(allowed);
        if (!allowed) {
          alert("Admin hasn't approved users to submit the volunteer form yet.");

          // Reset UI because navigation is cancelled
          if (card) {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.filter = '';
          }
          hideNavigationLoading(formType);
          return;
        }else{
            window.location.href = targetPage;
        }
      } catch (err) {
        console.error("Error checking volunteer form access:", err);
        alert("Something went wrong. Please try again later.");
        hideNavigationLoading(formType);
        return;
      }
    }else if(formType === 'activity'){
        try {
            console.log("working activity")
            const response = await fetch(`/api/admin-buttons/${"activity_form_button"}`);
            const allowed = await response.json(); // this is already true/false
            console.log(allowed);
            if (!allowed) {
              alert("Admin hasn't approved users to submit the performance register form yet.");

              // Reset UI because navigation is cancelled
              if (card) {
                card.style.transform = '';
                card.style.opacity = '';
                card.style.filter = '';
              }
              hideNavigationLoading(formType);
              return;
            }else{
                window.location.href = targetPage;
            }
          } catch (err) {
            console.error("Error checking volunteer form access:", err);
            alert("Something went wrong. Please try again later.");
            hideNavigationLoading(formType);
            return;
          }
    }else{
        setTimeout(() => { window.location.href = targetPage; }, 400);
    }

}


function showNavigationLoading(formType) {
  const formNames = {
    'volunteer': 'Volunteer Registration',
    'activity': 'Activity Registration',
    'food-seller': 'Food Seller Registration'
  };
  
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'navigation-loading';
  loadingOverlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-animation">
        <div class="loading-orb"></div>
        <div class="loading-orb"></div>
        <div class="loading-orb"></div>
      </div>
      <h3>Loading ${formNames[formType]}</h3>
      <p>Preparing your registration form...</p>
      <div class="loading-progress">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;
  
  document.body.appendChild(loadingOverlay);
  
  // Animate entrance
  setTimeout(() => {
    loadingOverlay.style.opacity = '1';
    
    // Animate progress bar
    const progressBar = loadingOverlay.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = '100%';
    }
  }, 10);
}


function hideNavigationLoading(formType) {
  const loadingOverlay = document.querySelector('.navigation-loading');
  if (loadingOverlay) {
    // Smooth fade out
    loadingOverlay.style.opacity = '0';
    loadingOverlay.style.transition = 'opacity 0.3s ease';

    // Remove from DOM after fade out
    setTimeout(() => {
      if (loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }, 300);
  }
}


function setupAnimations() {
  // Enhanced Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special handling for different elements
        if (entry.target.classList.contains('registration-card')) {
          animateCardEntrance(entry.target);
        } else if (entry.target.classList.contains('feature-highlight')) {
          animateFeatureEntrance(entry.target);
        } else if (entry.target.classList.contains('stat-item')) {
          animateStatEntrance(entry.target);
        }
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Observe elements
  document.querySelectorAll('.registration-card, .feature-highlight, .stat-item, .section-header').forEach(el => {
    observer.observe(el);
  });
  
  // Setup enhanced parallax effects
  setupParallaxEffect();
  setupMouseFollowEffect();
}

function animateCardEntrance(card) {
  const icon = card.querySelector('.card-icon');
  const features = card.querySelectorAll('.feature-item');
  const button = card.querySelector('.card-btn');
  
  // Icon bounce animation
  if (icon) {
    setTimeout(() => {
      icon.style.animation = 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }, 200);
  }
  
  // Features stagger animation
  features.forEach((feature, index) => {
    setTimeout(() => {
      feature.style.opacity = '1';
      feature.style.transform = 'translateX(0)';
      feature.style.animation = 'slide-in-feature 0.6s ease-out both';
    }, 400 + (index * 100));
    
    // Set initial state
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-30px)';
  });
  
  // Button entrance
  if (button) {
    setTimeout(() => {
      button.style.opacity = '1';
      button.style.transform = 'translateY(0) scale(1)';
      button.style.animation = 'button-bounce 0.6s ease-out both';
    }, 800);
    
    // Set initial state
    button.style.opacity = '0';
    button.style.transform = 'translateY(20px) scale(0.9)';
  }
}

function animateFeatureEntrance(feature) {
  const icon = feature.querySelector('.highlight-icon');
  const content = feature.querySelector('.highlight-content');
  
  if (icon) {
    icon.style.animation = 'rotate-in 0.8s ease-out';
  }
  
  if (content) {
    setTimeout(() => {
      content.style.animation = 'fade-in-left 0.6s ease-out both';
    }, 200);
  }
}

function animateStatEntrance(stat) {
  const number = stat.querySelector('.stat-number');
  const targetValue = parseInt(stat.dataset.count);
  
  if (number && targetValue) {
    animateCounter(number, 0, targetValue, 2000);
  }
}

function initializeCounters() {
  // Set up counter animation for stats
  const statItems = document.querySelectorAll('.stat-item');
  
  statItems.forEach(item => {
    const numberElement = item.querySelector('.stat-number');
    const targetValue = parseInt(item.dataset.count);
    
    if (numberElement && targetValue) {
      // Set initial value
      numberElement.textContent = '0';
      
      // Store original value for intersection observer
      numberElement.dataset.target = targetValue;
    }
  });
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = end.toLocaleString();
      
      // Add completion effect
      element.style.animation = 'number-glow 0.5s ease-out';
    }
  }
  
  requestAnimationFrame(updateCounter);
}

function setupDynamicEffects() {
  // Logo pulse interaction
  const logo = document.querySelector('.main-logo-inner');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'logo-super-pulse 1s ease-in-out';
    });
    
    logo.addEventListener('mouseleave', () => {
      setTimeout(() => {
        logo.style.animation = 'logo-pulse 3s ease-in-out infinite';
      }, 1000);
    });
  }
  
  // Social links hover effects
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.animation = 'social-bounce 0.6s ease-out';
    });
  });
  
  // Enhanced text animations
  setupTextAnimations();
}

function setupTextAnimations() {
  // Animate title words individually
  const titleMain = document.querySelector('.title-main');
  if (titleMain) {
    const text = titleMain.textContent;
    titleMain.innerHTML = text.split('').map((char, index) => 
      `<span style="animation-delay: ${index * 0.1}s" class="char-animate">${char}</span>`
    ).join('');
  }
  
  // Animate subtitle on hover
  const subtitle = document.querySelector('.welcome-subtitle');
  if (subtitle) {
    subtitle.addEventListener('mouseenter', () => {
      const icon = subtitle.querySelector('.subtitle-icon');
      if (icon) {
        icon.style.animation = 'icon-super-bounce 0.8s ease-out';
      }
    });
  }
}

function initializeBackgroundAnimation() {
  const orbs = document.querySelectorAll('.floating-orb');
  
  orbs.forEach((orb, index) => {
    // Add random variations to animation
    const randomDelay = Math.random() * 10;
    const randomDuration = 15 + Math.random() * 10;
    
    orb.style.animationDelay = `-${randomDelay}s`;
    orb.style.animationDuration = `${randomDuration}s`;
    
    // Add interactive hover effect
    orb.addEventListener('mouseenter', () => {
      orb.style.transform = 'scale(1.2)';
      orb.style.opacity = '0.9';
    });
    
    orb.addEventListener('mouseleave', () => {
      orb.style.transform = 'scale(1)';
      orb.style.opacity = '0.7';
    });
  });
}

function initializeParticleSystem() {
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach((particle, index) => {
    // Random starting position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation properties
    const duration = 8 + Math.random() * 7;
    const delay = Math.random() * 5;
    
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `-${delay}s`;
    
    // Random size variation
    const size = 3 + Math.random() * 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
  });
}

function initializeGeometricShapes() {
  const shapes = document.querySelectorAll('.geometric-shape');
  
  shapes.forEach(shape => {
    // Random animation timing
    const duration = 20 + Math.random() * 10;
    const delay = Math.random() * 15;
    
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `-${delay}s`;
  });
}

function setupParallaxEffect() {
  const orbs = document.querySelectorAll('.floating-orb');
  const shapes = document.querySelectorAll('.geometric-shape');
  
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    
    // Orbs parallax
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.02;
      const xMove = xPercent * speed * 50;
      const yMove = yPercent * speed * 50;
      
      orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
    
    // Shapes parallax
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.01;
      const xMove = xPercent * speed * 30;
      const yMove = yPercent * speed * 30;
      
      shape.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${xMove}deg)`;
    });
  });
}

function setupMouseFollowEffect() {
  // Create cursor follower
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
}

function createClickParticles(x, y) {
  const colors = ['#9a80ff', '#efe1ee', '#b794f6', '#e879f9', '#667eea'];
  
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / 12;
    const velocity = 60 + Math.random() * 40;
    const size = 4 + Math.random() * 4;
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
      box-shadow: 0 0 10px ${color};
    `;
    
    document.body.appendChild(particle);
    
    const xVel = Math.cos(angle) * velocity;
    const yVel = Math.sin(angle) * velocity;
    
    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1) rotate(0deg)', 
        opacity: 1 
      },
      { 
        transform: `translate(${xVel}px, ${yVel}px) scale(0) rotate(360deg)`, 
        opacity: 0 
      }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => {
      particle.remove();
    };
  }
}







// Add enhanced CSS for all dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .navigation-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(154, 128, 255, 0.95) 0%, rgba(239, 225, 238, 0.95) 100%);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .loading-content {
    text-align: center;
    color: white;
    max-width: 400px;
  }
  
  .loading-animation {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .loading-orb {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    animation: loading-bounce 1.4s infinite ease-in-out both;
  }
  
  .loading-orb:nth-child(1) { animation-delay: -0.32s; }
  .loading-orb:nth-child(2) { animation-delay: -0.16s; }
  .loading-orb:nth-child(3) { animation-delay: 0s; }
  
  .loading-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .loading-content p {
    opacity: 0.9;
    margin-bottom: 20px;
  }
  
  .loading-progress {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress-bar {
    width: 0%;
    height: 100%;
    background: white;
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  
  .hover-ripple {
    animation: ripple-expand 0.8s ease-out forwards;
  }
  
  .cursor-follower {
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(154, 128, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    filter: blur(2px);
  }
  
  .registration-card.keyboard-focus {
    outline: none;
    outline-offset: 0;
    animation: none;
  }
  
  .char-animate {
    display: inline-block;
    animation: char-bounce 0.6s ease-out both;
  }
  
  @keyframes loading-bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  @keyframes ripple-expand {
    from { transform: scale(0); opacity: 0.6; }
    to { transform: scale(4); opacity: 0; }
  }
  
  @keyframes bounce-in {
    0% { transform: scale(0.3) rotate(-10deg); }
    50% { transform: scale(1.1) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  
  @keyframes slide-in-feature {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes button-bounce {
    0% { transform: translateY(20px) scale(0.9); opacity: 0; }
    60% { transform: translateY(-5px) scale(1.05); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
  
  @keyframes rotate-in {
    from { transform: rotate(-180deg) scale(0); }
    to { transform: rotate(0deg) scale(1); }
  }
  
  @keyframes fade-in-left {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes number-glow {
    0%, 100% { text-shadow: none; }
    50% { text-shadow: 0 0 20px #9a80ff; }
  }
  
  @keyframes logo-super-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  @keyframes social-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.1); }
  }
  
  @keyframes icon-super-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    30% { transform: translateY(-15px) scale(1.2); }
    60% { transform: translateY(-5px) scale(1.1); }
  }
  
  @keyframes char-bounce {
    0% { transform: translateY(20px); opacity: 0; }
    50% { transform: translateY(-5px); opacity: 1; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes focus-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  /* Enhanced responsive cursor for mobile */
  @media (max-width: 768px) {
    .cursor-follower {
      display: none;
    }
  }
`;

document.head.appendChild(dynamicStyles); 