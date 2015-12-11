// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "clicked_browser_action") {
      // var siteHref = $(location).attr("href");
      //
      // console.log(siteHref);
      // saveBookmark(siteHref);
      alert("sdjfksjdfhksdf")
    }
  }
);

function buildJsonData(data) {
  var userName = "gonzamv@gmail.com";
  var password = "12345678";
  var title = "Test JSON";
  var content = data;
  var bookmark = { "userName": userName, "password" : password, "title": title, "content": content };

  return bookmark;
}

function saveBookmark(data) {
    var data = buildJsonData(data);
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/api/v1/bookmarks',
        data: JSON.stringify(data),
        dataType: JSON,
        error: function(response) {
            console.log(response);
            $('#info').html('<p>An error has occurred</p>');
        },
        success: function() {
            console.log(response);
            $('#info').html('<p>Success</p>');
        }
    });
}
