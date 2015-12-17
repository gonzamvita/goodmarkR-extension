function displayBookmarkForm() {
    $('.js-login').empty()
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var url = tabs[0].url;
        $('.js-login').append(createBookmark(url));
        document.querySelector('#bookmarkForm').addEventListener('submit', onBookmarkSubmit);
    });
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
        bookmark.type = $("#bookmarkType").val();
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

function createBookmark(url) {
    var form = document.createElement("form");
    form.setAttribute('id', "bookmarkForm");
    form.setAttribute('method',"post");

    ////////////////////////////////////////////////////////////////////////////

    var bookmarkDiv = document.createElement("div");

    var titleLabel = document.createElement("label"); //label element, bookm~
    titleLabel.setAttribute('for',"title");
    titleLabel.innerHTML = "Title";

    var titleInput = document.createElement("input"); //input element, bookm~
    titleInput.setAttribute('id',"bookmarkTitle");
    titleInput.setAttribute('type',"text");

    bookmarkDiv.appendChild(titleLabel);
    bookmarkDiv.appendChild(titleInput);

    ////////////////////////////////////////////////////////////////////////////

    var typeLabel = document.createElement("label"); //label element, bookm~
    typeLabel.setAttribute('for',"type");
    typeLabel.innerHTML = "Type";

    var typeInput = document.createElement("select"); //input element, bookm~
    typeInput.setAttribute('id',"bookmarkType");
    typeInput.setAttribute('type',"text");

    var opt1 = document.createElement('option');
    opt1.value = 1;
    opt1.innerHTML = "New";
    typeInput.appendChild(opt1);

    var opt2 = document.createElement('option');
    opt2.value = 2;
    opt2.innerHTML = "Image";
    typeInput.appendChild(opt2);

    var opt3 = document.createElement('option');
    opt3.value = 3;
    opt3.innerHTML = "General";
    typeInput.appendChild(opt3);

    bookmarkDiv.appendChild(typeLabel);
    bookmarkDiv.appendChild(typeInput);

    ////////////////////////////////////////////////////////////////////////////

    var bookmarkLabel = document.createElement("label"); //label element, bookm~
    bookmarkLabel.setAttribute('for',"bookmark");
    bookmarkLabel.innerHTML = "URL";

    var bookmarkInput = document.createElement("input"); //input element, bookm~
    bookmarkInput.setAttribute('id',"bookmarkUrl");
    bookmarkInput.setAttribute('type',"text");
    bookmarkInput.setAttribute('name',"bookmark");
    bookmarkInput.setAttribute('readonly',"readonly");
    bookmarkInput.value = url;

    bookmarkDiv.appendChild(bookmarkLabel);
    bookmarkDiv.appendChild(bookmarkInput);

    ////////////////////////////////////////////////////////////////////////////

    var inputDiv = document.createElement("div");
    var submitInput = document.createElement("input"); //input element, Submit ~
    submitInput.setAttribute('id',"saveBookmark");
    submitInput.setAttribute('type',"submit");
    submitInput.setAttribute('value',"Save Bookmark");
    inputDiv.appendChild(submitInput);

    ////////////////////////////////////////////////////////////////////////////

    var hr = document.createElement("hr");

    form.appendChild(bookmarkDiv);
    form.appendChild(hr);
    form.appendChild(inputDiv);

    return form;
}
