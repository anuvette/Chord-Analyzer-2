const TitleField = document.getElementById('TitleField');
const PostField = document.getElementById('PostField');
const deleteButton = document.getElementById('delete-button');
const submitButton = document.getElementById('post-button');
const PostStatus = document.querySelector('.Post-Status');

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the values of the input fields
    const titleValue = TitleField.value;
    const postValue = PostField.value;

    if (titleValue.trim() === '') {
        PostStatus.innerHTML = "Title is required!";
        return; // Stop further execution
    }

    // Get the current date in the format "YYYY-MM-DD"
    let currentDate = new Date();
    console.log(currentDate);
    currentDate=currentDate.toISOString().split('T')[0];
    
    console.log(titleValue);
    console.log(postValue);
    console.log(currentDate);

    const formData = {
        title: titleValue,
        post: postValue,
        date: currentDate
    };

    fetch('/postThread', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)                 //turning formData into JSON
    })
    .then(response => response.text())                 //thhis is responsible for receiving the server response in the form of json
    .then(data => {
        console.log(data);
        PostStatus.innerHTML = "Forum Posted Successfully!";
        window.location.href="/Forum.html";
    })
    .catch(error => {
        console.error('Error:', error);
        PostStatus.innerHTML = "Forum Failed to Post. Try Again!";

    });

});
// this is just for clearing the fields
deleteButton.addEventListener('click', (event) => {
    event.preventDefault(); 

    TitleField.value = null;
    PostField.value = null;
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