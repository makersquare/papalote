app.factory('User', ['$resource',
  function($resource) {
    var userRsc = $resource('/user');

    var currentUser = userRsc.get(function(data){
    });

    return {
      currentUser: currentUser.$promise
    }
}]);