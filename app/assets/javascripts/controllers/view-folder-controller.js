app.controller('ViewFolderController', ['$scope', 'Folder',
  function($scope, Folder) {
    $scope.view = Folder.get({id: '@id'})
  }])