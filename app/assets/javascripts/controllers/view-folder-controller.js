app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder', 'Doc',
  function($scope, $routeParams, $location, Folder, Doc) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.folder.$promise.then(function(data){
      $scope.parentFolder = data.parentfolder_id;
      $scope.currentFolder = data;
      $scope.input = {folder: $scope.currentFolder};
    });
    $scope.backToParentView = false;
    $scope.folderDocs = Folder.folderDocResource.get({folder_id: $routeParams["id"]});
    $scope.folderDocs.$promise.then(function(data){
      $scope.subfolders = data.folders;
      $scope.docs = data.docs;
      $scope.empty = (!$scope.subfolders.length && !$scope.docs.length);
      $scope.backToParentView = !!$scope.parentFolder;
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
    $scope.newDoc = function(input) {
      Folder.createDocForFolder({folder_id: input.folder.id, name: input.name});
    };
    $scope.newFolder = function(input) {
      Folder.createFolder({name: input.name, parentfolder_id: input.folder.id});
    };
    $scope.newDocOrFolder = function(input) {
      Folder.createDocOrFolder(input);
    };
    $scope.deleteDoc = function(doc){
      document.getElementById(doc.id).remove();
      Doc.delete(doc, function(data) {
        $location.path('/folders/' + $scope.folder.id);
      });
    };
    $scope.deleteFolder = function(folder){
      document.getElementById(folder.id).remove();
      Folder.deleteFolder(folder, function(data) {
        $location.path('/folders/' + $scope.folder.id);
      });
    };
  }]);