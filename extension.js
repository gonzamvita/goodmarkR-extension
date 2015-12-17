document.addEventListener('DOMContentLoaded', function () {
    if (localStorage["user_auth_token"] == null) {
        displayLoginForm();
    } else {
        displayBookmarkForm();
    }
    $('#toHomeBtn').on('click', function(e) {
        window.open('http://localhost:3000/bookmarks', '_blank');
    })
    $('#logoutBtn').on('click', function(e) {
        logout(e);
    })
});
