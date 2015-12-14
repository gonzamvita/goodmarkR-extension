function bookmarkBuilder(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var bookmark = {};
        bookmark.url = tabs[0].url;
        bookmark.title = tabs[0].title;
        bookmark.favicon = tabs[0].favIconUrl;
        callback(bookmark);
    });

}
