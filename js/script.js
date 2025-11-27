// Simulate loading process
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen for 2 seconds, then show main content
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    }, 2000);
    const comics = [
        {
            id: 1,
            title: 'Space Adventures',
            author: 'Alex Johnson',
            image: 'https://placehold.co/400x600/3b82f6/ffffff?text=Space+Adventures',
            category: 'featured'
        },
        {
            id: 2,
            title: 'Mystery Island',
            author: 'Sarah Williams',
            image: 'https://placehold.co/400x600/ef4444/ffffff?text=Mystery+Island',
            category: 'featured'
        },
        {
            id: 3,
            title: 'Cyber Punk',
            author: 'Mike Chen',
            image: 'https://placehold.co/400x600/10b981/ffffff?text=Cyber+Punk',
            category: 'featured'
        },
        {
            id: 4,
            title: 'Fantasy Realms',
            author: 'Emily Rodriguez',
            image: 'https://placehold.co/400x600/f59e0b/ffffff?text=Fantasy+Realms',
            category: 'featured'
        },
        {
            id: 5,
            title: 'Neon Dreams',
            author: 'Jordan Lee',
            image: 'https://placehold.co/400x600/8b5cf6/ffffff?text=Neon+Dreams',
            category: 'new'
        },
        {
            id: 6,
            title: 'Shadow Warriors',
            author: 'Carlos Mendez',
            image: 'https://placehold.co/400x600/ec4899/ffffff?text=Shadow+Warriors',
            category: 'new'
        },
        {
            id: 7,
            title: 'Ocean Depths',
            author: 'Maria Santos',
            image: 'https://placehold.co/400x600/06b6d4/ffffff?text=Ocean+Depths',
            category: 'new'
        },
        {
            id: 8,
            title: 'Time Travelers',
            author: 'David Kim',
            image: 'https://placehold.co/400x600/d946ef/ffffff?text=Time+Travelers',
            category: 'new'
        }
    ];
    
    // Search function
    function performSearch(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filteredComics = comics.filter(comic => 
            comic.title.toLowerCase().includes(query.toLowerCase()) ||
            comic.author.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(filteredComics);
    }
    
    // Display search results
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No comics found. Try different keywords.';
            searchResults.appendChild(noResults);
        } else {
            results.forEach(comic => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${comic.image}" alt="${comic.title}" class="search-result-image">
                    <div class="search-result-info">
                        <h4>${comic.title}</h4>
                        <p>by ${comic.author}</p>
                    </div>
                `;
                
                resultItem.addEventListener('click', function() {
                    alert(`Opening: ${comic.title}`);
                    searchResults.style.display = 'none';
                    searchInput.value = '';
                });
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.style.display = 'block';
    }
    
    // Event listeners for search
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
    
    // Prevent search results from closing when clicking inside them
    searchResults.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Add interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to comic cards
    const comicCards = document.querySelectorAll('.comic-card');
    comicCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.comic-title').textContent;
            alert(`Opening: ${title}`);
            // Here you would typically navigate to the comic detail page
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Auth button functionality
    const signInBtn = document.querySelector('.btn-outline');
    const signUpBtn = document.querySelector('.btn-primary');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            alert('Sign In functionality would go here');
        });
    }
    
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function() {
            alert('Sign Up functionality would go here');
        });
    }
});