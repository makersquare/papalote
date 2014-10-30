app.controller('NewFolderController', ['$scope', 'Folder',
  function($scope, Folder) {
    $scope.create = function(name) {
      Folder.createFolder({name: name});
    },
    $scope.folder_name = "";
}]);