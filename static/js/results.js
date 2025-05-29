document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const resumeGrid = document.getElementById('resumeGrid');
  const noResults = document.getElementById('noResults');
  const sortBtn = document.getElementById('sortBtn');
  const filterBtn = document.getElementById('filterBtn');
  const compareBtn = document.getElementById('compareBtn');
  const sortMenu = document.getElementById('sortMenu');
  const filterMenu = document.getElementById('filterMenu');
  const resumeModal = document.getElementById('resumeModal');
  
  // Print resume details function
  function printResumeDetails(data) {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const atsScore = data.ats_score || 0;
    let scoreClass = '';
    
    if (atsScore >= 90) scoreClass = 'excellent';
    else if (atsScore >= 75) scoreClass = 'good';
    else if (atsScore >= 60) scoreClass = 'average';
    else scoreClass = 'poor';
    
    // Prepare skills HTML
    let skillsHTML = '<p>No skills information found.</p>';
    if (data.skills && data.skills.length > 0) {
      skillsHTML = data.skills.map(skill => 
        `<span class="print-skill">${skill}</span>`
      ).join('');
    }
    
    // Prepare education HTML
    let educationHTML = '<p>No education information found.</p>';
    if (data.education && data.education.length > 0) {
      educationHTML = data.education.map(edu => `
        <div class="print-education">
          <h3>${edu.degree || 'Degree not specified'}</h3>
          <p><strong>Institution:</strong> ${edu.university || edu.institution || 'Not specified'}</p>
          <p><strong>Duration:</strong> ${edu.year || 'Not specified'}</p>
        </div>
      `).join('');
    }
    
    // Prepare experience HTML
    let experienceHTML = '<p>No experience information found.</p>';
    if (data.experience && data.experience.length > 0) {
      experienceHTML = data.experience.map(exp => `
        <div class="print-experience">
          <h3>${exp.title || 'Position not specified'}</h3>
          <p><strong>Company:</strong> ${exp.company || 'Not specified'}</p>
          <p><strong>Duration:</strong> ${exp.duration || exp.dates || 'Not specified'}</p>
          ${exp.description ? `<p><strong>Responsibilities:</strong></p>
          <p>${exp.description}</p>` : ''}
        </div>
      `).join('');
    }
    
    // Prepare suggestions HTML
    let suggestionsHTML = '<p>No suggestions available.</p>';
    if (data.suggestions && data.suggestions.length > 0) {
      suggestionsHTML = data.suggestions.map(suggestion => `
        <li>${suggestion}</li>
      `).join('');
    }
    
    // Set the content of the print window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${data.name || 'Resume'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .print-name {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          .print-job-role {
            font-size: 18px;
            color: #666;
            margin: 5px 0;
          }
          .print-contact {
            margin: 15px 0;
            display: flex;
            justify-content: center;
            gap: 20px;
          }
          .print-section {
            margin-bottom: 25px;
          }
          .print-section h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            font-size: 18px;
          }
          .print-score {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: bold;
            margin-left: 10px;
            color: white;
          }
          .print-score.excellent { background-color: #10b981; }
          .print-score.good { background-color: #3b82f6; }
          .print-score.average { background-color: #f97316; }
          .print-score.poor { background-color: #ef4444; }
          .print-education, .print-experience {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #eee;
          }
          .print-education:last-child, .print-experience:last-child {
            border-bottom: none;
          }
          .print-education h3, .print-experience h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
          }
          .print-education p, .print-experience p {
            margin: 5px 0;
          }
          .print-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .print-skill {
            background-color: #f5f5f5;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
          }
          .print-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
            padding-top: 15px;
          }
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1 class="print-name">${data.name || 'Name not specified'}</h1>
          <p class="print-job-role">${data.job_role || 'Role not specified'}</p>
          <div class="print-contact">
            <span>${data.email || 'Email not available'}</span>
            <span>${data.phone || 'Phone not available'}</span>
          </div>
          <div>
            <span>ATS Score: </span>
            <span class="print-score ${scoreClass}">${atsScore}</span>
          </div>
        </div>
        
        <div class="print-section">
          <h2>Skills</h2>
          <div class="print-skills">
            ${skillsHTML}
          </div>
        </div>
        
        <div class="print-section">
          <h2>Experience</h2>
          ${experienceHTML}
        </div>
        
        <div class="print-section">
          <h2>Education</h2>
          ${educationHTML}
        </div>
        
        <div class="print-section">
          <h2>Suggestions for Improvement</h2>
          <ul>
            ${suggestionsHTML}
          </ul>
        </div>
        
        <div class="print-footer">
          <p>Generated by <strong>ResumeAssist</strong> on ${new Date().toLocaleDateString()}</p>
        </div>
        
        <script>
          // Auto print when loaded
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  }
  
  // Initialize score fill bars
  initScoreFills();
  
  // Check if there are resumes to display
  if (resumeGrid && resumeGrid.children.length === 0) {
    if (noResults) noResults.style.display = 'block';
    if (resumeGrid) resumeGrid.style.display = 'none';
  } else {
    if (noResults) noResults.style.display = 'none';
    if (resumeGrid) resumeGrid.style.display = 'grid';
  }
  
  // Sort button and menu
  if (sortBtn && sortMenu) {
    sortBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Position the menu
      const rect = sortBtn.getBoundingClientRect();
      sortMenu.style.top = (rect.bottom + window.scrollY) + 'px';
      
      // Ensure dropdown doesn't go off-screen on mobile
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) { // Mobile breakpoint
        // Center the menu for mobile
        sortMenu.style.left = Math.max(10, Math.min(windowWidth - sortMenu.offsetWidth - 10, rect.left)) + 'px';
      } else {
        sortMenu.style.left = rect.left + 'px';
      }
      
      // Toggle menu visibility
      sortMenu.style.display = sortMenu.style.display === 'block' ? 'none' : 'block';
      // Hide other menus
      if (filterMenu) filterMenu.style.display = 'none';
    });
    
    // Sort functionality
    sortMenu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', function() {
        const sortBy = this.getAttribute('data-sort');
        sortResumes(sortBy);
        sortMenu.style.display = 'none';
      });
    });
  }
  
  // Filter button and menu
  if (filterBtn && filterMenu) {
    filterBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      // Position the menu
      const rect = filterBtn.getBoundingClientRect();
      filterMenu.style.top = (rect.bottom + window.scrollY) + 'px';
      
      // Ensure dropdown doesn't go off-screen on mobile
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) { // Mobile breakpoint
        // Center the menu for mobile
        filterMenu.style.left = Math.max(10, Math.min(windowWidth - filterMenu.offsetWidth - 10, rect.left)) + 'px';
      } else {
        filterMenu.style.left = rect.left + 'px';
      }
      
      // Toggle menu visibility
      filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
      // Hide other menus
      if (sortMenu) sortMenu.style.display = 'none';
    });
    
    // Apply filters
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener('click', function() {
        applyFilters();
        filterMenu.style.display = 'none';
      });
    }
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
        clearFilters();
      });
    }
  }
  
  // Close menus when clicking outside
  document.addEventListener('click', function() {
    if (sortMenu) sortMenu.style.display = 'none';
    if (filterMenu) filterMenu.style.display = 'none';
  });
  
  // Prevent click propagation from menus
  [sortMenu, filterMenu].forEach(menu => {
    if (menu) {
      menu.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
  
  // View button behavior
  const viewButtons = document.querySelectorAll('.btn-view');
  if (viewButtons.length > 0) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const resumeId = this.getAttribute('data-id');
        openResumeModal(resumeId);
      });
    });
  }
  
  // "Export" buttons for each resume card
  const downloadButtons = document.querySelectorAll('.btn-download');
  if (downloadButtons.length > 0) {
    downloadButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const resumeId = this.getAttribute('data-id');
        exportResumeData(resumeId);
      });
    });
  }
  
  // Compare button functionality
  if (compareBtn) {
    compareBtn.addEventListener('click', function() {
      const selectedResumes = getSelectedResumes();
      if (selectedResumes.length < 2) {
        alert('Please select at least 2 resumes to compare.');
        return;
      }
      
      // Store selected resume IDs in session storage
      sessionStorage.setItem('compareResumes', JSON.stringify(selectedResumes));
      // Navigate to compare page
      window.location.href = '/compare';
    });
  }
  
  // Resume modal export button
  const exportResumeBtn = document.getElementById('exportResumeBtn');
  if (exportResumeBtn) {
    exportResumeBtn.addEventListener('click', function() {
      const resumeId = this.getAttribute('data-id');
      if (resumeId) {
        exportResumeData(resumeId);
      }
    });
  }
  
  // Support functions
  
  // Sort resumes
  function sortResumes(sortBy) {
    if (!resumeGrid) return;
    
    const cards = Array.from(resumeGrid.children);
    
    cards.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          const nameA = a.querySelector('.resume-name').textContent.trim().toLowerCase();
          const nameB = b.querySelector('.resume-name').textContent.trim().toLowerCase();
          return nameA.localeCompare(nameB);
          
        case 'ats_score':
          const scoreA = parseInt(a.querySelector('.ats-score').getAttribute('data-score'));
          const scoreB = parseInt(b.querySelector('.ats-score').getAttribute('data-score'));
          return scoreB - scoreA; // High to low
          
        case 'date':
          // Assuming newer resumes are added to the end of the grid
          // So we reverse the order to get newest first
          return cards.indexOf(b) - cards.indexOf(a);
          
        default:
          return 0;
      }
    });
    
    // Remove all cards
    while (resumeGrid.firstChild) {
      resumeGrid.removeChild(resumeGrid.firstChild);
    }
    
    // Add sorted cards back
    cards.forEach(card => {
      resumeGrid.appendChild(card);
    });
  }
  
  // Apply filters
  function applyFilters() {
    if (!resumeGrid) return;
    
    // Get selected job roles
    const selectedRoles = Array.from(
      filterMenu.querySelectorAll('.filter-group:nth-child(1) input:checked')
    ).map(input => input.value);
    
    // Get selected ATS score ranges
    const selectedScores = Array.from(
      filterMenu.querySelectorAll('.filter-group:nth-child(2) input:checked')
    ).map(input => input.value);
    
    // Apply filters to each card
    const cards = Array.from(resumeGrid.children);
    let visibleCount = 0;
    
    cards.forEach(card => {
      const jobRole = card.getAttribute('data-job-role');
      const atsScore = parseInt(card.getAttribute('data-ats-score'));
      
      let showByRole = selectedRoles.length === 0 || selectedRoles.includes(jobRole);
      let showByScore = selectedScores.length === 0;
      
      // Check score ranges
      if (!showByScore) {
        for (const rangeStr of selectedScores) {
          if (rangeStr === '90-100' && atsScore >= 90 && atsScore <= 100) {
            showByScore = true;
            break;
          } else if (rangeStr === '75-89' && atsScore >= 75 && atsScore <= 89) {
            showByScore = true;
            break;
          } else if (rangeStr === '60-74' && atsScore >= 60 && atsScore <= 74) {
            showByScore = true;
            break;
          } else if (rangeStr === '0-59' && atsScore < 60) {
            showByScore = true;
            break;
          }
        }
      }
      
      // Show or hide the card
      if (showByRole && showByScore) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show "No Results" if all cards are filtered out
    if (visibleCount === 0) {
      if (noResults) {
        noResults.style.display = 'block';
        noResults.querySelector('h3').textContent = 'No Matching Resumes';
        noResults.querySelector('p').textContent = 'Try adjusting your filters to see more resumes.';
      }
    } else {
      if (noResults) noResults.style.display = 'none';
    }
  }
  
  // Clear filters
  function clearFilters() {
    if (!filterMenu) return;
    
    // Uncheck all filter checkboxes
    filterMenu.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Show all cards
    if (resumeGrid) {
      Array.from(resumeGrid.children).forEach(card => {
        card.style.display = 'block';
      });
    }
    
    // Hide "No Results" message
    if (noResults) noResults.style.display = 'none';
  }
  
  // Get selected resumes
  function getSelectedResumes() {
    const checkboxes = document.querySelectorAll('.resume-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));
  }
  
  // Open resume modal with enhanced mobile experience
  function openResumeModal(resumeId) {
    if (!resumeModal) return;
    
    // Show loading state
    document.body.classList.add('modal-open');
    resumeModal.classList.add('active');
    resumeModal.innerHTML = `
      <div class="dialog-content loading">
        <div class="dialog-header">
          <h2 class="dialog-title">Loading Resume Details...</h2>
          <button class="dialog-close" id="closeModalBtnTemp">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="dialog-body" style="padding: 30px; text-align: center;">
          <div class="loading-spinner">
            <svg width="40" height="40" viewBox="0 0 24 24" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#333" stroke-linecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          <p style="margin-top: 15px; color: #555;">Loading resume information...</p>
        </div>
      </div>
    `;
    
    // Add temporary close button functionality
    const tempCloseBtn = document.getElementById('closeModalBtnTemp');
    if (tempCloseBtn) {
      tempCloseBtn.addEventListener('click', function() {
        closeModal();
      });
    }
    
    // Close on click outside (for loading state)
    resumeModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
    
    // Make AJAX request to get resume data
    fetch(`/api/resumes/${resumeId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        return response.json();
      })
      .then(data => {
        // Small delay to ensure animation is smooth
        setTimeout(() => {
          // Populate modal with resume data
          populateResumeModal(data, resumeId);
          
          // Re-attach close handlers after content is loaded
          attachModalCloseHandlers();
        }, 400);
      })
      .catch(error => {
        console.error('Error fetching resume data:', error);
        showModalError(error);
      });
  }
  
  // Function to initialize modal tabs
  function initializeModalTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId + 'Tab');
        if (tabContent) {
          tabContent.classList.add('active');
        }
      });
    });
  }
  
  // Error handler for modal
  function showModalError(error) {
    console.error('Error loading resume data:', error);
    resumeModal.innerHTML = `
      <div class="dialog-content error">
        <div class="dialog-header">
          <h2 class="dialog-title">Error</h2>
          <button class="dialog-close" id="closeModalBtnError">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="dialog-body" style="padding: 20px; text-align: center;">
          <svg viewBox="0 0 24 24" width="48" height="48" stroke="#e53e3e" stroke-width="2" fill="none">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12" y2="16"></line>
          </svg>
          <p style="margin-top: 15px; color: #555;">Failed to load resume details. Please try again.</p>
        </div>
        <div class="modal-footer">
          <button id="closeModalBtnErrorFooter" class="btn-primary">Close</button>
        </div>
      </div>
    `;
    
    // Add error close button functionality
    const errorCloseBtn = document.getElementById('closeModalBtnError');
    const errorCloseFooterBtn = document.getElementById('closeModalBtnErrorFooter');
    
    if (errorCloseBtn) {
      errorCloseBtn.addEventListener('click', closeModal);
    }
    
    if (errorCloseFooterBtn) {
      errorCloseFooterBtn.addEventListener('click', closeModal);
    }
  }
  
  // Function to close modal
  function closeModal() {
    if (!resumeModal) return;
    
    // Add exit animation
    const dialogContent = resumeModal.querySelector('.dialog-content');
    if (dialogContent) {
      dialogContent.style.animation = 'modalFadeOut 0.2s ease';
      
      setTimeout(() => {
        resumeModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        dialogContent.style.animation = '';
      }, 200);
    } else {
      resumeModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  }
  
  // Attach event handlers to modal close buttons
  function attachModalCloseHandlers() {
    // Close button in header
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close button in footer
    const closeModalBtnFooter = document.getElementById('closeModalBtnFooter');
    if (closeModalBtnFooter) {
      closeModalBtnFooter.addEventListener('click', closeModal);
    }
    
    // Close on click outside
    resumeModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }
  
  // Populate resume modal with data
  function populateResumeModal(data, resumeId) {
    // Create the modal HTML structure with the real data
    const atsScore = data.ats_score || 0;
    let scoreColorClass = '';
    if (atsScore >= 90) scoreColorClass = 'excellent';
    else if (atsScore >= 75) scoreColorClass = 'good';
    else if (atsScore >= 60) scoreColorClass = 'average';
    else scoreColorClass = 'poor';
    
    // Prepare skills HTML
    let skillsHTML = '<p>No skills information found.</p>';
    if (data.skills && data.skills.length > 0) {
      skillsHTML = data.skills.map(skill => 
        `<div class="skill-item">${skill}</div>`
      ).join('');
    }
    
    // Prepare education HTML
    let educationHTML = '<p>No education information found.</p>';
    if (data.education && data.education.length > 0) {
      educationHTML = data.education.map(edu => `
        <div class="education-item">
          <h4>${edu.degree || 'Degree not specified'}</h4>
          <p><strong>Institution:</strong> ${edu.university || edu.institution || 'Not specified'}</p>
          <p><strong>Duration:</strong> ${edu.year || 'Not specified'}</p>
        </div>
      `).join('');
    }
    
    // Prepare experience HTML
    let experienceHTML = '<p>No experience information found.</p>';
    if (data.experience && data.experience.length > 0) {
      experienceHTML = data.experience.map(exp => `
        <div class="experience-item">
          <h4>${exp.title || 'Position not specified'}</h4>
          <p><strong>Company:</strong> ${exp.company || 'Not specified'}</p>
          <p><strong>Duration:</strong> ${exp.duration || exp.dates || 'Not specified'}</p>
          ${exp.description ? `<p><strong>Responsibilities:</strong></p>
          <p>${exp.description}</p>` : ''}
        </div>
      `).join('');
    }
    
    // Prepare suggestions HTML
    let suggestionsHTML = '<p>No suggestions available.</p>';
    if (data.suggestions && data.suggestions.length > 0) {
      suggestionsHTML = data.suggestions.map(suggestion => `
        <div class="suggestion-item">
          <div class="suggestion-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="suggestion-content">
            <p>${suggestion}</p>
          </div>
        </div>
      `).join('');
    }
    
    // Prepare education summary for overview tab
    let eduSummaryHTML = '<p>No education information found.</p>';
    if (data.education && data.education.length > 0) {
      eduSummaryHTML = data.education.map(edu => `
        <div class="education-item">
          <h5>${edu.degree || 'Degree not specified'}</h5>
          <p>${edu.university || edu.institution || 'Not specified'}, ${edu.year || 'Year not specified'}</p>
        </div>
      `).join('');
    }
    
    // Prepare experience summary for overview tab
    let expSummaryHTML = '<p>No experience information found.</p>';
    if (data.experience && data.experience.length > 0) {
      expSummaryHTML = data.experience.map(exp => `
        <div class="experience-item">
          <h5>${exp.title || 'Position not specified'}</h5>
          <p>${exp.company || 'Company not specified'}, ${exp.duration || exp.dates || 'Duration not specified'}</p>
          ${exp.description ? `<p>${exp.description}</p>` : ''}
        </div>
      `).join('');
    }
    
    // Create full modal HTML
    resumeModal.innerHTML = `
      <div class="dialog-content">
        <div class="dialog-header">
          <h2 class="dialog-title">Resume Details</h2>
          <button class="dialog-close" id="closeModalBtn">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="dialog-body">
          <div class="tabs">
            <button class="tab-btn active" data-tab="overview">Overview</button>
            <button class="tab-btn" data-tab="education">Education</button>
            <button class="tab-btn" data-tab="experience">Experience</button>
            <button class="tab-btn" data-tab="skills">Skills</button>
            <button class="tab-btn" data-tab="suggestions">Suggestions</button>
          </div>
          
          <div class="tab-content active" id="overviewTab">
            <div class="overview-header">
              <div>
                <h3>${data.name || 'Name not specified'}</h3>
                <p class="job-role">${data.job_role || 'Role not specified'}</p>
              </div>
              <div class="modal-ats-score">
                <span>ATS Score</span>
                <div class="score-circle ${scoreColorClass}">
                  <span>${atsScore}</span>
                </div>
              </div>
            </div>
            
            <div class="contact-info">
              <div class="info-item">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>${data.email || 'Email not available'}</span>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>${data.phone || 'Phone not available'}</span>
              </div>
            </div>
            
            <div class="overview-summary">
              <h4>Education Summary</h4>
              <div>
                ${eduSummaryHTML}
              </div>
              
              <h4>Experience Summary</h4>
              <div>
                ${expSummaryHTML}
              </div>
            </div>
          </div>
          
          <div class="tab-content" id="educationTab">
            ${educationHTML}
          </div>
          
          <div class="tab-content" id="experienceTab">
            ${experienceHTML}
          </div>
          
          <div class="tab-content" id="skillsTab">
            <div class="skills-container">
              ${skillsHTML}
            </div>
          </div>
          
          <div class="tab-content" id="suggestionsTab">
            <div class="suggestions-list">
              ${suggestionsHTML}
            </div>
          </div>
        </div>
        
        <div class="dialog-footer">
          <button id="printResumeBtn" class="btn-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
          </button>
          <button id="exportResumeBtn" class="btn-secondary" data-id="${resumeId}">Export</button>
          <button id="closeModalBtnFooter" class="btn-primary">Close</button>
        </div>
      </div>
    `;
    
    // Initialize the tab functionality for the modal
    const tabButtons = resumeModal.querySelectorAll('.tab-btn');
    const tabContents = resumeModal.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId + 'Tab');
        if (tabContent) {
          tabContent.classList.add('active');
        }
      });
    });
    
    // Add print button functionality
    const printBtn = document.getElementById('printResumeBtn');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        printResumeDetails(data);
      });
    }
    
    // Store resume ID for export button
    const exportBtn = document.getElementById('exportResumeBtn');
    if (exportBtn) {
      exportBtn.setAttribute('data-id', resumeId);
    }
    
    // Skills summary
    const skillsSummary = document.getElementById('modalSkillsSummary');
    if (skillsSummary) {
      if (data.skills && data.skills.length > 0) {
        skillsSummary.innerHTML = data.skills.map(skill => 
          `<span class="skill-tag">${skill}</span>`
        ).join('');
      } else {
        skillsSummary.innerHTML = '<p>No skills found.</p>';
      }
    }
    
    // Education details
    const eduDetails = document.getElementById('modalEducationDetails');
    if (eduDetails) {
      if (data.education && data.education.length > 0) {
        eduDetails.innerHTML = data.education.map(edu => `
          <div class="detail-card">
            <h5>${edu.degree || 'N/A'}</h5>
            <div class="detail-info">
              <div class="info-label">Institution:</div>
              <div class="info-value">${edu.institution || 'N/A'}</div>
            </div>
            <div class="detail-info">
              <div class="info-label">Year:</div>
              <div class="info-value">${edu.year || 'N/A'}</div>
            </div>
          </div>
        `).join('');
      } else {
        eduDetails.innerHTML = '<p>No education information found.</p>';
      }
    }
    
    // Experience details
    const expDetails = document.getElementById('modalExperienceDetails');
    if (expDetails) {
      if (data.experience && data.experience.length > 0) {
        expDetails.innerHTML = data.experience.map(exp => `
          <div class="detail-card">
            <h5>${exp.title || 'N/A'}</h5>
            <div class="detail-info">
              <div class="info-label">Company:</div>
              <div class="info-value">${exp.company || 'N/A'}</div>
            </div>
            <div class="detail-info">
              <div class="info-label">Duration:</div>
              <div class="info-value">${exp.dates || 'N/A'}</div>
            </div>
            <div class="detail-info">
              <div class="info-label">Responsibilities:</div>
              <div class="info-value">${exp.responsibilities || 'N/A'}</div>
            </div>
          </div>
        `).join('');
      } else {
        expDetails.innerHTML = '<p>No experience information found.</p>';
      }
    }
    
    // Skills details
    const skillsDetails = document.getElementById('modalSkillsDetails');
    if (skillsDetails) {
      if (data.skills && data.skills.length > 0) {
        skillsDetails.innerHTML = data.skills.map(skill => 
          `<span class="skill-tag">${skill}</span>`
        ).join('');
      } else {
        skillsDetails.innerHTML = '<p>No skills found.</p>';
      }
    }
    
    // Certifications
    const certifications = document.getElementById('modalCertifications');
    if (certifications) {
      if (data.certifications && data.certifications.length > 0) {
        certifications.innerHTML = data.certifications.map(cert => 
          `<div class="certification-item">${cert}</div>`
        ).join('');
      } else {
        certifications.innerHTML = '<p>No certifications found.</p>';
      }
    }
    
    // Suggestions
    const suggestions = document.getElementById('modalSuggestions');
    if (suggestions) {
      if (data.suggestions && data.suggestions.length > 0) {
        suggestions.innerHTML = data.suggestions.map(suggestion => 
          `<li>${suggestion}</li>`
        ).join('');
      } else {
        suggestions.innerHTML = '<li>No specific suggestions available.</li>';
      }
    }
  }
  
  // Export resume data as JSON
  function exportResumeData(resumeId) {
    fetch(`/api/resumes/${resumeId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        return response.json();
      })
      .then(data => {
        // Create JSON string
        const jsonStr = JSON.stringify(data, null, 2);
        
        // Create file blob
        const blob = new Blob([jsonStr], { type: 'application/json' });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `resume_${data.name.replace(/\s+/g, '_')}.json`;
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error exporting resume data:', error);
        alert('Failed to export resume data. Please try again.');
      });
  }
  
  // Initialize score fill bars
  function initScoreFills() {
    console.log('Initializing score fills');
    const scoreFills = document.querySelectorAll('.score-fill');
    
    scoreFills.forEach(fill => {
      const scoreContainer = fill.closest('.ats-score');
      if (scoreContainer) {
        const score = scoreContainer.getAttribute('data-score');
        if (score) {
          fill.style.width = score + '%';
          console.log('Set score width to:', score + '%');
        }
      }
    });
  }
  
  // Modal tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to current button
        this.classList.add('active');
        
        // Show corresponding tab content
        const tabId = this.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId + 'Tab');
        if (tabContent) {
          tabContent.classList.add('active');
        }
      });
    });
  }
  
  // Fix modal close behavior
  const closeModalBtn = document.getElementById('closeModalBtn');
  const closeModalBtnFooter = document.getElementById('closeModalBtnFooter');
  
  if (closeModalBtn && resumeModal) {
    closeModalBtn.addEventListener('click', function() {
      resumeModal.classList.remove('active');
    });
    
    // Close when clicking outside
    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
      }
    });
  }
  
  // Add event listener for the footer close button
  if (closeModalBtnFooter && resumeModal) {
    closeModalBtnFooter.addEventListener('click', function() {
      resumeModal.classList.remove('active');
    });
  }
  
  // Mobile-friendly touch events for resume cards
  const resumeCards = document.querySelectorAll('.resume-card');
  resumeCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, {passive: true});
    
    card.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
      setTimeout(() => {
        // Prevent any lingering touch states
        this.classList.remove('touch-active');
      }, 300);
    }, {passive: true});
  });
});