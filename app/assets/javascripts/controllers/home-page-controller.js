app.controller('HomePageController', ['$scope', 'Folder',
  function($scope, Folder){
    $scope.createDoc = function(file_name){
      Folder.createDocForFolder({folder_id: null, name: $scope.name});
    };
    $scope.createFolder = function(folder_name){
      Folder.createFolder(folder_name)
    };
}]);