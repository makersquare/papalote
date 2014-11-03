app.controller('HomePageController', ['$scope', 'Folder', 'User',
  function($scope, Folder, User){
    $scope.user = User.currentUser.$promise.then(function(data){
      $scope.user = data;
      $scope.guest = data.guest;
    });
    $scope.createDoc = function(upload){
      Folder.createDocForFolder({doc: {folder:null, name: upload.name}});
    };
    $scope.createFolder = function(upload){
      Folder.createFolder({folder: {name: upload.name}});
    };
}]);
