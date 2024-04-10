
document.addEventListener("DOMContentLoaded", function () {
    // Set copyright text dynamically
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString("default", { month: "long" });
    const day = new Date().getDate();
    document.getElementById("copyright").innerText = `© ${day} ${month} ${year}`;
  
    // Initialize animations and interactions
    initAnimations();
  
    // Load background video
    loadBackgroundVideo();
  
    // Menu toggle functionality
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("fullScreenNav");
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("open");
      nav.classList.toggle("show");
      const menuItems = nav.querySelectorAll("li");
      menuItems.forEach((item, index) => {
        item.style.animation = nav.classList.contains("show") ? `slideIn 0.5s ease forwards ${index * 0.1}s` : "";
      });
    });
  
    // Set background gradient based on time of day
    setBackgroundGradient();
  
    // Fetch initial set of observations
    fetchObservations();
  
    // Load More button functionality
    document.getElementById('loadMore').addEventListener('click', fetchObservations);
  });
  
  function initAnimations() {
    const animatedText = document.querySelector(".animated-text");
    animatedText.addEventListener("click", function () {
      this.style.animation = "clickEffect 1s ease forwards";
    });
  }
  
  function loadBackgroundVideo() {
    const pexelsApiKey = "U9V675nRTdoKBdelDX76kUl9uz6OBFsbrPKFOm4k2BTye7uzMMgxjHsd";
    const pexelsEndpoint = "https://api.pexels.com/videos/search?per_page=1&page=1&orientation=landscape&query=beautiful+scenery";
    fetch(pexelsEndpoint, { headers: { Authorization: pexelsApiKey } })
      .then(response => response.json())
      .then(data => {
        const videoUrl = data.videos[0].video_files[0].link;
        document.getElementById("backgroundVideo").src = videoUrl;
        document.getElementById("backgroundVideo").onloadeddata = function () {
          document.querySelector(".animated-text").style.color = "white";
        };
      })
      .catch(error => console.error("Error fetching video:", error));
  }
  
  function setBackgroundGradient() {
    const hour = new Date().getHours();
    const bodyStyle = document.body.style;
    if (hour >= 5 && hour < 10) bodyStyle.background = 'var(--gradient-morning)';
    else if (hour >= 10 && hour < 17) bodyStyle.background = 'var(--gradient-day)';
    else if (hour >= 17 && hour < 20) bodyStyle.background = 'var(--gradient-evening)';
    else bodyStyle.background = 'var(--gradient-night)';
    bodyStyle.backgroundRepeat = 'no-repeat';
    bodyStyle.backgroundAttachment = 'fixed';
    bodyStyle.backgroundSize = 'cover';
  }
  
  let page = 1; // Initialize page counter for pagination
  
  function fetchObservations() {
    const apiUrl = "https://api.inaturalist.org/v1/observations?has%5B%5D=photos&quality_grade=research&identifications=any&captive=false&iconic_taxa%5B%5D=Mammalia&place_id=124854&verifiable=true&popular=true&spam=false" + page + "&per_page=20";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        populateGallery(data.results);
        page++;
      })
      .catch(error => console.error('Error fetching data: ', error));
  }
  
  function populateGallery(observations) {
    const gallery = document.getElementById('gallery');
    observations.forEach(observation => {
      const observationElement = document.createElement('div');
      observationElement.className = 'observation';
      observationElement.style.opacity = '0';
  
      const linkElement = document.createElement('a');
      linkElement.href = `https://www.inaturalist.org/observations/${observation.id}`;
      linkElement.target = "_blank";
  
      const imageElement = document.createElement('img');
      imageElement.src = observation.photos[0].url.replace('square', 'medium');
      imageElement.alt = observation.species_guess ? toTitleCase(observation.species_guess) : 'Observation image';
      linkElement.appendChild(imageElement);
      observationElement.appendChild(linkElement);
  
      const commonNameElement = document.createElement('h3');
      commonNameElement.textContent = observation.species_guess ? toTitleCase(observation.species_guess) : 'Unknown';
      observationElement.appendChild(commonNameElement);
  
      const scientificNameElement = document.createElement('p');
      scientificNameElement.textContent = observation.taxon ? observation.taxon.name : 'Species';
      scientificNameElement.classList.add('scientific-name');
      observationElement.appendChild(scientificNameElement);
  
      const dateObservedElement = document.createElement('p');
      const observedDate = observation.observed_on_details.date ? new Date(observation.observed_on_details.date).toLocaleDateString() : 'Unknown Date';
      dateObservedElement.textContent = `Date Observed: ${observedDate}`;
      dateObservedElement.classList.add('details');
      observationElement.appendChild(dateObservedElement);
  
      const placeElement = document.createElement('p');
      placeElement.textContent = `Location: ${observation.place_guess || 'Unknown Location'}`;
      placeElement.classList.add('details');
      observationElement.appendChild(placeElement);
  
      gallery.appendChild(observationElement);
      setTimeout(() => observationElement.style.opacity = '1', 100);
    });
  }
  
  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
  
  