document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get('id');
    // console.log(postId);
    fetch(`/PostData/?id=${postId}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {

        const PublishingDetails = document.getElementById('PublishingDetails');
        PublishingDetails.textContent = `Posted by ${data.post.username} on ${data.post.date.slice(0, 10)}`;

        const Title = document.getElementById('Title');
        Title.textContent = data.post.title;

        const Post = document.getElementById('Post');
        Post.textContent = data.post.body;


        const commentData = data.comments;
        const currentUser = data.current_user;

        commentData.forEach((comment) => {
        createCommentElement(comment,currentUser);
        });

        document.querySelectorAll('.show-replies').forEach((button) => {   //THIS IS FOR TOGGLE VISIBILITY OF THE REPLIES
        button.addEventListener('click', () => {

        const buttonPressedDiv = button.closest('.comment__container'); 
        const commentId = buttonPressedDiv.dataset.commentId; // Get the comment ID of the button-pressed div
        
        // Target the divs based on the data-parent-id attribute
        const targetDivs = document.querySelectorAll(`[data-parent-id="${commentId}"]`);


        if (targetDivs.length > 0) {
        targetDivs.forEach((div) => {
            div.style.display = div.style.display === 'none' ? 'block' : 'none';
            button.style.color = div.style.display === 'block' ? 'rgb(93, 217, 141)' : 'rgb(139, 0, 0)';
            button.textContent = div.style.display === 'block' ? 'Show' : 'Hide';
        });
        } 

        
      });
    });

    const replyButtons = document.querySelectorAll('.reply-button');    //THIS IS FOR ADDING REPLY BOX
    replyButtons.forEach(replyButton => {
        replyButton.addEventListener('click', () => {
            const commentContainer = replyButton.closest('.comment__container');

            const commentPostContainer = commentContainer.querySelector('.comment-post-container-template');

            commentPostContainer.style.display = commentPostContainer.style.display === 'block' ? 'none' : 'block';
        });
    });

    
        const clearButtons = document.querySelectorAll('.clear-comment-button');

    clearButtons.forEach(clearButton => {
        clearButton.addEventListener('click', () => {
            const commentContainer = clearButton.closest('.header-body-group-post');
            const commentField = commentContainer.querySelector('.CommentField-area');

            commentField.value = ''; // Clear the textarea content
        });
    });

    const postButtons = document.querySelectorAll('.post-comment-button');
    postButtons.forEach(postButton => {
      postButton.addEventListener('click', ()=> {
        const commentContainer = postButton.closest('.header-body-group-post');
        const commentField = commentContainer.querySelector('.CommentField-area').value; // Get the comment body

      if (commentField === '') {
        document.getElementById('error-message').textContent="Comment can't be empty!";
        return; 
      }

        const commentCardTemplate = commentContainer.closest('.comment__container');
        const parentId = commentCardTemplate !== null ? commentCardTemplate.dataset.parentId : null;
        const commentId = commentCardTemplate !== null ? commentCardTemplate.dataset.commentId : null;

        const comment = {
          username: currentUser,
          body: commentField, 
          date: new Date().toLocaleString(),
          parentid: commentId,
        };

        console.log(comment);

        fetch(`/postComment?postId=${postId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(comment),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
                console.log('POST request successful:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });

        if(postButton.closest('.comment-post-container-template'))
        {
        postButton.closest('.comment-post-container-template').style.display='none';
        }
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
           const closestCommentContainer = deleteButton.closest('.comment__container');

          // Extract the dataset values
          if (closestCommentContainer) {
              const parentId = closestCommentContainer.dataset.parentId;
              const commentId = closestCommentContainer.dataset.commentId;

               const deleteData = {
                commentId: commentId,
                parentId: parentId
            };

            fetch('/deleteComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deleteData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Delete request successful:', data);
                
                closestCommentContainer.remove();
            })
            .catch(error => {
                console.error('Error:', error);
            });

           
              closestCommentContainer.remove();
          } else {
              console.log('No closest .comment__container found');
          }
        });
    });

    })
    .catch(error => {
        console.error('Error:', error);
    });
});




document.getElementById("logout").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    fetch("/logout", {
        method: "GET",
    })
    .then(response => {
        if (response.status === 200) {
            window.location.href = "/home.html";
        }
    })
    .catch(error => {
        console.error("Logout error:", error);
    });
});





function createCommentElement(comment, currentUser) {
    
    const TemplateCommentCard = document.getElementById('comment-card-template'); //shuru ma comment banayo
    const clonedCommentCard = TemplateCommentCard.cloneNode(true);
    clonedCommentCard.id = `comment-id-${comment.commentid}`;
    clonedCommentCard.dataset.parentId = comment.parentid; 
    clonedCommentCard.dataset.commentId = comment.commentid; 
    clonedCommentCard.querySelector('.date-and-time').textContent = comment.date;  

    const deleteButton = clonedCommentCard.querySelector('.delete-button');
    if (comment.username === currentUser) {
        deleteButton.style.display = 'block';
    } 

const profileImg = clonedCommentCard.querySelector('.profile-picture img'); //adding profile picture
const imgSrc = `/getProfilePic/${comment.username}.png`;

fetch(imgSrc)
  .then((response) => {
    if (response.ok) {
      profileImg.src = imgSrc;
    }
  })
  .catch((error) => {
    console.error('Error checking image file:', error);
  });


  // Set values for h3 and p elements in the cloned comment card
  const h3 = clonedCommentCard.querySelector('h3');
  const p = clonedCommentCard.querySelector('p');
  h3.textContent = comment.username;
  p.textContent = comment.body;


  // Create a container div if parentid is null
  if (comment.parentid === null) {
    const MainContainer1 = document.createElement('div');
    MainContainer1.className = 'container';
    MainContainer1.appendChild(clonedCommentCard);
    document.querySelector('main').appendChild(MainContainer1);
  } else {
    document.getElementById(`comment-id-${comment.parentid}`).appendChild(clonedCommentCard);
  }

}
