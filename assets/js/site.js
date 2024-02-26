document.addEventListener('DOMContentLoaded', function() {
    loadPage('/pages/home.html', 'Home'); // Load /pages/home.html as landing page
});

function loadPage(pageUrl, pageTitle) {
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;

            // Update the title of the page
            document.title = `Hackback | ${pageTitle}`;

            // Remove the "active" class from the current active element
            const currentActive = document.querySelector('.blur-bg.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // Add a slight delay to ensure the transition effect works
            setTimeout(() => {
                // Add the "active" class to the new target element
                const newTarget = document.getElementById('blur-bg-target');
                if (newTarget) {
                    newTarget.classList.add('active');
                }
            }, 100); // Adjust delay as needed

            // Initialize Swiper after the content is loaded
            initSwiper();

            // Initialize Prism.js after the content is loaded
            initPrism();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to initialize Swiper
function initSwiper() {
    const mySwiper = new Swiper(".swiper", {
        slidesPerView: 1, // Show only one slide at a time
        grabCursor: true, // Makes the slider draggable
        centeredSlides: true, // Centers the active slide
        loop: true,
        spaceBetween: 16,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
        nextEl: '.swiper-button-next', // Selector for the next button
        prevEl: '.swiper-button-prev', // Selector for the previous button
    },
    });
}

// Function to initialize Prism.js
function initPrism() {
    Prism.highlightAll();
}