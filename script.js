
document.addEventListener('DOMContentLoaded', function () {
    // Set copyright text dynamically
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString('default', { month: 'long' });
    const day = new Date().getDate();
    document.getElementById("copyright").innerText = `© ${day} ${month} ${year}`;

    // Initialize animations and interactions
    initAnimations();

    // Load background video
    loadBackgroundVideo();
});

function initAnimations() {
    const animatedText = document.querySelector('.animated-text');
    animatedText.addEventListener('click', function () {
        this.style.animation = 'clickEffect 1s ease forwards';
    });


}

function loadBackgroundVideo() {
    const pexelsApiKey = 'U9V675nRTdoKBdelDX76kUl9uz6OBFsbrPKFOm4k2BTye7uzMMgxjHsd';
    const pexelsEndpoint = `https://api.pexels.com/videos/search?per_page=1&page=1&orientation=landscape&query=beautiful+scenery`;

    fetch(pexelsEndpoint, { headers: { Authorization: pexelsApiKey } })
        .then(response => response.json())
        .then(data => {
            const videoUrl = data.videos[0].video_files[0].link;
            const backgroundVideo = document.getElementById("backgroundVideo");
            backgroundVideo.src = videoUrl;

            // Apply styles or actions after video is loaded
            backgroundVideo.onloadeddata = function () {
                // Example: Change text color to white after video loads
                document.querySelector('.animated-text').style.color = 'white';
            };
        })
        .catch(error => console.error('Error fetching video:', error));
}




document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('fullScreenNav');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('open'); // This toggles the class on the SVG for animation
        nav.classList.toggle('show'); // This toggles the navigation menu's visibility

        // Animation delay for menu items
        const menuItems = nav.querySelectorAll('li');
        if (nav.classList.contains('show')) {
            menuItems.forEach((item, index) => {
                item.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
            });
        } else {
            menuItems.forEach((item) => {
                item.style.animation = '';
            });
        }
    });
});
