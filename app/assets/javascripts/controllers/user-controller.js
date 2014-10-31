app.controller('UserController', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User){
    $scope.user = User.currentUser;

    $scope.userContents = User.userDocs.get({owner_id: $routeParams["owner_id"]});
    $scope.userContents.$promise.then(function(data){
      $scope.userFiles = data.docs;
      $scope.userFolders = data.folders;
    })
  }]);