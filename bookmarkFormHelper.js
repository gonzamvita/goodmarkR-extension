function createBookmark(url) {
    var form = document.createElement("form");
    form.setAttribute('id', "bookmarkForm");
    form.setAttribute('method',"post");

    ////////////////////////////////////////////////////////////////////////////

    var bookmarkDiv = document.createElement("div");
    var bookmarkLabel = document.createElement("label"); //label element, bookm~
    bookmarkLabel.setAttribute('for',"bookmark");
    bookmarkLabel.innerHTML = "URL";

    var bookmarkInput = document.createElement("input"); //input element, bookm~
    bookmarkInput.setAttribute('type',"text");
    bookmarkInput.setAttribute('name',"bookmark");
    bookmarkInput.value = url;

    bookmarkDiv.appendChild(bookmarkLabel);
    bookmarkDiv.appendChild(bookmarkInput);

    ////////////////////////////////////////////////////////////////////////////

    var inputDiv = document.createElement("div");
    var submitInput = document.createElement("input"); //input element, Submit ~
    submitInput.setAttribute('id',"signin");
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
