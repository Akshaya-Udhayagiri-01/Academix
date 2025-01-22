const articles = document.querySelector('.articles1');
const rightArrow = document.querySelector('.right-arrow1');
const leftArrow = document.querySelector('.left-arrow1');
const popup = document.querySelector('.popup1');
const popupImage = document.getElementById('popup1-image');
const popupHeading = document.getElementById('popup1-heading');
const popupDescription = document.getElementById('popup1-description');
const popupTeam = document.getElementById('popup1-team');
const popupButton = document.getElementById('popup1-button');
const closeButton = document.querySelector('.close-btn1');
const joinedCards = document.querySelector('.joined-cards1');
const addIdeaBtn = document.getElementById('add-idea-btn');
const ideaInputContainer = document.getElementById('idea-input-container');
const ideaInput = document.getElementById('idea-input');
const submitIdeaBtn = document.getElementById('submit-idea');
const commentsContainer = document.getElementById('comments-container');
const cards = document.querySelectorAll('.card1');

let currentCard = null;
let scrollAmount = 0;
const scrollStep = 320; // Width of a card + gap

// **Navigation Arrow Functionality**
rightArrow.addEventListener('click', () => {
  const maxScroll = articles.scrollWidth - articles.clientWidth;
  scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
  articles.style.transform = `translateX(-${scrollAmount}px)`;
});

leftArrow.addEventListener('click', () => {
  scrollAmount = Math.max(scrollAmount - scrollStep, 0);
  articles.style.transform = `translateX(-${scrollAmount}px)`;
});

// **Open Popup on Card Click**
cards.forEach((card) => {
  card.addEventListener('click', () => {
    const imageSrc = card.querySelector('img').src;
    const heading = card.querySelector('h3').textContent;
    const description = card.getAttribute('data-description');
    const team = card.getAttribute('data-team');

    popupImage.src = imageSrc;
    popupHeading.textContent = heading;
    popupDescription.textContent = description;
    popupTeam.textContent = team;

    popup.style.display = 'block';
    currentCard = card; // Track the clicked card
  });
});

// **Join Button Functionality**
popupButton.addEventListener('click', () => {
  if (currentCard) {
    // Clone the selected card
    const clonedCard = currentCard.cloneNode(true);

    // Add specific styling or attributes to the cloned card for the "Joined Projects" section
    clonedCard.classList.add('card-transfer');

    // Append the cloned card to the "Joined Projects" section
    joinedCards.appendChild(clonedCard);

    // Remove the original card from the articles slider
    currentCard.remove();

    // Adjust slider position if necessary
    const maxScroll = articles.scrollWidth - articles.clientWidth;
    if (scrollAmount > maxScroll) {
      scrollAmount = Math.max(0, maxScroll);
      articles.style.transform = `translateX(-${scrollAmount}px)`;
    }

    // Close the popup
    popup.style.display = 'none';
    currentCard = null;

    // Allow interactions with the newly added card in "Joined Projects"
    clonedCard.addEventListener('click', () => {
      const imageSrc = clonedCard.querySelector('img').src;
      const heading = clonedCard.querySelector('h3').textContent;
      const description = clonedCard.getAttribute('data-description');
      const team = clonedCard.getAttribute('data-team');

      popupImage.src = imageSrc;
      popupHeading.textContent = heading;
      popupDescription.textContent = description;
      popupTeam.textContent = team;

      // Hide the "Join" button for already joined cards
      popupButton.style.display = 'none';
      popup.style.display = 'block';
    });
  }
});

// **Close Popup**
closeButton.addEventListener('click', () => {
  popup.style.display = 'none';
  popupButton.style.display = 'block'; // Reset the Join button visibility
});

// **Toggle Idea Input Container**
addIdeaBtn.addEventListener('click', () => {
  ideaInputContainer.classList.toggle('hidden');
});

// **Submit a New Idea**
submitIdeaBtn.addEventListener('click', () => {
  const ideaText = ideaInput.value.trim();

  if (ideaText !== '') {
    addComment(ideaText); // Add the new comment
    ideaInput.value = ''; // Clear the input field
    ideaInputContainer.classList.add('hidden'); // Hide the input box
  } else {
    alert('Please write something before submitting!');
  }
});

// **Add Comment to Comments Section**
function addComment(text) {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';

  const textDiv = document.createElement('div');
  textDiv.className = 'text';
  textDiv.textContent = text;

  const reactionsDiv = document.createElement('div');
  reactionsDiv.className = 'reactions';

  // Like Button
  const likeBtn = document.createElement('button');
  likeBtn.className = 'reaction-btn';
  likeBtn.textContent = '👍 0';
  likeBtn.setAttribute('data-count', '0');
  likeBtn.addEventListener('click', () => {
    let count = parseInt(likeBtn.getAttribute('data-count'));
    count += 1;
    likeBtn.setAttribute('data-count', count);
    likeBtn.textContent = `👍 ${count}`;
  });

  // Dislike Button
  const dislikeBtn = document.createElement('button');
  dislikeBtn.className = 'reaction-btn';
  dislikeBtn.textContent = '👎 0';
  dislikeBtn.setAttribute('data-count', '0');
  dislikeBtn.addEventListener('click', () => {
    let count = parseInt(dislikeBtn.getAttribute('data-count'));
    count += 1;
    dislikeBtn.setAttribute('data-count', count);
    dislikeBtn.textContent = `👎 ${count}`;
  });

  // Append Buttons
  reactionsDiv.appendChild(likeBtn);
  reactionsDiv.appendChild(dislikeBtn);

  // Append Comment
  commentDiv.appendChild(textDiv);
  commentDiv.appendChild(reactionsDiv);

  commentsContainer.appendChild(commentDiv);
}


const toggleBtn = document.querySelector('.toggle-btn');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Open PDF Functionality
function openPDF(pdfURL) {
  if (pdfURL) {
      window.open(pdfURL, '_blank'); // Opens the PDF in a new tab
  } else {
      alert("PDF not found!"); // Handles cases where no URL is provided
  }
}

// Attach Event Listener to PDF Buttons
document.querySelectorAll('.pdf-button').forEach(button => {
  button.addEventListener('click', () => {
      // Fetch the PDF URL from the button's data attribute or default URL
      const pdfURL = button.getAttribute('data-pdf-url');
      openPDF(pdfURL);
  });
});
popupButton.addEventListener('click', () => {
  if (currentCard) {
      // Clone the selected card
      const clonedCard = currentCard.cloneNode(true);
      clonedCard.classList.add('card-transfer');
      joinedCards.appendChild(clonedCard);
      currentCard.remove();

      // Create a comments section for this joined project
      const commentsSection = document.createElement('div');
      commentsSection.className = 'comments-section';
      commentsSection.innerHTML = `
          <h3>Comments for ${currentCard.querySelector('h3').textContent}</h3>
          <textarea placeholder="Write your comment here..." class="comment-input"></textarea>
          <button class="submit-comment-btn">Submit</button>
          <div class="comments-container"></div>
      `;
      clonedCard.appendChild(commentsSection);

      // Event listener for submitting comments
      const submitCommentBtn = commentsSection.querySelector('.submit-comment-btn');
      submitCommentBtn.addEventListener('click', () => {
          const commentInput = commentsSection.querySelector('.comment-input');
          const commentText = commentInput.value.trim();
          if (commentText) {
              const newComment = document.createElement('div');
              newComment.className = 'comment';
              newComment.textContent = commentText;
              commentsSection.querySelector('.comments-container').appendChild(newComment);
              commentInput.value = ''; // Clear input field
          } else {
              alert('Please enter a comment before submitting.');
          }
      });

      popup.style.display = 'none';
      currentCard = null;
  }
});
// JavaScript code for handling the 'Request Mentor' button click event with a styled popup

document.addEventListener('DOMContentLoaded', () => {
  // Select all 'Request Mentor' buttons
  const requestButtons = document.querySelectorAll('.btn.primary');

  // Create a modal for the popup
  const modal = document.createElement('div');
  modal.id = 'mentorModal';
  modal.className = 'modal';
  modal.innerHTML = `
      <div class="modal-content">
          <p>Request sent successfully!</p>
      </div>`;
  document.body.appendChild(modal);

  requestButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          // Show the modal
          modal.style.display = 'block';
          modal.classList.add('show');

          // Make the button disappear after clicking
          event.target.style.display = 'none';

          // Automatically close the modal after 2 seconds
          setTimeout(() => {
              modal.classList.remove('show');
              modal.classList.add('fade-out');
              setTimeout(() => {
                  modal.style.display = 'none';
                  modal.classList.remove('fade-out');
              }, 500); // Wait for fade-out effect to complete
          }, 2000);
      });
  });
});

// CSS to make the popup look good
const style = document.createElement('style');
style.textContent = `
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: #333;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #555;
  width: 300px;
  border-radius: 10px;
  text-align: center;
  color: #000000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slide-in 0.4s ease;
}

@keyframes slide-in {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.show {
  animation: fade-in 0.4s ease;
}

.fade-out {
  animation: fade-out 0.5s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}`;

document.head.appendChild(style);
// Function to enable editing the bio
function editBio() {
  const bioElement = document.getElementById("bio");
  const currentBio = bioElement.innerText;

  // Replace bio with an editable textarea
  bioElement.innerHTML = `
      <textarea id="bio-input" rows="3" style="width: 100%;">${currentBio}</textarea>
      <button id="save-button" onclick="saveBio()">Save</button>
      <button id="cancel-button" onclick="cancelEdit()">Cancel</button>
  `;

  // Hide the Edit button
  document.getElementById("edit-button").style.display = "none";
}

// Function to save the new bio
function saveBio() {
  const bioInput = document.getElementById("bio-input").value;

  // Update the bio and restore UI
  const bioElement = document.getElementById("bio");
  bioElement.innerText = bioInput;

  // Show the Edit button again
  document.getElementById("edit-button").style.display = "inline-block";

  // Save bio to localStorage
  localStorage.setItem("userBio", bioInput);
}

// Function to cancel editing the bio
function cancelEdit() {
  const savedBio = localStorage.getItem("userBio") || "This is the default bio.";
  document.getElementById("bio").innerText = savedBio;

  // Show the Edit button
  document.getElementById("edit-button").style.display = "inline-block";
}

// Load saved bio from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedBio = localStorage.getItem("userBio") || "This is the default bio.";
  document.getElementById("bio").innerText = savedBio;
});
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

