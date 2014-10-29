app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder', 'User',
  function($scope, $routeParams, $location, Folder, User) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.folder.$promise.then(function(data){
      $scope.parentFolder = data.parentfolder_id;
      $scope.currentFolder = data;
    });
    $scope.backToParentView = false;
    $scope.folderDocs = Folder.folderDocResource.get({folder_id: $routeParams["id"]});
    $scope.folderDocs.$promise.then(function(data){
      $scope.subfolders = data.folders;
      $scope.docs = data.docs;
      if ($scope.parentFolder === null) {
        $scope.backToParentView = false;
      }
      else {
        $scope.backToParentView = true;
      }
    });
    $scope.user = User.get()

    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      console.log($scope.user.id)
      console.log(doc.owner_id)
      if ($scope.user.id === doc.owner_id) {
        $location.path("/docs/" + doc.id);
      } else {
        alert("YOU ARE NOT THE OWNER OF THIS FILE!!!!!!!")
      }
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
    $scope.newFolder = function(folder){
      Folder.createFolder({name: $scope.name, parentfolder_id: folder.id})
    }
  }]);