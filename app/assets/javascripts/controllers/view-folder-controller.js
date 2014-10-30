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
    $scope.user = User.currentUser;

    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      if ($scope.user.id === doc.owner_id) {
        $location.path("/docs/" + doc.id);
      } else {
        // render a error view
        $location.path("/user-permission-denied");
        // alert("YOU ARE NOT THE OWNER OF THIS FILE!")
      }
    };
    $scope.findSubFolder = function(subfolder) {
      if ($scope.user.id === subfolder.owner_id) {
        $location.path('/folders/' + subfolder.id);
      } else {
        // render a error view
        alert("YOU ARE NOT THE OWNER OF THIS FOLDER!")
      }
    };
    $scope.findParentFolder = function(folder) {
      var parent = Folder.folderResource.get({id: folder});
      parent.$promise.then(function(){
        $scope.owner = parent.owner_id;
        if ($scope.user.id === $scope.owner) {
          $location.path('/folders/' + parent.id);
        } else {
          // render a error view
          alert("BwAHAHAHAH");
        }
      })
    };
    $scope.newDoc = function(folder){
      Folder.createDocForFolder({folder_id: folder.id, name: $scope.name});
    };
    $scope.newFolder = function(folder){
      Folder.createFolder({name: $scope.name, parentfolder_id: folder.id})
    }
  }]);