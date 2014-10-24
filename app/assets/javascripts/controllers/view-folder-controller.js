app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder',
  function($scope, $routeParams, $location, Folder) {
    
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.folderDocs = Folder.folderDocResource.query({folder_id: $routeParams["id"]});
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
    $scope.newDoc = function(folder){
      var createdDoc = {folder_id: folder.id, name: $scope.name};
      Folder.createDocForFolder(createdDoc);
    };
  }]);