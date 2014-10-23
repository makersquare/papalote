app.controller('ViewFolderController', ['$scope', '$routeParams', 'Folder',
  function($scope, $routeParams, Folder) {
    // console.log(Folder.folderResource.get({id: $routeParams["id"]}))
    $scope.view = Folder.folderResource.get({id: $routeParams["id"]})
  }])