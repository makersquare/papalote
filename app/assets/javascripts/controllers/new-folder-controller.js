app.controller('NewFolderController', ['$scope', 'Folder', 'User',
  function($scope, Folder, User) {
    $scope.user = User.currentUser;
    $scope.create = function(folder) {
      Folder.createFolder({folder: {name: folder.name, owner_id: $scope.user.id}});
    };
}]);