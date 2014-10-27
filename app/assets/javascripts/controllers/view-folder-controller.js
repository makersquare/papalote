app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder',
  function($scope, $routeParams, $location, Folder) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]}, function(data){
      $scope.parentFolder = data.parentfolder_id;
    });
    $scope.backToParentView = false;
    $scope.folderDocs = Folder.folderDocResource.get({folder_id: $routeParams["id"]}, function(data){
      $scope.subfolders = data.folders;
      $scope.docs = data.docs;
      if ($scope.parentFolder === null) {
        $scope.backToParentView = false;
      }
      else {
        $scope.backToParentView = true;
      }
    });

    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
    $scope.findSubFolder = function(subfolder) {
      $location.path('/folders/' + subfolder.id);
    };
    $scope.findParentFolder = function(folder) {
      $location.path('/folders/' + folder.parentfolder_id);
    };
    $scope.newDoc = function(folder){
      Folder.createDocForFolder({folder_id: folder.id, name: $scope.name});
    };
  }]);