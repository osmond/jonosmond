<script>
document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'zlGqAV49zcWJtqpvlgomajXHXDLov2PO';
    const section = 'home';
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;
    
    let allStories = [];
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            allStories = data.results; // Store all stories
            loadMoreStories(); // Load the stories
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function loadMoreStories() {
        const storiesContainer = document.getElementById('stories');
        
        allStories.forEach(story => {
            const div = document.createElement('div');
            div.classList.add('story');
            
            const title = document.createElement('h2');
            title.classList.add('story-title');
            title.textContent = story.title.replace(/Trump/g, '🤡');
            
            const abstract = document.createElement('p');
            abstract.classList.add('story-abstract');
            abstract.textContent = story.abstract.replace(/Trump/g, '🤡');
            
            div.appendChild(title);
            div.appendChild(abstract);
            
            if (story.multimedia && story.multimedia.length > 0) {
                const img = document.createElement('img');
                img.src = story.multimedia[0].url;
                img.alt = story.multimedia[0].caption || 'NYT Story Image';
                div.insertBefore(img, div.firstChild);
            }
            
            if (story.url) {
                const link = document.createElement('a');
                link.href = story.url;
                link.textContent = 'Read more';
                link.target = '_blank';
                div.appendChild(link);
            }
            
            // Check if the title or abstract contains 'Trump'
            if (story.title.includes('Trump') || story.abstract.includes('Trump')) {
                // Create an overlay
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                overlay.textContent = 'Click to reveal story';
                
                // Style the overlay (basic styling)
                overlay.style.position = 'absolute';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
                overlay.style.color = 'white';
                overlay.style.display = 'flex';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.cursor = 'pointer';
                
                // Wrap content in a relative container to position the overlay correctly
                const relativeContainer = document.createElement('div');
                relativeContainer.style.position = 'relative';
                relativeContainer.appendChild(div);
                relativeContainer.appendChild(overlay);
                
                // Add click event to remove the overlay
                overlay.addEventListener('click', function() {
                    this.remove(); // Remove overlay when clicked
                });
                
                storiesContainer.appendChild(relativeContainer);
            } else {
                storiesContainer.appendChild(div);
            }
        });
    }
});
</script>
