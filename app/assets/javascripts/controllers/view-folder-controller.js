app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder', 'Doc', 'FolderDocs', 'DocService',
  function($scope, $routeParams, $location, Folder, FolderDocs, Doc, DocService) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.folderDocs = FolderDocs.query({folder_id: $routeParams["id"]});
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
    $scope.newDoc = function(folder){
      var createdDoc = new Doc({folder_id: folder.id, name: $scope.name});
      DocService.newDocSave(createdDoc);
    };
  }]);