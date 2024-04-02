document.addEventListener('DOMContentLoaded', function() {
    // Determine and set the current date for copyright
    setCopyright();

    // Initialize any animations and interactions
    initAnimations();

    // Load background video for the specific page
    loadHomePageBackgroundVideo();
    loadPlantPageHeroVideo();

    // Additional functionalities like fetching observations, menu toggle
    fetchObservations();
    initMenuToggle();
});

function initAnimations() {
    // Example: Initializing animations for elements with '.animated-text'
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.addEventListener('click', function() {
            this.style.animation = 'clickEffect 1s ease forwards';
        });
    }
}

function loadHomePageBackgroundVideo() {
    // Only proceed if the element exists
    if (!document.getElementById("homePageVideo")) return;

    const pexelsApiKey = 'U9V675nRTdoKBdelDX76kUl9uz6OBFsbrPKFOm4k2BTye7uzMMgxjHsd'; // Replace with your Pexels API Key
    const pexelsEndpoint = `https://api.pexels.com/videos/search?per_page=1&page=1&orientation=portrait&query=beautiful+scenery`;

    fetch(pexelsEndpoint, { headers: { Authorization: pexelsApiKey } })
        .then(response => response.json())
        .then(data => {
            if (data.videos.length > 0) {
                const videoUrl = data.videos[0].video_files[0].link;
                document.getElementById("homePageVideo").src = videoUrl;
            }
        })
        .catch(error => console.error('Error fetching video:', error));
}

function loadPlantPageHeroVideo() {
    // Only proceed if the element exists
    if (!document.getElementById("plantPageHeroVideo")) return;

    const pexelsApiKey = 'U9V675nRTdoKBdelDX76kUl9uz6OBFsbrPKFOm4k2BTye7uzMMgxjHsd'; // Replace with your Pexels API Key
    const pexelsEndpoint = `https://api.pexels.com/videos/search?per_page=1&page=11&orientation=landscape&query=wild+background+plants+flowers`;

    fetch(pexelsEndpoint, { headers: { Authorization: pexelsApiKey } })
        .then(response => response.json())
        .then(data => {
            if (data.videos.length > 0) {
                const videoUrl = data.videos[0].video_files[0].link;
                document.getElementById("plantPageHeroVideo").src = videoUrl;
            }
        })
        .catch(error => console.error('Error fetching video:', error));
}

function fetchObservations() {
    // Placeholder for your fetchObservations implementation
    // This can be the same as you've already defined
}

function initMenuToggle() {
    // Menu toggle for mobile navigation
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('fullScreenNav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            nav.classList.toggle('show');
            
            // Animation delay for menu items
            const menuItems = nav.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                if (nav.classList.contains('show')) {
                    item.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    item.style.animation = '';
                }
            });
        });
    }
}

function copyrightText() {
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString('default', { month: 'long' });
    const day = new Date().getDate();
    return `© ${day} ${month} ${year}`;
}

function setCopyright() {
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.innerText = copyrightText();
    }
}
