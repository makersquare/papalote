app.controller('HomePageController', ['$scope', 'Folder',
  function($scope, Folder){
    $scope.createDoc = function(upload){
      Folder.createDocForFolder({doc: {folder:null, name: upload.name}});
    };
    $scope.createFolder = function(upload){
      Folder.createFolder({folder: {name: upload.name}})
    };
}]);