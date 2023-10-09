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