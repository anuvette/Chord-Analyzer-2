var login = document.getElementById("Login");
var reg = document.getElementById("Register");
const encryptionKey = 'RS)I3-|Vx$*D0mM(?Pco&1~t<jdf)@'; //dont forget to put this inside environment variables 

function Register()
{
    login.style.left="-400px";
    reg.style.left="50px";
}

function Login()
{
    login.style.left="50px";
    reg.style.left="450px";
}

document.getElementById("register-btn").addEventListener("click", function() {
    var username = document.getElementById("rusername").value;
    var email = document.getElementById("remail").value;
    var password = document.getElementById("rpassword").value;

    var termsCheckbox = document.getElementById("terms");
    if (!termsCheckbox.checked) {
        document.getElementById("error-register").textContent = "Please agree to the Terms and Conditions.";
        return;
    }

     var data = {
        rusername: username,
        remail: email,
        rpassword: password
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'         //this is just metadata specifying what im tryna send
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("error-register").textContent = data;
        
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("error-register").textContent = data;

    });

});


function loginForm() {
    var username = document.getElementById("lusername").value;
    var password = document.getElementById("lpassword").value;

    var data = {
        lusername: username,
        lpassword: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(data => {
        // Clear any previous error message
        document.getElementById("error-login").textContent = "";

        switch (data) {
            case 'Login Successful!':
                window.location.href = '/home.html';
                break;
            case 'Already logged in!':
                window.location.href = '/Home.html';
                break;
            case 'Account was deleted!':
                document.getElementById("error-login").textContent = "Account was deleted!";
                break;
            case 'Account was banned!':
                document.getElementById("error-login").textContent = "Account was banned!";
                break;
            case 'Username doesn\'t exist':
                document.getElementById("error-login").textContent = "Username doesn't exist!";
                break;
            case 'Wrong Password!':
                document.getElementById("error-login").textContent = "Wrong Password!";
                break;
            case 'Fields cannot be empty':
                document.getElementById("error-login").textContent = "Fields cannot be empty!";
                break;
            default:
                document.getElementById("error-login").textContent = "An error occurred!";
                break;
        }
    })
    .catch(error => {
        document.getElementById("error-login").textContent = "An error occurred!";
    });
}

document.getElementById("Remember-Me").addEventListener("change", function(event){
    if(this.checked)
    {
        username = document.getElementById('lusername').value;
        password = document.getElementById('lpassword').value;

        localStorage.setItem('Username', CryptoJS.AES.encrypt(username, encryptionKey).toString());
        localStorage.setItem('Password', CryptoJS.AES.encrypt(password, encryptionKey).toString());
    }
});

document.getElementById("lpassword").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        loginForm();
    }
});

document.getElementById("login-btn").addEventListener("click", function () {
    loginForm();
});

document.getElementById("lusername").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        document.getElementById("lpassword").focus();
    }
});

document.getElementById("rusername").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        document.getElementById("remail").focus();
    }
});

document.getElementById("remail").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        document.getElementById("rpassword").focus();
    }
});

document.getElementById("remail").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        document.getElementById("rpassword").focus();
    }
});

document.getElementById("rpassword").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        
        document.getElementById("terms").focus();
    }
});

document.getElementById("terms").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        
        var checkbox = document.getElementById("terms");
        if(!checkbox.checked)
        {
        checkbox.checked = !checkbox.checked;
        return;
        }
        
        else if(checkbox.checked) {
            document.getElementById("register-btn").click();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('Username') || localStorage.getItem('Password'))
    {
        username = CryptoJS.AES.decrypt(localStorage.getItem('Username'), encryptionKey).toString(CryptoJS.enc.Utf8);
        password = CryptoJS.AES.decrypt(localStorage.getItem('Password'), encryptionKey).toString(CryptoJS.enc.Utf8);
        document.getElementById('lusername').value = username;
        document.getElementById('lpassword').value = password;
    }
});

