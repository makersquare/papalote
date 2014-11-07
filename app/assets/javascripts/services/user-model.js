app.factory('User', ['$resource',
  function($resource) {
    var userRsc = $resource('/user');

    var currentUser = userRsc.get(function(data){
    });

    var userDocs = $resource(
      '/users/:owner_id/contents',
      {owner_id: '@owner_id'},
      {update: {method: "PATCH"}}
    );

    return {
      currentUser: currentUser,
      userDocs: userDocs
    };
}]);