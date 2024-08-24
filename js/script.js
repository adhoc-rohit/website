document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }
        
        fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.text())
        .then(data => {
            alert('Thank you for reaching out! Your message has been sent.');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });
});    

//Fetch and display api news articles
    const apiKey = '85dbdb84c1e04251ba2d906508249c88';
    const newsContainer = document.getElementById('newsContainer');
    
    fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                data.articles.forEach(article => {
                    // Use the provided image or fallback to a placeholder
                    const imageUrl = article.urlToImage || 'images/default.jpg';
                    
                    // Create a news item container
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    
                    // Add image
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = article.title;
                    newsItem.appendChild(img);
                    
                    // Add headline
                    const headline = document.createElement('h3');
                    headline.textContent = article.title;
                    newsItem.appendChild(headline);
                    
                    // Add "Read More" button
                    const readMoreButton = document.createElement('a');
                    readMoreButton.href = article.url;
                    readMoreButton.textContent = 'Read More';
                    readMoreButton.classList.add('read-more-btn');
                    newsItem.appendChild(readMoreButton);
                    
                    // Append the news item to the container
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error fetching news. Please check your network and try again later.</p>';
        });
