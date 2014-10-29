app.factory('User', ['$resource',
	function($resource) {
    var currentUser;
    return {
      currentUser: currentUser ||= $resource('/user', function(data){
        currentUser = data;
      })
    }
}]);