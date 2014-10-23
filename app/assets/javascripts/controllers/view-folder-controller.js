app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder', 'FolderDocs',
  function($scope, $routeParams, $location, Folder, FolderDocs) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.folderDocs = FolderDocs.query({folder_id: $routeParams["id"]});
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
  }]);