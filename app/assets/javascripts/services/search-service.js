app.factory('searchFactory', ['$http', function($http){
  var urlBase = '/search';
  return {
    find: function (keywords) {
      return $http.get(urlBase + '/' + keywords);
    }
  }
}]);
