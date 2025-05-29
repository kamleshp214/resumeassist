document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile-optimized components
  initMobileNav();
  initNameDialog();
  initTouchInteractions();
  initFormEnhancements();
  
  // Add animation classes to elements as they appear in viewport
  initScrollAnimations();
  
  // Handle any page-specific initializations
  initPageSpecific();
});

/**
 * Initialize scroll-based animations for a more engaging mobile experience
 */
function initScrollAnimations() {
  // Animate elements as they enter the viewport
  const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
  
  if (!animateOnScroll.length) return;
  
  // Set initial state (hidden)
  animateOnScroll.forEach(element => {
    element.classList.add('pre-animation');
  });
  
  // Check if elements are in viewport and animate them
  function checkVisibility() {
    animateOnScroll.forEach(element => {
      if (isElementInViewport(element) && element.classList.contains('pre-animation')) {
        element.classList.remove('pre-animation');
        element.classList.add('animate');
      }
    });
  }
  
  // Check visibility on load and scroll
  checkVisibility();
  window.addEventListener('scroll', checkVisibility, { passive: true });
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 && 
      rect.bottom >= 0
    );
  }
}

/**
 * Enhance forms for mobile touch interactions
 */
function initFormEnhancements() {
  // Focus styling for inputs on mobile
  const formInputs = document.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    // Add active class on focus for better mobile visibility
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('input-focused');
      
      // Add 'has-content' class if the field has content
      if (this.value.trim() !== '') {
        this.parentElement.classList.add('has-content');
      } else {
        this.parentElement.classList.remove('has-content');
      }
    });
    
    // Check initial state
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('has-content');
    }
  });
  
  // File upload enhancements for mobile
  const fileInputs = document.querySelectorAll('input[type="file"]');
  
  fileInputs.forEach(input => {
    const fileLabel = input.nextElementSibling;
    if (!fileLabel) return;
    
    input.addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        // Update label with file name and add active class
        let fileName = this.files[0].name;
        if (fileName.length > 20) {
          fileName = fileName.substring(0, 17) + '...';
        }
        fileLabel.textContent = fileName;
        fileLabel.classList.add('file-selected');
      } else {
        // Reset to default
        fileLabel.textContent = 'Choose a file';
        fileLabel.classList.remove('file-selected');
      }
    });
  });
}

/**
 * Handle any page-specific initializations
 */
function initPageSpecific() {
  // Home page specific
  if (document.querySelector('.home-page')) {
    initHomePageAnimations();
  }
  
  // Upload page specific
  if (document.querySelector('.upload-page')) {
    initUploadPageInteractions();
  }
  
  // Results page specific
  if (document.querySelector('.results-page')) {
    initResultsPageInteractions();
  }
  
  // Compare page specific
  if (document.querySelector('.compare-page')) {
    initComparePageInteractions();
  }
}

/**
 * Initialize home page specific animations
 */
function initHomePageAnimations() {
  // Add staggered entrance animations to hero elements
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
  
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate-in');
    }, index * 150); // Stagger the animations
  });
  
  // Add smooth hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
    
    // For touch devices
    card.addEventListener('touchstart', function() {
      this.classList.add('hover');
    }, {passive: true});
    
    card.addEventListener('touchend', function() {
      // Delay removing the hover class for a better visual effect
      setTimeout(() => {
        this.classList.remove('hover');
      }, 300);
    }, {passive: true});
  });
}

/**
 * Initialize upload page interactions
 */
function initUploadPageInteractions() {
  // Enhance drag and drop for mobile
  const dropZone = document.querySelector('.dropzone');
  if (!dropZone) return;
  
  // Add visual feedback for touch interactions
  dropZone.addEventListener('touchstart', function(e) {
    this.classList.add('touch-active');
  }, {passive: true});
  
  dropZone.addEventListener('touchend', function(e) {
    this.classList.remove('touch-active');
  }, {passive: true});
}

/**
 * Initialize results page interactions
 */
function initResultsPageInteractions() {
  // Add smooth transitions for result cards
  const resultItems = document.querySelectorAll('.result-item');
  
  resultItems.forEach((item, index) => {
    // Stagger the appearance of items
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 100);
    
    // Add touch feedback
    item.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, {passive: true});
    
    item.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    }, {passive: true});
  });
}

/**
 * Initialize compare page interactions
 */
function initComparePageInteractions() {
  // Enhance mobile comparison view
  const compareItems = document.querySelectorAll('.compare-item');
  const compareControls = document.querySelector('.compare-controls');
  
  if (compareItems.length && compareControls) {
    // Add swipe functionality for comparison cards on mobile
    let startX, moveX;
    const threshold = 50; // Minimum distance to detect swipe
    
    compareItems.forEach(item => {
      item.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
      }, {passive: true});
      
      item.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
      }, {passive: true});
      
      item.addEventListener('touchend', function() {
        if (!startX || !moveX) return;
        
        const diffX = moveX - startX;
        
        if (Math.abs(diffX) > threshold) {
          // Swipe detected
          if (diffX > 0) {
            // Swipe right - previous item
            const prevBtn = compareControls.querySelector('.prev-btn');
            if (prevBtn) prevBtn.click();
          } else {
            // Swipe left - next item
            const nextBtn = compareControls.querySelector('.next-btn');
            if (nextBtn) nextBtn.click();
          }
        }
        
        // Reset values
        startX = null;
        moveX = null;
      }, {passive: true});
    });
  }
}

/**
 * Initialize the mobile navigation with smooth animations
 */
function initMobileNav() {
  // Get elements by ID or class for better reliability
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobile-nav');
  const body = document.body;
  
  console.log('Mobile nav element:', mobileNav);
  console.log('Menu toggle element:', menuToggle);
  
  // Simple implementation with fewer moving parts
  function setupMobileNav() {
    if (!menuToggle || !mobileNav) {
      console.error('Mobile navigation elements not found, aborting setup');
      return;
    }
    
    // Make sure the menu starts as hidden
    mobileNav.style.display = 'none';
    mobileNav.style.opacity = '0';
    mobileNav.style.visibility = 'hidden';
    
    // Manual toggle function that directly manipulates the DOM
    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      console.log('Toggle menu clicked');
      
      const isOpen = menuToggle.classList.contains('active');
      
      if (!isOpen) {
        // Open the menu
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        body.classList.add('menu-open');
        
        // Force the menu to be visible
        mobileNav.style.display = 'flex';
        
        // Force a reflow
        mobileNav.offsetHeight;
        
        // Make it visible
        mobileNav.style.opacity = '1';
        mobileNav.style.visibility = 'visible';
        
        console.log('Menu opened');
      } else {
        // Close the menu
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
        mobileNav.style.opacity = '0';
        
        // Delay hiding to allow animation
        setTimeout(() => {
          mobileNav.style.display = 'none';
          mobileNav.style.visibility = 'hidden';
        }, 300);
        
        console.log('Menu closed');
      }
    }
    
    // Direct event listeners without delegation
    menuToggle.addEventListener('click', toggleMenu);
    
    // Also listen to the wrapper if it exists
    const menuWrapper = document.querySelector('.menu-button-wrapper');
    if (menuWrapper) {
      menuWrapper.addEventListener('click', function(e) {
        // Only trigger if the click wasn't on the button
        if (e.target !== menuToggle && !menuToggle.contains(e.target)) {
          toggleMenu(e);
        }
      });
    }
    
    // Close menu when clicking menu items
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu();
      });
    });
    
    console.log('Mobile navigation setup complete');
  }
  
  // Set up with a slight delay to ensure DOM is ready
  setTimeout(setupMobileNav, 100);
  
  // Log that initialization is complete
  console.log('Mobile navigation initialized');
  console.log('Menu toggle element:', menuToggle);
  console.log('Mobile nav element:', mobileNav);
  
  // Force repaint to ensure menu is visible after initialization
  window.setTimeout(function() {
    if (mobileNav) mobileNav.style.transform = 'translateZ(0)';
  }, 0);
  
  // Close menu when clicking on a navigation link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
  
  // Handle touch events for better mobile experience
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, {passive: true});
  
  function handleSwipeGesture() {
    const swipeThreshold = 50;
    if (mobileNav.classList.contains('active') && touchEndX - touchStartX > swipeThreshold) {
      // Swipe right, close menu
      menuToggle.click();
    } else if (!mobileNav.classList.contains('active') && touchStartX - touchEndX > swipeThreshold) {
      // Swipe left, open menu (only if near left edge)
      if (touchStartX < 30) {
        menuToggle.click();
      }
    }
  }
}

/**
 * Add various touch-friendly interactions for mobile
 */
function initTouchInteractions() {
  // Add active state to buttons on touch for better feedback
  const touchTargets = document.querySelectorAll('.btn, .card, .feature-card, .nav-link');
  
  touchTargets.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, {passive: true});
    
    element.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    }, {passive: true});
    
    element.addEventListener('touchcancel', function() {
      this.classList.remove('touch-active');
    }, {passive: true});
  });
}

/**
 * Dialog functionality for name input - mobile optimized
 */
function initNameDialog() {
  const nameDialog = document.getElementById('nameDialog');
  if (!nameDialog) {
    console.error('Name dialog not found');
    return;
  }
  
  console.log('Initializing name dialog');
  
  const submitNameBtn = document.getElementById('submitNameBtn');
  const cancelNameBtn = document.getElementById('cancelNameBtn');
  const closeNameBtn = document.getElementById('closeNameBtn');
  const nameInput = document.getElementById('nameInput');
  
  // Close dialog with smooth animation
  function closeDialog() {
    console.log('Closing dialog');
    nameDialog.classList.add('dialog-closing');
    setTimeout(() => {
      nameDialog.classList.remove('active');
      nameDialog.classList.remove('dialog-closing');
      // Enable scrolling on body when dialog closes
      document.body.classList.remove('dialog-open');
    }, 300); // Match this with the CSS transition duration
  }
  
  // Ensure click events don't propagate through the dialog
  const dialogContent = nameDialog.querySelector('.dialog-content');
  if (dialogContent) {
    dialogContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Show dialog with mobile-friendly animation
  window.showNameDialog = function() {
    nameDialog.classList.add('active');
    nameInput.focus();
  };
  
  // Submit name
  if (submitNameBtn) {
    submitNameBtn.addEventListener('click', function() {
      const name = nameInput.value;
      if (validateName(name)) {
        // Store the name in session/local storage or send to server
        sessionStorage.setItem('candidateName', name);
        
        // Trigger form submission if needed
        const form = document.getElementById('resumeForm');
        if (form && form.dataset.pendingSubmit === 'true') {
          form.dataset.pendingSubmit = 'false';
          const formData = new FormData(form);
          formData.append('candidate_name', name);
          submitResumeForm(formData);
        }
        
        closeDialog();
      } else {
        alert('Please enter a valid name (e.g., John Doe).');
      }
    });
  }
  
  // Handle Enter key in input
  if (nameInput) {
    nameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        submitNameBtn.click();
      }
    });
  }
  
  // Cancel dialog
  if (cancelNameBtn) {
    cancelNameBtn.addEventListener('click', function() {
      nameInput.value = '';
      closeDialog();
      
      // If form was waiting to be submitted, submit without a name
      const form = document.getElementById('resumeForm');
      if (form && form.dataset.pendingSubmit === 'true') {
        form.dataset.pendingSubmit = 'false';
        submitResumeForm(new FormData(form));
      }
    });
  }
}

// Validate name format
function validateName(name) {
  // Name should be in format "First Last" with proper capitalization
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return namePattern.test(name);
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});