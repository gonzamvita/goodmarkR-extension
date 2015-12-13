document.addEventListener('DOMContentLoaded', function () {
    if (localStorage["user_auth_token"] == null) {
        displayLoginForm();
    } else {
        displayBookmarkForm();
    }
});

function displayLoginForm() {
    $('.js-login').empty();
    $('.js-login').append(createLogin());
    document.querySelector('#loginForm').addEventListener('submit', onLogInSubmit);
}

function displayBookmarkForm() {
    $('.js-login').empty()
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var url = tabs[0].url;
        $('.js-login').append(createBookmark(url));
        document.querySelector('#bookmarkForm').addEventListener('submit', onBookmarkSubmit);
    });
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
    $('.js-login').html("<p id='loginSuccess'>Logged in as " + response.name + "!</p>");
    storeTokenLocally(response.token);
    $('#loginSuccess').hide(2000, displayBookmarkForm);
    // displayExtensionMenu();
}

function badLogin(response) {
    $('.js-login').html("<p>Bad login credentials, I think...</p>");
}

function storeTokenLocally(token) {
    localStorage["user_auth_token"] = token;
}

function onBookmarkSubmit(e) {
    var url = "http://localhost:3000/"
    var apiEndpoint= "api/v1/users/sign_in"
    e.preventDefault();
}
