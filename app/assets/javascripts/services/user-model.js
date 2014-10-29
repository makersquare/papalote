app.factory('User', ['$resource',
  function($resource) {
    var UserRsc = $resource('/user');

    var currentUser = UserRsc.get(function(data){
    });

    return {
      currentUser: currentUser
    }
}]);