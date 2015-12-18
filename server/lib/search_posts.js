// Actual text search function
_searchPosts = function (searchText) {
    var Future = Npm.require('fibers/future');
    var future = new Future();
    MongoInternals.defaultRemoteCollectionDriver().mongo.db.executeDbCommand({
        text: 'posts',
        search: searchText,
        project: {
          id: 1 // Only take the ids
        }
     }
     , function(error, results) {
        if (results && results.documents[0].ok === 1) {
            future.return(results.documents[0].results);
        }
        else {
            future.return('');
        }
    });
    return future.wait();
};
 
// Helper that extracts the ids from the search results
searchPosts = function (searchText) {
    if (searchText && searchText !== '') {
        var searchResults = _searchPosts(searchText);
        var ids = [];
        for (var i = 0; i < searchResults.length; i++) {
            ids.push(searchResults[i].obj._id);
        }
        return ids;
    }
};
