let currentUser = null;
let csrfToken = null;
let csrfHeaderName = null;
// Enhanced form handling with modern interactions and advanced features
document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
  setupFloatingLabels();
  setupProgressTracking();
  setupFormValidation();
  setupAnimations();
  setupInteractiveTooltips();
  setupSmartSuggestions();
  setupMicroInteractions();
  setupAdvancedProgress();
  loadCurrentUser();
  getCsrfToken();
});

async function getCsrfToken(){

  const csrfResponse = await fetch("/csrf-token");
  const csrfData = await csrfResponse.json();
  csrfToken = csrfData.token;
  csrfHeaderName = csrfData.headerName;
  console.log("CSRF Token Loaded:", csrfHeaderName, csrfToken);
}
async function loadCurrentUser() {
  try {
    const response = await fetch("/api/users/me");
    currentUser = await response.json();
    console.log("Current User Loaded:", currentUser.id,currentUser.name);
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
// Advanced progress tracking
let formCompletionData = {
  totalFields: 0,
  completedFields: 0,
  sectionProgress: {}
};

// Main form submission handler with enhanced features
// Volunteer Form
// Volunteer Form
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
  volunteerForm.addEventListener('submit',async function(e) {
    e.preventDefault();
    triggerSubmissionSequence('volunteerForm');
  });
}

// Activity Form
const activityForm = document.getElementById('activityForm');
if (activityForm) {
  activityForm.addEventListener('submit', function(e) {
    e.preventDefault();
    triggerSubmissionSequence('activityForm');
  });
}

// Food Seller Form
const foodSellerForm = document.getElementById('foodSellerForm');
if (foodSellerForm) {
  foodSellerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    triggerSubmissionSequence('foodSellerForm');
  });
}


function triggerSubmissionSequence(formId) {
  const currentForm = document.getElementById(formId);

  if (!currentForm) {
    console.error('Form not found:', formId);
    return;
  }

  // Phase 1: Validate with visual feedback
  if (!performAdvancedValidation()) {
    showValidationErrors();
    return;
  }

  // Phase 2: Show enhanced loading state
  showEnhancedLoadingState();

  // Phase 3: Animate progress completion
  animateProgressCompletion();

  // Phase 4: DYNAMIC PROCESSING - Volunteer form gets special handling
  if (formId === 'volunteerForm') {
    processVolunteerFormWithBackend();
  } else {
    // Keep existing processing for other forms
    const formData = new FormData(currentForm);
    const enhancedData = collectEnhancedFormData(formData);
    console.log('🚀 Enhanced Data for', formId, ':', enhancedData);

    // Continue with simulated success for other forms
    setTimeout(() => {
      showEnhancedSuccessMessage();
      createAdvancedCelebrationEffect();
    }, 2000);
  }

  // Phase 6: Auto-reset only for non-volunteer forms
  // (Volunteer form reset will be handled after backend response)
  if (formId !== 'volunteerForm') {
    setTimeout(() => {
      resetFormEnhanced();
    }, 7000);
  }
}

async function processVolunteerFormWithBackend() {
  // Collect form data

  const experienceEl = document.getElementById("experience");
  const motivationEl = document.getElementById("motivation");

  const data = {
    telegramUsername: document.getElementById("telegram").value.trim(),
    currentSemester: document.getElementById("semester").value,
    preferredRole: document.getElementById("role").value,
    availability: document.getElementById("availability").value,
    skillsExperience: experienceEl ? experienceEl.value.trim() || null : null,
    reason: motivationEl ? motivationEl.value.trim() || null : null,
    userId: currentUser?.id // ensure currentUser is defined
  };

  // Basic validation
  if (!data.telegramUsername || !data.currentSemester || !data.preferredRole || !data.userId || !data.availability) {
    alert("Please fill all required fields correctly.");
    return;
  }

  try {
    const response = await fetch("/api/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [csrfHeaderName]: csrfToken
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // Success animations
      setTimeout(() => {
        showEnhancedSuccessMessage();
        createAdvancedCelebrationEffect();
      }, 2000);

      // Reset form after animation
      setTimeout(() => {
        resetFormEnhanced();
      }, 7000);
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.error || "Failed to submit form. Please try again.");
      resetFormEnhanced();
    }
  } catch (err) {
    console.error("Request failed", err);
    alert("Something went wrong. Please try again.");
  }
}



function collectEnhancedFormData(formData) {
  const data = Object.fromEntries(formData);
  return {
    ...data,

  };
}

function setupAdvancedProgress() {
  // Create completion percentage indicator
  createCompletionIndicator();
  
  // Initialize field counting
  const allFields = document.querySelectorAll('input[required], select[required], textarea[required]');
  formCompletionData.totalFields = allFields.length;
  
  // Track section progress
  document.querySelectorAll('.form-section').forEach((section, index) => {
    const sectionId = `section-${index}`;
    const sectionFields = section.querySelectorAll('input, select, textarea');
    formCompletionData.sectionProgress[sectionId] = {
      total: sectionFields.length,
      completed: 0,
      percentage: 0
    };
  });
  
  updateCompletionIndicator();
}

function createCompletionIndicator() {
  const progressSection = document.querySelector('.form-progress-section');
  if (!progressSection) return;
  
  const completionBar = document.createElement('div');
  completionBar.className = 'completion-indicator';
  completionBar.innerHTML = `
    <div class="completion-header">
      <span class="completion-label">Form Completion</span>
      <span class="completion-percentage">0%</span>
    </div>
    <div class="completion-bar">
      <div class="completion-fill"></div>
      <div class="completion-glow"></div>
    </div>
    <div class="completion-stats">
      <span class="fields-completed">0</span> of <span class="fields-total">${formCompletionData.totalFields}</span> fields completed
    </div>
  `;
  progressSection.appendChild(completionBar);
}

function updateCompletionIndicator() {
  const completedCount = document.querySelectorAll('input[required]:valid, select[required]:valid, input[required]:checked').length;
  formCompletionData.completedFields = completedCount;
  
  const percentage = Math.round((completedCount / formCompletionData.totalFields) * 100);
  
  // Update display elements
  const percentageEl = document.querySelector('.completion-percentage');
  const fillEl = document.querySelector('.completion-fill');
  const completedEl = document.querySelector('.fields-completed');
  
  if (percentageEl) percentageEl.textContent = `${percentage}%`;
  if (fillEl) {
    fillEl.style.width = `${percentage}%`;
    fillEl.style.background = `linear-gradient(90deg, #10b981 0%, #059669 100%)`;
  }
  if (completedEl) completedEl.textContent = completedCount;
  
  // Add milestone celebrations
  if (percentage === 25 || percentage === 50 || percentage === 75) {
    createMilestoneEffect(percentage);
  }
}

function setupInteractiveTooltips() {
  const fieldsWithTooltips = {
    'studentNumber': 'Enter your university student ID number',
    'telegram': 'Your Telegram username (with or without @)',
    'role': 'Choose the volunteer role that best matches your interests',
    'availability': 'When are you typically available to volunteer?',
    'experience': 'Share any relevant skills, programming languages, or past experience',
    'motivation': 'Tell us what drives you to volunteer and your goals'
  };
  
  Object.entries(fieldsWithTooltips).forEach(([fieldId, tooltipText]) => {
    const field = document.getElementById(fieldId);
    if (field) {
      createInteractiveTooltip(field, tooltipText);
    }
  });
}

function createInteractiveTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'interactive-tooltip';
  tooltip.innerHTML = `
    <div class="tooltip-trigger">
      <i class="fas fa-question-circle"></i>
    </div>
    <div class="tooltip-content">
      <div class="tooltip-arrow"></div>
      <p>${text}</p>
    </div>
  `;
  
  const container = element.closest('.form-group');
  if (container) {
    container.appendChild(tooltip);
    
    // Add interaction handlers
    const trigger = tooltip.querySelector('.tooltip-trigger');
    const content = tooltip.querySelector('.tooltip-content');

    let hideTimeout = null;

    trigger.addEventListener('mouseenter', () => {
      // Clear any pending hide timeout
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        content.classList.add('visible');
        createTooltipParticles(trigger);
    });
    
    trigger.addEventListener('mouseleave', () => {
      // Set a timeout to hide the tooltip, but store the ID
        hideTimeout = setTimeout(() => {
          content.classList.remove('visible');
          hideTimeout = null;
        }, 200);
    });

    content.addEventListener('mouseenter', () => {
          if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
          }
    });

    content.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        content.classList.remove('visible');
        hideTimeout = null;
      }, 200);
    });
  }
}

function setupSmartSuggestions() {
  // Smart suggestions for telegram field
  const telegramField = document.getElementById('telegram');
  if (telegramField) {
    telegramField.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Auto-format telegram username
      if (value && !value.startsWith('@') && value.length > 0) {
        value = '@' + value.replace(/^@+/, '');
        e.target.value = value;
      }
      
      // Show suggestion feedback
      if (value.length > 3) {
        showFieldSuggestion(e.target, '✓ Looks good!', 'success');
      }
    });
  }
  
  // Smart validation for student number
  const studentNumberField = document.getElementById('studentNumber');
  if (studentNumberField) {
    studentNumberField.addEventListener('input', function(e) {
      const value = e.target.value;
      
      if (value.length >= 6) {
        showFieldSuggestion(e.target, '✓ Valid student number format', 'success');
      } else if (value.length > 0) {
        showFieldSuggestion(e.target, 'Student numbers are typically 6+ characters', 'info');
      }
    });
  }
}

function showFieldSuggestion(field, message, type) {
  const container = field.closest('.input-container, .select-container, .textarea-container');
  if (!container) return;
  
  // Remove existing suggestions
  const existingSuggestion = container.querySelector('.field-suggestion');
  if (existingSuggestion) existingSuggestion.remove();
  
  // Create new suggestion
  const suggestion = document.createElement('div');
  suggestion.className = `field-suggestion ${type}`;
  suggestion.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation' : 'fa-info'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(suggestion);
  
  // Auto-remove after delay
  setTimeout(() => {
    if (suggestion.parentNode) {
      suggestion.classList.add('fade-out');
      setTimeout(() => suggestion.remove(), 300);
    }
  }, 3000);
}

function setupMicroInteractions() {
  // Enhanced input focus effects
  document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
      createFocusRipple(this);
      addFieldGlow(this);
    });
    
    field.addEventListener('blur', function() {
      removeFieldGlow(this);
    });
    
    // Typing particle effects for text inputs
    if (field.type === 'text' || field.type === 'email' || field.tagName === 'TEXTAREA') {
      field.addEventListener('input', debounce(() => {
        createTypingParticles(field);
      }, 200));
    }
  });
  
  // Enhanced checkbox interactions
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        createCheckboxSuccessEffect(this);
      }
    });
  });
  
  // Enhanced button hover effects
  const submitBtn = document.querySelector('.enhanced-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('mouseenter', createButtonHoverEffect);
    submitBtn.addEventListener('mouseleave', removeButtonHoverEffect);
  }
}

function createFocusRipple(field) {
  const container = field.closest('.input-container, .select-container, .textarea-container');
  if (!container) return;
  
  const ripple = document.createElement('div');
  ripple.className = 'focus-ripple';
  container.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

function createTypingParticles(field) {
  const rect = field.getBoundingClientRect();
  
  for (let i = 0; i < 3; i++) {
    const particle = document.createElement('div');
    particle.className = 'typing-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + rect.height}px;
      width: 4px;
      height: 4px;
      background: #9a80ff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: typing-particle-float 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

function createMilestoneEffect(percentage) {
  const celebrationColors = ['#9a80ff', '#efe1ee', '#10b981', '#f59e0b'];
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        width: 8px;
        height: 8px;
        background: ${celebrationColors[Math.floor(Math.random() * celebrationColors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: milestone-burst 1s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }, i * 50);
  }
  
  // Show milestone message
  showMilestoneMessage(percentage);
}

function showMilestoneMessage(percentage) {
  const milestoneMessages = {
    25: "🎉 Great start! You're 25% done!",
    50: "🚀 Halfway there! Keep going!",
    75: "⭐ Almost finished! Just a few more fields!"
  };
  
  const message = milestoneMessages[percentage];
  if (!message) return;
  
  const notification = document.createElement('div');
  notification.className = 'milestone-notification';
  notification.innerHTML = `
    <div class="milestone-content">
      <span class="milestone-text">${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

function showEnhancedLoadingState() {
  const submitBtn = document.querySelector('.enhanced-submit-btn');
  const btnContent = submitBtn.querySelector('.btn-content');
  
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  
  btnContent.innerHTML = `
    <div class="enhanced-loading">
      <div class="loading-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <span class="btn-text">Processing your application...</span>
    </div>
  `;
  
  // Add pulsing effect to form
  document.querySelector('.form-glass-container').classList.add('processing');
}

function createAdvancedCelebrationEffect() {
  // Multi-phase celebration
  
  // Phase 1: Fireworks from corners
  createCornerFireworks();
  
  // Phase 2: Confetti shower
  setTimeout(() => createConfettiShower(), 500);
  
  // Phase 3: Success particles
  setTimeout(() => createSuccessParticles(), 1000);
  
  // Phase 4: Glow effect
  setTimeout(() => addFormSuccessGlow(), 1500);
}

function createCornerFireworks() {
  const corners = [
    { x: 0, y: 0 },
    { x: window.innerWidth, y: 0 },
    { x: 0, y: window.innerHeight },
    { x: window.innerWidth, y: window.innerHeight }
  ];
  
  corners.forEach((corner, index) => {
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 150;
        
        particle.style.cssText = `
          position: fixed;
          left: ${corner.x}px;
          top: ${corner.y}px;
          width: 6px;
          height: 6px;
          background: #9a80ff;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: firework-burst 1.5s ease-out forwards;
          --angle: ${angle};
          --velocity: ${velocity}px;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
      }
    }, index * 200);
  });
}

 function performAdvancedValidation() {
   const form = document.querySelector('#volunteerForm, #activityForm, #foodSellerForm');
   const requiredFields = form.querySelectorAll('input[required], select[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    const isFieldValid = validateFieldAdvanced(field);
    if (!isFieldValid) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateFieldAdvanced(field) {
  const container = field.closest('.input-container, .select-container, .textarea-container, .custom-checkbox');
  if (!container) return true;
  
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required')) {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        errorMessage = 'This field is required';
      }
    } else if (!field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    }
  }
  
  // Specific validations
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  if (field.name === 'telegram' && field.value) {
    if (field.value.length < 3) {
      isValid = false;
      errorMessage = 'Telegram username too short';
    }
  }


  /*if (field.id === "studentNumber" && field.value) {
        const studentNumberRegex = /^\d{4}$/;
        if (!studentNumberRegex.test(field.value)) {
          isValid = false;
          errorMessage = "Student Number must be exactly 4 digits";
        }
  }


  // ✅ Name: only letters and spaces
  if (field.id === "name" && field.value) {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Name must only contain letters";
    }
  }*/
  
  // Update visual state
  updateFieldValidationState(container, isValid, errorMessage);
  
  return isValid;
}

function updateFieldValidationState(container, isValid, errorMessage) {
  // Remove existing states
  container.classList.remove('field-valid', 'field-invalid');
  const existingMessage = container.querySelector('.field-error-message');
  if (existingMessage) existingMessage.remove();
  
  if (isValid) {
    container.classList.add('field-valid');
    updateCompletionIndicator();
  } else {
    container.classList.add('field-invalid');
    
    if (errorMessage) {
      const errorEl = document.createElement('div');
      errorEl.className = 'field-error-message';
      errorEl.textContent = errorMessage;
      container.appendChild(errorEl);
    }
  }
}

// Continue with existing functions...
function initializeForm() {
  // Set up form field interactions
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    // Enhanced focus effects
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
    input.addEventListener('input', handleInputChange);
    input.addEventListener('change', handleInputChange);
  });
  
  // Initialize custom checkboxes
  setupCustomCheckboxes();
  
  // Set initial validation state
  updateFormValidation();
}

function setupFloatingLabels() {
  const containers = document.querySelectorAll('.input-container, .select-container, .textarea-container');
  
  containers.forEach(container => {
    const input = container.querySelector('input, select, textarea');
    
    if (!input) return;
    
    // Set initial state
    updateLabelState(container, input);
    
    // Add event listeners
    input.addEventListener('focus', () => {
      updateLabelState(container, input);
    });
    
    input.addEventListener('blur', () => {
      updateLabelState(container, input);
    });
    
    input.addEventListener('input', () => {
      updateLabelState(container, input);
    });
    
    input.addEventListener('change', () => {
      updateLabelState(container, input);
    });
    
    // Special handling for duration field
    if (input.id === 'duration') {
      input.addEventListener('input', handleDurationInput);
      input.addEventListener('keydown', handleDurationKeydown);
    }
  });
  
  // Setup location selector
  setupLocationSelector();
}

// Duration field specific handlers
function handleDurationInput(event) {
  const input = event.target;
  let value = input.value;
  
  // Remove any non-digit characters except colon
  value = value.replace(/[^\d:]/g, '');
  
  // Ensure only one colon
  const colonCount = (value.match(/:/g) || []).length;
  if (colonCount > 1) {
    value = value.replace(/:/g, (match, index) => index === value.indexOf(':') ? ':' : '');
  }
  
  // Auto-insert colon after 2 digits if not present
  if (value.length === 2 && !value.includes(':')) {
    value = value + ':';
  }
  
  // Limit to MM:SS format
  if (value.length > 5) {
    value = value.substring(0, 5);
  }
  
  input.value = value;
}

function handleDurationKeydown(event) {
  const input = event.target;
  const key = event.key;
  
  // Allow: backspace, delete, tab, escape, enter, and navigation keys
  if ([8, 9, 27, 13, 37, 38, 39, 40, 46].includes(event.keyCode)) {
    return;
  }
  
  // Allow digits and colon
  if (!/[\d:]/.test(key)) {
    event.preventDefault();
    return;
  }
  
  // Prevent colon if already present or if it's the first character
  if (key === ':' && (input.value.includes(':') || input.value.length === 0)) {
    event.preventDefault();
    return;
  }
}

// Location selector functionality
function setupLocationSelector() {
  const locationOptions = document.querySelectorAll('.location-option');
  const locationInput = document.getElementById('location');
  const selectedDisplay = document.querySelector('.selected-location-display');
  const selectedText = document.querySelector('.selected-text');
  
  if (!locationOptions.length || !locationInput || !selectedDisplay || !selectedText) return;
  
  locationOptions.forEach(option => {
    option.addEventListener('click', () => {
      const locationName = option.dataset.location;
      
      // Remove selected class from all options
      locationOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      option.classList.add('selected');
      
      // Update hidden input value
      locationInput.value = locationName;
      
      // Update display text
      selectedText.textContent = `Selected: ${locationName}`;
      selectedText.classList.add('has-selection');
      selectedDisplay.classList.add('has-selection');
      
      // Trigger validation
      const event = new Event('input', { bubbles: true });
      locationInput.dispatchEvent(event);
      
      // Add success effect
      createLocationSelectionEffect(option);
    });
  });
}

function createLocationSelectionEffect(selectedOption) {
  // Create a ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'location-ripple';
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(154, 128, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ripple-expand 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  `;
  
  selectedOption.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function updateLabelState(container, input) {
  const label = container.querySelector('label');
  
  if (!label) return;
  
  const shouldFloat = shouldLabelFloat(input);
  
  if (shouldFloat) {
    container.classList.add('label-floating');
  } else {
    container.classList.remove('label-floating');
  }
}

function shouldLabelFloat(input) {
  // Check if input is focused
  if (document.activeElement === input) {
    return true;
  }
  
  // Check if input has value
  if (input.value && input.value.trim() !== '') {
    return true;
  }
  
  // For select elements, check if a non-empty option is selected
  if (input.tagName === 'SELECT' && input.value !== '') {
    return true;
  }
  
  // For file inputs, check if files are selected
  if (input.type === 'file' && input.files && input.files.length > 0) {
    return true;
  }
  
  return false;
}

 function setupProgressTracking() {
   const form = document.querySelector('#volunteerForm, #activityForm, #foodSellerForm');
   if (!form) return;
   const progressSteps = document.querySelectorAll('.progress-step');
   const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', updateProgressSteps);
    input.addEventListener('change', updateProgressSteps);
  });
  
  function updateProgressSteps() {
    // Logic for updating progress steps based on form completion
    const sections = document.querySelectorAll('.form-section');
    
    sections.forEach((section, index) => {
      const sectionInputs = section.querySelectorAll('input, select, textarea');
      const completedInputs = Array.from(sectionInputs).filter(input => {
        if (input.type === 'checkbox') {
          return input.checked;
        }
        return input.value.trim() !== '';
      });
      
      const sectionComplete = completedInputs.length === sectionInputs.length;
      const progressStep = progressSteps[index];
      
      if (progressStep) {
        if (sectionComplete) {
          progressStep.classList.add('active');
          section.classList.add('section-completed');
        } else {
          progressStep.classList.remove('active');
          section.classList.remove('section-completed');
        }
      }
    });
  }
}

 function setupFormValidation() {
   const form = document.querySelector('#volunteerForm, #activityForm, #foodSellerForm');
   if (!form) return;
   const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('input', debounce(validateField, 300));
    input.addEventListener('blur', validateField);
  });
  
  function validateField(event) {
    const field = event.target;
    const fieldContainer = field.closest('.input-container, .select-container, .textarea-container');
    
    if (!fieldContainer) return;
    
    // Remove existing validation classes
    fieldContainer.classList.remove('field-valid', 'field-invalid');
    removeFieldMessage(fieldContainer);
    
    // Only validate if field has content
    if (!field.value.trim() && !field.hasAttribute('required')) {
      return;
    }
    
    const isValid = field.checkValidity();
    const hasContent = field.value.trim() !== '';
    
    if (hasContent) {
      if (isValid) {
        fieldContainer.classList.add('field-valid');
        addSuccessIcon(fieldContainer);
      } else {
        fieldContainer.classList.add('field-invalid');
        addErrorMessage(fieldContainer, getValidationMessage(field));
      }
    }
    
    updateLabelState(fieldContainer, event.target);
  }
  
  // Update progress
  updateFormValidation();
}

function getValidationMessage(field) {
  const validity = field.validity;
  const fieldName = field.name || field.id || 'This field';
  
  // Custom validation for duration field
  if (field.id === 'duration') {
    if (validity.valueMissing) {
      return 'Duration is required';
    }
    if (validity.patternMismatch) {
      return 'Please enter duration in MM:SS format (e.g., 3:45)';
    }
    return 'Please enter a valid duration';
  }
  
  // Custom validation for price field
  if (field.id === 'price') {
    if (validity.valueMissing) {
      return 'Price is required';
    }
    if (validity.rangeUnderflow) {
      return 'Price must be at least 100 Kyats';
    }
    if (validity.rangeOverflow) {
      return 'Price cannot exceed 3,500 Kyats';
    }
    if (validity.typeMismatch) {
      return 'Please enter a valid price in Kyats';
    }
    return 'Please enter a valid price between 100-3,500 Kyats';
  }
  
  if (validity.valueMissing) {
    return `${fieldName} is required`;
  }
  if (validity.typeMismatch) {
    if (field.type === 'email') return 'Please enter a valid email address';
    if (field.type === 'url') return 'Please enter a valid URL';
  }
  if (validity.tooShort) {
    return `${fieldName} must be at least ${field.minLength} characters`;
  }
  if (validity.tooLong) {
    return `${fieldName} must be no more than ${field.maxLength} characters`;
  }
  if (validity.patternMismatch) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
  
  return 'Please enter a valid value';
}

function addSuccessIcon(container) {
  removeFieldMessage(container);
  
  const icon = document.createElement('div');
  icon.className = 'field-success-icon';
  icon.innerHTML = '<i class="fas fa-check"></i>';
  container.appendChild(icon);
}

function addErrorMessage(container, message) {
  removeFieldMessage(container);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error-message';
  errorDiv.textContent = message;
  container.appendChild(errorDiv);
}

function removeFieldMessage(container) {
  const existingIcon = container.querySelector('.field-success-icon');
  const existingMessage = container.querySelector('.field-error-message');
  
  if (existingIcon) existingIcon.remove();
  if (existingMessage) existingMessage.remove();
}

function setupAnimations() {
  // Add entrance animations to form sections
  const sections = document.querySelectorAll('.form-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

function setupCustomCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const checkmark = this.parentElement.querySelector('.checkmark');
      
      if (this.checked) {
        checkmark.style.transform = 'scale(1.1)';
        checkmark.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        // Bounce back
        setTimeout(() => {
          checkmark.style.transform = 'scale(1)';
        }, 150);
      } else {
        checkmark.style.background = '';
      }
      
      updateFormValidation();
    });
  });
}

function handleInputFocus(event) {
  const input = event.target;
  const formGroup = input.closest('.form-group');
  const label = formGroup?.querySelector('label');
  
  // Add focused state
  if (formGroup) {
    formGroup.classList.add('focused');
  }
  
  // Animate label icon
  if (label) {
    const icon = label.querySelector('i');
    if (icon) {
      icon.style.transform = 'scale(1.1)';
      icon.style.color = '#9a80ff';
    }
  }
  
  updateLabelState(input.closest('.input-container, .select-container, .textarea-container'), input);
}

function handleInputBlur(event) {
  const input = event.target;
  const formGroup = input.closest('.form-group');
  const label = formGroup?.querySelector('label');
  
  // Remove focused state
  if (formGroup) {
    formGroup.classList.remove('focused');
  }
  
  // Reset label icon
  if (label) {
    const icon = label.querySelector('i');
    if (icon) {
      icon.style.transform = 'scale(1)';
      icon.style.color = '';
    }
  }
  
  updateLabelState(input.closest('.input-container, .select-container, .textarea-container'), input);
}

function handleInputChange(event) {
  const fieldContainer = event.target.closest('.input-container, .select-container, .textarea-container');
  
  if (fieldContainer) {
    updateLabelState(fieldContainer, event.target);
  }
  
  // Update progress
  updateFormValidation();
}

 function updateFormValidation() {
   const form = document.querySelector('#volunteerForm, #activityForm, #foodSellerForm');
   if (!form) return;
   const submitBtn = document.querySelector('.submit-btn, .enhanced-submit-btn');
  
  // Check overall form validity
  const requiredInputs = form.querySelectorAll('input[required], select[required]');
  const isValid = Array.from(requiredInputs).every(input => {
    if (input.type === 'checkbox') {
      return input.checked;
    }
    return input.value.trim() !== '' && input.checkValidity();
  });
  
  if (isValid) {
    submitBtn.classList.add('form-valid');
  } else {
    submitBtn.classList.remove('form-valid');
  }
  
  // Update completion tracking
  updateCompletionIndicator();
}

// Utility functions
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function calculateCompletionTime() {
  const startTime = sessionStorage.getItem('formStartTime') || Date.now();
  return Date.now() - parseInt(startTime);
}

function getUserInteractionData() {
  return {
    clickCount: parseInt(sessionStorage.getItem('clickCount') || '0'),
    keystrokes: parseInt(sessionStorage.getItem('keystrokes') || '0'),
    focusEvents: parseInt(sessionStorage.getItem('focusEvents') || '0')
  };
}

function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    screenResolution: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio,
    touchDevice: 'ontouchstart' in window,
    language: navigator.language
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Legacy function redirects for compatibility
function showLoadingState() { showEnhancedLoadingState(); }
function showSuccessMessage() { showEnhancedSuccessMessage(); }
function createCelebrationEffect() { createAdvancedCelebrationEffect(); }

function showEnhancedSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  successMessage.classList.add('enhanced-success');
  
  setTimeout(() => {
    successMessage.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }, 100);
}

 function resetFormEnhanced() {
   const form = document.querySelector('#volunteerForm, #activityForm, #foodSellerForm');
   if (!form) return;
   const successMessage = document.getElementById('successMessage');
   const submitBtn = document.querySelector('.enhanced-submit-btn');

  // Reset form with animation
  form.classList.add('resetting');
  
  setTimeout(() => {
    form.reset();
    successMessage.style.display = 'none';
    successMessage.classList.remove('enhanced-success');


    if (submitBtn) {
          submitBtn.disabled = false; // Re-enable it
          submitBtn.classList.remove('loading'); // Remove loading styles
          // Restore the original button content (adjust text as needed)
          submitBtn.querySelector('.btn-content').innerHTML = `
            <i class="fas fa-rocket"></i>
            <span class="btn-text">Submit Application</span>
          `;
    }
    
    // Reset all states
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('focused', 'completed');
    });
    
    document.querySelectorAll('.input-container, .select-container, .textarea-container').forEach(container => {
      container.classList.remove('label-floating', 'field-valid', 'field-invalid');
    });
    
    // Reset completion tracking
    formCompletionData.completedFields = 0;
    updateCompletionIndicator();
    
    form.classList.remove('resetting');
  }, 500);
}

// Initialize session tracking
sessionStorage.setItem('formStartTime', Date.now().toString());

// Add enhanced CSS styles
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  /* Completion Indicator */
  .completion-indicator {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(154, 128, 255, 0.3);
    border-radius: 16px;
    padding: 1.5rem;
    margin-top: 2rem;
    text-align: center;
  }
  
  .completion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .completion-label {
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .completion-percentage {
    font-weight: 700;
    font-size: 1.2rem;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .completion-bar {
    height: 8px;
    background: rgba(154, 128, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    margin-bottom: 0.5rem;
  }
  
  .completion-fill {
    height: 100%;
    background: var(--primary-gradient);
    border-radius: 4px;
    transition: width 0.5s ease;
    position: relative;
  }
  
  .completion-glow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: completion-shine 2s infinite;
  }
  
  .completion-stats {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  /* Interactive Tooltips */
  .interactive-tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip-trigger {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: var(--primary-gradient);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    transition: var(--transition);
  }
  
  .tooltip-trigger:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 15px rgba(154, 128, 255, 0.5);
  }
  
  .tooltip-trigger i {
    color: white;
    font-size: 0.8rem;
  }
  
  .tooltip-content {
    position: absolute;
    top: -40px;
    left: -10px;
    background: var(--surface);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: var(--shadow-elevated);
    backdrop-filter: blur(20px);
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
     z-index: 2147483647 !important;
  }
  
  .tooltip-content.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .tooltip-arrow {
    position: absolute;
    bottom: -6px;
    left: 20px;
    width: 12px;
    height: 12px;
    background: var(--surface);
    border: 1px solid var(--glass-border);
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
  
  /* Field Suggestions */
  .field-suggestion {
    position: absolute;
    bottom: -30px;
    left: 0;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: suggestion-enter 0.3s ease;
    z-index: 10;
  }
  
  .field-suggestion.success {
    background: rgba(16, 185, 129, 0.1);
    color: #059669;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  
  .field-suggestion.error {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
  
  .field-suggestion.info {
    background: rgba(59, 130, 246, 0.1);
    color: #2563eb;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }
  
  .field-suggestion.fade-out {
    animation: suggestion-exit 0.3s ease forwards;
  }
  
  /* Micro-interaction Effects */
  .focus-ripple {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid var(--primary-color);
    border-radius: inherit;
    opacity: 0;
    animation: focus-ripple 0.6s ease-out;
  }
  
  /* Milestone Notifications */
  .milestone-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--surface);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow-elevated);
    backdrop-filter: blur(20px);
    z-index: 10000;
    animation: milestone-slide-in 0.5s ease;
  }
  
  .milestone-notification.fade-out {
    animation: milestone-slide-out 0.5s ease forwards;
  }
  
  .milestone-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .milestone-text {
    font-weight: 600;
    color: var(--text-primary);
  }
  
  /* Enhanced Loading States */
  .enhanced-loading {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .loading-dots {
    display: flex;
    gap: 4px;
  }
  
  .loading-dots .dot {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    animation: loading-bounce 1.4s ease-in-out infinite both;
  }
  
  .loading-dots .dot:nth-child(1) { animation-delay: -0.32s; }
  .loading-dots .dot:nth-child(2) { animation-delay: -0.16s; }
  .loading-dots .dot:nth-child(3) { animation-delay: 0s; }
  
  .form-glass-container.processing {
    animation: processing-pulse 2s ease-in-out infinite;
  }
  
  .enhanced-success {
    transform: scale(1.05);
    box-shadow: 0 0 50px rgba(16, 185, 129, 0.3);
  }
  
  /* Animations */
  @keyframes completion-shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes suggestion-enter {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes suggestion-exit {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }
  
  @keyframes focus-ripple {
    from { transform: scale(1); opacity: 0.5; }
    to { transform: scale(1.05); opacity: 0; }
  }
  
  @keyframes milestone-slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes milestone-slide-out {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes loading-bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  
  @keyframes processing-pulse {
    0%, 100% { box-shadow: var(--shadow-elevated); }
    50% { box-shadow: 0 25px 60px rgba(154, 128, 255, 0.4); }
  }
  
  @keyframes typing-particle-float {
    from { transform: translateY(0) scale(1); opacity: 1; }
    to { transform: translateY(-30px) scale(0); opacity: 0; }
  }
  
  @keyframes milestone-burst {
    from { transform: scale(0) rotate(0deg); opacity: 1; }
    to { transform: scale(1.5) rotate(180deg); opacity: 0; }
  }
  
  @keyframes firework-burst {
    from { 
      transform: translate(0, 0) scale(1); 
      opacity: 1; 
    }
    to { 
      transform: translate(
        calc(cos(var(--angle)) * var(--velocity)), 
        calc(sin(var(--angle)) * var(--velocity))
      ) scale(0); 
      opacity: 0; 
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .completion-indicator {
      padding: 1rem;
    }
    
    .tooltip-content {
      min-width: 160px;
      padding: 0.75rem;
    }
    
    .milestone-notification {
      top: 10px;
      right: 10px;
      left: 10px;
      text-align: center;
    }
  }
`;

document.head.appendChild(enhancedStyles);

// Missing function implementations for enhanced features

function createTooltipParticles(trigger) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${trigger.getBoundingClientRect().left + 10}px;
      top: ${trigger.getBoundingClientRect().top + 10}px;
      width: 3px;
      height: 3px;
      background: #9a80ff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: tooltip-particle-float 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

function addFieldGlow(field) {
  const container = field.closest('.input-container, .select-container, .textarea-container');
  if (container) {
    container.style.boxShadow = '0 0 20px rgba(154, 128, 255, 0.3)';
  }
}

function removeFieldGlow(field) {
  const container = field.closest('.input-container, .select-container, .textarea-container');
  if (container) {
    container.style.boxShadow = '';
  }
}

function createCheckboxSuccessEffect(checkbox) {
  const checkmark = checkbox.closest('.custom-checkbox').querySelector('.checkmark');
  if (checkmark) {
    // Create success particles
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      const angle = (i / 6) * Math.PI * 2;
      
      particle.style.cssText = `
        position: fixed;
        left: ${checkmark.getBoundingClientRect().left + 12}px;
        top: ${checkmark.getBoundingClientRect().top + 12}px;
        width: 4px;
        height: 4px;
        background: #10b981;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: checkbox-particle-burst 0.6s ease-out forwards;
        --angle: ${angle};
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  }
}

function createButtonHoverEffect() {
  const btn = document.querySelector('.enhanced-submit-btn');
  if (btn) {
    btn.style.transform = 'translateY(-2px) scale(1.02)';
    btn.style.boxShadow = '0 15px 40px rgba(154, 128, 255, 0.4)';
  }
}

function removeButtonHoverEffect() {
  const btn = document.querySelector('.enhanced-submit-btn');
  if (btn) {
    btn.style.transform = '';
    btn.style.boxShadow = '';
  }
}

function animateProgressCompletion() {
  const steps = document.querySelectorAll('.progress-step');
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('active');
      if (index < steps.length - 1) {
        const nextLine = step.nextElementSibling;
        if (nextLine && nextLine.classList.contains('progress-line')) {
          nextLine.style.setProperty('--progress-width', '100%');
        }
      }
    }, index * 300);
  });
}

function showValidationErrors() {
  const invalidFields = document.querySelectorAll('.field-invalid');
  
  if (invalidFields.length > 0) {
    // Shake animation for invalid fields
    invalidFields.forEach((field, index) => {
      setTimeout(() => {
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          field.style.animation = '';
        }, 500);
      }, index * 100);
    });
    
    // Scroll to first invalid field
    invalidFields[0].scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}

function createConfettiShower() {
  const colors = ['#9a80ff', '#efe1ee', '#10b981', '#f59e0b', '#ef4444'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
        animation: confetti-fall 3s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 50);
  }
}

function createSuccessParticles() {
  const successMessage = document.getElementById('successMessage');
  if (!successMessage) return;
  
  const rect = successMessage.getBoundingClientRect();
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: success-particle-burst 2s ease-out forwards;
      --delay: ${i * 0.1}s;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 2000);
  }
}

function addFormSuccessGlow() {
  const formContainer = document.querySelector('.form-glass-container');
  if (formContainer) {
    formContainer.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.4)';
    formContainer.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    
    setTimeout(() => {
      formContainer.style.boxShadow = '';
      formContainer.style.border = '';
    }, 3000);
  }
}

// Add additional CSS animations for the new effects
const additionalAnimations = document.createElement('style');
additionalAnimations.textContent = `
  @keyframes tooltip-particle-float {
    from { 
      transform: translate(0, 0) scale(1); 
      opacity: 1; 
    }
    to { 
      transform: translate(${Math.random() * 40 - 20}px, -30px) scale(0); 
      opacity: 0; 
    }
  }
  
  @keyframes checkbox-particle-burst {
    from { 
      transform: translate(0, 0) scale(1); 
      opacity: 1; 
    }
    to { 
      transform: translate(
        calc(cos(var(--angle)) * 30px), 
        calc(sin(var(--angle)) * 30px)
      ) scale(0); 
      opacity: 0; 
    }
  }
  
  @keyframes success-particle-burst {
    from { 
      transform: translate(0, 0) scale(1); 
      opacity: 1; 
    }
    to { 
      transform: translate(
        ${Math.random() * 200 - 100}px, 
        ${Math.random() * 200 - 100}px
      ) scale(0); 
      opacity: 0; 
    }
  }
  
  @keyframes confetti-fall {
    from {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  /* Enhanced field validation states */
  .field-valid .input-container input,
  .field-valid .select-container select,
  .field-valid .textarea-container textarea {
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
  }
  
  .field-invalid .input-container input,
  .field-invalid .select-container select,
  .field-invalid .textarea-container textarea {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  .field-success-icon {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #10b981;
    font-size: 1.2rem;
    animation: success-pop 0.3s ease-out;
    z-index: 3;
  }
  
  .field-error-message {
    position: absolute;
    bottom: -35px;
    left: 0;
    right: 0;
    font-size: 0.875rem;
    color: #ef4444;
    font-weight: 500;
    animation: slideInError 0.3s ease-out;
    z-index: 3;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 8px;
    padding: 8px 12px;
    margin-top: 4px;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
    backdrop-filter: blur(10px);
  }
  
  .field-error-message::before {
    content: '⚠️';
    margin-right: 6px;
    font-size: 0.75rem;
  }
  
  @keyframes success-pop {
    0% { transform: translateY(-50%) scale(0); }
    50% { transform: translateY(-50%) scale(1.2); }
    100% { transform: translateY(-50%) scale(1); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes slideInError {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Form resetting animation */
    opacity: 0.7;
    transform: scale(0.98);
    transition: all 0.5s ease;
  }
  
  /* Enhanced form sections */
  .section-completed .section-title {
    color: #10b981;
  }
  
  .section-completed .section-title i {
    color: #10b981;
  }
  
  .form-group.focused {
    z-index: 10;
  }
  
  .animate-in {
    animation: slideInUp 0.6s ease-out;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(additionalAnimations); 