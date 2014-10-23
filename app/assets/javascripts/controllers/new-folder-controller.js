app.controller('NewFolderController', ['$scope', 'Folder',
  function($scope, Folder) {
    $scope.create = function(name) {
      Folder.createFolder(name);
    },
    $scope.folder_name = "HEY Daniel";
}]);