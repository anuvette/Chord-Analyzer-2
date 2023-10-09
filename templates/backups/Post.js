document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get('id');
    console.log(postId);
    fetch(`/PostData/?id=${postId}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {

        const PublishingDetails = document.getElementById('PublishingDetails');
        PublishingDetails.textContent = `Posted by ${data.username} on ${data.date.slice(0, 10)}`;

        const Title = document.getElementById('Title');
        Title.textContent = data.title;
        
        const Post = document.getElementById('Post');
        Post.textContent = data.body;


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

document.getElementById("post-comment-button").addEventListener("click", function(event){

    event.preventDefault();

    fetch("/postComment",
    {
        method:"POST",
    })
    .then(response => response.data())
    .then(data =>{

        console.log(data);
    })
    .catch(error =>{
        console.error(error);
    });
});

document.getElementById("clear-comment-button").addEventListener("click",function(event)
{
    let CommentField = document.getElementById("CommentField");
    CommentField.value="";
});