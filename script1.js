// Add Comment and Reactions
const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

// Function to add like/dislike behavior to a comment
function addReactionListeners(comment) {
    const likeBtn = comment.querySelector('.like-btn');
    const dislikeBtn = comment.querySelector('.dislike-btn');
    const likeCount = comment.querySelector('.like-count');
    const dislikeCount = comment.querySelector('.dislike-count');

    likeBtn.addEventListener('click', () => {
        if (!likeBtn.classList.contains('active')) {
            dislikeBtn.classList.remove('active');
            dislikeCount.textContent = parseInt(dislikeCount.textContent) - (dislikeBtn.getAttribute('data-reacted') === 'true' ? 1 : 0);
            dislikeBtn.setAttribute('data-reacted', 'false');

            likeBtn.classList.add('active');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            likeBtn.setAttribute('data-reacted', 'true');
        } else {
            likeBtn.classList.remove('active');
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            likeBtn.setAttribute('data-reacted', 'false');
        }
    });

    dislikeBtn.addEventListener('click', () => {
        if (!dislikeBtn.classList.contains('active')) {
            likeBtn.classList.remove('active');
            likeCount.textContent = parseInt(likeCount.textContent) - (likeBtn.getAttribute('data-reacted') === 'true' ? 1 : 0);
            likeBtn.setAttribute('data-reacted', 'false');

            dislikeBtn.classList.add('active');
            dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
            dislikeBtn.setAttribute('data-reacted', 'true');
        } else {
            dislikeBtn.classList.remove('active');
            dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
            dislikeBtn.setAttribute('data-reacted', 'false');
        }
    });
}

// Add predefined reactions
document.querySelectorAll('.comment').forEach(addReactionListeners);

// Add new comments
addCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText === '') return;

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `
        <div class="comment-text">${commentText}</div>
        <div class="reactions">
            <button class="reaction-btn like-btn" data-reacted="false">👍 <span class="like-count">0</span></button>
            <button class="reaction-btn dislike-btn" data-reacted="false">👎 <span class="dislike-count">0</span></button>
        </div>
    `;

    addReactionListeners(comment);
    commentsList.appendChild(comment);
    commentInput.value = '';
});
