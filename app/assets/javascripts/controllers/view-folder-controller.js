app.controller('ViewFolderController', ['$scope', '$routeParams', 'Folder', 'Doc',
  function($scope, $routeParams, Folder, Doc) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    }
  }])