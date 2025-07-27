/*function openWork(file) {
  window.open(file, '_blank');
}*/
// Wait for DOM Content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive elements
    initThemeToggle();
    initProfileDetails();
    initProjectCarousel();
    initProjectFilters();
    initProjectDetails();
    initResumeModal();
    
    // Animate elements when they come into view
    initScrollAnimations();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Set default theme button as active
    document.querySelector('[data-theme="default"]').classList.add('active');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Change theme
            const theme = button.getAttribute('data-theme');
            body.className = '';
            body.classList.add(`theme-${theme}`);
            
            // Save user preference to localStorage
            localStorage.setItem('preferred-theme', theme);
        });
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        // Apply saved theme
        body.className = '';
        body.classList.add(`theme-${savedTheme}`);
        
        // Update active button
        themeButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
    }
}

// Profile Details Popup
function initProfileDetails() {
    const profileImage = document.getElementById('profileImage');
    const profileDetails = document.getElementById('profileDetails');
    const closeDetailsButton = document.querySelector('.close-details');
    
    profileImage.addEventListener('click', () => {
        profileDetails.classList.add('active');
    });
    
    closeDetailsButton.addEventListener('click', () => {
        profileDetails.classList.remove('active');
    });
    
    // Close on click outside
    profileDetails.addEventListener('click', (e) => {
        if (e.target === profileDetails) {
            profileDetails.classList.remove('active');
        }
    });
}

// Project Carousel
function initProjectCarousel() {
    const carousel = document.querySelector('.project-carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const cards = document.querySelectorAll('.project-card');
    
    let currentIndex = 0;
    let cardWidth = 0;
    let cardsPerView = 1;
    
    // Calculate how many cards should be visible based on screen width
    function updateCardsPerView() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth >= 1200) {
            cardsPerView = 3;
        } else if (viewportWidth >= 768) {
            cardsPerView = 2;
        } else {
            cardsPerView = 1;
        }
        
        // Calculate card width including margins
        if (cards.length > 0) {
            const card = cards[0];
            cardWidth = card.offsetWidth + parseInt(window.getComputedStyle(card).marginRight);
        }
    }
    
    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        
        // Disable prev button at beginning
        if (currentIndex === 0) {
            prevButton.disabled = true;
            prevButton.classList.add('disabled');
        } else {
            prevButton.disabled = false;
            prevButton.classList.remove('disabled');
        }
        
        // Disable next button at end
        if (currentIndex >= cards.length - cardsPerView) {
            nextButton.disabled = true;
            nextButton.classList.add('disabled');
        } else {
            nextButton.disabled = false;
            nextButton.classList.remove('disabled');
        }
    }
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Initialize carousel
    updateCardsPerView();
    updateCarousel();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateCardsPerView();
        // Reset position on resize to avoid issues
        currentIndex = 0;
        updateCarousel();
    });
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset carousel after filtering
            const carousel = document.querySelector('.project-carousel');
            carousel.style.transform = 'translateX(0)';
        });
    });
}

// Project Details Modal
function initProjectDetails() {
    const detailButtons = document.querySelectorAll('.view-details-btn');
    const projectDetails = document.querySelectorAll('.project-details');
    const closeButtons = document.querySelectorAll('.project-details .close-details');
    // Add this inside your initProjectDetails() function
const githubBtns = document.querySelectorAll('.github-btn');

githubBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Stop event from propagating to the card
        e.stopPropagation();
        // The href attribute handles the navigation
    });
});
function openWork(path) {
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modal-frame');

  // Set the iframe src
  frame.src = path;

  // Show the modal
  modal.style.display = 'block';
}

// Close modal on close button click
function closeModal() {
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modal-frame');
  modal.style.display = 'none';
  frame.src = ''; // Reset src for performance
}


// Make sure to call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization functions
    initThemeToggle();
    initProfileDetails();
    initProjectCarousel();
    initProjectFilters();
    initProjectDetails();
    initResumeModal();
    initScrollAnimations();
    
    // Add the new PDF viewer initialization
    initPdfViewer();
});
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            projectDetails[index].classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            projectDetails[index].classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
    
    // Close on click outside the content
    projectDetails.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}


// Scroll Animations
function initScrollAnimations() {
    // Animate timeline items when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe blog posts
    document.querySelectorAll('.blog-post').forEach(post => {
        observer.observe(post);
    });
}
