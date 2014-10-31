app.controller('NewFolderController', ['$scope', 'Folder',
  function($scope, Folder) {
    $scope.create = function(folder) {
      Folder.createFolder({folder: {name: folder.name}});
    };
}]);