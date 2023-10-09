let ConfirmUserName = false;
let ConfirmPassword = false;
let ConfirmDelete = false;



document.getElementById("change-username-button").addEventListener("click", function(event) {
    cancelUsernameButton=document.getElementById('cancel-username-button');
     if (document.getElementById('new-username').value === "") {
            const errorMessage = document.getElementById('error-message'); 
            errorMessage.textContent = "Username cannot be empty!";
            return; 
        }
    cancelUsernameButton.style.display="block";

    if (ConfirmUserName) {
        fetch("/ChangeUsername", {
            method: "PUT",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: document.getElementById('new-username').value,
        })
        .then(response => {
            const errorMessageElement = document.getElementById('error-message');
            
            if (response.ok) {
                errorMessageElement.style.color="#00BC98";
                errorMessageElement.textContent = 'Username Changed Successfully!';
                document.getElementById('Username').textContent = document.getElementById('new-username').value;
            }
            else if(response.status === 409){

                errorMessageElement.textContent = 'Username Taken!';

            }
            else {
                errorMessageElement.textContent = 'Failed to Change Username!';
            }
        })
        .catch(error => {
            console.error("Change password error:", error);
        });

        this.textContent= 'Change';
        cancelUsernameButton.style.display="none";
        document.getElementById('new-username').disabled = false;


    } else {
        this.textContent = 'Confirm';
        document.getElementById('new-username').disabled = true;
    }


    ConfirmUserName = !ConfirmUserName;

});

document.getElementById("change-password-button").addEventListener("click", function(event) {
    cancelPasswordButton=document.getElementById('cancel-password-button');
    if (document.getElementById('new-password').value === "") {
            const errorMessage = document.getElementById('error-message'); 
            errorMessage.textContent = "Password cannot be empty!";
            return; 
        }
    cancelPasswordButton.style.display="block";
    if (ConfirmPassword) {
        fetch("/ChangePassword", {
            method: "PUT",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: document.getElementById('new-password').value,
        })
        .then(response => {
            const errorMessageElement = document.getElementById('error-message');
            
            if (response.ok) {
                errorMessageElement.style.color="#00BC98";
                errorMessageElement.textContent = 'Password Changed Successfully!';
            } else {
                errorMessageElement.textContent = 'Failed to Change Password!';
            }
        })
        .catch(error => {
            console.error("Change password error:", error);
        });

        this.textContent= 'Change';
        cancelPasswordButton.style.display="none";
        document.getElementById('new-password').disabled = false;


    } else {
        this.textContent = 'Confirm';
        document.getElementById('new-password').disabled = true;
    }


    ConfirmPassword = !ConfirmPassword;
    

});

document.getElementById("delete-account-button").addEventListener("click", function(event) {
    const cancelDeleteAccountButton = document.getElementById('cancel-delete-account-button');

     if (ConfirmDelete) {
        fetch("/delete", {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                console.log("Account Deleted Successfully!");
                window.location.href = "/Home.html";
            } else {

                const errorMessageElement = document.getElementById('error-message');
                errorMessageElement.textContent = 'Failed to Delete Account!';
            }
        })
        .catch(error => {
            console.error("Delete Account error:", error);
        });

        this.textContent = 'Delete Account';
        cancelDeleteAccountButton.style.display = "none";
    } else {
        this.textContent = 'Confirm';
        cancelDeleteAccountButton.style.display = "block";
    }


    ConfirmDelete = !ConfirmDelete;
    

});

document.getElementById("profile-picture-upload").addEventListener("change", function () {
    const selectedFile = this.files[0]; // Get the selected file
    console.log(selectedFile);
    const changeProfilePictureButton = document.getElementById('change-profile-picture-button');
    const cancelProfilePictureButton = document.getElementById('cancel-profile-picture-button');

    if (selectedFile) {
        changeProfilePictureButton.style.display="block";
        cancelProfilePictureButton.style.display="block";
        return;
    }  
});

document.getElementById("cancel-username-button").addEventListener("click", function(event){
    this.style.display="none";
    document.getElementById("change-username-button").textContent="Change";
    ConfirmUserName=!ConfirmUserName;

});

document.getElementById("cancel-password-button").addEventListener("click", function(event){
    this.style.display="none";
    document.getElementById("change-password-button").textContent="Change";
    ConfirmPassword=!ConfirmPassword;
});

document.getElementById("cancel-profile-picture-button").addEventListener("click", function(event){
    this.style.display="none";
    document.getElementById("change-profile-picture-button").style.display="none";
    let stuff =document.getElementById('profile-picture-upload').files[0];
    stuff='';
});

document.getElementById('cancel-delete-account-button').addEventListener("click", function(event){
    this.style.display="none";
    document.getElementById("change-profile-picture-button").style.display="none";
    document.getElementById('delete-account-button').textContent= 'Delete Account';
    ConfirmDelete=!ConfirmDelete;
});




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




document.getElementById('change-profile-picture-button').addEventListener("click", function(){

    const selectedFile = document.getElementById("profile-picture-upload").files[0]; 
    const errorMessageDiv = document.getElementById("error-message"); 
    document.getElementById("change-profile-picture-button").style.display="none";
    document.getElementById("cancel-profile-picture-button").style.display="none";

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

        fetch("/ProfilePicture", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {

                errorMessageDiv.style.color = "#00BC98";
                errorMessageDiv.textContent = "Profile picture Uploaded Successfully!"; 
                console.log("Profile picture uploaded successfully.");

            } else {
                
                errorMessageDiv.textContent = "Profile picture Failed to Upload!";
                console.error("Profile picture upload failed.");
            }
        })
        .catch(error => {
            errorMessage.textContent = "An error occurred.";
            errorMessage.style.color = "red"; 
            console.error("Error:", error);
        });
    

});


