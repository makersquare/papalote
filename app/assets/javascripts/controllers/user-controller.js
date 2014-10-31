app.controller('UserController', ['$scope', '$routeParams', '$location', 'User',
  function($scope, $routeParams, $location, User){
    $scope.user = User.currentUser;

    $scope.userContents = User.userDocs.get({owner_id: $routeParams["owner_id"]});
    $scope.userContents.$promise.then(function(data){
      $scope.userFiles = data.docs;
      $scope.userFolders = data.folders;
    });

    $scope.findFile=function(file) {
      $location.path("/docs/"+file.id);
    };
    $scope.findFolder = function(folder) {
      $location.path('/folders/' + folder.id);
    } 
  }]);