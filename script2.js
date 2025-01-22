const API_URL = 'https://gutendex.com/books';

async function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch(`${API_URL}?search=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            resultsContainer.innerHTML = '';
            data.results.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                const title = book.title || 'No title available';
                const author = book.authors.map(a => a.name).join(', ') || 'Unknown author';
                const downloadLink = book.formats['application/pdf'] || book.formats['text/plain'];

                bookElement.innerHTML = `
                    <h3>${title}</h3>
                    <p>${author}</p>
                    ${downloadLink 
                        ? `<a href="${downloadLink}" target="_blank">Download</a>` 
                        : '<p>No accessible formats available.</p>'}
                `;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No books found.</p>';
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
        console.error(error);
    }
}
// Function to search books (already defined)
async function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Loading...';

    try {
        const response = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            resultsContainer.innerHTML = '';
            data.results.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book';
                const title = book.title || 'No title available';
                const author = book.authors.map(a => a.name).join(', ') || 'Unknown author';
                const downloadLink = book.formats['application/pdf'] || book.formats['text/plain'];

                bookElement.innerHTML = `
                    <h3>${title}</h3>
                    <p>${author}</p>
                    ${downloadLink 
                        ? `<a href="${downloadLink}" target="_blank">Download</a>` 
                        : '<p>No accessible formats available.</p>'}
                `;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No books found.</p>';
        }
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
        console.error(error);
    }
}

// Function to clear search results and refresh the input field
function clearSearch() {
    document.getElementById('searchInput').value = ''; // Clear input field
    document.getElementById('results').innerHTML = ''; // Clear results
}
