function displayLoginForm() {
    $('.js-login').empty();
    $('.js-login').append(createLogin());
    document.querySelector('#loginForm').addEventListener('submit', onLogInSubmit);
}

function onLogInSubmit(e) {
    var url = "http://localhost:3000/"
    var apiEndpoint= "api/v1/users/sign_in"
    e.preventDefault();

    credentials = {
        "email": e.currentTarget[0].value,
        "password": e.currentTarget[1].value
    }

    $.ajax({
        type: "POST",
        url: url + apiEndpoint,
        data: credentials,
        dataType: "JSON",
        error: function(response) {
            badLogin(response);
            console.log(response);
        },
        success: function(response) {
            successfulLogin(response);
            console.log(response);
        }
    });
}

function successfulLogin(response) {
    $('.js-login').html("<div id='loginSuccess'><p>Logged in as " + response.name + "!</p></div>");
    storeTokenLocally(response.token);
    $('#loginSuccess').hide(2000, displayBookmarkForm);
}

function badLogin(response) {
    $('.js-login').html("<p>Bad login credentials, I think...</p>");
}

function storeTokenLocally(token) {
    localStorage["user_auth_token"] = token;
}

function createLogin() {
    var form = document.createElement("form");
    form.setAttribute('id',"loginForm");
    form.setAttribute('method',"post");

    ////////////////////////////////////////////////////////////////////////////

    var emailDiv = document.createElement("div");
    var emailLabel = document.createElement("label"); //label element, email
    emailLabel.setAttribute('for',"email");
    emailLabel.innerHTML = "Email";

    var emailInput = document.createElement("input"); //input element, email
    emailInput.setAttribute('type',"email");
    emailInput.setAttribute('name',"email");

    emailDiv.appendChild(emailLabel);
    emailDiv.appendChild(emailInput);

    ////////////////////////////////////////////////////////////////////////////

    var passwordDiv = document.createElement("div");
    var passwordLabel = document.createElement("label"); //label element, email
    passwordLabel.setAttribute('for',"password");
    passwordLabel.innerHTML = "Password";

    var passwordInput = document.createElement("input"); //input element, password
    passwordInput.setAttribute('type',"password");
    passwordInput.setAttribute('name',"password");

    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    ////////////////////////////////////////////////////////////////////////////

    var inputDiv = document.createElement("div");
    var submitInput = document.createElement("input"); //input element, Submit button
    submitInput.setAttribute('id',"signin");
    submitInput.setAttribute('type',"submit");
    submitInput.setAttribute('value',"Login");
    inputDiv.appendChild(submitInput);

    ////////////////////////////////////////////////////////////////////////////

    form.appendChild(emailDiv);
    form.appendChild(passwordDiv);
    form.appendChild(inputDiv);

    return form;
}
