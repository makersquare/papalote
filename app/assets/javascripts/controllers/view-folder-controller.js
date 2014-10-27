app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder',
  function($scope, $routeParams, $location, Folder) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.folderDocs = Folder.folderDocResource.get({folder_id: $routeParams["id"]}, function(data){
      $scope.subfolders = data.folders;
      $scope.docs = data.docs;
    });

    // console.log($scope.folders);
    // console.log($scope.folderDocs.docs);
    // $scope.folderFolders = Folder.folderDocResource.get({folder_id: $routeParams["id"]}).folders;
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
    $scope.newDoc = function(folder){
      Folder.createDocForFolder({folder_id: folder.id, name: $scope.name});
    };
  }]);