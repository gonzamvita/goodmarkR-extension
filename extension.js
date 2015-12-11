document.addEventListener('DOMContentLoaded', function () {
    if (localStorage["user_auth_token"] == null) {
        displayLoginForm();
        document.querySelector('#loginForm').addEventListener('submit', onLogInSubmit);
    } else {
        displayUserForm();
    }
});

function displayLoginForm() {
    $('.js-login').append(createForm());
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
    $('.js-login').html("<p>Logged in as " + response.name + "!</p>");
    storeTokenLocally(response.token);
    // displayExtensionMenu();
}

function badLogin(response) {
    $('.js-login').html("<p>Bad login credentials, I think...</p>");
}

function storeTokenLocally(token) {
    localStorage["user_auth_token"] = token;
}
