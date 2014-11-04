app.factory('SearchFactory', ['$resource', function($resource){
  var searchRsc = $resource('/search/:keywords');
  var searchResults = {};

  return {
    find: function(keywords){
      searchRsc.get({keywords: keywords}, function(obj){
        searchResults.folders = obj.folders;
        searchResults.documents = obj.docs;
      });
    },
    getResults: searchResults
  }
}]);


