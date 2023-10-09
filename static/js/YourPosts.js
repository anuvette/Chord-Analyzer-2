document.addEventListener('DOMContentLoaded', () => {
    fetch('/YourPosts', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        const forumContainer = document.querySelector('body'); // Select the whole document
        var postId = 0;

        forumdata = data.forum_data;
        likedata = data.like_data;
        forumdata.reverse().forEach(entry => {
            postId=entry.post_id;


            const template_container = document.createElement('div');
            template_container.classList.add('template-container');

            const template_post_card = document.createElement('div');
            template_post_card.classList.add('template-post-card');

            const template_pic_body_group = document.createElement('div');
            template_pic_body_group.classList.add('template-pic-body-group');

            const template_profile_picture = document.createElement('div');
            template_profile_picture.classList.add('template-profile-picture');

            const profilepic = document.createElement('img');
            profilepic.src = `/getProfilePic/${entry.Pic_Path}`;

            const template_header_body_group = document.createElement('div');
            template_header_body_group.classList.add('template-header-body-group');

            const Title = document.createElement('a');
            Title.href=`/Post.html/post?id=${postId}`;
            Title.id = "title-anchor";
            Title.textContent = entry.title;


            const PostedBy = document.createElement('p');
            PostedBy.setAttribute('id', 'posted-by');
            PostedBy.textContent='by ' + entry.username;

            
            
            

            const template_post_card_footer = document.createElement('div');
            template_post_card_footer.classList="template-post-card-footer";

            const Likes = document.createElement('button');
            Likes.textContent = `Likes ${entry.likes_total}`;
            const isSessionUserLiked = likedata.some((likeEntry) => {
                // Check if both conditions are met: likes_username matches session_username and post_id matches
                return likeEntry.likes_username === entry.session_username && likeEntry.likes_post_id === postId && likeEntry.likes_status === 'like';
            });

            if(isSessionUserLiked)
            {
                Likes.setAttribute('aria-pressed', 'true');
            }
            else
            {
                Likes.setAttribute('aria-pressed', 'false');
            }
            Likes.setAttribute('aria-label', 'like-button');
            Likes.dataset.postId = postId; 

            const disLikes = document.createElement('button');
            disLikes.textContent = `Dislikes ${entry.dislikes_total}`;
            const isSessionUserDisLiked = likedata.some((likeEntry) => {
                // Check if both conditions are met: likes_username matches session_username and post_id matches
                return likeEntry.likes_username === entry.session_username && likeEntry.likes_post_id === postId && likeEntry.likes_status === 'dislike';
            });

            if(isSessionUserDisLiked)
            {
                disLikes.setAttribute('aria-pressed', 'true');
            }
            else
            {
                disLikes.setAttribute('aria-pressed', 'false');
            }
            
            disLikes.setAttribute('aria-label', 'dislike-button');
            disLikes.dataset.postId = postId; 


            const PublishedDate = document.createElement('div');
            PublishedDate.classList="template-date-published";
            PublishedDate.textContent=FormatDate(entry.date.slice(0, 10));


            template_container.appendChild(template_post_card);
            template_post_card.appendChild(template_pic_body_group);
            template_pic_body_group.appendChild(template_profile_picture);
            template_profile_picture.appendChild(profilepic);
            template_pic_body_group.appendChild(template_header_body_group);
            template_header_body_group.appendChild(Title);
            template_header_body_group.appendChild(PostedBy);
            if (entry.logged_in && entry.username === entry.session_username) {

                const template_trashcan = document.createElement('button');
                template_trashcan.classList="template-trashcan";

                const trashcanImage = document.createElement('img');
                trashcanImage.src = "/getProfilePic/trashcan.png";

                template_trashcan.id = "delete-button";
                template_trashcan.dataset.postId = postId;

                template_trashcan.appendChild(trashcanImage);
                template_pic_body_group.appendChild(template_trashcan);

                template_trashcan.onclick = function() {

                        fetch("/DeletePost", {
                            method: "DELETE",
                            body: template_trashcan.dataset.postId, // Send the postId as plaintext in the request body
                            headers: {
                                "Content-Type": "text/plain", // Set the content type to plain text
                            },
                        })
                        .then(response => {
                                    if (response.ok) {
                                        return response.text(); // Extract the response body as text
                                    } else {
                                        throw new Error("Error deleting Post!");
                                    }
                                })
                        .then(data => {
                                    document.getElementById("error-message").textContent = "Deleted Successfully, Please Reload to see Changes!";

                                })
                        .catch(error => {
                                    console.error("Fetch error:", error);
                                    document.getElementById("error-message").style.color = "#8B0000";
                                    document.getElementById("error-message").textContent = "Error deleting Post!";
                                });
                        };

                
            }

            
            template_post_card.appendChild(template_post_card_footer);
            template_post_card_footer.appendChild(Likes);
            template_post_card_footer.appendChild(disLikes);
            template_post_card_footer.appendChild(PublishedDate);

            template_post_card_footer.addEventListener('click', (event) => {
            const clickedButton = event.target;

            if (clickedButton.tagName === 'BUTTON') {
                const postId = clickedButton.dataset.postId;

                // Get all buttons within the same template_post_card_footer div
                const buttonsInSameGroup = template_post_card_footer.querySelectorAll(`button[data-post-id="${postId}"]`);
               // console.log(buttonsInSameGroup); debug logging. can be ignored

                buttonsInSameGroup.forEach((button) => {
                    if (button !== clickedButton) {

                        button.setAttribute('aria-pressed', 'false');

                    }
                    });

                    clickedButton.setAttribute('aria-pressed', clickedButton.getAttribute('aria-pressed') === 'false' ? 'true' : 'false');
                

                const ariaPressed = clickedButton.getAttribute('aria-pressed');
                const ariaLabel = clickedButton.getAttribute('aria-label');
                const post_Id = clickedButton.dataset.postId;
         

              


                // Preparing a JSON to send like/dislike details to the server
                const buttonDetailsJSON = {
                    'aria-pressed': ariaPressed,
                    'aria-label': ariaLabel,
                    'data-post-id': post_Id,
                };

                //console.log(buttonDetailsJSON);

                         fetch("/LikeDislike", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json", 
                            },
                            body: JSON.stringify(buttonDetailsJSON), 
                            })
                            .then((response) => {
                                if (!response.ok) {
                                throw new Error("Network response was not ok");
                                }
                                return response.json();
                            })
                            .then((data) => {
                                document.querySelector(`[data-post-id="${postId}"][aria-label="like-button"]`).textContent=`Likes ${data.likes_total}`;
                                document.querySelector(`[data-post-id="${postId}"][aria-label="dislike-button"]`).textContent=`Dislikes ${data.dislikes_total}`;
                            
                            })
                            .catch((error) => {
                                console.error("There was a problem with the fetch operation:", error);
                            });
            }
            });


            forumContainer.appendChild(template_container);  //forumContainer refers to the body
            
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


function FormatDate(date) {
    let month = '';

    switch (date[5] + date[6]) {
        case '01':
            month = 'January';
            break;
        case '02':
            month = 'February';
            break;
        case '03':
            month = 'March';
            break;
        case '04':
            month = 'April';
            break;
        case '05':
            month = 'May';
            break;
        case '06':
            month = 'June';
            break;
        case '07':
            month = 'July';
            break;
        case '08':
            month = 'August';
            break;
        case '09':
            month = 'September';
            break;
        case '10':
            month = 'October';
            break;
        case '11':
            month = 'November';
            break;
        case '12':
            month = 'December';
            break;
        default:
            month = 'Unknown';
            break;
    }

    return `${date[8]}${date[9]}th of ${month}, ${date[0]}${date[1]}${date[2]}${date[3]}`;
}



const logoutButton = document.getElementById("logout");

if (logoutButton) {
    logoutButton.addEventListener("click", function(event) {
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
}





