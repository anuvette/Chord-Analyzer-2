document.addEventListener('DOMContentLoaded', function () {

    var updateVar = [];

    fetch('/admin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Failed to retrieve data');
        }
    })
    .then(data => {
        var table = document.querySelector('table');

        data.forEach(function (entry) {
            var row = document.createElement('tr');

            var usernameCell = document.createElement('td');
            usernameCell.setAttribute('data-cell', 'username');
            usernameCell.textContent = entry.username;

            var emailCell = document.createElement('td');
            emailCell.setAttribute('data-cell', 'email');
            emailCell.textContent = entry.email;

            var statusCell = document.createElement('td');
            statusCell.setAttribute('data-cell', 'status');
            statusCell.textContent = entry.isdeleted ? 'deleted' : (entry.isbanned ? 'banned' : 'active');

            if(entry.isdeleted===0)
            {
              statusCell.style.cursor = "pointer"; 

                  if(entry.isbanned===1)
                      {
                        statusCell.style.color="#8B0000";
                        statusCell.style.transition = "color 0.5s"; 
                      }
                  else if(entry.isbanned===0)
                  {
                    statusCell.style.color="#5dd98d";
                    statusCell.style.transition = "color 0.5s"; 
                  }


              statusCell.addEventListener('click', function () {
                            var status = statusCell.textContent; // Update the status variable
                          
                            if (status === "active") {
                              statusCell.textContent = "banned";
                              statusCell.style.color = "#8b0000"; 
                              status="banned";
                            } else if (status === "banned") {
                              statusCell.textContent = "active";
                              statusCell.style.color = "#5dd98d"; 
                              status="active";
                            }

                             var existingIndex = updateVar.findIndex(function (item) {
                                  return item.username === entry.username;
                                });

                                if (existingIndex !== -1) {
                                  // Remove the existing object from updateVar using splice
                                  updateVar.splice(existingIndex, 1);
                                } else {
                                  // If username doesn't exist, push the new object to updateVar
                                  updateVar.push({ email: entry.email, username: entry.username, status: status });
                                }

                            console.log(updateVar);
 
                          });

              
            }

             else
                  {
                    statusCell.style.color = "#828583";
                  }
            

            row.appendChild(usernameCell);
            row.appendChild(emailCell);
            row.appendChild(statusCell);

            table.appendChild(row);
        });


        var saveButton = document.getElementById('save-button');

    saveButton.addEventListener('click', function () {
        fetch('/admindata', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateVar)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to save data');
            }
        })
        .then(data => {
            console.log(data);
            document.getElementById("error-message").textContent="Saved Successfully!";
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("error-message").textContent="Failed To Save!";
            document.getElementById("error-message").style.color="#8B0000";
        });
    });

        var cancelButton = document.getElementById('cancel-button');
              cancelButton.addEventListener('click', function () {
                console.log(data);
                var statusCells = document.querySelectorAll('td[data-cell="status"]');
                 statusCells.forEach(function (tdElement, index) {
                        tdElement.textContent = data[index].isdeleted ? "deleted" : (data[index].isbanned ? "banned" : "active");
                        tdElement.style.color = tdElement.textContent ==="deleted" ?"#828583" : (tdElement.textContent ==="banned"? "#8B0000": "#5DD98D");
                    });
                  // Clear the updateVar array
                  updateVar = [];
                  console.log(updateVar);
              });



    })
    .catch(error => {
        console.error('Error:', error);
    });

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
