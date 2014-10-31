app.controller('UserController', ['$scope', 'Folder', 'User',
  function($scope, Folder, User){
    $scope.user = User.currentUser;

    $scope.userFolders = Folder.folderResource.query();
  }]);