app.controller('FolderController', ['$scope', 'Folder', 
  function($scope, Folder) {
    $scope.folders = Folder.query();
    

}]);