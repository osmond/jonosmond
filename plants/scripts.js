// Ensure this is the correct and most recent Trefle API key and endpoint
const API_KEY = 'lA4HbEaBUtZGsHyjIFFy7Hvw6qHTkaZru69rEeWWGAI';

async function searchPlants() {
    const query = document.getElementById('searchBox').value;
    // Update to use your proxy endpoint
    const response = await fetch(`http://localhost:3001/search?q=${query}`);
    const data = await response.json();

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.data && data.data.length > 0) {
        data.data.forEach(plant => {
            const div = document.createElement('div');
            div.innerHTML = `Name: ${plant.common_name || 'N/A'} | Family: ${plant.family_common_name || 'N/A'}<br>
                             Scientific Name: ${plant.scientific_name}<br>
                             <img src="${plant.image_url}" alt="Plant Image" style="max-width: 100px; max-height: 100px;"><br>`;
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.innerHTML = 'No plants found.';
    }
}

// Ensure your script.js is properly linked in your index.html and loaded correctly
