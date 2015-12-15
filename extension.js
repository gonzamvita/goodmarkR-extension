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

function loadUserToken(token) {
    var token = localStorage["user_auth_token"];
    return token;
}

function onBookmarkSubmit(e) {
    var url = "http://localhost:3000/"
    var apiEndpoint= "api/v1/bookmarks"
    e.preventDefault();

    bookmarkBuilder(function(bookmark){
        bookmark.title = $("#bookmarkTitle").val();
        bookmark.userToken = loadUserToken();

        $.ajax({
            type: "POST",
            url: url + apiEndpoint,
            data: bookmark,
            dataType: "JSON",
            error: function(response) {
                console.log(response);
            },
            success: function(response) {
                successfulBookmarkSave(response);
                console.log(response);
            }
        });
    });

}

function successfulBookmarkSave() {
    $('.js-login').html("<div id='bookmarkSuccess'><p>Bookmark saved!!</p></div>");
    $('#bookmarkSuccess').hide(2000, displayBookmarkForm);
}
